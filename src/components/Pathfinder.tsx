import type { Sign } from '../game/types';
import type { Obstacle } from '../game/reducer';

export function Pathfinder({ obstacle, sign, active }: { obstacle: Obstacle; sign: Sign | null; active: boolean }) {
  const motion = !active || !sign ? 'idle' : obstacle === 'cos' ? (sign === 'positive' ? 'move-right' : 'move-left') : obstacle === 'sin' ? (sign === 'positive' ? 'move-up' : 'move-down') : 'use-power';
  return (
    <svg className={`pathfinder ${motion}`} data-motion={motion} viewBox="0 0 100 150" role="img" aria-label="Pathfinder">
      <circle cx="51" cy="30" r="17" fill="#d89a70" />
      <path d="M33 26 Q50 4 70 24 L65 34 Q48 22 33 36Z" fill="#243249" />
      <path d="M31 22 Q51 9 72 22 L67 14 Q49 2 30 17Z" fill="#2f7774" />
      <path d="M34 49 Q51 42 68 51 L76 108 Q51 122 24 106Z" fill="#f1dfbc" />
      <path d="M33 50 Q18 63 22 99 L42 88 L48 48Z" fill="#2f7774" />
      <rect x="33" y="105" width="13" height="34" rx="6" fill="#9b5638" />
      <rect x="56" y="105" width="13" height="34" rx="6" fill="#9b5638" />
      <circle cx="51" cy="67" r="8" fill="#b8862e" stroke="#694816" strokeWidth="2" />
      <path d="M51 61 L54 68 L48 72Z" fill="#fff2c9" />
    </svg>
  );
}
