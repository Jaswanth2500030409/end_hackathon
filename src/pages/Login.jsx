import { useState } from 'react';

export default function Login({ setUser, setShowSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email.trim().toLowerCase() === 'admin@tradesmart.com' && password === 'admin123') {
      const admin = { name: 'Admin', email: 'admin@tradesmart.com', role: 'admin' };
      localStorage.setItem('loggedInUser', JSON.stringify(admin));
      setUser(admin);
      return;
    }
    let users = [];
    try { users = JSON.parse(localStorage.getItem('users') || '[]'); } catch { users = []; }
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (found) {
      localStorage.setItem('loggedInUser', JSON.stringify(found));
      setUser(found);
    } else setError('Invalid email or password. Please try again.');
  };

  return (
    <div className="auth-container login-bg">
      <div className="auth-overlay" />
      <form className="auth-box" onSubmit={handleLogin}>
        <div className="brand-icon">📈</div>
        <h1>Trade<span>Smart</span></h1>
        <p className="subtitle">Smart Trading. Risk-Free Learning.</p>
        <h2>Welcome Back</h2>
        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="primary-btn">Login</button>
        <p className="switch-text">Don't have an account? <button type="button" className="text-btn" onClick={() => setShowSignup(true)}>Sign Up</button></p>
        <p className="admin-hint">Demo admin: admin@tradesmart.com / admin123</p>
      </form>
    </div>
  );
}