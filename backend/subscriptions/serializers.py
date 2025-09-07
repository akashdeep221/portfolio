from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('id', 'email', 'created_at')
        read_only_fields = ('id', 'created_at')

    def validate_email(self, value: str) -> str:
        return value.strip().lower()
