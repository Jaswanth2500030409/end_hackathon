import { useState } from 'react';
import { LayoutDashboard, Users, Package, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

const stocks = [
  { name: 'Reliance', symbol: 'RELIANCE', price: 1450 },
  { name: 'TCS', symbol: 'TCS', price: 3820 },
  { name: 'Infosys', symbol: 'INFY', price: 1760 },
  { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1685 },
  { name: 'ICICI Bank', symbol: 'ICICIBANK', price: 1280 },
  { name: 'Wipro', symbol: 'WIPRO', price: 560 }
];

const adminModules = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'stocks', label: 'Stock Catalogue', icon: Package }
];

export default function AdminDashboard({ user, logout }) {
  const [activeModule, setActiveModule] = useState('overview');
  let users = [];
  try { users = JSON.parse(localStorage.getItem('users') || '[]'); } catch { users = []; }
  const current = adminModules.find(m => m.id === activeModule);
  const Icon = current.icon;
  return <div className="app-shell">
    <Navbar user={user} logout={logout}/>
    <div className="workspace">
      <aside className="module-sidebar admin-sidebar">
        <div className="sidebar-caption">ADMIN CONSOLE</div>
        {adminModules.map(item => { const ItemIcon = item.icon; return <button key={item.id} className={`module-link ${activeModule === item.id ? 'active' : ''}`} onClick={() => setActiveModule(item.id)}><ItemIcon size={18}/><span>{item.label}</span></button>; })}
        <div className="sidebar-tip admin-tip"><ShieldCheck size={19}/><b>ADMIN ACCESS</b><small>Platform control centre</small></div>
      </aside>
      <main className="dashboard-content module-content">
        <div className={`module-hero admin-hero hero-${activeModule}`}><div className="module-hero-shade"/><div className="module-hero-content"><span className="module-kicker">TRADESMART • ADMINISTRATOR</span><h1>{current.label}</h1><p>Manage and monitor your trading platform.</p></div><div className="hero-mark"><Icon size={42} strokeWidth={1.4}/></div></div>
        {activeModule === 'overview' && <section className="stats-grid">
          <div className="stat-card"><span>Registered Users</span><h2>{users.length}</h2><small>Total platform accounts</small></div>
          <div className="stat-card"><span>Available Stocks</span><h2>{stocks.length}</h2><small>Stocks in simulator</small></div>
          <div className="stat-card"><span>Platform Status</span><h2 className="active-text">Active</h2><small>System operational</small></div>
        </section>}
        {activeModule === 'users' && <section className="module-panel themed-panel users-panel"><span className="panel-kicker">ACCOUNT DIRECTORY</span><h2>Registered users</h2>{!users.length ? <p className="empty-message">No users registered yet.</p> : <div className="table-wrapper"><table><thead><tr><th>Name</th><th>Email</th><th>Account Type</th></tr></thead><tbody>{users.map((u, i) => <tr key={i}><td>{u.name}</td><td>{u.email}</td><td><span className="user-role">USER</span></td></tr>)}</tbody></table></div>}</section>}
        {activeModule === 'stocks' && <section className="module-panel themed-panel stock-admin-panel"><span className="panel-kicker">SIMULATOR INVENTORY</span><h2>Available stock catalogue</h2><div className="stock-grid">{stocks.map(s => <div className="stock-card admin-stock" key={s.symbol}><div className="stock-symbol">{s.symbol}</div><h3>{s.name}</h3><p className="stock-price">₹{s.price.toLocaleString('en-IN')}</p><span className="admin-label">Available</span></div>)}</div></section>}
      </main>
    </div>
  </div>;
}
