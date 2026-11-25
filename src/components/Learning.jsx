const lessons = [
  { title: 'Stock Market Basics', level: 'Beginner', time: '5 min', image: 'photo-1611974789855-9c2a0a7236a3', text: 'Learn what stocks, exchanges and market indices mean.' },
  { title: 'How to Read Charts', level: 'Beginner', time: '7 min', image: 'photo-1460925895917-afdab827c52f', text: 'Understand price movement, trends and basic chart patterns.' },
  { title: 'Risk Management', level: 'Intermediate', time: '6 min', image: 'photo-1454165804606-c3d57bc86b40', text: 'Learn diversification and why risk limits matter.' },
  { title: 'Long-Term Investing', level: 'Beginner', time: '8 min', image: 'photo-1444653614773-995cb1ef9efa', text: 'Explore compounding and disciplined investing habits.' }
];

export default function Learning() {
  return <section className="section-block module-section">
    <div className="module-banner learning-banner"><div><span className="eyebrow">LEARN & IMPROVE</span><h2>Trading Learning Center</h2><p>Build your financial knowledge one lesson at a time.</p></div></div>
    <div className="learning-grid">{lessons.map((lesson, i) => <article className="learning-card" key={lesson.title}>
      <img src={`https://images.unsplash.com/${lesson.image}?auto=format&fit=crop&w=800&q=80`} alt="" />
      <div className="learning-content"><span className="lesson-meta">{lesson.level} · {lesson.time}</span><h3>{lesson.title}</h3><p>{lesson.text}</p><span className="lesson-number">LESSON 0{i+1}</span></div>
    </article>)}</div>
  </section>;
}