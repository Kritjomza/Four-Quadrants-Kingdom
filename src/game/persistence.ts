import { initialGameState, type GamePhase, type GameState } from './reducer';

export const SESSION_KEY = 'four-quadrants-kingdom:v1';
const SCHEMA_VERSION = 1;
const phases: GamePhase[] = ['start', 'tutorial', 'map', 'quadrant', 'land-intro', 'obstacle', 'reflection', 'reward', 'assembly', 'final', 'results'];

export function saveSession(storage: Storage, state: GameState): void {
  storage.setItem(SESSION_KEY, JSON.stringify({ schemaVersion: SCHEMA_VERSION, state }));
}

export function loadSession(storage: Storage): GameState {
  try {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return initialGameState;
    const parsed = JSON.parse(raw) as { schemaVersion?: number; state?: Partial<GameState> };
    if (parsed.schemaVersion !== SCHEMA_VERSION || !parsed.state || !phases.includes(parsed.state.phase as GamePhase) || !Array.isArray(parsed.state.fragments) || !Array.isArray(parsed.state.responses)) {
      return initialGameState;
    }
    return { ...initialGameState, ...parsed.state } as GameState;
  } catch {
    return initialGameState;
  }
}

export function clearSession(storage: Storage): void {
  storage.removeItem(SESSION_KEY);
}
