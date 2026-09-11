# Style Test Report

Date: 2026-09-11. Scope: initial reference set only. Full production not started.

## Generated set

| Asset | Visual result | Technical result | Decision |
|---|---|---|---|
| pathfinder-reference.png | Strong identity, age tone, silhouette, costume, palette | 1024² RGBA | Candidate for user approval |
| pathfinder-think.png | Identity and costume remain close; pose reads clearly | 1024² RGB; checkerboard flattened | Rejected; regenerate alpha after direction approval |
| living-field-journal-style-board.png | Cohesive materials, four lands, brass/ink/gouache system | 1536×1024 RGB; internal reference | Candidate for user approval |
| q1-dawn-meadow-bg.webp | Strong dawn mood and right-rising path; central crop works | 1920×1080 WebP, opaque as intended | Candidate for user approval |
| cos-bridge-neutral.png | Clear horizontal mechanism; strong silhouette | 1200×600 RGB; checkerboard flattened | Rejected; regenerate alpha |
| sin-tower-neutral.png | Clear vertical lift and consistent material language | 700×1200 RGB; checkerboard flattened | Rejected; regenerate alpha |
| tan-gate-closed.png | Two inputs converge on one lock; relation reads correctly | 900×1100 RGBA | Candidate for user approval |
| angle-card-frame.webp | Large digital overlay area; corner system is consistent | WebP lacks alpha; checkerboard flattened | Rejected; simplify corners and regenerate alpha |
| cos-skill-card.webp | Horizontal bridge/arrows read at card scale; no character | WebP lacks alpha; checkerboard flattened | Rejected; regenerate alpha |

## Strengths

- Pathfinder feels like a capable upper-secondary learner, not a child mascot.
- Teal, rust, parchment, ink, timber, and brass create one recognizable world.
- Q1 uses path direction and elevation, not color alone.
- Obstacles express horizontal, vertical, and sign relationship through physical construction.
- No generated asset contains critical mathematical labels or text.

## Inconsistencies and revisions

- Five isolated assets have flattened checkerboards instead of alpha. They cannot ship.
- Pathfinder alternate pose shifts facial proportions slightly. Regeneration must use the reference at high identity fidelity.
- Angle Card corners are too ornate and compete with math content. Reduce corner medallions about 25%.
- Q1 foreground is rich. Keep controls on an opaque surface; never place text directly over grass.
- Bridge and tower lean architectural. Add restrained ink-edge texture during regeneration without weakening silhouettes.

## Reference authority

Use `pathfinder-reference.png` for character identity, `living-field-journal-style-board.png` for material/light, `tan-gate-closed.png` for obstacle hardware, and `q1-dawn-meadow-bg.webp` for environment brushwork.

## Rejected images

`pathfinder-think.png`, `cos-bridge-neutral.png`, `sin-tower-neutral.png`, `angle-card-frame.webp`, and `cos-skill-card.webp` remain as review evidence, not production assets.

## User decisions required

Approve or revise Pathfinder identity, gouache/ink style, palette, Q1 density, obstacle material language, Tan relation metaphor, card ornament density, and Cos icon. Confirm regeneration with this direction.
