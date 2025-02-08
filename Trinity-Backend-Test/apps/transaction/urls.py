from django.urls import path
from .views import CreditTransactionAPIView, CreateTransactionAPIView, ListTransactionByProductAPIView

urlpatterns = [
    path('credit_plus', CreditTransactionAPIView.as_view()),
    path('create_transaction', CreateTransactionAPIView.as_view()),
    path('list_transaction_by_product/<product_id>', ListTransactionByProductAPIView.as_view()),
]