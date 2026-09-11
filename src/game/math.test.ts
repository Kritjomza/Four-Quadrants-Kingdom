import { describe, expect, it } from 'vitest';
import { deriveAngle } from './math';

describe('deriveAngle', () => {
  it.each([
    [30, 'Q1', 'positive', 'positive', 'positive', 'right', 'above'],
    [120, 'Q2', 'positive', 'negative', 'negative', 'left', 'above'],
    [210, 'Q3', 'negative', 'negative', 'positive', 'left', 'below'],
    [330, 'Q4', 'negative', 'positive', 'negative', 'right', 'below'],
  ] as const)('derives positional truth for %s°', (angle, quadrant, sin, cos, tan, xDirection, yDirection) => {
    expect(deriveAngle(angle)).toMatchObject({ quadrant, sin, cos, tan, xDirection, yDirection });
  });

  it('normalizes coterminal angles before deriving truth', () => {
    expect(deriveAngle(480)).toMatchObject({ normalized: 120, quadrant: 'Q2' });
    expect(deriveAngle(-30)).toMatchObject({ normalized: 330, quadrant: 'Q4' });
  });

  it.each([0, 90, 180, 270, 360])('rejects axis-aligned angle %s°', (angle) => {
    expect(() => deriveAngle(angle)).toThrow(/axis/i);
  });
});
