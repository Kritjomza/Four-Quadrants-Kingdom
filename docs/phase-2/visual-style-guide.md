# Four Quadrants Kingdom — Living Field Journal Style Guide

Status: locked for style testing. Full production awaits approval.

## Visual thesis

An explorer's field journal opens into a living fantasy landscape. Painted environments supply wonder; parchment, ink, brass, and stitched fabric make the interface tactile. Educational geometry stays crisp, flat, and digital. Pathfinder is the only personified figure.

## Illustration system

- Line: soft dark-sepia ink, 2–4 px equivalent at 1024 px, slightly varied but never scratchy.
- Paint: opaque gouache shapes with restrained dry-brush texture; no photorealism, 3D rendering, claymorphism, or glossy mobile-game plastic.
- Shapes: broad readable silhouettes, gently irregular organic contours, simple interior details.
- Realism: stylized storybook anatomy, roughly 5.5-head Pathfinder proportions; upper-secondary rather than preschool tone.
- Light: warm upper-right key light across every asset; cool ambient fill; one clear contact shadow.
- Magic: fine gold motes and ink-like arcs, used only for success, hints, and assembly.
- Paper: warm fibrous parchment on card/UI surfaces only. Environmental art does not receive an all-over paper filter.
- Educational diagrams: precise SVG, even strokes, explicit labels and patterns. Never imitate painted lines for axes or math.

## Viewpoint and composition

Gameplay uses a three-quarter side view. Pathfinder occupies the outer lower third and faces inward. Obstacles own the middle third. Reserve the upper-left 38% on desktop for Angle Card/question UI and a centered lower band for answers. On tablet, crop from both outer edges while protecting the central 62%; move question UI above the scene and controls below. Background focal subjects stay inside the center 60% safe zone. No essential detail sits behind answer controls.

## Palette

| Role | Name | HEX | Secondary cue |
|---|---|---|---|
| Main background | Night Ink | `#172238` | quiet field behind parchment |
| Parchment | Moon Parchment | `#F5E6C8` | fibrous texture |
| Ink | Expedition Sepia | `#2C241C` | 2–4 px outline |
| Pathfinder | Trail Teal | `#2F7774` | compass badge silhouette |
| Q1 | Dawn Fern | `#5E9B62` | rising sun + upper-right motif |
| Q2 | Westwind Violet | `#6570A8` | wind strokes + upper-left motif |
| Q3 | Undercrystal Plum | `#694568` | descending crystal + lower-left motif |
| Q4 | Tidefall Teal | `#238B8D` | falling wave + lower-right motif |
| Cos | Horizon Blue | `#286FA8` | horizontal double arrow |
| Sin | Ascent Magenta | `#A64F86` | vertical double arrow |
| Tan | Relation Amber | `#C47725` | paired sign sockets/gate |
| All | Circle Indigo | `#514F9B` | four-part ring |
| Correct | Canopy Green | `#237A4B` | check + sparkle |
| Incorrect | Ember Red | `#B6423C` | cross + cracked ink |
| Hint | Lantern Gold | `#A96B12` | lantern icon + pulse |
| Locked | Slate Ash | `#68707B` | closed clasp |
| Unlocked | Sky Brass | `#B8862E` | open clasp |
| Reward | Sun Gold | `#E0A72E` | starburst + fragment shape |

Digital UI must meet WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text and essential graphic boundaries. Color never acts alone.

## Typography direction

- Thai body/UI: Noto Sans Thai, 16–20 px, 1.5–1.65 line height.
- Thai/English headings: IBM Plex Sans Thai with semibold weight; English fallback IBM Plex Sans.
- Numbers/angles: tabular numerals, 32–64 px, high contrast; degree symbol digitally rendered.
- Buttons: semibold, sentence case, at least 16 px; labels name actions.
- Panels: target 70 Thai characters or 3 short lines; split longer explanations.
- No critical text, letters, signs, angles, or formulas inside raster art.

## Pathfinder identity

Androgynous 16–18-year-old learner-explorer; curious, observant, resilient. Warm tan skin, dark wavy cropped hair under a teal field cap, cream rolled-sleeve shirt, teal short cloak, rust trousers, sturdy brown boots, brass compass badge, ochre satchel, slim journal case. Compact backpack carries rolled maps and a single brass tool. Silhouette anchors: asymmetric short cloak, round satchel, cap brim, compass badge. No weapon. Costume, handedness, proportions, and upper-right light stay fixed.

## Pathfinder states

All source assets: 1024×1024 transparent PNG; 12% safe margin; static fallback required. Use separate poses, CSS transforms for small drift/bob, and Framer Motion only for scene transitions.

| ID | Pose/expression/direction | Meaning | Screens | MVP motion |
|---|---|---|---|---|
| pathfinder-idle | relaxed 3/4, attentive, right | waiting | tutorial/map/obstacles | 2-frame breathing optional |
| pathfinder-walk | mid-step, focused, right | travel | map/transitions | CSS translate |
| pathfinder-think | journal raised, curious, 3/4 | analyze | angle/reflection | static |
| pathfinder-correct | open stance, bright smile | correct | obstacles | short lift |
| pathfinder-confused | tilted head, brows knit | recoverable error | obstacles | static |
| pathfinder-use-power | card hand forward, determined | card activation | obstacles/final | glow layer only |
| pathfinder-move-left | weight and scarf left | negative horizontal | Cos Bridge | CSS translate X |
| pathfinder-move-right | weight and scarf right | positive horizontal | Cos Bridge | CSS translate X |
| pathfinder-move-up | reaching upward | positive vertical | Sin Tower | CSS translate Y |
| pathfinder-move-down | braced descent | negative vertical | Sin Tower | CSS translate Y |
| pathfinder-receive-fragment | cupped hands, wonder | reward | land completion | fragment overlay |
| pathfinder-assemble-circle | kneeling, hands guiding arc | assembly | assembly | SVG/raster layer transition |
| pathfinder-celebrate | upright, arms raised | completion | results | short bounce; static fallback |

## Card and obstacle language

Cards use 768×1024 portrait frames: parchment center, ink edge, brass corner tabs, icon medallion, empty lower label band. Selected = raised brass notch; locked = closed clasp + desaturation; correct = check/star overlay; incorrect = cracked-ink cross; focus = digital 3 px outline. Cos uses horizontal bridge/arrows; Sin vertical tower/arrows; Tan a gate connecting two sign sockets; All a four-part Unit Circle ring. No faces or humanoid traits.

Cos Bridge is low and wide, with sliding planks and horizontal rail markings. Sin Tower is tall with a vertical lift and up/down guide rope. Tan Gate has two input sockets feeding one locking mechanism, making relationship—not an independent coordinate—the visual model.

## Quadrant worlds

- Q1 Dawn Meadow: open sunrise, right-rising path, fern meadow, welcoming air.
- Q2 Westwind Cliffs: high violet-blue ruins, path bends left while staying above a cloud sea.
- Q3 Shadow Caverns: descending leftward shelf, plum crystals, safe mystery rather than horror.
- Q4 Tidefall Coast: bright rightward ruins, waterfall descends toward teal tide pools.

Each land repeats the same horizon height, brush scale, outline weight, atmospheric depth, and center-safe composition.
