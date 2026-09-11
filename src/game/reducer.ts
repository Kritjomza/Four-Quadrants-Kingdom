import { FINAL_QUESTIONS, GUIDED_LANDS, REFLECTIONS } from './content';
import { deriveAngle, positionalExplanation } from './math';
import { scoreFor } from './scoring';
import type { LocalizedText, Quadrant, Sign, Skill } from './types';

export type GamePhase = 'start' | 'tutorial' | 'map' | 'quadrant' | 'land-intro' | 'obstacle' | 'reflection' | 'reward' | 'assembly' | 'final' | 'results';
export type Obstacle = 'cos' | 'sin' | 'tan';
export type AnswerStatus = 'correct' | 'incorrect' | null;

export interface ResponseRecord {
  kind: 'quadrant' | 'obstacle' | 'reflection' | 'final';
  angle: number;
  correct: boolean;
  attempt: number;
  skill?: Skill;
}

export interface FinalDraft {
  quadrant: Quadrant | null;
  sin: Sign | null;
  cos: Sign | null;
  tan: Sign | null;
}

export interface GameState {
  phase: GamePhase;
  currentLandIndex: number;
  currentObstacle: Obstacle;
  fragments: Quadrant[];
  score: number;
  selectedSkill: Skill | null;
  selectedSign: Sign | null;
  selectedReflection: string | null;
  quadrantAttempts: number;
  obstacleAttempts: number;
  reflectionAttempts: number;
  finalAttempts: number;
  showUnitCircle: boolean;
  hintLevel: number;
  answerStatus: AnswerStatus;
  feedback: LocalizedText | null;
  finalIndex: number;
  finalDraft: FinalDraft;
  responses: ResponseRecord[];
}

const emptyFinalDraft = (): FinalDraft => ({ quadrant: null, sin: null, cos: null, tan: null });

export const initialGameState: GameState = {
  phase: 'start',
  currentLandIndex: 0,
  currentObstacle: 'cos',
  fragments: [],
  score: 0,
  selectedSkill: null,
  selectedSign: null,
  selectedReflection: null,
  quadrantAttempts: 0,
  obstacleAttempts: 0,
  reflectionAttempts: 0,
  finalAttempts: 0,
  showUnitCircle: false,
  hintLevel: 0,
  answerStatus: null,
  feedback: null,
  finalIndex: 0,
  finalDraft: emptyFinalDraft(),
  responses: [],
};

export type GameAction =
  | { type: 'START' }
  | { type: 'COMPLETE_TUTORIAL' }
  | { type: 'OPEN_ANGLE' }
  | { type: 'SELECT_QUADRANT'; quadrant: Quadrant }
  | { type: 'ENTER_LAND' }
  | { type: 'SELECT_SKILL'; skill: Skill }
  | { type: 'SELECT_SIGN'; sign: Sign }
  | { type: 'SUBMIT_OBSTACLE' }
  | { type: 'ADVANCE_OBSTACLE' }
  | { type: 'SELECT_REFLECTION'; choiceId: string }
  | { type: 'SUBMIT_REFLECTION' }
  | { type: 'CLAIM_FRAGMENT' }
  | { type: 'COMPLETE_ASSEMBLY' }
  | { type: 'SELECT_FINAL_QUADRANT'; quadrant: Quadrant }
  | { type: 'SELECT_FINAL_SIGN'; fn: 'sin' | 'cos' | 'tan'; sign: Sign }
  | { type: 'SUBMIT_FINAL' }
  | { type: 'RESET' };

