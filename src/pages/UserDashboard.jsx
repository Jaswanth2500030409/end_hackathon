import { useEffect, useState } from 'react';
import { LayoutDashboard, TrendingUp, Briefcase, Receipt, BarChart3, GraduationCap, Trophy, Newspaper } from 'lucide-react';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import PerformanceChart from '../components/PerformanceChart';
import MarketData from '../components/MarketData';
import Learning from '../components/Learning';
import Competition from '../components/Competition';
import MarketNews from '../components/MarketNews';

const stocks = [
  { name: 'Reliance', symbol: 'RELIANCE', price: 1450, change: '+2.4%' },
  { name: 'TCS', symbol: 'TCS', price: 3820, change: '+1.8%' },
  { name: 'Infosys', symbol: 'INFY', price: 1760, change: '-0.7%' },
  { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1685, change: '+1.2%' },
  { name: 'ICICI Bank', symbol: 'ICICIBANK', price: 1280, change: '+2.1%' },
  { name: 'Wipro', symbol: 'WIPRO', price: 560, change: '-0.5%' }
];

const modules = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'Your trading command centre' },
  { id: 'market', label: 'Market Watch', icon: TrendingUp, description: 'Explore stocks and market data' },
  { id: 'portfolio', label: 'My Portfolio', icon: Briefcase, description: 'Track your owned shares' },
  { id: 'transactions', label: 'Transactions', icon: Receipt, description: 'Review your trading activity' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Understand your performance' },
  { id: 'learning', label: 'Learning Hub', icon: GraduationCap, description: 'Build your investing knowledge' },
  { id: 'competition', label: 'Competition', icon: Trophy, description: 'Challenge other traders' },
  { id: 'news', label: 'Market News', icon: Newspaper, description: 'Stay updated with market stories' }
];

