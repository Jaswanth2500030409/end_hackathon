import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('loggedInUser')) || null; }
    catch { return null; }
  });
  const [showSignup, setShowSignup] = useState(false);

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setShowSignup(false);
  };

  if (!user) return showSignup
    ? <Signup setUser={setUser} setShowSignup={setShowSignup} />
    : <Login setUser={setUser} setShowSignup={setShowSignup} />;

  return user.role === 'admin'
    ? <AdminDashboard user={user} logout={logout} />
    : <UserDashboard user={user} logout={logout} />;
}