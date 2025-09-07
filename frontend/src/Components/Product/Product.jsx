import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const buttonStyle = {
  display: 'inline-block',
  marginTop: '30px',
  padding: '12px 28px',
  background: 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)',
  color: 'white',
  borderRadius: '30px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  border: 'none',
  cursor: 'pointer',
  marginRight: '10px'
};

const inputStyle = {
  display: 'block',
  margin: '16px auto',
  padding: '10px 12px',
  width: '90%',
  maxWidth: '350px',
  borderRadius: '8px',
  background: '#23272f',
  border: '1px solid #3a3f47',
  color: '#f5f7fa',
  fontSize: '16px',
  lineHeight: 1.4,
  boxShadow: '0 1px 2px rgba(0,0,0,0.4) inset',
  transition: 'background .25s, border-color .25s'
};

const tabStyle = isActive => ({
  ...buttonStyle,
  background: isActive
    ? 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)'
    : '#2b2f36',
  color: isActive ? '#f5f7fa' : '#c3c9d1',
  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.6)' : '0 0 0 rgba(0,0,0,0)',
  marginTop: 0,
  marginBottom: 20,
  border: isActive ? '1px solid rgba(255,255,255,0.18)' : '1px solid #3a3f47',
  transition: 'background .25s, color .25s'
});

const Product = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({ name: '', email: '', mobile: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const API_BASE = (import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/, '');

  const handleLoginChange = e => setLogin({ ...login, [e.target.name]: e.target.value });
  const handleSignupChange = e => setSignup({ ...signup, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    if (!login.email || !login.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setInfo('');
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: login.email, password: login.password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.code === 'email_not_verified' || data.requires_verification) {
          throw new Error(data.message || 'Please verify your email before logging in.');
        }
        throw new Error(data.detail || data.error || 'Login failed');
      }
      if (data.access) localStorage.setItem('accessToken', data.access);
      if (data.refresh) localStorage.setItem('refreshToken', data.refresh);
      navigate('/dashboard');
      setLogin({ email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    if (!signup.name || !signup.email || !signup.mobile || !signup.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setInfo('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signup)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Signup failed');
      }
      setInfo(data.message || 'Sign up successful. Please verify your email.');
      setSignup({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async e => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setInfo('');
    setForgotLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/password-reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Failed to send reset link');
      }
      setInfo(data.message || 'If that email exists, a reset link has been sent.');
      setForgotEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const switchTab = next => {
    setTab(next);
    setError('');
    setInfo('');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <h1>Product/Solution Request</h1>
      <div>
        <button style={tabStyle(tab === 'login')} onClick={() => switchTab('login')}>Login</button>
        <button style={tabStyle(tab === 'signup')} onClick={() => switchTab('signup')}>Sign Up</button>
        <button style={tabStyle(tab === 'forgot')} onClick={() => switchTab('forgot')}>Forgot Password</button>
      </div>

      {tab === 'login' && (
        <form onSubmit={handleLogin} style={{ marginTop: 20 }}>
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email Address"
            value={login.email}
            onChange={handleLoginChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleLoginChange}
            required
          />
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          {info && <div style={{ color: 'green', marginBottom: 10 }}>{info}</div>}
          <button type="submit" style={buttonStyle} disabled={loginLoading}>
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {tab === 'signup' && (
        <form onSubmit={handleSignup} style={{ marginTop: 20 }}>
          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Name"
            value={signup.name}
            onChange={handleSignupChange}
            required
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email Address"
            value={signup.email}
            onChange={handleSignupChange}
            required
          />
          <input
            style={inputStyle}
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={signup.mobile}
            onChange={handleSignupChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={signup.password}
            onChange={handleSignupChange}
            required
          />
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          {info && <div style={{ color: 'green', marginBottom: 10 }}>{info}</div>}
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      )}

      {tab === 'forgot' && (
        <form onSubmit={handleForgot} style={{ marginTop: 20 }}>
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email Address"
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
            required
          />
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          {info && <div style={{ color: 'green', marginBottom: 10 }}>{info}</div>}
          <button type="submit" style={buttonStyle} disabled={forgotLoading}>
            {forgotLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <button
        style={buttonStyle}
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default Product;
