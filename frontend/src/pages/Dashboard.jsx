import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [name, setName] = useState('');
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [hasActiveRequest, setHasActiveRequest] = useState(false);

  // Base API URL (Vite env or current origin)
  const API_BASE = (import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/, '');

  useEffect(() => {
    // If no token, send to login page
    if (!access) {
      navigate('/product/request', { replace: true });
      return;
    }

    // If name cached in localStorage from previous login, use it immediately
    const cachedName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
    if (cachedName) setName(cachedName);

    // Fetch profile to get the authoritative name
    const controller = new AbortController();
    fetch(`${API_BASE}/api/auth/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
        'Accept': 'application/json'
      },
      signal: controller.signal
    })
      .then(async (res) => {
        let data = {};
        try { data = await res.json(); } catch { }
        if (res.status === 401) {
          // Unauthorized or expired token
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/product/request', { replace: true });
          return;
        }
        if (!res.ok) return; // keep any cached name
        const candidate = data.name || data.full_name || data.username || data.email || '';
        if (candidate) {
          setName(candidate);
          localStorage.setItem('userName', candidate);
        }
        // do not set currentRequestId from profile
      })
      .catch(() => {/* ignore abort/network for now */ });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/product/request', { replace: true });
  };

  // --- Product Request state + submit handler ---
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [prLoading, setPrLoading] = useState(false);
  const [prError, setPrError] = useState('');
  const [prInfo, setPrInfo] = useState('');

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setPrError('');
    setPrInfo('');

    if (!productTitle.trim() || !productDescription.trim()) {
      setPrError('Please fill in both title and description.');
      return;
    }
    if (!access) {
      setPrError('You must be logged in.');
      navigate('/product/request', { replace: true });
      return;
    }
    if (hasActiveRequest) return;

    setPrLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products/requests/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify({
          title: productTitle.trim(),
          description: productDescription.trim()
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Failed to submit product request');
      }
      setPrInfo(data.message || 'Product request submitted successfully.');
      // Keep inputs as-is; do not clear Title/Description
      // Optionally sync with backend echo to avoid drift
      if (typeof data?.title === 'string') setProductTitle(data.title);
      if (typeof data?.description === 'string') setProductDescription(data.description);
      // Immediately reflect active state so fields are disabled until admin marks it inactive/deletes
      setHasActiveRequest(true);
      if (data?.id) setCurrentRequestId(data.id);
      if (typeof data?.price !== 'undefined') {
        const priceInr = Number.parseFloat(data.price);
        if (Number.isFinite(priceInr) && priceInr > 0) setPayAmountInr(Math.round(priceInr));
      }
    } catch (err) {
      setPrError(err.message);
    } finally {
      setPrLoading(false);
    }
  };
  // --- end product request ---
  // --- Fetch price from user's latest ProductRequest (no panel shown) ---
  useEffect(() => {
    if (!access) return;
    const controller = new AbortController();
    fetch(`${API_BASE}/api/products/requests/mine/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
        'Accept': 'application/json'
      },
      signal: controller.signal
    })
      .then(async (res) => {
        let data = {};
        try { data = await res.json(); } catch { }
        if (res.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/product/request', { replace: true });
          return;
        }
        if (res.status === 404) {
          // no request yet; keep amount at 0 and clear id
          setCurrentRequestId(null);
          setHasActiveRequest(false);
          return;
        }
        if (!res.ok) return;
        setHasActiveRequest(true);
        // Rehydrate the input fields with the last submitted values
        if (typeof data?.title === 'string') setProductTitle(data.title);
        if (typeof data?.description === 'string') setProductDescription(data.description);
        const priceInr = Number.parseFloat(data.price);
        if (Number.isFinite(priceInr) && priceInr > 0) {
          // round to whole INR for display and payment
          setPayAmountInr(Math.round(priceInr));
        }
        if (data?.id) setCurrentRequestId(data.id);
      })
      .catch(() => { /* ignore */ })
      .finally(() => { });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);
  // --- end price fetch ---

  // --- Razorpay payment integration ---
  const [payAmountInr, setPayAmountInr] = useState(0); // fixed amount from ProductRequest.price (INR)
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState('');
  const [payInfo, setPayInfo] = useState('');

  const INR_TO_PAISE = 100;

  const ensureRazorpayLoaded = () =>
    new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });

  // removed manual request linking and on-mount fetch by id

  const handlePayNow = async () => {
    setPayError('');
    setPayInfo('');
    if (!access) {
      setPayError('You must be logged in.');
      navigate('/product/request', { replace: true });
      return;
    }
    if (!currentRequestId) {
      setPayError('No Product Request selected.');
      return;
    }
    if (!payAmountInr || Number.isNaN(payAmountInr) || payAmountInr <= 0) {
      setPayError('Invalid amount.');
      return;
    }

    setPayLoading(true);
    try {
      await ensureRazorpayLoaded();

      // 1) Create order on backend (amount in paise)
      const createRes = await fetch(`${API_BASE}/api/payments/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          product_request_id: currentRequestId
        })
      });
      const orderData = await createRes.json().catch(() => ({}));
      if (!createRes.ok) throw new Error(orderData.detail || orderData.error || 'Failed to create order');
      // Sync displayed amount with backend authoritative amount
      if (typeof orderData.amount === 'number') {
        setPayAmountInr(orderData.amount / 100);
      }

      const keyId = orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error('Razorpay key not configured. Set VITE_RAZORPAY_KEY_ID or have backend return key_id.');
      }

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Payment',
        description: 'Order Payment',
        order_id: orderData.order_id,
        prefill: {
          name: orderData.prefill?.name || name || '',
          email: orderData.prefill?.email || '',
          contact: orderData.prefill?.contact || ''
        },
        theme: { color: '#3dda25' },
        handler: async function (response) {
          // 2) Verify signature on backend
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payments/verify/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok) throw new Error(verifyData.detail || verifyData.error || 'Verification failed');
            setPayInfo(verifyData.detail || 'Payment successful and verified.');
          } catch (err) {
            setPayError(err.message);
          }
        },
        modal: {
          ondismiss: () => setPayError('Payment cancelled.')
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPayError(err.message);
    } finally {
      setPayLoading(false);
    }
  };
  // --- end Razorpay payment integration ---

  return (
    <div style={{ padding: 24 }}>
      <h2>Welcome{name ? `, ${name}` : ''}</h2>
      <p>You are logged in.</p>

      {/* (Removed) Latest Product Request panel */}
        <div style={{ marginTop: 24, maxWidth: 600, marginBottom: 24 }}>
          <h3 style={{ marginBottom: 24 }}>Submit Product Request</h3>
          <style>
            {`
          .pr-field::placeholder {
            color: #9aa0b1;
            opacity: 1;
          }
          .pr-field[disabled] {
            background: #1f1f23 !important;
            color: #f5f7fa !important;
            border-color: #3a3f4b !important;
            box-shadow: 0 0 0 1px #2a2f37 inset;
          }
          .pr-field[disabled]:focus {
            outline: 2px solid #555a64;
            outline-offset: 2px;
          }
          @media (prefers-color-scheme: dark) {
            .pr-field {
              background: #24262b;
              color: #f5f7fa;
              border: 1px solid #444a55;
            }
            .pr-field:not([disabled]):focus {
              border-color: #6d6fff;
              box-shadow: 0 0 0 2px rgba(109,111,255,0.35);
            }
          }
            `}
          </style>
          <form onSubmit={handleSubmitProduct}>
            <input
          type="text"
          placeholder="Product Title"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
          className="pr-field"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 500,
            padding: '12px 14px',
            marginBottom: '12px',
            borderRadius: 10,
            border: '1px solid #ccc',
            fontSize: 16,
            lineHeight: 1.4,
            transition: 'background .25s, color .25s, border-color .25s'
          }}
          disabled={hasActiveRequest || prLoading}
          required
            />
            <textarea
          placeholder="Describe the product you need"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          rows={6}
          className="pr-field"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 500,
            padding: '12px 14px',
            marginBottom: '12px',
            borderRadius: 10,
            border: '1px solid #ccc',
            fontSize: 16,
            lineHeight: 1.5,
            resize: 'vertical',
            transition: 'background .25s, color .25s, border-color .25s'
          }}
          disabled={hasActiveRequest || prLoading}
          required
            />
            {/* active-request message intentionally removed; fields remain disabled when active */}
            {prError && <div style={{ color: 'red', marginBottom: 10 }}>{prError}</div>}
            {prInfo && <div style={{ color: 'green', marginBottom: 10 }}>{prInfo}</div>}
          <button
            type="submit"
            disabled={prLoading || hasActiveRequest}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)',
              color: '#fff',
              border: 'none',
              borderRadius: 30,
              cursor: 'pointer',
              fontWeight: 600,
              marginTop: 12
            }}
          >
            {prLoading ? 'Submitting...' : 'Submit Product Request'}
          </button>
        </form>
      </div>
      <p>Keep checking your mails for further communication and updates!</p>
      {/* Payment section (only if positive amount) */}
      {payAmountInr > 0 && (
        <div style={{ marginTop: 32, maxWidth: 600 }}>
          <h3>Make a Payment</h3>
          {payError && <div style={{ color: 'red', marginBottom: 10 }}>{payError}</div>}
          {payInfo && <div style={{ color: 'green', marginBottom: 10 }}>{payInfo}</div>}
          <button
            onClick={handlePayNow}
            disabled={payLoading || !payAmountInr}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)',
              color: '#fff',
              border: 'none',
              borderRadius: 30,
              cursor: 'pointer',
              fontWeight: 600,
              marginTop: 12
            }}
          >
            {payLoading ? 'Processing...' : `Pay ₹${Number(payAmountInr).toFixed(2)} INR`}
          </button>
        </div>
      )}

      <button
        style={{
          padding: '8px 16px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          marginTop: 16,
        }}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
