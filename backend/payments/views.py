from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
import razorpay
import hmac
import hashlib
from decimal import Decimal
from django.shortcuts import get_object_or_404
from products.models import ProductRequest
from .models import Payment


class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Derive amount from ProductRequest.price (updated via Django Admin)
        product_request_id = request.data.get('product_request_id')
        if product_request_id:
            pr = get_object_or_404(ProductRequest, pk=product_request_id, user=request.user)
        else:
            pr = ProductRequest.objects.filter(user=request.user).order_by('-created_at').first()
            if not pr:
                return Response({'detail': 'No product request found for this user'}, status=400)

        try:
            amount = int(Decimal(str(pr.price)) * 100)  # INR -> paise
        except Exception:
            return Response({'detail': 'Invalid price configured for ProductRequest'}, status=500)

        if amount <= 0:
            return Response({'detail': 'Configured price must be > 0'}, status=400)
        if not (settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET):
            return Response({'detail': 'Razorpay keys not configured'}, status=500)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        order = client.order.create({
            'amount': amount,
            'currency': 'INR',
            'payment_capture': 1
        })

        user = request.user
        name = getattr(user, 'name', None) or user.get_full_name() or getattr(user, 'email', '')
        contact = getattr(user, 'mobile', '') or ''
        # Persist a Payment record with status 'created'
        Payment.objects.create(
            user=user,
            order_id=order['id'],
            amount=order['amount'],
            currency=order.get('currency', 'INR'),
            status=Payment.STATUS_CREATED,
        )
        return Response({
            'order_id': order['id'],
            'amount': order['amount'],
            'currency': order.get('currency', 'INR'),
            'key_id': settings.RAZORPAY_KEY_ID,
            'prefill': {
                'name': name,
                'email': user.email,
                'contact': contact
            }
        }, status=201)


class VerifyPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('razorpay_order_id')
        payment_id = request.data.get('razorpay_payment_id')
        signature = request.data.get('razorpay_signature')
        if not all([order_id, payment_id, signature]):
            return Response({'detail': 'Missing Razorpay params'}, status=400)

        secret = settings.RAZORPAY_KEY_SECRET
        body = f"{order_id}|{payment_id}".encode()
        expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()

        if hmac.compare_digest(expected, signature):
            # Update the Payment record
            Payment.objects.filter(order_id=order_id).update(
                payment_id=payment_id,
                signature=signature,
                status=Payment.STATUS_PAID,
            )
            return Response({'detail': 'Payment verified'})
        return Response({'detail': 'Signature verification failed'}, status=400)
