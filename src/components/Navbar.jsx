import { TrendingUp } from 'lucide-react';

export default function Navbar({ user, logout }) {
  return <nav className="navbar">
    <div className="nav-brand"><TrendingUp size={27} /><h2>Trade<span>Smart</span></h2></div>
    <div className="nav-right"><span className="nav-user">{user.name}</span><button className="logout-btn" onClick={logout}>Logout</button></div>
  </nav>;
}