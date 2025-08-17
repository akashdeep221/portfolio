from django.http import HttpResponse
import os
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from urllib.parse import urljoin
from .models import User
from .serializers import UserSignupSerializer, UserLoginSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer

class SignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_active = False
        user.save()
        # Send email verification
        # current_site = get_current_site(self.request)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        activation_path = reverse('users:email-verify', kwargs={'uidb64': uid, 'token': token})
        activation_link = urljoin(settings.BACKEND_BASE_URL, activation_path)
        try:
            send_mail(
                'Verify your email',
                f'Click the link to verify your email: {activation_link}',
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            raise Exception(f"Failed to send verification email: {str(e)}")

class EmailVerifyView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user and default_token_generator.check_token(user, token):
            user.email_verified = True
            user.is_active = True
            user.save()
            return HttpResponse('<span style="font-size:4em;">Email verified successfully</span>', content_type='text/html; charset=utf-8')
        return HttpResponse('<span style="font-size:4em;">Invalid or expired link.</span>', status=400, content_type='text/plain; charset=utf-8')

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
        if user and user.email_verified:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'detail': 'Invalid credentials or email not verified.'}, status=400)

class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'If the email exists, a reset link will be sent.'})
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        # Build frontend reset link so users land on React page, not DRF
        frontend_base = os.getenv('FRONTEND_BASE_URL', 'http://localhost:5173').rstrip('/')
        reset_link = f"{frontend_base}/reset-password/{uid}/{token}"
        send_mail(
            'Password Reset',
            f'Click the link to reset your password: {reset_link}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=True,
        )
        return Response({'detail': 'If the email exists, a reset link will be sent.'})

class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, uidb64, token):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'detail': 'Invalid link.'}, status=400)
        if not default_token_generator.check_token(user, token):
            return Response({'detail': 'Invalid or expired token.'}, status=400)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'detail': 'Password reset successful.'})
