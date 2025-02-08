from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
)
from rest_framework.views import APIView 
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404, Http404
from .models import Transaction
from .serializers import CreditTransactionSerializer, TransactionSerializer
from django.db.models import Q


class CreateTransactionAPIView(CreateAPIView):
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        # Guardamos la transacción antes de realizar los cambios en el balance
        transaction = serializer.save()

        #Asegurarnos si la cuenta esta exenta del 4x100 y calcular monto de transaccion
        amount = transaction.amount if transaction.product.is_exempt else transaction.amount + (transaction.amount/1000)*4

        # Procesar el balance según el tipo de transacción
        try:
            if transaction.transaction_type == 'deposit':   
                transaction.product.balance += transaction.amount
                transaction.product.save()

            elif transaction.transaction_type == 'debit':     
                if transaction.product.balance >= amount:
                    transaction.product.balance -= amount
                    transaction.product.save()
                else:
                    raise ValueError("Saldo insuficiente para el débito")

            elif transaction.transaction_type == 'transfer':
                if transaction.product.balance >= amount:

                    if transaction.product_receive and transaction.product_receive != transaction.product:
                        transaction.product.balance -= amount
                        transaction.product.save()
                        transaction.product_receive.balance += transaction.amount
                        transaction.product_receive.save()
                    else:
                        raise ValueError("Producto receptor no encontrado")
                else:
                    raise ValueError("Saldo insuficiente para la transferencia")

            # Si todo fue bien, se aprueba la transacción
            transaction.status = 'a'
            transaction.save()

        except ValueError as e:
            # Si hubo un error (por ejemplo, saldo insuficiente), se rechaza la transacción
            transaction.status = 'r'
            transaction.save()
            raise e  # Opcional: Re-lanzar el error para que se registre
            # Devolvemos una respuesta con el error y un estado HTTP 400 (Bad Request)
            #return Response({'error': str(e)}, status=400)
            

""" class CreditTransactionAPIView(APIView):

    def patch(self, request, *args, **kwargs):  
        id = request.data.get('id_product')
        amount = request.data.get('amount') 

        if not id:
            return Response(
                {'msg': 'Faltan parámetros obligatorios: id_product'},
                status=400
            )
        
        if not amount:
           return Response(
                {'msg': 'No ingresaste un valor invalido para la transacción tiene que ser mayor a 0 o falta el campo amount'},
                status=400
            ) 
    
        try:
            product = get_object_or_404(Product, product_id = id)
            product.balance += amount
            product.save()
            return Response(
                {'msg': 'Deposito realizado con exito'},
                status=200
            )
        except Http404:
            return Response(
                {'msg': 'There is no product relationated to this id'},
                status=404
            )
        except Exception as e:
            return Response(
                {'msg': str(e)},
                status=500
            ) """


class CreditTransactionAPIView(APIView):
    
    def patch(self, request, *args, **kwargs):
        # Usamos el serializer para validar los datos
        serializer = CreditTransactionSerializer(data=request.data)
        
        if serializer.is_valid():
            # Accedemos a los datos validados
            id_product = serializer.validated_data['id_product']
            amount = serializer.validated_data['amount']
            
            try:
                product = Product.objects.get(product_id=id_product)
                product.balance += amount
                product.save()
                
                return Response(
                    {'msg': 'Depósito realizado con éxito'},
                    status=200
                )
            except Product.DoesNotExist:
                return Response(
                    {'msg': 'No se encontró el producto con el id proporcionado'},
                    status=404
                )
        
        # Si el serializer no es válido, devolvemos los errores de validación
        return Response(
            {'msg': 'Error de validación', 'errors': serializer.errors},
            status=400
        )


class ListTransactionByProductAPIView(ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']  
        return Transaction.objects.filter(
             Q(product__product_id=product_id)
            | Q(product_receive__product_id=product_id)
            ) 

