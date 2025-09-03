from django.urls import path
from .views import (
    ProductRequestCreateView,
    ProductRequestDetailView,
    ProductRequestMineView,
)

urlpatterns = [
    # create a new product request (returns its id in the response)
    path('requests/', ProductRequestCreateView.as_view(), name='product-request-create'),
    # get your latest product request (no id needed)
    path('requests/mine/', ProductRequestMineView.as_view(), name='product-request-mine'),
    # get a specific product request by id
    path('requests/<int:pk>/', ProductRequestDetailView.as_view(), name='product-request-detail'),
]
