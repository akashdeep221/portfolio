from django.urls import path
from .views import SignupView, EmailVerifyView, LoginView, PasswordResetRequestView, PasswordResetConfirmView, MeView

app_name = 'users'

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('email-verify/<uidb64>/<token>/', EmailVerifyView.as_view(), name='email-verify'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('me/', MeView.as_view(), name='me'),
]
