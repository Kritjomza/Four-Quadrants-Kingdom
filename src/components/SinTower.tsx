export function SinTower() {
  return <div className="css-tower" role="img" aria-label="หอคอย Sin"><div className="tower-frame">{Array.from({length: 5}, (_,i) => <span key={i}/>)}</div><div className="tower-rope"/><div className="tower-lift"/><span className="axis-caption">+ y ↑<br/><br/><br/>− y ↓</span></div>;
}
