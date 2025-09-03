from rest_framework import serializers
from .models import ProductRequest

class ProductRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRequest
        fields = ['id', 'title', 'description', 'price', 'created_at']
