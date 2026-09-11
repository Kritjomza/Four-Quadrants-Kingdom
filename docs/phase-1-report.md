# Four Quadrants Kingdom — Phase 1 Report

Status: Approved and locked on 2026-09-11. Phase 2 is authorized; Phase 3 is not authorized.

## 1. Executive Summary

Four Quadrants Kingdom is a 10–15 minute, single-player formative learning game. Its core instructional model is causal: **angle → quadrant → horizontal/vertical position → cosine/sine signs → tangent sign**. Players follow Angle Cards to their matching lands, restore all four lands, then solve five unfamiliar mixed-quadrant cases.

The MVP uses Angle Cards as question containers and four permanent skill cards: Cos, Sin, Tan, and All. One protagonist travels through every land. Cos, Sin, and Tan are not characters. Each card remains in one explicit state. No collectible deck, card economy, or combat system is needed. The Final Challenge uses a seeded, constraint-checked selection so the session is reproducible.

Approved experience direction: **Living Field Journal**—a friendly fantasy expedition interface combining an illustrated kingdom map, parchment-like card frames, and a precise SVG Unit Circle. Educational geometry stays crisp and interactive; decoration never carries mathematical meaning.

Assessment is formative. Wrong answers trigger progressively stronger conceptual hints, preserve access to all content, and reduce only bonus points. Results separate quadrant, cosine, sine, tangent, reflection, retries, and hints so teachers can locate misconceptions.

## 2. Assumptions

### Approved decisions

- Angle Cards determine the correct land; completion requires all four lands. The guided path may use 30°, 120°, 210°, and 330°.
- One Angle Card is played per land. Each land run contains quadrant selection, skill-card selection, the three obstacles, and reflection.
- The player controls one protagonist. Cos, Sin, Tan, and All exist only as reusable skill cards.
- Five Final Challenge questions, matching the stated acceptance criterion.
- Guided lands use fixed question order; Final Challenge draws a seeded balanced set.
- The Unit Circle remains visible or one action away during learning tasks.
- Thai is the default locale; content keys support English later.
- One session fits 10–15 minutes by using short prompts, immediate feedback, and no traversal controls.
- Analytics records both the selected skill card and the obstacle's required function. This distinguishes card-selection errors from sign errors.

### Locked supporting decisions

- Formative-only progression: unlimited retries, no fail gate, all learners reach debrief.
- Score is motivational, not a grade.
- No timer is shown; elapsed time may be recorded locally only when enabled by teacher/settings.
- Reflection uses one best-reason multiple-choice response in MVP; free text is out of scope.
- Resume is offered only for an unfinished local session on the same browser.
- WCAG 2.2 AA is the accessibility target.

## 3. Learning Outcome Mapping

| ID | Measurable outcome | Learner knows/does | Measuring action | Correct response | Feedback | Evidence recorded | Misconception detected |
|---|---|---|---|---|---|---|---|
| LO1 | Classify non-axis angles into quadrants with ≥80% first-attempt accuracy in Final Challenge | Uses angular interval and counterclockwise direction | Selects one of four map lands | Q1: 0–90°, Q2: 90–180°, Q3: 180–270°, Q4: 270–360°, after normalization | Show angle ray, interval, and why chosen land fits | angle, normalized angle, choice, attempts, hints, latency | Clockwise reading, swapped Q2/Q4, interval-boundary confusion |
| LO2 | Infer cosine sign from horizontal position | Connects cosine to x-coordinate | Chooses left/right, then +/− at Cos Bridge | Right means x>0 and cos>0; left means x<0 and cos<0 | Animate horizontal projection from circle point to x-axis | selected direction/sign, correctness, attempts, hint | Treats cosine as vertical; assumes all coordinates positive |
| LO3 | Infer sine sign from vertical position | Connects sine to y-coordinate | Chooses up/down, then +/− at Sin Tower | Up means y>0 and sin>0; down means y<0 and sin<0 | Animate vertical projection to y-axis | selected direction/sign, correctness, attempts, hint | Treats sine as horizontal; confuses below with positive |
| LO4 | Derive tangent sign from sine and cosine signs | Applies tan θ = sin θ / cos θ | Selects same/different signs, then tangent sign | Same signs give +; different signs give − | Show sign fraction and simplify sign relationship | input signs, relation choice, tangent choice, attempts | Memorizes wrong tangent sign; ignores denominator sign |
| LO5 | Explain why each sign is correct | Connects position, coordinate, function, and sign | Selects one causal reasoning statement | Statement names quadrant position and correct coordinate/function link | Confirm causal chain; contrast distractor | selected explanation, correctness | Correct guess with wrong explanation; x/y swap |
| LO6 | Transfer reasoning to unfamiliar angles | Completes full chain without hints | Solves five Final Challenge items | Correct quadrant plus three signs; explanation where sampled | Delayed item feedback; full reasoning after submission | per-step accuracy, first attempts, confidence if enabled | Brittle memorization, weak normalization, one-function dependency |

Mastery indicator: at least 4/5 Final Challenge items fully correct, with no repeated category misconception. This indicator informs debrief only; it does not block completion.

## 4. Core Gameplay Loop

