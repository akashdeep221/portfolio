from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'payment_id', 'status', 'amount', 'currency', 'user', 'created_at')
    search_fields = ('order_id', 'payment_id', 'user__email')
    list_filter = ('status', 'currency', 'created_at')
    readonly_fields = ('created_at', 'updated_at', 'signature')

