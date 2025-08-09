from rest_framework import generics, permissions
from .models import ProductRequest
from .serializers import ProductRequestSerializer

class ProductRequestCreateView(generics.CreateAPIView):
    serializer_class = ProductRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
