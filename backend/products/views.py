from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.http import Http404
from .models import ProductRequest
from .serializers import ProductRequestSerializer

class ProductRequestCreateView(generics.CreateAPIView):
    serializer_class = ProductRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if ProductRequest.objects.filter(user=request.user, is_active=True).exists():
            return Response({'detail': 'You already have an active request.'}, status=status.HTTP_409_CONFLICT)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, is_active=True)


class ProductRequestDetailView(generics.RetrieveAPIView):
    serializer_class = ProductRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ProductRequest.objects.all()

    def get_queryset(self):
        # Restrict access: a user can only view their own ProductRequest
        return ProductRequest.objects.filter(user=self.request.user)


class ProductRequestMineView(generics.RetrieveAPIView):
    serializer_class = ProductRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = ProductRequest.objects.filter(user=self.request.user).order_by('-created_at').first()
        if not obj:
            raise Http404("No product request for this user.")
        return obj
