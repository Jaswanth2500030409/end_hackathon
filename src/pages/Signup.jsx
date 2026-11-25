import { useState } from 'react';

export default function Signup({ setUser, setShowSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    let users = [];
    try { users = JSON.parse(localStorage.getItem('users') || '[]'); } catch { users = []; }
    if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('This email is already registered.');
      return;
    }
    const newUser = { name: name.trim(), email: email.trim(), password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <div className="auth-container signup-bg">
      <div className="auth-overlay" />
      <form className="auth-box" onSubmit={handleSignup}>
        <div className="brand-icon">📊</div>
        <h1>Trade<span>Smart</span></h1>
        <p className="subtitle">Start Your Virtual Trading Journey</p>
        <h2>Create Account</h2>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password (minimum 6 characters)" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="primary-btn">Create Account</button>
        <p className="switch-text">Already registered? <button type="button" className="text-btn" onClick={() => setShowSignup(false)}>Login</button></p>
      </form>
    </div>
  );
}