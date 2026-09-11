# Four Quadrants Kingdom Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a Thai-first, single-page playable prototype that carries a learner through four guided quadrant lands, Magical Unit Circle assembly, a five-question mixed Final Challenge, and a formative debrief.

**Architecture:** A Next.js App Router page hosts a client-side finite-state game controlled by a typed reducer. Pure TypeScript modules own angle derivation, content, scoring, and persistence; React components only render state and dispatch actions. SVG/CSS presentation layers isolate placeholder art from gameplay logic so production assets can replace them later.

**Tech Stack:** Next.js, React, TypeScript, plain CSS, SVG, Vitest, Testing Library, and versioned browser `localStorage`; no runtime state, animation, UI, or backend packages.

**Spec:** `docs/superpowers/specs/2026-09-11-four-quadrants-kingdom-phase-3-design.md`

## Global Constraints

- Thai headings, prompts, feedback, hints, and explanations appear first; English is optional secondary text.
- Use exactly one personified character: Pathfinder.
- Cos, Sin, Tan, and All are symbolic Skill Cards, never characters.
- A Skill Card must be selected before sign controls become available.
- All is valid only for combined challenges and the Final Challenge.
- Use exactly one guided Angle Card per land: 30°, 120°, 210°, and 330°.
- All mathematical truth is derived from angle position by a pure module.
- Incorrect responses show positional explanation, hints, and unlimited retry.
- Use CSS, SVG, gradients, and approved Style-Test references only; do not start asset production.
- No backend, authentication, database, multiplayer, external service, production asset pipeline, or unnecessary runtime package.
- All controls support keyboard and pointer use, visible focus, 44×44 px targets, non-color cues, and reduced motion.
- The workspace is not a Git repository; replace each plan commit step with a recorded test checkpoint and do not initialize Git without user authorization.

## File Structure

- `package.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `vitest.setup.ts`: minimal Next.js and test configuration.
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`: application entry, single-page route, tokens, layouts, and animation rules.
- `src/game/types.ts`: shared discriminated unions and state contracts.
- `src/game/math.ts`: pure angle normalization, quadrant/sign derivation, and positional explanation data.
- `src/game/content.ts`: typed Thai-first guided lands, hints, reflections, and five Final Challenge items.
- `src/game/scoring.ts`: fixed, idempotent motivational scoring.
- `src/game/reducer.ts`: legal finite-state transitions and response history.
- `src/game/persistence.ts`: versioned local session load/save/reset.
- `src/game/Game.tsx`: game shell and phase composition.
- `src/components/*.tsx`: reusable cards, selectors, SVG scenes, panels, progress, final challenge, and results.
- `src/game/*.test.ts`, `src/components/*.test.tsx`: mathematical, reducer, persistence, and interaction coverage.
- `e2e/prototype.spec.ts`: browser-level complete-flow validation if Playwright is available without adding a heavy runtime dependency.

---

### Task 1: Scaffold the Minimal Next.js Testable Shell

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Test: `src/components/AppSmoke.test.tsx`

**Interfaces:**
- Consumes: no application interfaces.
- Produces: Next.js App Router page and a browser-like Vitest environment for all later tasks.

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from '@testing-library/react';
import Page from '../../app/page';

