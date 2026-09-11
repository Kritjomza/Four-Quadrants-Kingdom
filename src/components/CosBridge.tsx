export function CosBridge() {
  return <div className="css-bridge" role="img" aria-label="สะพาน Cos"><div className="bridge-rope"/><div className="bridge-deck">{Array.from({length: 12}, (_,i) => <span key={i}/>)}</div><i className="bridge-post post-left"/><i className="bridge-post post-right"/><span className="axis-caption">− x ← → x +</span></div>;
}