| Step | Player action | System action | Learning evidence |
|---|---|---|---|
| Start | Start new or resume local session; choose sound/reduced motion if exposed | Creates/resumes session; sets Thai locale | session start, resume state, preferences |
| Tutorial | Rotates or advances a sample ray; matches x/y projections to Cos/Sin; derives Tan | Demonstrates one Q1 example with guided narration | tutorial steps, errors, skips |
| Kingdom Map | Selects the land matching the active Angle Card | Shows restored/unrestored lands without exposing which unrestored land is correct | land selection and return visits |
| Angle Card | Reveals current angle and optionally pins it | Activates a single question card and draws ray | angle ID, reveal time |
| Quadrant Selection | Chooses one land/quadrant | Validates; supplies progressive hints after errors | choice, attempts, hints, latency |
| Skill Card Selection | Chooses Cos, Sin, Tan, or All for the obstacle | Validates card-function match before requesting a sign | selected card, obstacle, attempts, hints |
| Cos Bridge | Selects Cos card, then horizontal direction and cosine sign | Projects x-coordinate and moves the same protagonist | card match, Cos accuracy, x-link evidence |
| Sin Tower | Selects Sin card, then vertical direction and sine sign | Projects y-coordinate and moves the same protagonist | card match, Sin accuracy, y-link evidence |
| Tan Gate | Selects Tan card, then same/different and tangent sign | Displays sin/cos sign fraction and moves the same protagonist through gate | card match, relation, Tan accuracy |
| Reflection | Selects best causal explanation | Checks reasoning independently from sign choices | explanation correctness |
| Reward | Claims fragment | Adds quadrant fragment to Unit Circle; saves | completion and score |
| Next Angle Card | Draws the next card after claiming a fragment | Deals one card from the next planned, unrestored quadrant without revealing its land | card order and progression |
| Final Challenge | Solves five mixed unfamiliar angles without hints | Uses seeded balanced set; withholds correctness until each item is committed | transfer results by category |
| Results | Reviews profile and explanations; retries practice if desired | Shows category bars, misconception notes, and restored circle | summary viewed, optional replay |

Card state rule: each Angle Card has exactly one state: `queued → active → completed`; `review` is read-only. The four skill cards remain in the player's hand. Selecting one moves it temporarily to `active`, resolves the obstacle check, then returns it to the hand. A card cannot be both in hand and active.

## 5. Game Progression

| Stage | Concept introduced | Example authored angles | Cards | Support and hint policy | Difficulty |
|---|---|---|---:|---|---|
| Tutorial | Circle direction; x=cos, y=sin; sign division | 45° | 1 guided | Labels, highlighted axes, narrated projections, no score | Fully modeled |
| Q1 Dawn Meadow | Both coordinates positive | Pool: 30°, 45°, 60° | 1 drawn | Unit Circle visible; Hint 1 after first error; spatial arrows labeled | Recognition |
| Q2 Westwind Cliffs | x and cosine become negative; y stays positive | Pool: 120°, 135°, 150° | 1 drawn | Labels remain; explanation prompt contrasts Q1/Q2 | One sign changes |
| Q3 Shadow Caverns | x and y negative; tangent becomes positive | Pool: 210°, 225°, 240° | 1 drawn | Axis labels remain; sign labels appear only after Hint 2 | Two negatives and sign division |
| Q4 Tidefall Coast | x positive, y negative; compare with Q2 | Pool: 300°, 315°, 330° | 1 drawn | Unit Circle available on demand; no pre-highlight | Cross-quadrant comparison |
| Final Challenge | Transfer and mixed retrieval | 20°, 110°, 200°, 290°, 335° from larger pool | 5 | No hints; optional Unit Circle without sign labels; feedback after commit | Unfamiliar angles, mixed order |

Session total: 4 guided Angle Cards + 5 final items + 1 tutorial example. The content library keeps three candidate angles per land, but each session draws only one per land. Each guided card produces land selection, three card-function matches, three sign decisions, and one reflection. This fits the 10–15 minute target while preserving the complete reasoning chain.

### Hint fading

- Q1: visual ray and labeled axes always present.
- Q2: ray present; projections appear after answer or Hint 2.
- Q3: ray present; coordinate labels hidden until Hint 2.
- Q4: ray shown; full Unit Circle opens only on request.
- Final: no hints; neutral Unit Circle reference allowed, with axes and quadrant labels but no sign table.

### Minimum MVP content

- 12 validated guided candidates (three per land), one tutorial item, five required Final Challenge items, and at least five alternate final items. A session uses four guided candidates.
- Four land backgrounds, one protagonist character set, four skill cards, three obstacle sets, one map, and one Unit Circle SVG system.
- Thai strings for every prompt, feedback, hint, control, state, and result label.
- Keyboard, pointer, and touch operation; reduced-motion mode; local persistence and export-free local analytics summary.

### Explicitly out of scope

Accounts, backend, teacher dashboard, cloud analytics, leaderboards, grades, multiplayer, free-roam movement, deck construction, inventory, economy, combat, procedural worlds, axis angles, radians, exact trig values, inverse trig, free-text grading, voiceover, generated assets, and English content production.

## 6. Screen Specifications

Shared rules: persistent progress indicator, sound/reduced-motion controls, Thai UI text, visible focus, 44×44 px preferred targets, no color-only meaning, and retained answer state when a help panel opens.

