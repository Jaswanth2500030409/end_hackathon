import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StockCard({ stock, buyStock }) {
  const up = stock.change.startsWith('+');
  return <article className="stock-card">
    <div className="stock-top"><div><h3>{stock.name}</h3><span className="stock-symbol">{stock.symbol}</span></div><span className="stock-icon">📊</span></div>
    <div className="stock-price">₹{stock.price.toLocaleString('en-IN')}</div>
    <span className={up ? 'positive-change' : 'negative-change'}>{up ? <ArrowUpRight size={15}/> : <ArrowDownRight size={15}/>} {stock.change} Today</span>
    <button className="buy-btn" onClick={() => buyStock(stock)}>Buy Stock</button>
  </article>;
}