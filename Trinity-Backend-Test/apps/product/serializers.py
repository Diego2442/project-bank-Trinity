from rest_framework import serializers
from .models import Product 
from apps.user.serializers import UserSerializer

class ProductSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Product 
        fields = [
            'product_id',
            'user',
            'account_type',
            'is_exempt',
            'balance',
            'status',
        ]

class ProductCreateSerializer(serializers.ModelSerializer):
    #user = UserSerializer()

    class Meta:
        model = Product 
        fields = [
            'product_id',
            'user',
            'account_type',
            'is_exempt',
            'balance',
            'status',
            'created',
            'updated'
        ]
    
    def validate(self, data):
        """
        Verifica si el usuario ya tiene un producto con el mismo account_type.
        """
        user = data.get('user')  # El user es ahora un objeto User, no solo un ID
        account_type = data.get('account_type')
        
        # Verificar si el usuario ya tiene un producto con el mismo account_type
        if Product.objects.filter(user=user, account_type=account_type).exists():
            raise serializers.ValidationError(
                {"account_type": "El usuario ya tiene un producto con este tipo de cuenta."}
            )
        
        return data