| Screen | Purpose and main UI | Player actions | System/data | Success | Error/retry and feedback | Accessibility | Assets/interactions |
|---|---|---|---|---|---|---|---|
| 1. Start | Title, restored/broken circle motif, Start, Resume when valid, settings | Start/resume; set preferences | session/local save/locale | Opens tutorial or saved stage | Corrupt save offers safe new session; never deletes without confirmation | Logical heading, focus order, labeled controls | Logo treatment, hero circle, start buttons |
| 2. Tutorial | Interactive Unit Circle, angle ray, x/y projections, one protagonist, and four skill cards | Advance ray; choose a matching card and sign relation; skip after first explanation | tutorial state and completion | Learner completes modeled Q1 chain | Immediate coaching; retry same step | Pause motion, replay text, keyboard controls, screen-reader math description | Protagonist poses, skill cards, SVG circle, stepper |
| 3. Kingdom Map | Four quadrant lands around the circle, fragments, and progress | Select any land for the active Angle Card; review restored lands | land status, active angle, completion, score | Correct land opens the encounter | Wrong land shows angle ray hint and returns to selection; map does not reveal the planned order | States use text/icons; map also exposes Q1–Q4 list | Map, land thumbnails, fragment sockets |
| 4. Angle Card | Large card with angle, unit, concealed ray hint, and stage count | Reveal/start; optionally request available hint | active angle data | Opens quadrant selection | Card remains pinned; math text is rendered by HTML/SVG | Angle read aloud; clear degree symbol label | Card frame, ray SVG, buttons |
| 5. Quadrant Selection | Four large land/quadrant choices around mini circle | Select Q1–Q4; request hint after enabled | choice and correct quadrant | Correct land highlights and continues | Incorrect choice stays selectable; progressive hint and causal feedback | Spatial order plus explicit Q labels; arrow keys or tab | Quadrant map control, hint button |
| 6. Cos Bridge | Horizontal bridge, protagonist, four-card hand, left/right projection, +/− choices | Select Cos card, then direction and sign; retry/hint | selected card, quadrant, cosine sign | Bridge extends and protagonist crosses | Wrong card explains obstacle-function clue; wrong sign shows x-position consequence | Never rely on motion; live-region feedback | Bridge states, protagonist poses, Cos card, SVG x projection |
| 7. Sin Tower | Vertical tower, protagonist, four-card hand, up/down projection, +/− choices | Select Sin card, then direction and sign | selected card, quadrant, sine sign | Lift carries protagonist in correct direction | Wrong card explains vertical-function clue; wrong sign shows y-position consequence | Static alternate; labeled direction buttons | Tower states, protagonist poses, Sin card, SVG y projection |
| 8. Tan Gate | Gate, protagonist, four-card hand, two sign sockets, fraction layout | Select Tan card, then same/different and +/−; retry/hint | selected card, prior signs, derived Tan | Gate opens and protagonist passes | Wrong card/sign keeps gate closed and explains relation | Fraction has semantic text equivalent | Gate states, protagonist poses, Tan card, sign tokens |
| 9. Reflection | One causal question with 3–4 options; prior diagram available | Select explanation; submit; retry | prompt/options/correct rationale | Correct explanation summarized | Incorrect explains conflict, then retries with option order stable | Radio semantics; no timed dismissal | Panel, diagram thumbnail, submit |
| 10. Land Completion / Assembly | Fragment reveal, land recap, Continue/Map | Claim fragment; draw next Angle Card | fragment, score, land status | Fragment joins Unit Circle; next planned Angle Card enters play | Save failure warns and allows continue in memory | Reduced-motion assembly; status announced | Fragment, assembly effect, protagonist reward pose |
| 11. Final Challenge | Five-item progress, compact chain response, neutral reference toggle | Choose quadrant, Cos, Sin, Tan; submit item; navigate only after commit | seeded item set and responses | All five submitted | No hints; incomplete step highlighted, not marked wrong before submit | Fieldset per item; reference accessible by keyboard | Final frame, SVG circle, progress control |
| 12. Results & Debrief | Restored circle, six category summaries, misconception feedback, Review/Replay | Inspect results; review answers; start fresh | aggregate analytics and completion | Completion badge shown; session marked complete | Missing/corrupt events display available results plus limitation | Text and pattern labels on charts; no color-only bars | Badge, restored circle, category bars, buttons |

Recommendation: combine **Angle Card** and **Quadrant Selection** into one responsive scene after the tutorial. Keep the Angle Card pinned while the player selects a land. Inside each obstacle, keep the four-card hand visible and require card selection before sign selection.

## 7. Obstacle Interaction Design

### Cos Bridge

- Prompt: “จุดของมุมนี้อยู่ทางซ้ายหรือขวาของจุดกำเนิด? ดังนั้น cos θ เป็นบวกหรือลบ?”
- Choices: Step A choose `Cos / Sin / Tan / All`; Step B `ซ้าย / ขวา`; Step C `บวก (+) / ลบ (−)`.
- Card logic: Cos is correct. Sin or Tan triggers a conceptual mismatch hint. All is reserved for combined obstacles and Final Challenge, so it is not accepted here.
- Logic: quadrant in {Q1,Q4} gives right and positive; {Q2,Q3} gives left and negative.
- Incorrect behavior: preserve selected choice, show a short mismatch cue, increment attempt, enable next hint. Do not advance.
- Visual consequence: SVG horizontal projection grows from point to y-axis; bridge extends right or left. Reduced motion swaps instantly with a fade.
- Correct feedback: “cos θ คือพิกัด x จุดอยู่ทางซ้ายของจุดกำเนิด จึงมี x < 0 และ cos θ < 0.” Adapt direction/sign.
- Retry: unlimited; score floor remains positive.
- Record: angle ID, selected skill card, card-match correctness, direction choice, sign choice, correctness per substep, attempts, max hint, response time.

### Sin Tower

- Prompt: “จุดของมุมนี้อยู่เหนือหรือต่ำกว่าแกน x? ดังนั้น sin θ เป็นบวกหรือลบ?”
- Choices: Step A choose `Cos / Sin / Tan / All`; Step B `ขึ้น/เหนือ / ลง/ใต้`; Step C `บวก (+) / ลบ (−)`.
- Card logic: Sin is correct. Other cards trigger a vertical-position hint; All is not accepted for this single-function obstacle.
- Logic: {Q1,Q2} gives up and positive; {Q3,Q4} gives down and negative.
- Incorrect behavior: tower platform pauses at origin; next hint becomes available; no fall or failure imagery.
- Visual consequence: vertical projection grows; lift moves up/down. Static alternate shows the endpoint and labeled y relation.
- Correct feedback: “sin θ คือพิกัด y จุดอยู่ต่ำกว่าแกน x จึงมี y < 0 และ sin θ < 0.”
- Retry and record: same policy as Cos Bridge, including selected skill card, stored under function `sin`.

### Tan Gate

