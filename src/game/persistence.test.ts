import { describe, expect, it } from 'vitest';
import { clearSession, loadSession, saveSession, SESSION_KEY } from './persistence';
import { initialGameState } from './reducer';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() { return data.size; },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => { data.delete(key); },
    setItem: (key, value) => { data.set(key, value); },
  };
}

describe('session persistence', () => {
  it('round-trips a valid versioned session', () => {
    const storage = memoryStorage();
    const state = { ...initialGameState, phase: 'map' as const, score: 250 };
    saveSession(storage, state);
    expect(loadSession(storage)).toMatchObject({ phase: 'map', score: 250 });
  });

  it('falls back safely for malformed or unknown-version data', () => {
    const storage = memoryStorage();
    storage.setItem(SESSION_KEY, '{broken');
    expect(loadSession(storage)).toEqual(initialGameState);
    storage.setItem(SESSION_KEY, JSON.stringify({ schemaVersion: 99, state: { phase: 'results' } }));
    expect(loadSession(storage)).toEqual(initialGameState);
  });

  it('clears only the game session key', () => {
    const storage = memoryStorage();
    storage.setItem('unrelated', 'keep');
    saveSession(storage, initialGameState);
    clearSession(storage);
    expect(storage.getItem(SESSION_KEY)).toBeNull();
    expect(storage.getItem('unrelated')).toBe('keep');
  });
});
