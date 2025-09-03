from django.db import models
from django.conf import settings


class Payment(models.Model):
    STATUS_CREATED = 'created'
    STATUS_PAID = 'paid'
    STATUS_FAILED = 'failed'
    STATUS_REFUNDED = 'refunded'

    STATUS_CHOICES = (
        (STATUS_CREATED, 'Created'),
        (STATUS_PAID, 'Paid'),
        (STATUS_FAILED, 'Failed'),
        (STATUS_REFUNDED, 'Refunded'),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='payments',
    )
    provider = models.CharField(max_length=50, default='razorpay')
    order_id = models.CharField(max_length=100, unique=True)
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    signature = models.CharField(max_length=256, blank=True, null=True)
    amount = models.PositiveIntegerField(help_text='Amount in paise')
    currency = models.CharField(max_length=10, default='INR')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_CREATED)
    notes = models.JSONField(blank=True, null=True, default=dict)
    receipt = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.order_id} ({self.status})"