- Prompt: “sin θ และ cos θ มีเครื่องหมายเหมือนหรือต่างกัน? แล้ว tan θ เป็นบวกหรือลบ?”
- Choices: Step A choose `Cos / Sin / Tan / All`; Step B `เหมือนกัน / ต่างกัน`; Step C `บวก (+) / ลบ (−)`.
- Card logic: Tan is correct. Cos or Sin alone cannot resolve the gate. All is reserved for the Final Challenge's combined chain.
- Logic: derive stored/validated signs independently from quadrant. Same signs produce positive; different signs produce negative.
- Incorrect behavior: sign tokens remain visible; gate does not open; highlight only the relationship row, not the answer.
- Visual consequence: place sign tokens into `tan θ = sin θ / cos θ`; gate glyph resolves to + or −. No mathematical meaning depends on color.
- Correct feedback: “tan θ = sin θ / cos θ. เครื่องหมายต่างกัน จึงได้ผลหารเป็นลบ.” Adapt relation.
- Retry: unlimited; a learner cannot bypass the derivation step by guessing only tangent.
- Record: selected skill card, card-match correctness, displayed input signs, relation choice, tangent choice, attempts, hints, and whether prior Cos/Sin answers were correct.

### All Card

- Purpose: represents the complete `Quadrant → Cos → Sin → Tan` chain, not a universal shortcut.
- Guided lands: visible but unavailable for single-function obstacles. Selecting it explains: “การ์ด All ใช้เมื่อโจทย์ต้องวิเคราะห์ครบทั้งสามฟังก์ชัน.” The player then selects again without losing base points on the first tutorial exposure.
- Final Challenge: correct card for a combined obstacle that requests all three signs. After selecting All, the player must still enter each sign; the card never fills answers automatically.
- Learning evidence: whether the learner distinguishes a single-function obstacle from a combined task.

All obstacle resolutions use a deterministic FIFO learning-action queue: validate response, record event, show conceptual feedback, resolve animation, transition. Input locks only during the brief resolution and unlocks if interrupted.

## 8. Hint and Feedback System

Hints unlock sequentially after an incorrect attempt or by explicit request after 6 seconds. The learner must still submit an answer.

| Mistake type | Hint 1: minimal | Hint 2: conceptual | Hint 3: visual | Must not reveal immediately |
|---|---|---|---|---|
| Quadrant | “เริ่มจากแกน x บวก แล้วหมุนทวนเข็มนาฬิกา” | Show interval choices containing the angle | Animate ray sweep and highlight the containing sector | Do not name quadrant before Hint 3; Hint 3 labels sector but still requires selection |
| Wrong skill card | “อุปสรรคนี้ตรวจตำแหน่งแนวนอน แนวตั้ง หรือความสัมพันธ์ของสองเครื่องหมาย?” | Link horizontal→Cos, vertical→Sin, relation→Tan; explain All means complete chain | Highlight the obstacle feature and the matching symbol on the relevant card, without selecting it | Do not reveal the sign |
| Cos sign | “มองตำแหน่งในแนวนอน” | “cos θ คือพิกัด x: ขวาเป็นบวก ซ้ายเป็นลบ” | Draw horizontal projection and label x>0 or x<0 | Do not highlight +/− answer button |
| Sin sign | “มองตำแหน่งในแนวตั้ง” | “sin θ คือพิกัด y: ขึ้นเป็นบวก ลงเป็นลบ” | Draw vertical projection and label y>0 or y<0 | Do not highlight +/− answer button |
| Tan sign | “เปรียบเทียบเครื่องหมายของ sin และ cos” | Show `tan θ = sin θ / cos θ` and same/different rule | Place both known signs into fraction; leave result blank | Do not fill tangent sign |
| Explanation | “เลือกคำอธิบายที่บอกทั้งตำแหน่งและพิกัด” | Re-highlight x for cos or y for sin | Replay relevant projection, then restore options | Do not remove distractors or auto-select |

Scoring effect per task: Hint 1 −10%, Hint 2 −20%, Hint 3 −30% from that task’s available points; only the highest hint level applies, not cumulative. Retry deductions are separate but total task score never falls below 40% after a correct answer. Tutorial hints do not affect score.

Record `hint_requested`, `hint_shown`, level, trigger (`learner` or `after_error`), task, attempt number, and time. Feedback has three layers: outcome (“ถูกต้อง”), concept (“cos is x”), and evidence (“point is left, so x<0”). Avoid praise based on speed or intelligence.

## 9. Scoring and Reward System

### Base points

| Item | Base points | First-attempt bonus | Notes |
|---|---:|---:|---|
| Quadrant selection | 100 | +25 | Per Angle Card |
| Cos Bridge | 80 | +20 | Includes direction and sign |
| Sin Tower | 80 | +20 | Includes direction and sign |
| Tan Gate | 100 | +25 | Includes relation and sign |
| Reflection | 60 | +15 | Explanation evidence |
| Land completion | 100 | — | Awarded after the one Angle Card's three obstacles and reflection |
| Final Challenge item | 200 | +50 when full chain first-try | Five items |
| All four lands | 250 | — | Completion bonus |
| Final 5/5 full-chain | 250 | — | Optional mastery bonus |

Per task multiplier after success: attempt 1 = 1.00; attempt 2 = 0.80; attempt 3+ = 0.60. Apply highest-hint multiplier: none = 1.00, H1 = 0.90, H2 = 0.80, H3 = 0.70. Score formula is `round(base × attempt multiplier × hint multiplier) + eligible first-attempt bonus`. Minimum corrected score is 40% of base.

Scores never block progress and never display a failing label. Results emphasize concept mastery before total points.

### Non-competitive rewards

- Land fragment: one quadrant-shaped artifact per restored land.
- Completed Unit Circle: all fragments assemble with correct axes and quadrant positions.
- Badge: “ผู้พิทักษ์วงกลมหนึ่งหน่วย” / localization key, earned by completing Final Challenge regardless of score.
- Optional stars: one per land for completion, conceptual explanation accuracy, and low support. Stars can improve on replay; no public rank.

