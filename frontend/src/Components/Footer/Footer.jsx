import React, { useState } from 'react';
import './Footer.css';
import user_icon from '../../assets/user_icon.svg';

const Footer = () => {
    const API_BASE = (import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/, '');
    const [email, setEmail] = useState('');
    const [subLoading, setSubLoading] = useState(false);
    const [subError, setSubError] = useState('');
    const [subInfo, setSubInfo] = useState('');

    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubError('');
        setSubInfo('');
        const clean = email.trim();
        if (!validateEmail(clean)) {
            setSubError('Enter a valid email.');
            return;
        }
        setSubLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/subscriptions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: clean })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data.detail || data.error || 'Subscription failed');
            }
            setSubInfo(data.message || 'You are subscribed. Stay tuned for updates.');
        } catch (err) {
            setSubError(err.message);
        } finally {
            setSubLoading(false);
        }
    };
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-top-left">
                    <h1>Akashdeep</h1>
                    <p>I am a fullstack developer from India with 7 years of experience in companies like Mphasis, 3SC, Landmark Group, Apisero, Wipro.</p>
                </div>
                <div className="footer-top-right">
                    <form onSubmit={handleSubscribe} className="footer-subscribe-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                        <div className="footer-email-input">
                            <img src={user_icon} alt="" />
                            <input
                                type="email"
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={subLoading}
                                required
                                aria-label="Email address"
                            />
                        </div>
                        <button
                            type="submit"
                            className="footer-subscribe"
                            disabled={subLoading}
                            aria-label="Subscribe"
                        >
                            {subLoading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                    {subError && <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 6 }}>{subError}</div>}
                    {subInfo && <div style={{ color: '#33c27f', fontSize: 12, marginTop: 6 }}>{subInfo}</div>}
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <p className="footer-bottom-left">© 2025 Akashdeep Vasistha. All rights reserved.</p>
                <div className="footer-bottom-right">
                    <p>Term of Services</p>
                    <p>Privacy Policy</p>
                    <p>Connect with me</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;