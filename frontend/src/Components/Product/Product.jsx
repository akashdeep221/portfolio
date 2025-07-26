import React, { useState } from 'react';

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
  padding: '10px',
  width: '90%',
  maxWidth: '350px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const tabStyle = isActive => ({
  ...buttonStyle,
  background: isActive ? 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)' : '#eee',
  color: isActive ? 'white' : '#333',
  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
  marginTop: 0,
  marginBottom: 20
});

const Product = () => {
  const [tab, setTab] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');

  const handleLoginChange = e => setLogin({ ...login, [e.target.name]: e.target.value });
  const handleSignupChange = e => setSignup({ ...signup, [e.target.name]: e.target.value });

  const handleLogin = e => {
    e.preventDefault();
    if (!login.email || !login.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    alert('Login submitted! (No backend logic)');
  };

  const handleSignup = e => {
    e.preventDefault();
    if (!signup.name || !signup.email || !signup.mobile || !signup.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    alert('Sign Up submitted! (No backend logic)');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <h1>Product/Solution Request</h1>
      <div>
        <button style={tabStyle(tab === 'login')} onClick={() => { setTab('login'); setError(''); }}>Login</button>
        <button style={tabStyle(tab === 'signup')} onClick={() => { setTab('signup'); setError(''); }}>Sign Up</button>
      </div>
      {tab === 'login' ? (
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
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      ) : (
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
          <button type="submit" style={buttonStyle}>Sign Up</button>
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
