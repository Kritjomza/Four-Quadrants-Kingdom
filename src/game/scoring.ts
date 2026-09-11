export type ScoreKind = 'quadrant' | 'obstacle' | 'reflection' | 'final';

const awards: Record<ScoreKind, number> = {
  quadrant: 100,
  obstacle: 100,
  reflection: 50,
  final: 150,
};

export function scoreFor(kind: ScoreKind): number {
  return awards[kind];
}
