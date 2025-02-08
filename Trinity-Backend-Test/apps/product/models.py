from django.db import models
from django.contrib.auth import get_user_model
import random, string


def generate_unique_id(prefix):
    """
    Función que genera un ID único, asegurándose de que no exista en la base de datos.
    """
    while True:
        # Generar un ID personalizado
        num_aleatorio = ''.join(random.choices(string.digits, k=8))
        product_id = prefix + num_aleatorio
        
        # Verificar si el ID ya existe
        if not Product.objects.filter(product_id=product_id).exists():
            return product_id



class Product(models.Model):
    ACCOUNTS_TYPE = (
        ('ca', 'current account'),
        ('sa', 'saving account')
    ) 
    STATUS = (
        ('i', 'inactive'),
        ('a', 'active'),
        ('c', 'cancel')
    )


    product_id = models.CharField(max_length=10, unique=True, primary_key=True, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    account_type = models.CharField(max_length=2, choices=ACCOUNTS_TYPE)
    is_exempt = models.BooleanField(default=False)
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    status = models.CharField(max_length=1, choices=STATUS, default='a')
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)

    def save(self, *args, **kwargs):
        if self.account_type=='ca':
            prefix = '33'
        elif self.account_type=='sa':
            prefix = '53'

        if not self.product_id:
            self.product_id = generate_unique_id(prefix)
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"producto: {self.product_id}, usuario: {self.user.full_name}"
            


