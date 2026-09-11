import type { Sign } from '../game/types';
import type { Obstacle } from '../game/reducer';

export function Pathfinder({ obstacle, sign, active }: { obstacle: Obstacle; sign: Sign | null; active: boolean }) {
  const motion = !active || !sign ? 'idle' : obstacle === 'cos' ? (sign === 'positive' ? 'move-right' : 'move-left') : obstacle === 'sin' ? (sign === 'positive' ? 'move-up' : 'move-down') : 'use-power';
  return <img className={`pathfinder ${motion}`} data-motion={motion} src="/assets/style-test/pathfinder-reference.png" width="1024" height="1024" alt="Pathfinder" />;
}
