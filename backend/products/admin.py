from django.contrib import admin
from .models import ProductRequest

@admin.register(ProductRequest)
class ProductRequestAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'description', 'created_at')
    search_fields = ('title', 'description', 'user__email')
