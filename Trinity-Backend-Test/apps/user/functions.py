from django.core.mail import send_mail
from django.conf import settings

def send_password_by_email(email, password):
    """
    Enviar la contraseña por correo electrónico al usuario.
    """
    subject = 'Your new account password'
    message = f'Your account has been created. Your password is: {password}'
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]
    
    # Enviar el correo electrónico
    send_mail(subject, message, from_email, recipient_list)