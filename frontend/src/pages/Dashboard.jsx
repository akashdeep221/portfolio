import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [name, setName] = useState('');

  // Base API URL (Vite env or current origin)
  const API_BASE = (import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/,'');

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
        try { data = await res.json(); } catch {}
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
      })
      .catch(() => {/* ignore abort/network for now */});

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

    setPrLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products/request/`, {
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
      setProductTitle('');
      setProductDescription('');
    } catch (err) {
      setPrError(err.message);
    } finally {
      setPrLoading(false);
    }
  };
  // --- end product request ---

  return (
    <div style={{ padding: 24 }}>
  <h2>Welcome{ name ? `, ${name}` : '' }</h2>
  <p>You are logged in.</p>

      {/* Submit Product Request */}
      <div style={{ marginTop: 24, maxWidth: 600 }}>
        <h3>Submit Product Request</h3>
        <form onSubmit={handleSubmitProduct}>
          <input
            type="text"
            placeholder="Product Title"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: 500,
              padding: '10px',
              marginBottom: '12px',
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16
            }}
            required
          />
          <textarea
            placeholder="Describe the product you need"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={6}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: 500,
              padding: '10px',
              marginBottom: '12px',
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16,
              resize: 'vertical'
            }}
            required
          />
          {prError && <div style={{ color: 'red', marginBottom: 10 }}>{prError}</div>}
          {prInfo && <div style={{ color: 'green', marginBottom: 10 }}>{prInfo}</div>}
          <button
            type="submit"
            disabled={prLoading}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)',
              color: '#fff',
              border: 'none',
              borderRadius: 30,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {prLoading ? 'Submitting...' : 'Submit Product Request'}
          </button>
        </form>
      </div>
      
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
