# Four Quadrants Kingdom — Phase 3 Prototype Design

Status: Approved for implementation  
Date: 2026-09-11  
Source of truth: `GDD_4_Quadrants_Kingdom_MVP.md`, `PRODUCT.md`, and the approved Phase 3 adjustments

## 1. Objective

Build a small, complete, single-page web prototype that demonstrates the full educational gameplay loop for Four Quadrants Kingdom. The prototype must be playable without final AI-generated assets and must teach the reasoning chain:

**Angle → Quadrant → x/y position → Cos/Sin sign → Tan sign**

The prototype is formative rather than punitive. Incorrect choices must produce an understandable consequence, an explanation, a useful hint, and an immediate retry path.

## 2. Audience and Language

The primary audience is upper-secondary students using desktop or tablet browsers in a classroom.

- Thai is the primary instructional language.
- Thai headings, prompts, feedback, hints, and explanations appear first.
- English may appear as smaller optional secondary text where it supports evaluation or future localization.
- Mathematical symbols, angles, formulas, quadrant names, and signs remain language-neutral.
- Layouts must tolerate Thai text expansion without clipping or fixed-height controls.

## 3. Locked Scope

The prototype uses:

- Next.js and TypeScript.
- React state through an explicit finite-state reducer; no state package unless the scaffold already includes one and it materially reduces code.
- Plain CSS or the project’s existing Tailwind setup.
- SVG for the Unit Circle, Pathfinder placeholder, obstacles, fragments, and assembly.
- CSS transitions and transforms for feedback and movement.
- One namespaced, versioned `localStorage` session for resume and reset behavior.

The prototype excludes authentication, backend APIs, databases, multiplayer, accounts, rankings, teacher dashboards, payments, complex inventory, free-roam gameplay, complex animation systems, and asset-management infrastructure.

## 4. Exact Gameplay Sequence

The state machine must implement this sequence without skipping or reordering stages:

1. Show one Angle Card for the current incomplete land.
2. Ask the learner to select the correct Quadrant Land.
3. If the selection is incorrect, display the angle and highlighted point on the Unit Circle as a visual hint.
4. Allow the learner to retry the Quadrant Land selection.
5. Enter the correct land.
6. Complete Cos Bridge.
7. Complete Sin Tower.
8. Complete Tan Gate.
9. Answer one causal reflection question.
10. Receive the land fragment.
11. Receive a new Angle Card for another incomplete land.
12. Repeat until all four land fragments are collected.
13. Assemble the Magical Unit Circle.
14. Complete a five-question mixed-quadrant Final Challenge, requiring all relevant signs through the All Skill Card.
15. Show the Results and Debrief screen.

Start and Tutorial screens precede this loop. A Kingdom Map communicates land and fragment progress between stages.

## 5. Content Model

Gameplay content lives in typed data modules rather than visual components.

### Angles and lands

The guided prototype uses exactly one non-axis Angle Card per land:

| Land | Quadrant | Angle | Range |
|---|---|---:|---|
| Dawn Meadow | Q1 | 30° | 0° < θ < 90° |
| Westwind Cliffs | Q2 | 120° | 90° < θ < 180° |
| Shadow Caverns | Q3 | 210° | 180° < θ < 270° |
| Tidefall Coast | Q4 | 330° | 270° < θ < 360° |

Axis-aligned angles are excluded.

### Authoritative sign model

| Quadrant | Sin | Cos | Tan |
|---|---:|---:|---:|
| Q1 | + | + | + |
| Q2 | + | - | - |
| Q3 | - | - | + |
| Q4 | - | + | - |

The application derives this truth from the normalized angle. Authored question data may reference an angle but must not independently override its quadrant or signs.

### Structured content

Typed data must cover:

- Guided and final angles.
- Quadrant metadata and land presentation.
- Thai-first localized prompt and explanation keys.
- Hint levels for quadrant, Cos, Sin, and Tan reasoning.
- Correct and incorrect feedback messages.
- One reflection question per guided land.
- Five mixed-quadrant Final Challenge questions.

## 6. Mathematical Reasoning

One pure `mathRules` module must:

- Normalize valid angles to 0°–359°.
- Reject axis-aligned angles.
- Derive the quadrant from the angle range.
- Derive Cos from the x-coordinate direction.
- Derive Sin from the y-coordinate direction.
- Derive Tan as `Sin / Cos`.
- Explain that equal Sin/Cos signs produce positive Tan and different signs produce negative Tan.

Example for 120°:

- 120° is between 90° and 180°, so it lies in Q2.
- The point is left of the y-axis, so x and Cos are negative.
- The point is above the x-axis, so y and Sin are positive.
- Sin and Cos have different signs, so Tan is negative.

Every incorrect obstacle response must use this same positional reasoning. Feedback may be shorter than the full explanation but cannot merely say “incorrect.”

## 7. Interaction Rules

### Quadrant selection