function resetAnswer(state: GameState): GameState {
  return { ...state, selectedSkill: null, selectedSign: null, answerStatus: null, feedback: null, hintLevel: 0 };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      return state.phase === 'start' ? { ...state, phase: 'tutorial' } : state;
    case 'COMPLETE_TUTORIAL':
      return state.phase === 'tutorial' ? { ...state, phase: 'map' } : state;
    case 'OPEN_ANGLE':
      return state.phase === 'map' ? { ...state, phase: 'quadrant', showUnitCircle: false, feedback: null } : state;
    case 'SELECT_QUADRANT': {
      if (state.phase !== 'quadrant') return state;
      const land = GUIDED_LANDS[state.currentLandIndex];
      const attempt = state.quadrantAttempts + 1;
      const correct = action.quadrant === land.quadrant;
      const response: ResponseRecord = { kind: 'quadrant', angle: land.angle, correct, attempt };
      if (!correct) {
        return {
          ...state,
          quadrantAttempts: attempt,
          showUnitCircle: true,
          answerStatus: 'incorrect',
          hintLevel: Math.min(2, state.hintLevel + 1),
          feedback: { th: `ยังไม่ใช่ ลองดูตำแหน่ง ${land.angle}° บนวงกลมหนึ่งหน่วย`, en: `Not yet. Locate ${land.angle}° on the Unit Circle and try again.` },
          responses: [...state.responses, response],
        };
      }
      return {
        ...state,
        phase: 'land-intro',
        score: state.score + scoreFor('quadrant'),
        quadrantAttempts: attempt,
        answerStatus: 'correct',
        feedback: positionalExplanation(land.angle),
        responses: [...state.responses, response],
      };
    }
    case 'ENTER_LAND':
      return state.phase === 'land-intro' ? { ...resetAnswer(state), phase: 'obstacle', currentObstacle: 'cos', obstacleAttempts: 0 } : state;
    case 'SELECT_SKILL':
      if (state.phase !== 'obstacle' && state.phase !== 'final') return state;
      if (state.phase === 'obstacle' && action.skill === 'all') return state;
      return { ...state, selectedSkill: action.skill, selectedSign: null, answerStatus: null, feedback: null };
    case 'SELECT_SIGN':
      return state.phase === 'obstacle' && state.selectedSkill ? { ...state, selectedSign: action.sign, answerStatus: null, feedback: null } : state;
    case 'SUBMIT_OBSTACLE': {
      if (state.phase !== 'obstacle' || !state.selectedSkill || !state.selectedSign || state.answerStatus === 'correct') return state;
      const land = GUIDED_LANDS[state.currentLandIndex];
      const truth = deriveAngle(land.angle);
      const attempt = state.obstacleAttempts + 1;
      const correct = state.selectedSkill === state.currentObstacle && state.selectedSign === truth[state.currentObstacle];
      const response: ResponseRecord = { kind: 'obstacle', angle: land.angle, correct, attempt, skill: state.selectedSkill };
      if (!correct) {
        return {
          ...state,
          answerStatus: 'incorrect',
          obstacleAttempts: attempt,
          hintLevel: Math.min(2, state.hintLevel + 1),
          feedback: positionalExplanation(land.angle),
          responses: [...state.responses, response],
        };
      }
      return {
        ...state,
        answerStatus: 'correct',
        obstacleAttempts: attempt,
        score: state.score + scoreFor('obstacle'),
        feedback: positionalExplanation(land.angle),
        responses: [...state.responses, response],
      };
    }
    case 'ADVANCE_OBSTACLE': {
      if (state.phase !== 'obstacle' || state.answerStatus !== 'correct') return state;
      if (state.currentObstacle === 'tan') return { ...resetAnswer(state), phase: 'reflection', selectedReflection: null, reflectionAttempts: 0 };
      const next: Obstacle = state.currentObstacle === 'cos' ? 'sin' : 'tan';
      return { ...resetAnswer(state), currentObstacle: next, obstacleAttempts: 0 };
    }
    case 'SELECT_REFLECTION':
      return state.phase === 'reflection' ? { ...state, selectedReflection: action.choiceId, answerStatus: null, feedback: null } : state;
    case 'SUBMIT_REFLECTION': {
      if (state.phase !== 'reflection' || !state.selectedReflection) return state;
      const reflection = REFLECTIONS[state.currentLandIndex];
      const attempt = state.reflectionAttempts + 1;
      const correct = state.selectedReflection === reflection.correctChoiceId;
      const response: ResponseRecord = { kind: 'reflection', angle: GUIDED_LANDS[state.currentLandIndex].angle, correct, attempt };
      if (!correct) return { ...state, answerStatus: 'incorrect', reflectionAttempts: attempt, hintLevel: Math.min(2, state.hintLevel + 1), feedback: reflection.explanation, responses: [...state.responses, response] };
      return { ...state, phase: 'reward', answerStatus: 'correct', reflectionAttempts: attempt, score: state.score + scoreFor('reflection'), feedback: reflection.explanation, responses: [...state.responses, response] };
    }
    case 'CLAIM_FRAGMENT': {
      if (state.phase !== 'reward') return state;
      const quadrant = GUIDED_LANDS[state.currentLandIndex].quadrant;
      if (state.fragments.includes(quadrant)) return state;
      const fragments = [...state.fragments, quadrant];
      if (fragments.length === 4) return { ...resetAnswer(state), fragments, phase: 'assembly' };
      return { ...resetAnswer(state), fragments, phase: 'map', currentLandIndex: state.currentLandIndex + 1, quadrantAttempts: 0 };
    }
    case 'COMPLETE_ASSEMBLY':
      return state.phase === 'assembly' && state.fragments.length === 4 ? { ...resetAnswer(state), phase: 'final', finalIndex: 0, finalDraft: emptyFinalDraft(), finalAttempts: 0 } : state;
    case 'SELECT_FINAL_QUADRANT':
      return state.phase === 'final' && state.selectedSkill === 'all' ? { ...state, finalDraft: { ...state.finalDraft, quadrant: action.quadrant }, answerStatus: null } : state;
    case 'SELECT_FINAL_SIGN':
      return state.phase === 'final' && state.selectedSkill === 'all' ? { ...state, finalDraft: { ...state.finalDraft, [action.fn]: action.sign }, answerStatus: null } : state;
    case 'SUBMIT_FINAL': {
      if (state.phase !== 'final' || state.selectedSkill !== 'all') return state;
      const { quadrant, sin, cos, tan } = state.finalDraft;
      if (!quadrant || !sin || !cos || !tan) return state;
      const question = FINAL_QUESTIONS[state.finalIndex];
      const truth = deriveAngle(question.angle);
      const attempt = state.finalAttempts + 1;
      const correct = quadrant === truth.quadrant && sin === truth.sin && cos === truth.cos && tan === truth.tan;
      const response: ResponseRecord = { kind: 'final', angle: question.angle, correct, attempt, skill: 'all' };
      if (!correct) return { ...state, answerStatus: 'incorrect', finalAttempts: attempt, hintLevel: Math.min(2, state.hintLevel + 1), feedback: positionalExplanation(question.angle), responses: [...state.responses, response] };
      const last = state.finalIndex === FINAL_QUESTIONS.length - 1;
      return {
        ...state,
        phase: last ? 'results' : 'final',
        finalIndex: last ? state.finalIndex : state.finalIndex + 1,
        finalAttempts: 0,
        selectedSkill: null,
        finalDraft: emptyFinalDraft(),
        answerStatus: last ? 'correct' : null,
        feedback: last ? positionalExplanation(question.angle) : null,
        score: state.score + scoreFor('final'),
        responses: [...state.responses, response],
      };
    }
    case 'RESET':
      return initialGameState;
    default:
      return state;
  }
}
