from django.db import models
import uuid 
from apps.product.models import Product


class Transaction(models.Model):

    TRANSACTION_TYPE = (
        ('deposit','DEPOSIT'),
        ('debit','DEBIT'),
        ('transfer','TRANSFER')
    )

    STATUS = (('p','process'),('a','approved'),('r','reject'))

    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    date_time = models.DateTimeField(auto_now_add=True, editable=False)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE, null=True, blank=True)
    status = models.CharField(max_length=1, choices=STATUS, default='p')
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_send')
    security_code = models.CharField(max_length=4, null=True, blank=True)
    product_receive = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, related_name='product_receive')
    description = models.CharField(max_length=30, blank=True, null=True)


    def __str__(self):
        return f"id: {str(self.transaction_id)} - producto: {self.product.product_id} - usuario: {self.product.user.full_name}"