from django.urls import path
from .views import ProductRequestCreateView

urlpatterns = [
    path('request/', ProductRequestCreateView.as_view(), name='product-request'),
]
