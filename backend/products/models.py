from django.db import models
from django.core.validators import MinValueValidator
from django.db.models import Q
from decimal import Decimal
from users.models import User

class ProductRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_requests')
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))],
        help_text='Price in INR (e.g., 499.99)'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} by {self.user.email}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user'],
                condition=Q(is_active=True),
                name='unique_active_request_per_user',
            )
        ]
