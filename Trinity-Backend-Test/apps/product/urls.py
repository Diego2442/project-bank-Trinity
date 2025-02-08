from django.urls import path 
from .views import (
    CreateProductAPIView, 
    CancelProductAPIView,
    ListProductByUserAPIView, 
    UpdateGMFAPIView,
)

urlpatterns = [
    path('create_product', CreateProductAPIView.as_view()),  
    path('cancel_product/<id_product>', CancelProductAPIView.as_view()),
    path('list_products_by_user/<document_number>', ListProductByUserAPIView.as_view()), 
    path('change_GMF/<product_id>', UpdateGMFAPIView.as_view()), 
]