from rest_framework import serializers
from .models import Transaction

class CreditTransactionSerializer(serializers.Serializer):
    id_product = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError('El valor de amount debe ser mayor a 0.')
        return value



class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = [
            'transaction_id',
            'date_time',
            'amount',
            'product',
            'transaction_type',
            #'security_code',
            'product_receive',
            'description',
            'status'
        ]