## 10. Assessment and Analytics

Analytics remains local in MVP. Each event includes `eventId`, `schemaVersion`, `sessionId`, `timestamp`, `locale`, `stage`, `land`, `angleId`, and optional `elapsedMs`.

| Event | Required payload |
|---|---|
| session_started/resumed/completed | session ID, start/resume mode, completion status |
| angle_activated | current land, angle ID, display angle, normalized angle |
| response_submitted | task/function, selected quadrant/sign/relation, correct value, attempt, correct flag |
| hint_used | task, hint level, trigger, attempt |
| feedback_viewed | feedback key, duration if enabled |
| reflection_submitted | reflection option ID, correct flag, linked misconception tag |
| land_completed | land, fragment, score, completion status |
| final_item_completed | all selected and correct values, attempts, item result |
| results_viewed | aggregate result and review action |

Required session projection: session ID, current land, angle ID, selected/correct quadrant, selected skill card, required function, card-match correctness, selected/correct sign, attempts, highest hint level, reflection answer, optional time, completion status, and Final Challenge result.

### Misconception rules

| Pattern | Detection threshold | Interpretation | Debrief response |
|---|---|---|---|
| Repeated quadrant mistakes | Same wrong mapping on ≥2 of last 3 relevant items | Quadrant order/interval confusion | Review counterclockwise sweep and intervals |
| Cos wrong, Sin correct | Cos wrong on ≥2 items where Sin first-attempt correct | x/cos link weak | Replay horizontal projection examples |
| Sin wrong, Cos correct | Sin wrong on ≥2 items where Cos first-attempt correct | y/sin link weak | Replay vertical projection examples |
| Tan wrong after Cos/Sin correct | ≥2 cases with both inputs correct and Tan wrong | Sign division rule weak | Compare same-sign and different-sign fractions |
| Correct sign, wrong explanation | ≥2 tasks with correct outcome and wrong reflection | Guessing or memorized table | Mark “answer correct; reasoning needs practice” |
| Q2/Q4 swap | Chooses Q4 for Q2 or reverse twice | Vertical sign or angle direction confusion | Side-by-side comparison on right/left and above/below |

Do not infer a misconception from one error. Store tags as hypotheses, not diagnoses. Provide no teacher-facing claim beyond observed patterns.

## 11. Content Data Model

### Question record

| Field | Type/rule |
|---|---|
| `id` | Stable unique string |
| `displayAngle` | Number shown to learner |
| `normalizedAngle` | Derived 0≤θ<360 |
| `angleUnit` | `degree` in MVP; schema permits `radian` later |
| `quadrant` | Derived Q1–Q4; authored expected value used for validation |
| `sinSign`, `cosSign`, `tanSign` | Derived; authored copies optional only as validation assertions |
| `land` | Q1–Q4 land ID; must match quadrant |
| `difficulty` | tutorial, guided-1…4, final |
| `hints` | Per task, levels 1–3 as localization keys plus visual action IDs |
| `reflectionPromptKey` | Localization key |
| `reflectionOptions` | Stable IDs, text keys, one correct ID, misconception tag per distractor |
| `explanationKey` | Correct causal explanation localization key |
| `tags` | concept, transfer, comparison, content version |
| `enabled` | Boolean for content release control |

### Localization model

Content records store keys, never embedded UI sentences: `question.<id>.reflection.prompt`, `question.<id>.reflection.option.<optionId>`, `feedback.cos.left.negative`. Locale dictionaries supply Thai and later English. Mathematical symbols remain locale-neutral; accessible spoken labels are localized.

### Derivation and validation

1. Normalize degrees with mathematical modulo into [0,360).
2. Reject axis angles where normalized angle mod 90 = 0.
3. Derive quadrant from strict intervals.
4. Derive cosine from x side, sine from y side, tangent from sign equality.
5. At build/test time, reject duplicate IDs, invalid locale keys, incorrect land mapping, contradictory authored assertions, missing three-level hints, missing reflection answer, or malformed distractor tags.
6. At runtime, feedback reads only derived truth plus validated localization keys. Never trust a hand-authored sign independently.

Final selection constraints: five unique items; all four quadrants represented; at least two negative-tangent items; no guided angle repeated; deterministic seed stored with session.

## 12. 2D Asset Checklist

Text, numbers, axes, signs, card values, and mathematical labels must be HTML/SVG overlays.

### Characters

| Asset | Purpose/description | Size/format | Alpha | Screens | Priority |
|---|---|---|---|---|---|
| Main protagonist core set | The only character: a young fantasy explorer with neutral academic-adventure identity; idle, thinking, choose-card, correct, incorrect/reconsider, and celebrate | 1024×1024 master per pose; WebP exports; optional SVG if vector | Yes | All gameplay screens | Essential |
| Horizontal movement set | Same protagonist steps/runs left and right; carries selected Cos card glow | 1024×1024 per pose or sprite strip | Yes | Cos Bridge | Essential |
| Vertical movement set | Same protagonist rides/climbs up and down; carries selected Sin card glow | Same | Yes | Sin Tower | Essential |
| Gate action set | Same protagonist compares two sign tokens, presents Tan card, and passes gate | Same | Yes | Tan Gate | Essential |
| Assembly/final set | Same protagonist places fragment and raises completed circle | Same | Yes | Land completion, results | Useful |
| Expression variants | Curious, focused, relieved; always same model and proportions | 1024×1024 WebP | Yes | Tutorial, feedback | Optional |

### Backgrounds

