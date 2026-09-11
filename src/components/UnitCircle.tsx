import type { AngleTruth } from '../game/types';

export function UnitCircle({ angle, truth, compact = false }: { angle: number; truth: AngleTruth; compact?: boolean }) {
  const radians = (angle * Math.PI) / 180;
  const x = 100 + Math.cos(radians) * 72;
  const y = 100 - Math.sin(radians) * 72;
  const xTh = truth.xDirection === 'left' ? 'ซ้ายแกน y' : 'ขวาแกน y';
  const yTh = truth.yDirection === 'above' ? 'เหนือแกน x' : 'ใต้แกน x';
  return (
    <figure className={`unit-circle ${compact ? 'compact' : ''}`}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${angle}° อยู่ใน ${truth.quadrant} จุดอยู่${xTh}และ${yTh}`}>
        <circle cx="100" cy="100" r="72" className="circle-line" />
        <line x1="20" y1="100" x2="180" y2="100" className="axis-line" />
        <line x1="100" y1="20" x2="100" y2="180" className="axis-line" />
        <text x="181" y="96">+x</text><text x="104" y="22">+y</text>
        <line x1="100" y1="100" x2={x} y2={y} className="angle-ray" />
        <circle cx={x} cy={y} r="6" className="angle-point" />
        <text x={x + (truth.xDirection === 'left' ? -31 : 9)} y={y - 9} className="point-label">{angle}°</text>
      </svg>
      <figcaption><strong>{truth.quadrant}</strong> · {truth.rangeTh}</figcaption>
    </figure>
  );
}