The Angle Card remains visible while four Quadrant Lands are selectable. A wrong choice reveals the Unit Circle hint inline, highlights the angle, states the correct range without automatically advancing, and leaves all land controls available for retry.

### Obstacles

Each obstacle uses the same mandatory two-step answer grammar; the sign controls remain disabled until a Skill Card is selected:

1. Select the appropriate Skill Card.
2. Select positive or negative.

The guided sequence is fixed:

- Cos Bridge requires the Cos Skill Card and the Cos sign.
- Sin Tower requires the Sin Skill Card and the Sin sign.
- Tan Gate requires the Tan Skill Card and the Tan sign.

The All Skill Card is visible only where combined reasoning is allowed and is never a valid choice for guided Cos Bridge, Sin Tower, or Tan Gate encounters.

### Consequences

- Cos success moves Pathfinder right for positive and left for negative. An incorrect sign briefly moves Pathfinder in the chosen wrong direction before resetting.
- Sin success moves Pathfinder upward for positive and downward for negative. An incorrect sign briefly moves in the chosen wrong direction before resetting.
- Tan success opens the gate. An incorrect choice shows the gate mechanism fail while displaying the Sin/Cos sign relationship.
- Correct responses lock the obstacle as complete, award points once, and show the mathematical explanation.
- Incorrect responses never lock progression or subtract points. They increase the hint level and allow retry.

## 8. Character and Ability Rules

- Pathfinder is the only main character and the only personified figure.
- Pathfinder remains visually consistent across every screen.
- Cos, Sin, Tan, and All are Skill Cards or symbolic ability cards only.
- Skill Cards use directional or mathematical symbols and cannot have faces, dialogue, bodies, or character-like behavior.

## 9. Screens and Composition

The single-page game shell renders ten named screen states:

1. **Start Screen:** product identity, Thai-first start action, new/resume behavior.
2. **Tutorial Screen:** short worked spatial example for Cos=x, Sin=y, and Tan=Sin/Cos.
3. **Kingdom Map:** four lands, current destination, fragment progress.
4. **Angle and Quadrant Screen:** Angle Card, four land choices, recoverable Unit Circle hint.
5. **Obstacle Screen:** shared stage containing Cos Bridge, Sin Tower, or Tan Gate.
6. **Reflection Screen:** one causal multiple-choice question after the three obstacles.
7. **Land Fragment Reward:** fragment award, explanation, and next-land action.
8. **Unit Circle Assembly:** four fragments animate into one complete SVG circle.
9. **Final Challenge:** five mixed-quadrant questions using the All Skill Card and all relevant signs.
10. **Results and Debrief:** score, response summary, misconceptions, explanations, and new-session action.

The Kingdom Map may appear as an interstitial within the same shell. Screens are states rather than separate routes.

## 10. Reusable Components

Required components:

- `AngleCard`
- `QuadrantSelector`
- `UnitCircle`
- `SkillCard`
- `SignSelector`
- `CosBridge`
- `SinTower`
- `TanGate`
- `Pathfinder`
- `HintPanel`
- `FeedbackPanel`
- `ScorePanel`
- `FragmentProgress`
- `FinalChallenge`
- `ResultsSummary`

Supporting components may include `GameShell`, `Tutorial`, `KingdomMap`, `ReflectionPanel`, and `FragmentReward`. Components render state and dispatch typed actions; they do not own mathematical truth.

## 11. State and Data Flow

Use an explicit reducer with discriminated game phases. The minimum state includes:

- Current phase.
- Current land and angle.
- Completed lands and collected fragments.
- Current obstacle.
- Selected Skill Card and sign selections.
- Attempts and hint level per challenge.
- Score entries, awarded once per completed item.
- Reflection response.
- Final Challenge item index and response records.
- Session completion and persistence version.

Events such as `START`, `COMPLETE_TUTORIAL`, `SELECT_QUADRANT`, `SELECT_SKILL`, `SELECT_SIGN`, `SUBMIT_OBSTACLE`, `RETRY`, `ANSWER_REFLECTION`, `CLAIM_FRAGMENT`, `COMPLETE_ASSEMBLY`, `SUBMIT_FINAL`, and `RESET_SESSION` produce explicit transitions.

The reducer prevents illegal progression, duplicate point awards, use of All during guided obstacles, and fragment duplication.

## 12. Scoring and Hints

Points are motivational and not a pass/fail grade.

- Correct quadrant selection: 100 points.
- Correct obstacle completion: 100 points each.
- Correct reflection response: 50 points.
- Correct Final Challenge question: 150 points.
- Retries neither subtract points nor change the fixed award.

Hints progress from conceptual cue to visual evidence to explicit derivation. The Unit Circle itself is the primary quadrant retry hint. Hints must never block retry.

## 13. Final Challenge

The Final Challenge contains exactly five typed questions using unfamiliar non-axis angles distributed across multiple quadrants.

Each question requires:

