import type { AngleTruth, Quadrant, Sign } from './types';

const ranges: Record<Quadrant, Pick<AngleTruth, 'rangeTh' | 'rangeEn'>> = {
  Q1: { rangeTh: '0° < θ < 90°', rangeEn: 'between 0° and 90°' },
  Q2: { rangeTh: '90° < θ < 180°', rangeEn: 'between 90° and 180°' },
  Q3: { rangeTh: '180° < θ < 270°', rangeEn: 'between 180° and 270°' },
  Q4: { rangeTh: '270° < θ < 360°', rangeEn: 'between 270° and 360°' },
};

export function deriveAngle(angle: number): AngleTruth {
  if (!Number.isFinite(angle)) throw new Error('Angle must be finite');
  const normalized = ((angle % 360) + 360) % 360;
  if (normalized % 90 === 0) throw new Error('Axis-aligned angles are not supported');

  const quadrant: Quadrant = normalized < 90 ? 'Q1' : normalized < 180 ? 'Q2' : normalized < 270 ? 'Q3' : 'Q4';
  const xDirection = quadrant === 'Q1' || quadrant === 'Q4' ? 'right' : 'left';
  const yDirection = quadrant === 'Q1' || quadrant === 'Q2' ? 'above' : 'below';
  const cos: Sign = xDirection === 'right' ? 'positive' : 'negative';
  const sin: Sign = yDirection === 'above' ? 'positive' : 'negative';
  const tan: Sign = sin === cos ? 'positive' : 'negative';

  return { normalized, quadrant, sin, cos, tan, xDirection, yDirection, ...ranges[quadrant] };
}

export function signSymbol(sign: Sign): '+' | '−' {
  return sign === 'positive' ? '+' : '−';
}

export function positionalExplanation(angle: number): { th: string; en: string } {
  const truth = deriveAngle(angle);
  const xTh = truth.xDirection === 'right' ? 'อยู่ขวาแกน y ทำให้ x และ Cos เป็นบวก' : 'อยู่ซ้ายแกน y ทำให้ x และ Cos เป็นลบ';
  const yTh = truth.yDirection === 'above' ? 'อยู่เหนือแกน x ทำให้ y และ Sin เป็นบวก' : 'อยู่ใต้แกน x ทำให้ y และ Sin เป็นลบ';
  const tanTh = truth.sin === truth.cos ? 'Sin และ Cos มีเครื่องหมายเหมือนกัน จึงทำให้ Tan เป็นบวก' : 'Sin และ Cos มีเครื่องหมายต่างกัน จึงทำให้ Tan เป็นลบ';
  const xEn = truth.xDirection === 'right' ? 'right of the y-axis, so x and Cos are positive' : 'left of the y-axis, so x and Cos are negative';
  const yEn = truth.yDirection === 'above' ? 'above the x-axis, so y and Sin are positive' : 'below the x-axis, so y and Sin are negative';
  const tanEn = truth.sin === truth.cos ? 'Sin and Cos have the same sign, so Tan is positive' : 'Sin and Cos have different signs, so Tan is negative';
  return {
    th: `${angle}° อยู่ใน ${truth.quadrant} (${truth.rangeTh}) จุด${xTh} และ${yTh} ดังนั้น ${tanTh}`,
    en: `${angle}° is in ${truth.quadrant} (${truth.rangeEn}). The point is ${xEn} and ${yEn}. Therefore ${tanEn}.`,
  };
}