it('renders the Thai-first prototype title', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { name: /อาณาจักรสี่จตุภาค/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify the shell is absent**

Run: `npm test -- --run src/components/AppSmoke.test.tsx`  
Expected: FAIL because project configuration and `app/page.tsx` do not exist.

- [ ] **Step 3: Add the minimal shell**

Configure scripts `dev`, `build`, `lint`, and `test`; use only Next.js/React runtime dependencies and Vitest/Testing Library/jsdom development dependencies. Render:

```tsx
export default function Page() {
  return <main><h1>อาณาจักรสี่จตุภาค</h1><p>Four Quadrants Kingdom</p></main>;
}
```

Set `<html lang="th">`, import `globals.css`, and establish named CSS variables from the Living Field Journal palette rather than raw colors inside components.

- [ ] **Step 4: Verify the scaffold**

Run: `npm install`, `npm test -- --run src/components/AppSmoke.test.tsx`, and `npm run build`.  
Expected: smoke test and production build pass.

- [ ] **Step 5: Record checkpoint**

Record Task 1 commands and outcomes in the final report; no Git commit because `.git` is absent.

### Task 2: Implement the Authoritative Mathematical Model and Content

**Files:**
- Create: `src/game/types.ts`
- Create: `src/game/math.ts`
- Create: `src/game/content.ts`
- Test: `src/game/math.test.ts`
- Test: `src/game/content.test.ts`

**Interfaces:**
- Produces: `type Quadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4'`, `type Sign = 'positive' | 'negative'`, `type Skill = 'cos' | 'sin' | 'tan' | 'all'`, `deriveAngle(angle: number): AngleTruth`, `GUIDED_LANDS`, `FINAL_QUESTIONS`, `REFLECTIONS`, and `HINTS`.
- `AngleTruth` is `{ normalized: number; quadrant: Quadrant; sin: Sign; cos: Sign; tan: Sign; xDirection: 'left' | 'right'; yDirection: 'above' | 'below'; rangeTh: string; rangeEn: string }`.

- [ ] **Step 1: Write failing mathematical tests**

```ts
expect(deriveAngle(30)).toMatchObject({ quadrant: 'Q1', sin: 'positive', cos: 'positive', tan: 'positive' });
expect(deriveAngle(120)).toMatchObject({ quadrant: 'Q2', sin: 'positive', cos: 'negative', tan: 'negative' });
expect(deriveAngle(210)).toMatchObject({ quadrant: 'Q3', sin: 'negative', cos: 'negative', tan: 'positive' });
expect(deriveAngle(330)).toMatchObject({ quadrant: 'Q4', sin: 'negative', cos: 'positive', tan: 'negative' });
expect(() => deriveAngle(90)).toThrow(/axis/i);
expect(deriveAngle(480).normalized).toBe(120);
```

Add content assertions that guided angles equal `[30, 120, 210, 330]`, every land has one reflection, Final Challenge length is five, and all angles are non-axis and cover at least three quadrants.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --run src/game/math.test.ts src/game/content.test.ts`  
Expected: FAIL because modules are missing.

- [ ] **Step 3: Implement pure derivation and typed content**

Normalize with `((angle % 360) + 360) % 360`, reject multiples of 90, derive range/quadrant first, then map x/y directions to Cos/Sin and compute Tan from sign equality. Define all instructional copy as `{ th: string; en?: string }` values in content records, including progressive hints and positional correct/incorrect explanations.

- [ ] **Step 4: Verify mathematical truth and content validation**

Run: `npm test -- --run src/game/math.test.ts src/game/content.test.ts`  
Expected: all tests pass with Q1–Q4 and five Final questions validated.

- [ ] **Step 5: Record checkpoint**

Record Task 2 test output for the mathematical validation section of the final report.

### Task 3: Build the Typed Reducer, Scoring, and Persistence

**Files:**
- Create: `src/game/scoring.ts`
- Create: `src/game/reducer.ts`
- Create: `src/game/persistence.ts`
- Test: `src/game/reducer.test.ts`
- Test: `src/game/persistence.test.ts`

**Interfaces:**
- Consumes: `Quadrant`, `Sign`, `Skill`, `GUIDED_LANDS`, and `FINAL_QUESTIONS`.
- Produces: `GameState`, `GameAction`, `initialGameState`, `gameReducer(state, action)`, `scoreFor(kind)`, `loadSession(storage)`, `saveSession(storage, state)`, and `clearSession(storage)`.
- Game phases: `'start' | 'tutorial' | 'map' | 'quadrant' | 'land-intro' | 'obstacle' | 'reflection' | 'reward' | 'assembly' | 'final' | 'results'`.

- [ ] **Step 1: Write failing reducer tests for the legal sequence**

Test start → tutorial → map → quadrant; incorrect quadrant keeps phase `quadrant` and sets `showUnitCircle`; correct quadrant enters `land-intro`; obstacles enforce Cos → Sin → Tan; sign selection before Skill selection is ignored; All is rejected in guided obstacles; reflection precedes reward; reward adds one fragment; four fragments unlock assembly; assembly unlocks exactly five Final items; completion enters results.

Use representative assertions:

```ts
let state = gameReducer(initialGameState, { type: 'START' });
expect(state.phase).toBe('tutorial');
state = gameReducer(state, { type: 'SELECT_SIGN', sign: 'positive' });
expect(state.selectedSign).toBeNull();
```

Add scoring assertions that each correct item awards once and retries do not reduce or duplicate points.

- [ ] **Step 2: Run reducer tests and verify failure**

Run: `npm test -- --run src/game/reducer.test.ts src/game/persistence.test.ts`  
Expected: FAIL because reducer and persistence do not exist.

- [ ] **Step 3: Implement the reducer and fixed scoring**

Store response records with challenge kind, angle, selected skill/signs, correctness, attempt, and hint use. Guard every transition. Use fixed awards: quadrant 100, obstacle 100, reflection 50, final 150. Persist `{ schemaVersion: 1, state }` under `four-quadrants-kingdom:v1`; validate the parsed phase and arrays before accepting it.

- [ ] **Step 4: Verify transitions, idempotency, and recovery**

Run: `npm test -- --run src/game/reducer.test.ts src/game/persistence.test.ts`  
Expected: tests pass, including invalid JSON/new-version fallback and namespaced reset.

- [ ] **Step 5: Record checkpoint**

Record the reducer transition matrix and persistence test result.

### Task 4: Build Reusable Learning Controls and Unit Circle

**Files:**
- Create: `src/components/AngleCard.tsx`
- Create: `src/components/QuadrantSelector.tsx`
- Create: `src/components/UnitCircle.tsx`
- Create: `src/components/SkillCard.tsx`
- Create: `src/components/SignSelector.tsx`
- Create: `src/components/HintPanel.tsx`
- Create: `src/components/FeedbackPanel.tsx`
- Create: `src/components/ScorePanel.tsx`
- Create: `src/components/FragmentProgress.tsx`
- Test: `src/components/LearningControls.test.tsx`

**Interfaces:**
- Consumes: typed content, `AngleTruth`, selected values, disabled state, and event callbacks.
- Produces: accessible native controls and SVG visual evidence with no reducer ownership.

- [ ] **Step 1: Write failing interaction/accessibility tests**

```tsx
render(<SignSelector selected={null} disabled onSelect={vi.fn()} />);
expect(screen.getByRole('button', { name: /บวก/ })).toBeDisabled();

render(<UnitCircle angle={120} truth={deriveAngle(120)} />);
expect(screen.getByRole('img', { name: /120.*Q2.*ซ้าย.*เหนือ/i })).toBeInTheDocument();
```

Test that all selectable cards are buttons with `aria-pressed`, Thai labels appear before English text, fragment progress has text equivalents, and feedback uses an `aria-live` region.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --run src/components/LearningControls.test.tsx`  
Expected: FAIL because components do not exist.

- [ ] **Step 3: Implement controls and precise SVG circle**

Draw axes, labels, angle arc/ray, and highlighted point from `cos(angle)`/`sin(angle)`. Render x/y directional annotations and a text description. Use native buttons; Skill Cards show symbolic arrows/formulas without faces. Keep `All` visibility controlled by an `allowAll` prop.

- [ ] **Step 4: Verify component contracts**

Run: `npm test -- --run src/components/LearningControls.test.tsx`  
Expected: all accessibility and interaction tests pass.

- [ ] **Step 5: Record checkpoint**

Record the semantic control and Unit Circle verification results.

### Task 5: Build Placeholder Scenes and Obstacle Feedback

**Files:**
- Create: `src/components/Pathfinder.tsx`
- Create: `src/components/CosBridge.tsx`
- Create: `src/components/SinTower.tsx`
- Create: `src/components/TanGate.tsx`
- Create: `src/components/ObstacleScene.tsx`
- Test: `src/components/ObstacleScene.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: current obstacle, `AngleTruth`, selected skill/sign, answer result, hint, and callbacks.
- Produces: one Pathfinder SVG and three non-personified obstacle SVGs with outcome-specific CSS classes.

- [ ] **Step 1: Write failing obstacle tests**

For 120°, verify Cos requires Cos then negative, Sin requires Sin then positive, and Tan requires Tan then negative. Submit each wrong skill/sign first and assert the phase remains recoverable, feedback mentions left/right x, above/below y, and a retry button is present.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --run src/components/ObstacleScene.test.tsx`  
Expected: FAIL because scenes do not exist.

- [ ] **Step 3: Implement SVG/CSS scenes**

Use a single abstract explorer silhouette in `Pathfinder`. Apply transform classes `move-left`, `move-right`, `move-up`, and `move-down`; Tan toggles gate panel classes `gate-open`/`gate-failed`. All animation is decorative and disabled under `prefers-reduced-motion`; reducer state, not animation events, determines completion.

- [ ] **Step 4: Verify correct and incorrect Cos/Sin/Tan behavior**

Run: `npm test -- --run src/components/ObstacleScene.test.tsx`  
Expected: all three obstacle paths, hints, retries, and positional explanations pass.

- [ ] **Step 5: Record checkpoint**

Record obstacle animation states and the exact tested Q2 explanations.

### Task 6: Compose the Complete Four-Land Game Loop

**Files:**
- Create: `src/game/Game.tsx`
- Create: `src/components/KingdomMap.tsx`
- Create: `src/components/ReflectionPanel.tsx`
- Create: `src/components/FragmentReward.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `src/game/GuidedFlow.test.tsx`

**Interfaces:**
- Consumes: reducer, persistence, content, controls, and obstacle scenes.
- Produces: start, tutorial, map, quadrant, land, obstacle, reflection, and reward screens in one page.

- [ ] **Step 1: Write the failing guided-flow test**

Use Testing Library to begin a new game, finish tutorial, choose a wrong Q1 land, assert the 30° Unit Circle hint appears, retry Q1, complete Cos/Sin/Tan in order, answer reflection, claim the Q1 fragment, and assert the next Angle Card is 120°. Repeat with helper functions through 210° and 330°, then assert four fragments and assembly phase.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- --run src/game/GuidedFlow.test.tsx`  
Expected: FAIL because composed game screens do not exist.

- [ ] **Step 3: Implement the single-page shell and guided screens**

Use phase-based rendering inside a persistent `Game` shell. Save committed transitions to localStorage. Keep score/fragment panels visible but quiet. Render Thai copy first and English in a secondary line. Use gradients for Q2–Q4 and optionally `q1-dawn-meadow-bg.webp` only as a replaceable background layer; use no rejected Style-Test asset.

- [ ] **Step 4: Verify the exact four-land sequence**

Run: `npm test -- --run src/game/GuidedFlow.test.tsx`  
Expected: all four lands follow Angle → quadrant retry → Cos → Sin → Tan → reflection → fragment → next Angle, ending with four fragments.

- [ ] **Step 5: Record checkpoint**

Record the complete guided-loop result and final score expected from four perfect guided lands.

### Task 7: Add Assembly, Five-Question Final Challenge, and Debrief

**Files:**
- Create: `src/components/UnitCircleAssembly.tsx`
- Create: `src/components/FinalChallenge.tsx`
- Create: `src/components/ResultsSummary.tsx`
- Modify: `src/game/Game.tsx`
- Modify: `app/globals.css`
- Test: `src/game/FinalFlow.test.tsx`

**Interfaces:**
- Consumes: four fragments, `FINAL_QUESTIONS`, All Skill selection, quadrant and three sign selections, response records, score, and reset callback.
- Produces: assembly state, exactly five combined questions, misconception summary, and new-session reset.

- [ ] **Step 1: Write failing final-flow tests**

Seed a four-fragment state, complete assembly, and assert five questions. For each item assert sign selectors are disabled until All is selected; Cos/Sin/Tan single cards cannot submit a Final answer. Submit one wrong mixed-sign set, verify x/y/Tan feedback and retry, then answer all five correctly. Assert results include all evidence categories and reset returns to Start while clearing storage.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- --run src/game/FinalFlow.test.tsx`  
Expected: FAIL because assembly/final/results components do not exist.

- [ ] **Step 3: Implement assembly, combined answer form, and summary**

Assemble four patterned SVG arcs into one Unit Circle. Final form collects quadrant plus Sin, Cos, and Tan signs after All selection. Build debrief categories from immutable response records and show Thai-first explanations, attempt/hint counts, score, fragments, and reset.

- [ ] **Step 4: Verify final progression and reset**

Run: `npm test -- --run src/game/FinalFlow.test.tsx`  
Expected: five mixed questions complete, Results renders, and reset clears the namespaced session.

- [ ] **Step 5: Record checkpoint**

Record final-question coverage, retry behavior, and results/reset outcomes.

### Task 8: Accessibility, Responsive Polish, and Complete Verification

**Files:**
- Modify: `app/globals.css`
- Modify: affected `src/components/*.tsx` discovered in the bounded visual inspection
- Create: `README.md`
- Test: all test files

**Interfaces:**
- Consumes: completed prototype.
- Produces: desktop/tablet-ready build, run instructions, and verification evidence.

- [ ] **Step 1: Run the full automated suite**

Run: `npm test -- --run` and `npm run build`.  
Expected: all mathematical, reducer, component, guided-flow, final-flow, persistence, and build checks pass.

- [ ] **Step 2: Start the prototype and inspect desktop/tablet together**

Run: `npm run dev`. Inspect at approximately 1440×900 and 768×1024. Exercise mouse and keyboard through wrong/correct quadrant, wrong/correct Cos/Sin/Tan, hint, fragment, assembly, Final, results, resume, and reset paths.

- [ ] **Step 3: Apply one bounded defect-fix pass**

Fix all observed issues in one batch: Thai clipping, focus visibility, target size, horizontal overflow, contrast, obscured feedback, incorrect aria state, broken reduced-motion fallback, or inconsistent state transitions. Do not add new features or assets.

- [ ] **Step 4: Run one confirmation pass and stop polishing**

Run: `npm test -- --run` and `npm run build`; recheck desktop and tablet only where fixes applied.  
Expected: tests/build pass and no acceptance-blocking visual or interaction defect remains.

- [ ] **Step 5: Document operation and replacement seams**

In `README.md`, include `npm install`, `npm run dev`, `npm test -- --run`, and `npm run build`; identify CSS/SVG placeholder components and the optional approved Q1 background layer as replaceable without changing `math.ts`, `content.ts`, or `reducer.ts`.

- [ ] **Step 6: Record final checkpoint**

Prepare the required ten-part report: implemented features, screens, tested gameplay, placeholders, components, mathematical validation, limitations, replaceable assets, run instructions, and next asset-integration step.

