import type { Quadrant } from '../game/types';

const quadrants: Quadrant[] = ['Q1', 'Q2', 'Q3', 'Q4'];
export function FragmentProgress({ fragments }: { fragments: Quadrant[] }) {
  return (
    <div className="fragment-progress">
      <span>ชิ้นส่วน {fragments.length} จาก 4</span>
      <div className="fragment-row">
        {quadrants.map((q) => <span key={q} className={fragments.includes(q) ? 'collected' : ''} aria-label={`${q} ${fragments.includes(q) ? 'เก็บแล้ว' : 'ยังไม่เก็บ'}`}>{q}</span>)}
      </div>
    </div>
  );
}
