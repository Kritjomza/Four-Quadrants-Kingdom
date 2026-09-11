# Asset Generation Prompts

## Shared style and negatives

Append this style block to every prompt:

> 2D fantasy educational adventure illustration, Living Field Journal style, hand-painted gouache storybook texture, subtle parchment and ink details, clean readable silhouette, soft dark-sepia ink outlines, colorful controlled palette, warm upper-right magical lighting, polished upper-secondary educational game asset, consistent scale and proportions.

Append this negative block:

> No text, letters, numbers, symbols that resemble writing, watermark, logo, photorealism, 3D render, clay, glossy plastic, pixel art, anime rendering, extra limbs, malformed hands, duplicate objects, unwanted people or mascots, cropped important elements, inconsistent costume, heavy visual clutter.

Reference order: `pathfinder-reference` controls character identity; `living-field-journal-style-board` controls materials/light; approved first asset in each family controls geometry.

## Style-test prompts

Each entry lists usage; prompt; background/alpha; ratio/resolution; post-processing; references.

### pathfinder-reference

Usage: master character authority. Prompt: full-body androgynous 16–18-year-old learner-explorer, warm tan skin, dark wavy cropped hair under teal field cap, cream rolled-sleeve shirt, asymmetric teal short cloak, rust trousers, sturdy brown boots, brass compass badge, ochre round satchel, compact backpack with rolled maps and one brass tool; neutral attentive stance, three-quarter view facing right, friendly intelligent expression, clear 5.5-head silhouette. Background: true transparent alpha. Ratio/resolution: 1:1, 1024×1024. Post: remove fringe, preserve 12% margin, normalize palette. References: none; becomes authority.

### pathfinder-think

Usage: angle analysis. Prompt: exact Pathfinder reference design, journal raised in left hand, right hand near chin, curious focused expression, three-quarter view facing right, identical costume, body proportions, handedness, equipment, and upper-right light. Background: true transparent alpha. Ratio/resolution: 1:1, 1024×1024. Post: match reference palette and silhouette scale. References: pathfinder-reference.

### living-field-journal-style-board

Usage: material/style authority. Prompt: cohesive reference board containing isolated swatches and cropped studies of gouache meadow, violet cliff, plum crystal cave, teal coast, moon parchment, sepia ink, brass hardware, teal woven cloak, magical gold motes, and one clean silhouette study; orderly museum-style grid without labels or text, no character except a small non-identifying costume-material crop. Background: parchment. Ratio/resolution: 3:2, 1536×1024. Post: retain as internal reference, do not ship in gameplay. References: pathfinder-reference palette.

### q1-dawn-meadow-bg

Usage: Q1 gameplay background. Prompt: wide dawn meadow in a magical explorer's world, right-rising path, open sky, fern vegetation, distant pale ruins, sunrise from upper right; three-quarter side-view stage, calm upper-left 38% for question UI, clear lower-center control band, no characters, central 60% crop-safe, directional sun and path communicate right and above. Background: full opaque scene. Ratio/resolution: 16:9, 1920×1080. Post: WebP export, test center crop at 4:3. References: style board.

### cos-bridge-neutral

Usage: Cos obstacle base. Prompt: low wide environmental bridge made from ink-edged timber, brass sliding rails, horizontal measurement-like notches without numbers, symmetrical expandable ends, strong left-right silhouette, three-quarter side view, neutral inactive state. Background: true transparent alpha. Ratio/resolution: 2:1, 1200×600. Post: clean edges, preserve extension room. References: style board, Q1 light.

### sin-tower-neutral

Usage: Sin obstacle base. Prompt: tall slender environmental tower with a vertical lift platform, taut guide rope, stacked landings, clear up-down silhouette, parchment flags with no markings, three-quarter side view, neutral inactive state. Background: true transparent alpha. Ratio/resolution: 7:12, 700×1200. Post: clean edges, preserve lift travel space. References: style board, bridge material language.

### tan-gate-closed

Usage: Tan obstacle base. Prompt: arched environmental gate with two distinct empty input sockets feeding one central brass locking mechanism through visible paired channels, closed doors, relation/comparison clearly implied, no coordinate axis motif, three-quarter front view. Background: true transparent alpha. Ratio/resolution: 9:11, 900×1100. Post: clean inner opening mask for later open state. References: style board, bridge/tower hardware.

### angle-card-frame

Usage: digital angle question container. Prompt: empty portrait card frame, moon parchment center, soft sepia ink edge, restrained brass corner tabs, subtle compass ticks without letters or numbers, large uninterrupted central area and clean lower action band, no icon, no text. Background: true transparent outside card. Ratio/resolution: 3:4, 768×1024. Post: straighten bounds, verify digital overlay safe zones. References: style board.

### cos-skill-card

