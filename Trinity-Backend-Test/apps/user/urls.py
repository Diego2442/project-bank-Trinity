from django.urls import path 
from .views import (
    CreateCustomerAPIView, 
    ListCustomerAPIView, 
    DeleteCustomerAPIView,
    EditCustomerAPIView,
    ChangeTransactionalKeyAPIView,
    VerifyTransactionalKeyAPIView,
    ListCustomerByDocumentAPIView
    )

urlpatterns = [
    path('create_customer', CreateCustomerAPIView.as_view()),
    path('list_customers', ListCustomerAPIView.as_view()),
    path('delete_customer/<pk>', DeleteCustomerAPIView.as_view()),
    path('edit_customer/<pk>', EditCustomerAPIView.as_view()),
    path('edit_transactional_key/<pk>', ChangeTransactionalKeyAPIView.as_view()),
    path('veify_transactional_key', VerifyTransactionalKeyAPIView.as_view()),
    path('list_customer_by_document/<document_number>', ListCustomerByDocumentAPIView.as_view()),
]