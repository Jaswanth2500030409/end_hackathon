const news = [
  { title: 'Why long-term investing focuses on business fundamentals', source: 'TradeSmart Learning', desc: 'A beginner-friendly overview of company performance, value and patience.', image: 'photo-1504711434969-e33886168f5c' },
  { title: 'Understanding market volatility', source: 'TradeSmart Learning', desc: 'Learn why prices move and how investors can think about risk.', image: 'photo-1460925895917-afdab827c52f' },
  { title: 'Diversification and your portfolio', source: 'TradeSmart Learning', desc: 'Explore how spreading investments can help manage concentration risk.', image: 'photo-1559526324-4b87b5e36e44' }
];

export default function MarketNews() {
  return <section className="section-block module-section">
    <div className="module-banner news-banner"><div><span className="eyebrow">LATEST INSIGHTS</span><h2>Market News & Insights</h2><p>Read educational market explainers and investing ideas.</p></div></div>
    <div className="news-grid">{news.map(item => <article className="news-card" key={item.title}>
      <img className="news-image" src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=900&q=80`} alt="" />
      <div className="news-content"><span className="lesson-meta">{item.source}</span><h3>{item.title}</h3><p>{item.desc}</p></div>
    </article>)}</div>
    <p className="muted-note">Educational sample content, not breaking or real-time financial news.</p>
  </section>;
}