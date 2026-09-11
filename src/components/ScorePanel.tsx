export function ScorePanel({ score }: { score: number }) {
  return <div className="score-panel" aria-label={`คะแนน ${score}`}><span>คะแนน</span><strong>{score.toLocaleString('th-TH')}</strong></div>;
}
