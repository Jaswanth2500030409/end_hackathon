import { useEffect, useState } from 'react';

const initial = [
  { name: 'Rahul', score: 12400 }, { name: 'Priya', score: 9800 }, { name: 'Arjun', score: 7600 }
];

export default function Competition({ user }) {
  const [players, setPlayers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tradeSmartCompetition')) || initial; }
    catch { return initial; }
  });
  const joined = players.some(p => p.email === user.email);
  useEffect(() => { localStorage.setItem('tradeSmartCompetition', JSON.stringify(players)); }, [players]);
  const join = () => {
    if (!joined) setPlayers(prev => [...prev, { name: user.name, email: user.email, score: 0 }]);
  };
  const sorted = [...players].sort((a, b) => b.score - a.score);
  return <section className="section-block module-section">
    <div className="module-banner competition-banner"><div><span className="eyebrow">PLAY & PRACTICE</span><h2>Trading Competition</h2><p>Join a sample leaderboard and learn through friendly competition.</p></div></div>
    <div className="competition-card"><div className="competition-intro"><div><h3>Weekly Paper Trading Challenge</h3><p>Practice trading with virtual scores. No real money is involved.</p></div><button className="primary-btn join-btn" onClick={join} disabled={joined}>{joined ? 'Joined' : 'Join Competition'}</button></div>
      <div className="table-wrapper"><table><thead><tr><th>Rank</th><th>Trader</th><th>Demo Score</th></tr></thead><tbody>{sorted.map((p, i) => <tr key={p.email || p.name}><td>#{i+1}</td><td>{p.name}{p.email === user.email ? ' (You)' : ''}</td><td>{p.score.toLocaleString('en-IN')}</td></tr>)}</tbody></table></div>
      <p className="muted-note">Demo leaderboard: sample scores are not calculated from actual portfolio performance. Entries are stored in this browser only.</p>
    </div>
  </section>;
}