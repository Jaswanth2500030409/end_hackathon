import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { day: 'Mon', value: 100000 }, { day: 'Tue', value: 101500 },
  { day: 'Wed', value: 100800 }, { day: 'Thu', value: 104000 },
  { day: 'Fri', value: 106200 }, { day: 'Sat', value: 109500 },
  { day: 'Sun', value: 112000 }
];

export default function PerformanceChart() {
  return <section className="section-block module-section">
    <div className="module-banner performance-banner"><div><span className="eyebrow">YOUR PROGRESS</span><h2>Portfolio Performance</h2><p>Understand how a portfolio can change over time.</p></div></div>
    <div className="chart-card"><div className="section-heading"><h3>Sample weekly portfolio value</h3><span className="positive-change">+12% demo</span></div>
      <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#26374a"/><XAxis dataKey="day" stroke="#91a2b7"/><YAxis stroke="#91a2b7" tickFormatter={v => `₹${v/1000}k`}/><Tooltip formatter={v => `₹${Number(v).toLocaleString('en-IN')}`}/><Line type="monotone" dataKey="value" stroke="#16c784" strokeWidth={3} dot={{ r: 4 }}/></LineChart></ResponsiveContainer></div>
      <p className="muted-note">Illustrative chart only; it is not calculated from your actual trades.</p>
    </div>
  </section>;
}