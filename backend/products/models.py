from django.db import models
from users.models import User

class ProductRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_requests')
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user.email}"