Usage: sample ability card. Prompt: empty portrait card frame consistent with angle card, Horizon Blue accent, central medallion showing a simple horizontal bridge and opposing left-right arrowheads with no letters, no face, no character, clean empty lower label band, selected-state brass notch. Background: true transparent outside card. Ratio/resolution: 3:4, 768×1024. Post: make small 128 px icon crop readable. References: angle-card-frame, style board.

## Production prompt matrix after approval

Use shared blocks plus exact family prompt above. Replace only listed state/action. Every asset keeps its family resolution, alpha rule, safe margin, reference chain, and post-processing.

| Asset IDs | Prompt-specific subject/state | Usage/post-processing |
|---|---|---|
| pathfinder-walk | exact Pathfinder, right-facing mid-step | travel; CSS translate fallback |
| pathfinder-correct | open stance, relieved smile, small raised fist | correct feedback |
| pathfinder-confused | tilted head, knit brows, journal half-open | recoverable error |
| pathfinder-use-power | card hand forward, determined | activation; empty card face |
| pathfinder-move-left/right | braced directional step and cloak motion | Cos result; mirror only if handedness preserved |
| pathfinder-move-up/down | reaching ascent / controlled descent | Sin result |
| pathfinder-receive-fragment | cupped hands around empty light space | reward overlay composite |
| pathfinder-assemble-circle | kneeling, hands guiding an arc | assembly composite |
| pathfinder-celebrate | arms raised, grounded joyful stance | results |
| q2-westwind-cliffs-bg | high cool cliffs, path bends left above clouds; upper-left cue | 1920×1080 opaque; 4:3 center crop |
| q3-shadow-caverns-bg | descending left shelf, plum crystals, safe dark depth | 1920×1080 opaque; preserve UI calm zone |
| q4-tidefall-coast-bg | bright right ruins, waterfall descends to teal pools | 1920×1080 opaque; preserve UI calm zone |
| cos-bridge-right/left | same bridge, rails and planks extended toward named direction | align to neutral anchor |
| cos-bridge-correct/incorrect/completed | gold active seams / recoverable cracked plank / restored mossy bridge | no text; damage never dangerous |
| sin-tower-up/down | same tower, lift at high/low waypoint | align to neutral anchor |
| sin-tower-correct/incorrect/completed | gold guide light / stalled lift with loose harmless rope / restored tower | keep vertical cue |
| tan-gate-highlighted/opening/open | paired channels lit / doors parting / clear passage | preserve two-input relation |
| tan-gate-correct/incorrect/completed | gold lock release / blocked red ink pulse / restored gate | no independent-axis imagery |
| sin-skill-card | Ascent Magenta, vertical tower and opposing up-down arrows | match Cos frame |
| tan-skill-card | Relation Amber, paired sockets feeding gate lock | match frame; no axis |
| all-skill-card | Circle Indigo, four-part ring joining horizontal, vertical, paired-sign motifs | combined/final only |
| q1/q2/q3/q4-angle-card-frame | angle frame with respective corner botanical/wind/crystal/wave motif | central math-safe area |
| final-challenge-card-frame | angle frame with four-part brass ring, more formal corners | no labels/signs |
| sign-choice-frame | two simple equal-weight parchment choice plates | digital plus/minus overlay |
| hint-card-frame | compact parchment note with lantern tab | digital hint copy overlay |
| q1/q2/q3/q4-land-fragment | exact quarter-disc pieces with unique sun/wind/crystal/wave edge motif | pieces must assemble geometrically |
| unit-circle-complete | assembled four-quarter magical disc, empty center for SVG overlay | reward, not math authority |
| completion-badge | brass-and-parchment crest, empty title band | digital title overlay |
| locked/unlocked-land-icon | closed/open field-journal clasp | 512²; state via shape plus color |
| progress-marker | small compass needle and boot-print marker | 512²; readable at 32 px |
| fragment-collection-effect | gold ink motes converging inward | transparent overlay |
| circle-assembly-effect | four curved gold trails converging | transparent overlay |
| correct-sparkle | check-like star cluster without glyph | transparent overlay |
| hint-glow | lantern-gold soft bounded halo with ink rays | transparent overlay |
| incorrect-response-effect | ember-red cracked ink ring, nonviolent | transparent overlay |
| parchment-texture/notebook-border/ink-strokes | seamless fiber / restrained stitched edge / isolated sepia strokes | decorative; low contrast |
| compass-decoration/hand-drawn-arrows/ribbons/page-corners | isolated journal ornaments | transparent; no text |
| small-stars/leaves/crystals/waves/magical-particles | isolated world motifs | transparent; hideable |
| directional-markers | paired horizontal and vertical physical pointers | no letters/signs |
| quadrant-icons | sun-up-right, wind-up-left, crystal-down-left, wave-down-right | four separate 512² assets |

For each production generation, negative prompt also bans any subject from another family. Example: obstacle prompts add “no Pathfinder”; character prompts add “no second person.”
