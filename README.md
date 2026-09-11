# Four Quadrants Kingdom — Phase 3 Prototype

A small Thai-first educational web-game prototype for learning quadrant and trigonometric signs through spatial reasoning.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify

```bash
npm test -- --run
npm run build
```

## Prototype architecture

- `src/game/math.ts` is the single mathematical source of truth.
- `src/game/content.ts` contains guided angles, Thai-first copy, hints, reflections, and Final Challenge data.
- `src/game/reducer.ts` enforces the finite gameplay sequence.
- `src/game/persistence.ts` owns the versioned local browser session.
- `src/components/` contains replaceable UI and SVG presentation layers.

## Replaceable visual layers

`Pathfinder.tsx`, `CosBridge.tsx`, `SinTower.tsx`, `TanGate.tsx`, `UnitCircleAssembly.tsx`, land gradients in `app/globals.css`, and card styling are placeholders. Final production art can replace these layers without changing `math.ts`, `content.ts`, or `reducer.ts`.

No full Phase 2 asset production was started, and no rejected Style-Test image is used.
