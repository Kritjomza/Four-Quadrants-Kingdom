import { describe, expect, it } from 'vitest';
import { gameReducer, initialGameState } from './reducer';

function reachQuadrant() {
  let state = gameReducer(initialGameState, { type: 'START' });
  state = gameReducer(state, { type: 'COMPLETE_TUTORIAL' });
  state = gameReducer(state, { type: 'OPEN_ANGLE' });
  return state;
}

describe('gameReducer', () => {
  it('starts with tutorial then map and quadrant selection', () => {
    const tutorial = gameReducer(initialGameState, { type: 'START' });
    expect(tutorial.phase).toBe('tutorial');
    const map = gameReducer(tutorial, { type: 'COMPLETE_TUTORIAL' });
    expect(map.phase).toBe('map');
    expect(gameReducer(map, { type: 'OPEN_ANGLE' }).phase).toBe('quadrant');
  });

  it('shows a Unit Circle hint after a wrong land and allows retry', () => {
    const state = reachQuadrant();
    const wrong = gameReducer(state, { type: 'SELECT_QUADRANT', quadrant: 'Q2' });
    expect(wrong).toMatchObject({ phase: 'quadrant', showUnitCircle: true, quadrantAttempts: 1 });
    const correct = gameReducer(wrong, { type: 'SELECT_QUADRANT', quadrant: 'Q1' });
    expect(correct).toMatchObject({ phase: 'land-intro', score: 100 });
  });

  it('requires a matching Skill Card before a sign and rejects All on guided obstacles', () => {
    let state = reachQuadrant();
    state = gameReducer(state, { type: 'SELECT_QUADRANT', quadrant: 'Q1' });
    state = gameReducer(state, { type: 'ENTER_LAND' });
    expect(state.currentObstacle).toBe('cos');
    expect(gameReducer(state, { type: 'SELECT_SIGN', sign: 'positive' }).selectedSign).toBeNull();
    expect(gameReducer(state, { type: 'SELECT_SKILL', skill: 'all' }).selectedSkill).toBeNull();
    expect(gameReducer(state, { type: 'SELECT_SKILL', skill: 'cos' }).selectedSkill).toBe('cos');
  });

  it('keeps incorrect obstacles recoverable and completes Cos then Sin then Tan', () => {
    let state = reachQuadrant();
    state = gameReducer(state, { type: 'SELECT_QUADRANT', quadrant: 'Q1' });
    state = gameReducer(state, { type: 'ENTER_LAND' });
    state = gameReducer(state, { type: 'SELECT_SKILL', skill: 'cos' });
    state = gameReducer(state, { type: 'SELECT_SIGN', sign: 'negative' });
    state = gameReducer(state, { type: 'SUBMIT_OBSTACLE' });
    expect(state).toMatchObject({ phase: 'obstacle', answerStatus: 'incorrect', hintLevel: 1, score: 100 });
    expect(state.selectedSign).toBe('negative');

    state = gameReducer(state, { type: 'SELECT_SKILL', skill: 'cos' });
    state = gameReducer(state, { type: 'SELECT_SIGN', sign: 'positive' });
    state = gameReducer(state, { type: 'SUBMIT_OBSTACLE' });
    expect(state).toMatchObject({ answerStatus: 'correct', score: 200 });
    state = gameReducer(state, { type: 'ADVANCE_OBSTACLE' });
    expect(state.currentObstacle).toBe('sin');

    state = gameReducer(state, { type: 'SELECT_SKILL', skill: 'sin' });
    state = gameReducer(state, { type: 'SELECT_SIGN', sign: 'positive' });
    state = gameReducer(state, { type: 'SUBMIT_OBSTACLE' });
    state = gameReducer(state, { type: 'ADVANCE_OBSTACLE' });
    expect(state.currentObstacle).toBe('tan');

    state = gameReducer(state, { type: 'SELECT_SKILL', skill: 'tan' });
    state = gameReducer(state, { type: 'SELECT_SIGN', sign: 'positive' });
    state = gameReducer(state, { type: 'SUBMIT_OBSTACLE' });
    state = gameReducer(state, { type: 'ADVANCE_OBSTACLE' });
    expect(state.phase).toBe('reflection');
    expect(state.score).toBe(400);
  });

  it('requires reflection before awarding one fragment and the next Angle Card', () => {
    let state = { ...initialGameState, phase: 'reflection' as const, currentLandIndex: 0 };
    state = gameReducer(state, { type: 'SELECT_REFLECTION', choiceId: 'color' });
    state = gameReducer(state, { type: 'SUBMIT_REFLECTION' });
    expect(state).toMatchObject({ phase: 'reflection', answerStatus: 'incorrect' });
    state = gameReducer(state, { type: 'SELECT_REFLECTION', choiceId: 'position' });
    state = gameReducer(state, { type: 'SUBMIT_REFLECTION' });
    expect(state).toMatchObject({ phase: 'reward', score: 50 });
    state = gameReducer(state, { type: 'CLAIM_FRAGMENT' });
    expect(state).toMatchObject({ phase: 'map', currentLandIndex: 1, fragments: ['Q1'] });
    expect(gameReducer(state, { type: 'CLAIM_FRAGMENT' }).fragments).toEqual(['Q1']);
  });

  it('unlocks assembly after four unique fragments', () => {
    const state = gameReducer({ ...initialGameState, phase: 'reward', currentLandIndex: 3, fragments: ['Q1', 'Q2', 'Q3'] }, { type: 'CLAIM_FRAGMENT' });
    expect(state).toMatchObject({ phase: 'assembly', fragments: ['Q1', 'Q2', 'Q3', 'Q4'] });
  });

  it.each([
    [0, 'Q1'], [1, 'Q2'], [2, 'Q3'], [3, 'Q4'],
  ] as const)('accepts the correct land for guided index %s', (currentLandIndex, quadrant) => {
    const state = { ...reachQuadrant(), currentLandIndex };
    expect(gameReducer(state, { type: 'SELECT_QUADRANT', quadrant })).toMatchObject({ phase: 'land-intro', score: 100 });
  });

  it.each([
    [0, 'cos', 'positive', 'negative'], [0, 'sin', 'positive', 'negative'], [0, 'tan', 'positive', 'negative'],
    [1, 'cos', 'negative', 'positive'], [1, 'sin', 'positive', 'negative'], [1, 'tan', 'negative', 'positive'],
    [2, 'cos', 'negative', 'positive'], [2, 'sin', 'negative', 'positive'], [2, 'tan', 'positive', 'negative'],
    [3, 'cos', 'positive', 'negative'], [3, 'sin', 'negative', 'positive'], [3, 'tan', 'negative', 'positive'],
  ] as const)('validates land %s %s signs', (currentLandIndex, currentObstacle, correctSign, wrongSign) => {
    const base = { ...initialGameState, phase: 'obstacle' as const, currentLandIndex, currentObstacle, selectedSkill: currentObstacle, selectedSign: wrongSign };
    expect(gameReducer(base, { type: 'SUBMIT_OBSTACLE' }).answerStatus).toBe('incorrect');
    expect(gameReducer({ ...base, selectedSign: correctSign }, { type: 'SUBMIT_OBSTACLE' })).toMatchObject({ answerStatus: 'correct', score: 100 });
  });

  it('requires All and every relevant sign in the Final Challenge', () => {
    let state = gameReducer({ ...initialGameState, phase: 'assembly', fragments: ['Q1', 'Q2', 'Q3', 'Q4'] }, { type: 'COMPLETE_ASSEMBLY' });
    expect(state.phase).toBe('final');
    state = gameReducer(state, { type: 'SELECT_FINAL_SIGN', fn: 'sin', sign: 'positive' });
    expect(state.finalDraft.sin).toBeNull();
    state = gameReducer(state, { type: 'SELECT_SKILL', skill: 'all' });
    state = gameReducer(state, { type: 'SELECT_FINAL_QUADRANT', quadrant: 'Q1' });
    state = gameReducer(state, { type: 'SELECT_FINAL_SIGN', fn: 'sin', sign: 'positive' });
    state = gameReducer(state, { type: 'SELECT_FINAL_SIGN', fn: 'cos', sign: 'positive' });
    state = gameReducer(state, { type: 'SELECT_FINAL_SIGN', fn: 'tan', sign: 'positive' });
    state = gameReducer(state, { type: 'SUBMIT_FINAL' });
    expect(state).toMatchObject({ finalIndex: 1, score: 150 });
  });
});
