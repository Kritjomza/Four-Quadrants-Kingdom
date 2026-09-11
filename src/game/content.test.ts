import { describe, expect, it } from 'vitest';
import { deriveAngle } from './math';
import { FINAL_QUESTIONS, GUIDED_LANDS, REFLECTIONS } from './content';

describe('game content', () => {
  it('provides exactly one guided angle for every quadrant land', () => {
    expect(GUIDED_LANDS.map((land) => land.angle)).toEqual([30, 120, 210, 330]);
    expect(GUIDED_LANDS.map((land) => deriveAngle(land.angle).quadrant)).toEqual(['Q1', 'Q2', 'Q3', 'Q4']);
  });

  it('provides one causal reflection for every guided land', () => {
    expect(GUIDED_LANDS.every((land) => REFLECTIONS.some((item) => item.quadrant === land.quadrant))).toBe(true);
  });

  it('provides five valid mixed-quadrant final questions', () => {
    expect(FINAL_QUESTIONS).toHaveLength(5);
    const quadrants = new Set(FINAL_QUESTIONS.map((item) => deriveAngle(item.angle).quadrant));
    expect(quadrants.size).toBeGreaterThanOrEqual(3);
    expect(FINAL_QUESTIONS.every((item) => item.angle % 90 !== 0)).toBe(true);
  });

  it('places Thai copy before optional English copy in every guided land', () => {
    for (const land of GUIDED_LANDS) {
      expect(land.name.th.length).toBeGreaterThan(0);
      expect(land.name.en?.length).toBeGreaterThan(0);
    }
  });
});
