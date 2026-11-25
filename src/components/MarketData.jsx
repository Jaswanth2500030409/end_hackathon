const quotes = [
  { symbol: 'AAPL', name: 'Apple', price: '$228.20', change: '+1.24%', up: true },
  { symbol: 'MSFT', name: 'Microsoft', price: '$505.10', change: '+0.82%', up: true },
  { symbol: 'NVDA', name: 'NVIDIA', price: '$182.45', change: '+2.10%', up: true },
  { symbol: 'TSLA', name: 'Tesla', price: '$322.80', change: '-0.65%', up: false }
];

export default function MarketData() {
  return <section className="section-block module-section">
    <div className="module-banner market-banner"><div><span className="eyebrow">MARKET WATCH</span><h2>Explore Market Data</h2><p>Sample international stock quotes for learning.</p></div></div>
    <div className="market-grid">{quotes.map(q => <article className="market-image-card" key={q.symbol}><div className="market-card-image"><span>{q.symbol}</span></div><div className="market-card-content"><h3>{q.name}</h3><strong>{q.price}</strong><span className={q.up ? 'positive-change' : 'negative-change'}>{q.change}</span></div></article>)}</div>
    <p className="muted-note">These are static sample values, not live market prices.</p>
  </section>;
}