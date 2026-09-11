import type { GameState } from '../game/reducer';

export function ResultsSummary({ state, onReset }: { state: GameState; onReset: () => void }) {
  const attempts = state.responses.length;
  const correct = state.responses.filter((item) => item.correct).length;
  const retries = attempts - correct;
  return <section className="screen results-screen"><div><h1>ผลลัพธ์และสรุปบทเรียน</h1><p className="screen-en">Results and Debrief</p></div><div className="results-score"><span>คะแนนการเดินทาง</span><strong>{state.score.toLocaleString('th-TH')}</strong><small>Motivational score</small></div><div className="debrief-grid"><div><b>4/4</b><span>ชิ้นส่วนที่รวบรวม</span><small>Fragments collected</small></div><div><b>{correct}</b><span>คำตอบที่แก้สำเร็จ</span><small>Completed answers</small></div><div><b>{retries}</b><span>ครั้งที่เรียนรู้จากการลองใหม่</span><small>Recoverable retries</small></div></div><section className="math-recap"><h2>เข็มทิศคณิตศาสตร์</h2><p><b>Cos = x</b> — ขวาเป็นบวก ซ้ายเป็นลบ</p><p><b>Sin = y</b> — เหนือเป็นบวก ใต้เป็นลบ</p><p><b>Tan = Sin ÷ Cos</b> — เหมือนกันเป็นบวก ต่างกันเป็นลบ</p></section><p>คุณฟื้นฟูวงกลมหนึ่งหน่วยครบแล้ว ความผิดพลาดทุกครั้งคือหลักฐานของการปรับเหตุผล</p><p className="screen-en">You restored the Unit Circle. Every retry is evidence of revised reasoning.</p><button className="primary-button" onClick={onReset}>เริ่มใหม่ <span>New session</span></button></section>;
}
