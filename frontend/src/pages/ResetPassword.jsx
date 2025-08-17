import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const inputStyle = {
  display: 'block',
  margin: '16px auto',
  padding: '10px',
  width: '90%',
  maxWidth: '350px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const buttonStyle = {
  display: 'inline-block',
  marginTop: '20px',
  padding: '12px 28px',
  background: 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)',
  color: 'white',
  borderRadius: '30px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  border: 'none',
  cursor: 'pointer'
};

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const API_BASE = (import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/, '');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!password || !confirm) {
      setError('Please fill in both fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/password-reset-confirm/${uidb64}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Backend serializer expects only `new_password`
        body: JSON.stringify({ new_password: password })
      });
      let data = null;
      try { data = await res.json(); } catch {}
      if (!res.ok) {
        let msg = (data && (data.detail || data.error)) || 'Failed to reset password';
        // Surface field errors if present (e.g., { new_password: ["..."] })
        if (data && typeof data === 'object') {
          const np = data.new_password;
          if (Array.isArray(np) && np.length) msg = np[0];
        }
        throw new Error(msg);
      }
      setInfo((data && (data.detail || data.message)) || 'Password has been reset. You can now log in.');
      setTimeout(() => navigate('/product/request'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit} style={{ marginTop: 20 }}>
        <input
          style={inputStyle}
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {info && <div style={{ color: 'green', marginBottom: 10 }}>{info}</div>}
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm New Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
