
from .serializers import ProductSerializer, ProductCreateSerializer
from .models import Product
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404, Http404

class CreateProductAPIView(CreateAPIView):
    serializer_class = ProductCreateSerializer


class UpdateGMFAPIView(APIView):
    def patch(self, request, product_id):
        try:
            product = Product.objects.get(product_id=product_id)
            
            # Cambiar el valor de is_active (lo negamos)
            product.is_exempt = not product.is_exempt
            product.save()

            # Serializar y devolver la respuesta
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=200)

        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)


class ListProductByUserAPIView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        document = self.kwargs.get('document_number')
        #queryset = Product.objects.all()
        queryset = Product.objects.filter(user__document_number=document)
        return queryset
    

class ListProductAPIView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        return queryset

class CancelProductAPIView(APIView):
    
    def patch(self, request, *args, **kwargs):
        try:
            id = kwargs.get('id_product')
            product = get_object_or_404(Product, product_id = id)
            
            if product.balance == 0 and product.status != 'c':
                product.status = 'c'
                product.save()
                return Response(
                    {'msg': 'Product cancel successfull'},
                    status=200
                )
            else:
                return Response(
                    {'msg': 'Product cancel unsuccessfull the amount isn´t empty or it was already cancel'},
                    status=400
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
            )