| Asset | Visual description | Size/format | Alpha/text | Screens | Priority |
|---|---|---|---|---|---|
| Dawn Meadow | Warm sunrise, open right/up paths, low detail center | 2560×1440 AVIF/WebP | No; no text | Q1 scenes | Essential |
| Westwind Cliffs | Wind-carved cliffs, left/up silhouette | 2560×1440 AVIF/WebP | No | Q2 | Essential |
| Shadow Caverns | Readable dark cave, left/down route, high foreground contrast | 2560×1440 AVIF/WebP | No | Q3 | Essential |
| Tidefall Coast | Moonlit coast, right/down water flow | 2560×1440 AVIF/WebP | No | Q4 | Essential |
| Kingdom map base | Four lands around central empty circle | 2048×1536 WebP or layered SVG | No labels | Map | Essential |
| Results panorama | Restored unified kingdom | 2560×1440 WebP | No | Results | Useful |

### Obstacles

| Asset | States/description | Size/format | Alpha | Screens | Priority |
|---|---|---|---|---|---|
| Cos Bridge | broken, left-extended, right-extended, restored; modular horizontal planks/light | 1600×700 layered WebP/PNG | Yes | Cos Bridge | Essential |
| Sin Tower | idle, up, down, restored; vertical lift and guide rails | 900×1400 layered WebP/PNG | Yes | Sin Tower | Essential |
| Tan Gate | closed, sign sockets, resolving, open | 1200×1400 layered WebP/PNG | Yes | Tan Gate | Essential |
| Projection glows | Horizontal and vertical trail textures | 1024×256 / 256×1024 PNG/WebP | Yes | Obstacles/tutorial | Useful |

### Cards

| Asset | Purpose/description | Size/format | Alpha/text | Screens | Priority |
|---|---|---|---|---|---|
| Angle Card frame | Parchment field-journal frame with open math area | 900×1260 PNG/WebP or SVG | Yes; UI adds text | Angle Card/final | Essential |
| Land card accents | Four corner/border variants by land | 900×1260 PNG/WebP | Yes; no text | Land cards | Useful |
| Cos skill card | Horizontal-axis/bridge motif; no separate character | 700×980 WebP/SVG | Yes; name and symbol rendered by UI | Cos Bridge, hand | Essential |
| Sin skill card | Vertical-axis/tower motif; no separate character | 700×980 WebP/SVG | Yes; name and symbol rendered by UI | Sin Tower, hand | Essential |
| Tan skill card | Paired-sign/gate motif; no separate character | 700×980 WebP/SVG | Yes; name and symbol rendered by UI | Tan Gate, hand | Essential |
| All skill card | Combined x/y/fraction motif; never auto-solves signs | 700×980 WebP/SVG | Yes; name and symbols rendered by UI | Tutorial, hand, Final Challenge | Essential |
| Sign cards | Neutral sockets/tiles for + and − | SVG | Yes; symbol rendered in SVG/UI | Obstacles | Essential |

### UI and effects

| Asset | Purpose/description | Size/format | Alpha/text | Screens | Priority |
|---|---|---|---|---|---|
| Buttons/panels/borders | Nine-slice fantasy journal surfaces; normal/hover/focus/pressed/disabled | SVG/PNG slices | Yes; all text in UI | All | Essential |
| Icons | Hint, sound, motion, replay, map, close, info | 24 px SVG, 2 px stroke | Yes; accessible label in UI | All | Essential |
| Correct effect | Gold-green spark/line burst, not color-only | 512×512 sprite/WebP or CSS/SVG | Yes | Feedback | Useful |
| Incorrect effect | Gentle amber ripple/question mark line; no red punishment | 512×512 or CSS/SVG | Yes | Feedback | Useful |
| Hint effect | Lantern beam/highlight ring | 512×512 or CSS/SVG | Yes | Hint states | Useful |
| Four fragments | Distinct quadrant-shaped pieces with texture and position notch | 768×768 each PNG/WebP | Yes; labels in UI | Completion/map | Essential |
| Assembly effect | Four-piece join and pulse | CSS/Framer/SVG; no raster required | Yes | Completion/results | Essential |
| Completion badge base | Crest with empty localized title band | 1024×1024 WebP/SVG | Yes; title in UI | Results | Useful |
| Focus/selection rings | High-contrast scalable outline | CSS/SVG | Yes | All controls | Essential |

Asset production rules: one approved protagonist turnaround is the sole character authority. Retain common orthographic perspective, fixed body and costume proportions, shared light direction, stable palette references, transparent safe margins, filenames with protagonist/action/direction/version, and source metadata. Skill cards may contain symbols or tools but never humanoid mascots or faces. Test every essential asset at 768 px viewport height before approval.

## 13. Visual Style Guide Options

The concept roll ran in degraded mode: no external challengers or quality-bar boards were available. Options below come from grounded project analysis plus local UI/UX guidance.

### Option A — Enchanted Board Game

- World: chunky clay-like pieces on a tabletop kingdom board.
- Advantages: inviting, tactile, strong state changes, easy land differentiation.
- Disadvantages: risks feeling too young for upper-secondary learners; faux-3D assets increase consistency burden.
- UI: rounded 16–20 px panels, thick borders, pressed-piece interactions.

### Option B — Celestial Academy Atlas

- World: precise observatory maps, dark indigo sky, luminous geometric overlays.
- Advantages: mathematically credible, high contrast, elegant Unit Circle focus.
- Disadvantages: darker atmosphere may weaken friendly adventure tone; glow can reduce text clarity.
- UI: thin brass rules, restrained panels, luminous SVG lines.

### Option C — Living Field Journal — Recommended

- World: illustrated expedition journal whose four map regions awaken as concepts are mastered.
- Advantages: suits teen learners, supports cards naturally, separates warm fantasy art from exact SVG mathematics, scales across map, obstacles, and debrief.
- Disadvantages: parchment conventions can become beige or cluttered; requires disciplined whitespace and contrast.
- First viewport: broken circle embossed across an open map, with four quadrant tears aligned to lands; Start action sits at the circle’s origin.
- Signature interaction: the current angle ray “draws” onto the journal, then horizontal and vertical ink projections become physical paths in the land.

