from django.utils.crypto import get_random_string
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .functions import send_password_by_email

class TransactionalKeySerializer(serializers.Serializer):
    transactional_key = serializers.CharField(
        max_length=6,
        min_length=6,
        required=True,
        write_only=True,
        error_messages={
            'max_length': 'El código debe ser exactamente de 6 dígitos',
            'min_length': 'El códogo debe ser exactamente de 6 dígitos'
        }
    )

    def validate_transactional_key(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("El código debe contener solo dígitos numéricos.")
        return value


class UserSerializer(serializers.ModelSerializer):
    # Campos requeridos
    document_type = serializers.CharField(required=True)
    document_number = serializers.CharField(required=True)
    birth_day = serializers.CharField(required=True)
    
    # Campo 'created' y 'updated' solo de lectura
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'full_name',
            'email',
            'document_type',
            'document_number',
            'birth_day',
            'created',
            'updated',
            'is_customer',
            #'transactional_key',
            'is_active',
            'is_staff',
            'is_superuser',
        ]
    
    def create(self, validated_data):
        password = get_random_string(length=8)

        extra_fields = {
                'document_type': validated_data.get('document_type'),
                'document_number': validated_data.get('document_number'),
                'birth_day': validated_data.get('birth_day'),
                'full_name': validated_data.get('full_name')
            }

        user = get_user_model().objects.create_customer(
            email=validated_data['email'],
            password=password,
            **extra_fields
        )

        send_password_by_email(user.email, password)
    
        return user


class UserSerializerAuth(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'full_name',
            'email',
            'document_type',
            'document_number',
            'birth_day',
            'created',
            'updated',
            'is_customer',
            'transactional_key',
            'is_active',
            'is_staff',
            'is_superuser',
        ]