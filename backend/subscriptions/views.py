from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.core.mail import send_mail
from django.conf import settings
from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        obj, created = Subscription.objects.get_or_create(email=email)
        if created:
            # send confirmation email (fail silently)
            try:
                send_mail(
                    subject="Subscription Confirmed",
                    message="You are subscribed. Stay tuned for updates.",
                    from_email=(getattr(settings, 'DEFAULT_FROM_EMAIL', None) or getattr(settings, 'EMAIL_HOST_USER', None)),
                    recipient_list=[email],
                    fail_silently=True,
                )
            except Exception:
                pass
            return Response({"message": "You are subscribed. Stay tuned for updates."}, status=status.HTTP_201_CREATED)
        return Response({"message": "You are subscribed. Stay tuned for updates."}, status=status.HTTP_200_OK)