### Recommended preliminary guide

- Art: clean 2D storybook vector/raster hybrid; restrained texture, no photorealism.
- Viewpoint: side-on obstacle scenes; top-down/oblique kingdom map; orthographic educational overlays.
- Palette: ink navy `#1E2A44`, parchment `#F6E8C8`, dawn gold `#E9A23B`, meadow green `#4F8A5B`, cliff blue `#557AA6`, cavern violet `#65507C`, tide teal `#2F8391`; error amber `#B65A2A`; success green `#287A4B`. Verify text pairings at 4.5:1.
- Character proportions: the single protagonist is 3.5–4 heads tall with readable hands and props. Every pose uses the same face, costume, eye line, body ratio, and handedness.
- Outlines: dark navy, 2–4 px at final scale; no pure black.
- Lighting: upper-left key light shared across assets; one land accent light; no glow behind body text.
- Background detail: detailed edges, quiet interaction center; foreground contrast below controls.
- UI: journal tabs and map pins, but flat semantic controls; 12–16 px corners, 2 px borders, visible 3 px focus ring.
- Motion: 160–240 ms controls, 400–700 ms learning projections, 900 ms reward assembly maximum. Motion communicates direction; reduced-motion uses state swaps and opacity only.
- Typography: Thai-first rounded humanist sans. Recommended production evaluation: **Noto Sans Thai** for body/UI and **IBM Plex Sans Thai** or a custom display treatment for headings. Avoid Comic Neue for upper-secondary tone despite local search suggestion.
- Accessibility: WCAG 2.2 AA, 16 px minimum body, 1.5 line height, 44×44 px preferred targets with ≥8 px gaps, patterns/icons plus color, captions for audio, semantic math descriptions, zoom to 200%, keyboard-only completion.
- AI consistency: one approved style sheet and one protagonist turnaround; every pose references that same protagonist. Lock palette, costume, proportions, handedness, and light direction. Generate no text/math and introduce no secondary mascots. Human review checks identity, anatomy, silhouette, age tone, and cultural fit.

## 14. Recommended MVP Technical Architecture

### Routes

- `/` start/resume.
- `/play` single game shell for tutorial, map, cards, obstacles, assembly, and Final Challenge. Internal finite state controls scenes; routes do not multiply for each obstacle.
- `/results` session debrief; redirects safely if no completed/active session.

### Boundaries

- `GameShell`: layout, navigation guards, progress, preferences.
- `UnitCircle`: SVG axes, quadrant sectors, ray, point, x/y projections, accessible description.
- `AngleCard`: localized angle presentation and state.
- `QuadrantSelector`: four explicit choices and spatial map.
- `SkillCardHand`: persistent Cos, Sin, Tan, and All cards with single-selection and active-card states.
- `ObstacleScene`: shared prompt/feedback/hint shell.
- `CosBridge`, `SinTower`, `TanGate`: function-specific interaction and visual mapping.
- `ReflectionPanel`, `LandAssembly`, `FinalChallenge`, `ResultsBreakdown`.
- `FeedbackPanel`: consistent outcome/concept/evidence layers.

### State slices

- `session`: ID, schema/content versions, locale, timestamps, completion.
- `progress`: phase, land, card index, completed lands/fragments.
- `currentTask`: angle ID, obstacle, required function, selected skill card, attempt, sign selections, hint level, lock state.
- `responses`: normalized immutable response records.
- `score`: awarded entries and aggregate; recomputable from events.
- `preferences`: sound, reduced motion, time tracking.
- `finalChallenge`: seed, item IDs, item status, results.

Use a small finite-state reducer or Zustand store with explicit transitions. Keep content, derivation, scoring, and persistence as pure services. UI never authors mathematical truth.

### Services and data

- `contentRepository`: loads versioned JSON/TypeScript data and locale dictionaries.
- `mathRules`: normalize angle, reject axes, derive quadrant/signs.
- `contentValidator`: compares authored assertions to derived results during tests/build.
- `scoringService`: pure calculation from base points, attempts, and hints.
- `hintPolicy`: determines unlocked hint without embedding copy.
- `analyticsRecorder`: append-only local events; derives summaries.
- `persistence`: one versioned localStorage document, validated on load, migrated only when safe.

Persistence key example: product namespace + schema version. Save after each committed response and land transition, debounce non-critical preference saves, and keep last valid snapshot in memory. No personal data.

Animation uses CSS for control states and simple transitions. Use Framer Motion only if assembly/projection choreography benefits enough to justify dependency. Lazy-load land backgrounds and character poses for the next scene; preload current essentials; reserve dimensions to avoid layout shift.

Localization uses stable keys, ICU-compatible variable placeholders, `lang="th"`, no text in art, flexible control widths, and pseudo-localization tests. Unit Circle accessible text states angle, quadrant, x direction, y direction, and derived signs.

## 15. Risks and Mitigations

