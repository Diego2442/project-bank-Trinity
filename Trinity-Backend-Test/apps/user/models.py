from django.core.exceptions import ValidationError
from datetime import datetime

from cryptography.fernet import Fernet
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    DOC_TYPE=(
        ('cc', 'Cedula ciudadania'),
        ('ce', 'Cedula Extrajera'),
        ('pp', 'Pasaporte')
    )

    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique = True)
    document_type = models.CharField(choices=DOC_TYPE, max_length=2, blank=True, null=True)
    document_number = models.CharField(max_length=20, blank=True, null=True, unique=True)
    birth_day = models.DateField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    is_customer = models.BooleanField(default=True)
    transactional_key = models.CharField(max_length=128, blank=True, null=True)
    is_active = models.BooleanField(default=False) 
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = UserManager()

    def __str__(self):
        return f"{str(self.id)} - {self.full_name} - {self.email} - created: {str(self.created)} updated: {str(self.updated)}"
    
    #Proceso para encryptar la clave transactional
    def get_fernet(self):
        """Obtiene la instancia de Fernet usando la clave de configuración"""
        return Fernet(settings.FERNET_KEY)  # Usamos la clave secreta de Django (puedes usar una diferente)

    def set_transactional_key(self, key):
        """Encripta el código transaccional antes de almacenarlo"""
        fernet = self.get_fernet()
        self.transactional_key = fernet.encrypt(key.encode()).decode()

    def check_transactional_key(self, key):
        """Desencripta el código y compara si el código ingresado es el correcto"""
        if not self.transactional_key:
            return False

        fernet = self.get_fernet()

        try:
            decrypted_key = fernet.decrypt(self.transactional_key.encode()).decode()
            return decrypted_key == key
        except Exception as e:
            return False

    def clean(self):
        today = datetime.today()
        # Validación para asegurarse de que el usuario tiene al menos 18 años
        if isinstance(self.birth_day, str):
            self.birth_day = datetime.strptime(self.birth_day, "%Y-%m-%d").date()
    
            age = today.year - self.birth_day.year - ((today.month, today.day) < (self.birth_day.month, self.birth_day.day))

            if age < 18:
                raise ValidationError("You must be at least 18 years old to register.")
    
    def save(self, *args, **kwargs):
        # Llama al método clean antes de guardar el modelo
        self.clean()
        super(User, self).save(*args, **kwargs)