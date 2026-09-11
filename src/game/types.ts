export type Quadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type Sign = 'positive' | 'negative';
export type Skill = 'cos' | 'sin' | 'tan' | 'all';
export type AxisDirectionX = 'left' | 'right';
export type AxisDirectionY = 'above' | 'below';

export interface LocalizedText {
  th: string;
  en?: string;
}

export interface AngleTruth {
  normalized: number;
  quadrant: Quadrant;
  sin: Sign;
  cos: Sign;
  tan: Sign;
  xDirection: AxisDirectionX;
  yDirection: AxisDirectionY;
  rangeTh: string;
  rangeEn: string;
}

export interface Land {
  id: string;
  quadrant: Quadrant;
  angle: number;
  name: LocalizedText;
  description: LocalizedText;
  motif: string;
}

export interface Reflection {
  id: string;
  quadrant: Quadrant;
  prompt: LocalizedText;
  choices: Array<{ id: string; text: LocalizedText }>;
  correctChoiceId: string;
  explanation: LocalizedText;
}

export interface FinalQuestion {
  id: string;
  angle: number;
  prompt: LocalizedText;
}