export default function UserDashboard({ user, logout }) {
  const storageKey = `tradeData_${user.email}`;
  const [saved] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  });
  const [balance, setBalance] = useState(saved.balance ?? 100000);
  const [holdings, setHoldings] = useState(saved.holdings ?? []);
  const [transactions, setTransactions] = useState(saved.transactions ?? []);
  const [activeModule, setActiveModule] = useState('overview');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ balance, holdings, transactions }));
  }, [storageKey, balance, holdings, transactions]);

  const buyStock = stock => {
    if (balance < stock.price) return alert('Insufficient wallet balance!');
    const id = Date.now();
    setBalance(v => v - stock.price);
    setHoldings(v => [...v, { ...stock, id }]);
    setTransactions(v => [{ id, type: 'BUY', stock: stock.name, price: stock.price, date: new Date().toLocaleString() }, ...v]);
  };

  const sellStock = id => {
    const stock = holdings.find(s => s.id === id);
    if (!stock) return;
    setBalance(v => v + stock.price);
    setHoldings(v => v.filter(s => s.id !== id));
    setTransactions(v => [{ id: Date.now(), type: 'SELL', stock: stock.name, price: stock.price, date: new Date().toLocaleString() }, ...v]);
  };

  const current = modules.find(m => m.id === activeModule);
  const SectionTitle = () => <div className={`module-hero hero-${activeModule}`}>
    <div className="module-hero-shade" />
    <div className="module-hero-content">
      <span className="module-kicker">TRADESMART • PERSONAL TERMINAL</span>
      <h1>{current.label}</h1>
      <p>{current.description} — welcome back, {user.name}.</p>
    </div>
    <div className="hero-mark"><current.icon size={42} strokeWidth={1.4}/></div>
  </div>;

  return <div className="app-shell">
    <Navbar user={user} logout={logout}/>
    <div className="workspace">
      <aside className="module-sidebar">
        <div className="sidebar-caption">WORKSPACE</div>
        {modules.map(item => {
          const Icon = item.icon;
          return <button key={item.id} className={`module-link ${activeModule === item.id ? 'active' : ''}`} onClick={() => setActiveModule(item.id)}>
            <Icon size={18}/><span>{item.label}</span>{activeModule === item.id && <i/>}
          </button>;
        })}
        <div className="sidebar-tip"><span className="live-dot"/> MARKET SIMULATOR LIVE <small>Practice with virtual money</small></div>
      </aside>

      <main className="dashboard-content module-content">
        <SectionTitle/>
        {activeModule === 'overview' && <>
          <section className="stats-grid">
            <div className="stat-card"><span>Virtual Wallet</span><h2>₹{balance.toLocaleString('en-IN')}</h2><small>Available balance</small></div>
            <div className="stat-card"><span>Portfolio Stocks</span><h2>{holdings.length}</h2><small>Total shares owned</small></div>
            <div className="stat-card"><span>Total Transactions</span><h2>{transactions.length}</h2><small>Buy and sell activity</small></div>
          </section>
          <section className="module-panel overview-panel"><div className="panel-heading"><div><span className="panel-kicker">QUICK ACCESS</span><h2>Explore your trading desk</h2></div></div>
            <div className="quick-grid">{modules.filter(m => m.id !== 'overview').map(item => { const Icon = item.icon; return <button key={item.id} className={`quick-card quick-${item.id}`} onClick={() => setActiveModule(item.id)}><Icon size={23}/><b>{item.label}</b><span>{item.description}</span></button>; })}</div>
          </section>
          <section className="module-panel overview-panel"><h2>Market snapshot</h2><div className="stock-grid">{stocks.slice(0,3).map(s => <StockCard key={s.symbol} stock={s} buyStock={buyStock}/>)}</div></section>
        </>}

        {activeModule === 'market' && <section className="module-panel themed-panel market-panel">
          <div className="section-heading"><div><span className="panel-kicker">LIVE PRACTICE ENVIRONMENT</span><h2>Explore Indian equities</h2></div><span>Virtual trading only</span></div>
          <div className="stock-grid">{stocks.map(s => <StockCard key={s.symbol} stock={s} buyStock={buyStock}/>)}</div>
          <MarketData/>
        </section>}

        {activeModule === 'portfolio' && <section className="module-panel themed-panel portfolio-panel">
          <div className="section-heading"><div><span className="panel-kicker">YOUR INVESTMENTS</span><h2>Portfolio holdings</h2></div><span>{holdings.length} positions</span></div>
          {!holdings.length ? <p className="empty-message">No stocks purchased yet. Visit Market Watch to start trading.</p> : <div className="table-wrapper"><table><thead><tr><th>Stock</th><th>Symbol</th><th>Purchase Price</th><th>Action</th></tr></thead><tbody>{holdings.map(s => <tr key={s.id}><td>{s.name}</td><td>{s.symbol}</td><td>₹{s.price.toLocaleString('en-IN')}</td><td><button className="sell-btn" onClick={() => sellStock(s.id)}>Sell</button></td></tr>)}</tbody></table></div>}
        </section>}

        {activeModule === 'transactions' && <section className="module-panel themed-panel transactions-panel">
          <div className="section-heading"><div><span className="panel-kicker">ACTIVITY LOG</span><h2>Transaction history</h2></div><span>{transactions.length} records</span></div>
          {!transactions.length ? <p className="empty-message">No transactions available. Your buy and sell activity will appear here.</p> : <div className="table-wrapper"><table><thead><tr><th>Type</th><th>Stock</th><th>Price</th><th>Date</th></tr></thead><tbody>{transactions.map(t => <tr key={t.id}><td className={t.type === 'BUY' ? 'buy-text' : 'sell-text'}>{t.type}</td><td>{t.stock}</td><td>₹{t.price.toLocaleString('en-IN')}</td><td>{t.date}</td></tr>)}</tbody></table></div>}
        </section>}

        {activeModule === 'analytics' && <section className="module-panel themed-panel analytics-panel"><PerformanceChart/></section>}
        {activeModule === 'learning' && <section className="module-panel themed-panel learning-panel"><Learning/></section>}
        {activeModule === 'competition' && <section className="module-panel themed-panel competition-panel"><Competition user={user}/></section>}
        {activeModule === 'news' && <section className="module-panel themed-panel news-panel"><MarketNews/></section>}
      </main>
    </div>
  </div>;
}