| Category | Risk | Impact | Likelihood | Mitigation | User decision |
|---|---|---:|---:|---|---|
| Learning | Players memorize land colors instead of reasoning | High | Medium | Mix visual themes in Final; require explanation; neutral reference | Approve no sign-coded land colors |
| Learning | Too many repeated steps cause fatigue | High | Low | One Angle Card per land; one compact card/sign interaction per obstacle | Approve one drawn card per land from a three-angle content pool |
| Learning | Tangent becomes rule memorization | High | Medium | Always show derived sign fraction; measure same/different step | Confirm tangent derivation remains mandatory |
| Learning | Angle normalization not taught | Medium | Low for chosen MVP angles | Keep angles 1–359° in MVP; defer coterminal angles | Approve range restriction |
| UX | Narrative decoration obscures math | High | Medium | Quiet interaction center; SVG overlays; decoration never encodes truth | Approve journal direction |
| UX | 10–15 minute target exceeded | High | Medium | Classroom playtest; time budget per scene; skip repeated transition | Approve content count |
| UX | Learners fear score loss | Medium | Medium | Concept-first feedback, score hidden during errors, positive floor | Approve motivational scoring |
| Technical | Stored state breaks after content update | Medium | Medium | Schema/content versions, validation, safe new-session fallback | Approve local resume only |
| Technical | Contradictory authored signs | High | Medium | Single derivation service and build-time validation | None; mandatory safeguard |
| Technical | State duplication across cards/scenes | High | Low | Explicit finite states and immutable response log | None |
| Assets | Character proportions drift across generated poses | Medium | High | Turnaround sheet, reference lock, human review | Choose asset workflow in Phase 2 |
| Assets | Backgrounds reduce control readability | High | Medium | Quiet centers, contrast scrim tokens, viewport tests | Approve layered assets |
| Accessibility | Direction shown only through motion/color | High | Medium | Text, arrows, patterns, live region, reduced motion | Confirm WCAG 2.2 AA target |
| Accessibility | Thai line wrapping clips buttons | High | Medium | Flexible height, Thai font testing, pseudo-localization | Approve font evaluation |
| Performance | Large layered art slows tablets | Medium | Medium | AVIF/WebP, responsive sources, preload one scene, 2 MB initial target | Approve asset budget |
| Scope | Teacher dashboards/accounts creep into MVP | High | Medium | Local summary only; defer backend | Confirm exclusion |

## 16. MVP Acceptance Criteria

### Phase 1 completeness

- [x] Measurable learning outcomes map to gameplay evidence and misconceptions.
- [x] Full start-to-debrief loop is specified.
- [x] Q1–Q4 progression, content counts, hint fading, and Final Challenge are defined.
- [x] Twelve required screens have purpose, states, data, accessibility, assets, and interactions.
- [x] Cos, Sin, and Tan interactions are mathematically correct and retry-safe.
- [x] Three-level hint system and non-blocking score model are defined.
- [x] Local analytics and misconception detection rules are defined.
- [x] Content model derives one mathematical truth and validates authored content.
- [x] Asset checklist and preliminary visual system are defined without asset generation.
- [x] Small-MVP architecture avoids backend and excess systems.
- [x] Risks and user decisions are explicit.

### Phase 2 readiness / eventual MVP behavior

- [ ] Learner starts without account and may resume a valid local session.
- [ ] Tutorial teaches Cos=x, Sin=y, and Tan=Sin/Cos through a worked spatial example.
- [ ] Learner receives an Angle Card and selects a quadrant.
- [ ] One consistent protagonist appears across tutorial, all lands, assembly, Final Challenge, and results; no Cos/Sin/Tan character variants exist.
- [ ] Learner selects Cos, Sin, Tan, or All before answering each obstacle; All works only for combined tasks.
- [ ] Wrong choices unlock progressive, non-answering hints.
- [ ] Learner completes Cos, Sin, and Tan obstacles with explanatory feedback.
- [ ] Learner answers a causal reflection question.
- [ ] All four land fragments restore the Unit Circle.
- [ ] Final Challenge contains five unfamiliar, balanced, hint-free questions.
- [ ] Results separate quadrant, Cos, Sin, Tan, reflection, retry, and hint evidence.
- [ ] Every supported flow works by keyboard, pointer, and touch with reduced motion.
- [ ] All enabled content passes axis-angle, quadrant, sign, localization, and contradiction validation.
- [ ] A representative classroom playtest median falls within 10–15 minutes.

## 17. Locked Decisions D1–D12

| ID | Approved decision | Status |
|---|---|---|
| D1 | Formative-only progression: incorrect answers show consequences, explanations, progressive hints, and unlimited retries; no fail gate. | Locked |
| D2 | One guided Angle Card per land; four fragments plus five mixed Final Challenge items complete the game. | Locked |
| D3 | Keep the Angle Card visible while the player selects its matching land; a wrong land reveals the interactive Unit Circle and returns to selection. | Locked |
| D4 | Living Field Journal is the final 2D visual direction. | Locked |
| D5 | Correct obstacle answers award motivational points. Points are not grades and retries remain available. | Locked |
| D6 | Reflection uses causal multiple-choice explanations; feedback always states the mathematical reason. | Locked |
| D7 | Unit Circle and mathematical labels use HTML/SVG. Final Challenge may show a neutral Unit Circle without sign answers. | Locked |
| D8 | MVP uses non-axis degree angles from 1°–359°; examples include 30°, 120°, 210°, and 330°. | Locked |
| D9 | Session state and learning evidence remain local; no account, backend, leaderboard, or cloud analytics. | Locked |
| D10 | Phase 3 target remains Next.js, TypeScript, Tailwind CSS, lightweight local state, SVG, and optional Framer Motion. No application code is authorized in Phase 2. | Locked |
| D11 | Thai-first digital typography uses Noto Sans Thai for body/UI and IBM Plex Sans Thai for display evaluation. No critical text is baked into art. | Locked |
| D12 | Target WCAG 2.2 AA, 44×44 px controls, non-color cues, reduced-motion fallbacks, and an initial-load art budget of 2 MB. | Locked |

## 18. Recommended Next Steps for Phase 2

Phase 2 authorized actions:

1. Create asset inventory, visual style guide, prompt system, screen mapping, and manifest.
2. Generate the initial style-test set only.
3. Stop for user approval of Pathfinder, palette, backgrounds, cards, and obstacles.
4. Do not begin full production or Phase 3 implementation before approval.

## Phase 2 Authorization Record

- Gameplay specification and D1–D12 approved by user on 2026-09-11.
- Living Field Journal approved.
- Phase 2 planning and initial style-test asset generation authorized.
- Full asset production and Phase 3 remain blocked until explicit style-test approval.