- Identification of the quadrant.
- Selection of the All Skill Card.
- Selection of the Sin sign.
- Selection of the Cos sign.
- Selection of the Tan sign.

The learner may retry incorrect answers. Feedback explains x position, y position, and the resulting Tan relationship. Final response records distinguish first-attempt correctness from eventual completion.

## 14. Results and Debrief

The final screen displays:

- Total motivational score.
- Four collected fragments and completed Unit Circle.
- Quadrant, Cos, Sin, Tan, reflection, retry, and hint evidence.
- A Thai-first recap of Cos=x, Sin=y, and Tan=Sin/Cos.
- Misconception-focused notes derived from response records.
- A clear “เริ่มใหม่ / New session” control that clears persisted session state.

No online ranking or personal data is used.

## 15. Visual System and Placeholder Strategy

Use the locked Living Field Journal direction:

- Night Ink shell, Moon Parchment panels, Expedition Sepia text, restrained brass accents.
- Distinct land colors plus geometric directional motifs so color is never the only cue.
- HTML/CSS cards for instructional content.
- Precise SVG axes, angle ray, highlighted point, obstacle mechanisms, fragment shapes, and Pathfinder placeholder.
- CSS gradients for unproduced land backgrounds.
- CSS transforms, opacity, particles, and short transitions for feedback.

The implementation may use already available approved reference assets only when they improve the prototype without creating dependencies. Rejected Style-Test assets are not production inputs. Every visual is isolated behind a component or CSS layer so final assets can replace it without changing game state or mathematical logic.

## 16. Accessibility and Responsive Behavior

- WCAG 2.2 AA color contrast.
- Native button controls with visible keyboard focus and selected/pressed states.
- Minimum 44×44 px targets with sufficient spacing.
- Complete keyboard and pointer operation.
- `aria-live` feedback for submitted answers and progression.
- Text, icons, arrows, patterns, and labels supplement color and motion.
- `prefers-reduced-motion` disables non-essential movement while preserving state changes.
- Unit Circle exposes an accessible text description of angle, quadrant, x direction, y direction, and signs.
- Desktop and tablet layouts avoid horizontal scrolling; small-screen layout stacks panels safely.

## 17. Error and Recovery Behavior

- Invalid persisted state falls back to a fresh session without crashing.
- Buttons that are not currently valid remain disabled with an understandable reason in surrounding copy.
- Incorrect answers preserve the current question and show retry controls.
- Animation completion never controls mathematical progression; state changes remain deterministic even when motion is disabled.
- Reset clears only the prototype’s namespaced local storage entry.

## 18. Validation Plan

### Pure mathematical tests

- Q1: 30° → Q1, Sin+, Cos+, Tan+.
- Q2: 120° → Q2, Sin+, Cos−, Tan−.
- Q3: 210° → Q3, Sin−, Cos−, Tan+.
- Q4: 330° → Q4, Sin−, Cos+, Tan−.
- Axis angles are rejected.
- Tan is positive for equal Sin/Cos signs and negative for different signs.

### Reducer and component tests

- Start, tutorial, map, and new-session behavior.
- Correct Q1–Q4 selections.
- Incorrect Quadrant retry and Unit Circle hint.
- Correct and incorrect Cos, Sin, and Tan attempts.
- Wrong Skill Card handling.
- Progressive hint display.
- Score updates once per completion.
- Reflection completion.
- Fragment collection without duplicates.
- Four-fragment assembly unlock.
- Five-question Final Challenge.
- Results and debrief rendering.
- Persisted session resume and reset.

### Browser verification

Run the full flow with keyboard and pointer at desktop and tablet widths. Check Thai wrapping, focus visibility, motion/reduced-motion behavior, no horizontal overflow, and all required transitions.

## 19. Acceptance Criteria

The prototype is complete when:

- The exact approved gameplay sequence is playable from start to results.
- All four guided angles and lands are completed in one session.
- Every incorrect response is recoverable through explanation, hints, and retry.
- Every mathematical explanation references angle range, x/y position, or sign relationship as appropriate.
- Exactly one character, Pathfinder, appears; skill cards are symbolic abilities.
- All is restricted to combined challenges and the Final Challenge.
- Four fragments assemble the Magical Unit Circle.
- The Final Challenge contains five mixed-quadrant questions requiring all relevant signs.
- Automated tests cover the required validation list and pass.
- A manual browser pass confirms desktop/tablet usability and accessibility basics.
- The final report documents features, screens, tested flow, placeholders, components, mathematical validation, limitations, replaceable assets, run instructions, and the recommended asset-integration next step.

## 20. Known Prototype Constraints

- Placeholder visuals demonstrate behavior but are not final production art.
- Thai instructional terminology is based on the approved source material and has not yet received classroom linguist review.
- Local progress is device- and browser-specific.
- Results are formative and cannot be submitted to a teacher.
- Classroom timing and learning effectiveness require later user testing.
