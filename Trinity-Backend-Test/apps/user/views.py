from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from apps.product.models import Product
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    DestroyAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.views import APIView
from .serializers import UserSerializer, TransactionalKeySerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class CreateCustomerAPIView(CreateAPIView):
    serializer_class = UserSerializer

class ListCustomerAPIView(ListAPIView):
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = get_user_model().objects.filter(is_customer=True)
        queryset = queryset
        return queryset

class DeleteCustomerAPIView(DestroyAPIView):
    queryset = get_user_model().objects.all()

    def delete(self, request, *args, **kwargs):
        usuario = get_user_model().objects.get(id=kwargs.get('pk'))

        if Product.objects.filter(user=usuario).exists():
            return Response(
                {'msg':'El usuario tiene productos asociados, no se puede eliminar'},
                status=400
                )
        
        usuario.delete()
        return Response(
            {'msg': 'Usuario eliminado correctamente'},
            status=204
        )

class EditCustomerAPIView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

class ChangeTransactionalKeyAPIView(RetrieveUpdateAPIView):
    serializer_class = TransactionalKeySerializer
    queryset = get_user_model().objects.all()

    def update(self, request, *args, **kwargs):
        user = self.get_object() #recupera el usuario desde la url
        serializer = self.get_serializer(user, data=request.data) #usamos el serializer personalizado

        if serializer.is_valid():
            #user.transactional_key = serializer.validated_data['transactional_key']
            user.set_transactional_key(serializer.validated_data['transactional_key'])
            user.save()

            return Response({'msg':'Transactional key updated succesfull', 'transactional_key': user.transactional_key}, status=200)
        
        return Response(serializer.errors, status=400 )

class VerifyTransactionalKeyAPIView(APIView):
    def get(self, request, *args, **kwargs):
        usuario_id = request.query_params.get('usuario_id')
        transactional_key = request.query_params.get('transactional_key')

        if not usuario_id or not transactional_key:
            return Respone(
                {'msg':'Párametros usuario_id o transactionla_key en la url son necesarios'}, status=400
            )
            
        user = get_object_or_404(get_user_model(), id=usuario_id)

        # Verifica si la clave transaccional es válida
        if user.check_transactional_key(transactional_key):
            return Response({"msg": "Clave transaccional válida"}, status=200)
        else:
            return Response({"msg": "Clave transaccional incorrecta"}, status=400)


class ListCustomerByDocumentAPIView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        document_number = self.kwargs.get('document_number', None)

        if document_number:
            # Filtrar por el número de documento
            queryset = get_user_model().objects.get(document_number=document_number)
            return queryset
        else:
            # Si no se proporciona el parámetro 'document_number', devolvemos todos los usuarios
            return get_user_model().objects.none()  # Devolvemos queryset vacío si no hay parámetro

    def list(self, request, *args, **kwargs):
        # Realiza la lógica de validación aquí
        queryset = self.get_queryset()

        # Si el queryset está vacío, devolvemos un error 404
        if not queryset:
            return Response({'msg': 'Usuario no encontrado'}, status=404)

        # Si el queryset tiene datos, los serializamos y devolvemos la respuesta
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)
