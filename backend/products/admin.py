from django.contrib import admin
from .models import ProductRequest

@admin.register(ProductRequest)
class ProductRequestAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'description', 'price', 'is_active', 'created_at')
    list_display_links = ('title',)
    list_editable = ('price',)
    search_fields = ('title', 'description', 'user__email')
    list_select_related = ('user',)
    ordering = ('-created_at',)
    list_filter = ('is_active', 'created_at')
