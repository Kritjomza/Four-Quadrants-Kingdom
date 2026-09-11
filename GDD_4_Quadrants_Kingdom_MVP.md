# Game Design Document: Four Quadrants Kingdom

**Document status:** MVP design specification  
**Genre:** Single-player educational adventure puzzle / card-driven learning game  
**Platform:** Responsive web browser (desktop-first, tablet-compatible)  
**Target audience:** Upper-secondary students learning the Unit Circle and trigonometric signs  
**Estimated session length:** 10-15 minutes  

---

## 1. High Concept

*Four Quadrants Kingdom* is a web-based Digital Educational Game (DEG) in which learners restore a broken magical Unit Circle. The kingdom is divided into four lands, each representing one quadrant of the coordinate plane. Players receive Angle Cards, determine each angle's quadrant, then solve short obstacle challenges involving the signs of sine, cosine, and tangent.

The game is designed to help learners construct understanding from position and direction instead of memorizing a sign table. Cosine is represented by horizontal movement on the x-axis, sine by vertical movement on the y-axis, and tangent by the relationship between the two signs.

The central learning chain is:

```text
Angle -> Quadrant -> x/y position -> Cos/Sin sign -> Tan sign
```

---

## 2. Product Goals

### 2.1 Learning goals

By the end of a successful play session, a learner should be able to:

1. Identify the quadrant containing a given angle.
2. Connect cosine to the horizontal coordinate (x-axis).
3. Connect sine to the vertical coordinate (y-axis).
4. Derive the sign of tangent from the signs of sine and cosine.
5. Explain why a trigonometric sign is positive or negative in a quadrant.
6. Apply the rule to unfamiliar angles, including a final mixed-quadrant challenge.

### 2.2 Experience goals

- Make trigonometry feel like a sequence of discoverable spatial relationships.
- Give immediate, explanatory feedback instead of simply marking answers right or wrong.
- Reward persistence and self-correction without making Hint usage feel like failure.
- Keep the MVP focused enough to be completed and evaluated in a classroom context.

### 2.3 Non-goals for the MVP

- MMORPG gameplay, shared persistent world, guilds, or player economy.
- Real-time multiplayer or competitive rankings.
- Free-roam action-platformer controls such as WASD movement.
- Full instruction for exact trigonometric values, identities, graphing, or equations.
- Angles on the axes (0, 90, 180, 270, and 360 degrees), because these introduce zero values and undefined tangent.

---

## 3. Genre and Player Interaction

### 3.1 Genre definition

The game is a **single-player educational adventure puzzle** with **card-driven, choice-based interaction**. It uses a light narrative, a map, collectible kingdom fragments, visual feedback, and short puzzle encounters.

It is not an MMORPG. Players do not inhabit a persistent online world with other players, avatars, chat, parties, guilds, or an in-game economy.

### 3.2 Character control model

Players do not directly steer a character with keyboard or joystick controls. They make mathematical choices through buttons, cards, and map selections. Correct answers trigger contextual character animations:

- **Cos** moves right for a positive cosine and left for a negative cosine.
- **Sin** climbs upward for a positive sine and descends for a negative sine.
- **Tan** opens or closes a gate after evaluating whether the Sin and Cos signs are the same or different.

This makes motion a meaningful visual consequence of mathematical reasoning, rather than a separate dexterity challenge.

---

## 4. Narrative and Setting

The Magical Unit Circle once held the Four Quadrants Kingdom together. A disruption split it into four land fragments and sealed the paths between them. The player becomes a young Pathfinder who restores each land by reading Angle Cards and guiding three companions:

- **Cos:** the horizontal traveler; represents the x-coordinate and cosine.
- **Sin:** the vertical climber; represents the y-coordinate and sine.
- **Tan:** the observant gatekeeper; determines the sign of tangent from Sin and Cos.

Each restored land awards one circular fragment. After all four fragments are collected, the player rebuilds the Magical Unit Circle and enters the Final Challenge.

---

## 5. Core Learning Model

### 5.1 Concept mapping

| Mathematical idea | Game representation | Intended understanding |
|---|---|---|
| Quadrant | One of four colored lands | An angle belongs to a region of the coordinate plane. |
| x-coordinate | Cos bridge and left/right direction | Cosine is positive on the right and negative on the left. |
| y-coordinate | Sin tower and up/down direction | Sine is positive above and negative below. |
| Sin/Cos relationship | Tan gate | Same signs produce positive tangent; different signs produce negative tangent. |
| Unit Circle | Interactive visual reference | Positions, not memorization, determine signs. |

### 5.2 Sign reference

| Quadrant | Sin | Cos | Tan |
|---|---:|---:|---:|
| Q1 | + | + | + |
| Q2 | + | - | - |
| Q3 | - | - | + |
| Q4 | - | + | - |

The table is primarily shown in the final Debrief. During normal play, learners are encouraged to infer the signs from the displayed position and coordinate axes.

---

## 6. Core Gameplay Loop

```text
Receive Angle Card
  -> Select a Quadrant land
  -> If incorrect: receive progressive hint and try again
  -> Enter the correct land
  -> Solve Cos, Sin, and Tan obstacle encounters
  -> Receive immediate feedback after each answer
  -> Complete a short reflection question
  -> Earn score and a land fragment
  -> Receive a new Angle Card for the next locked land
  -> Restore all four lands
  -> Complete the Final Challenge
  -> Review results and sign rules
```

### 6.1 Standard round

1. The game deals an Angle Card, for example `120 degrees`.
2. The player identifies its quadrant and chooses the corresponding land on the map.
3. If the choice is wrong, the game does not reveal the answer immediately. It offers an optional progressive hint and lets the player choose again.
4. On entering the correct land, the player encounters three obstacles.
5. For each obstacle, the player selects the related function card and then its sign (`+` or `-`).
6. Correct answers animate the appropriate companion and open the path.
7. Incorrect answers show the failed outcome and explain the relevant x/y position.
8. The player completes one short reflection question after the land is restored.
9. The player earns the land fragment and advances to the next land.

---

## 7. Game Flow and Progression

### 7.1 World structure

| Land | Quadrant | Example angles | Main discovery |
|---|---|---|---|
| Dawn Meadow | Q1 | 30, 45, 60 degrees | Right and up: all signs are positive. |
| Westwind Cliffs | Q2 | 120, 135, 150 degrees | Left but up: Cos is negative, Sin is positive, Tan is negative. |
| Shadow Caverns | Q3 | 210, 225, 240 degrees | Left and down: Cos and Sin are negative, Tan is positive. |
| Tidefall Coast | Q4 | 300, 315, 330 degrees | Right but down: Cos is positive, Sin is negative, Tan is negative. |

The visual theme and names are cosmetic; the mathematical identity of each land must remain clear through visible quadrant labels and consistent color coding.

### 7.2 Difficulty progression

- **Q1:** Strong tutorial support, familiar angles, optional visual cues enabled by default.
- **Q2:** Fewer prompts; player compares new x-direction with Q1.
- **Q3:** Requires interpreting two negative coordinate directions.
- **Q4:** Requires comparison with all earlier quadrants and reduced hints.
- **Final Challenge:** Randomized mixed-quadrant angles not used in the main sequence. No hints.

### 7.3 Minimum content for MVP

The MVP uses one primary Angle Card per land plus a Final Challenge of five randomized questions. A stronger classroom version may provide two or three cards per land, but this is not required to validate the first playable version.

---

## 8. Obstacle Encounters

### 8.1 Cos Bridge

**Prompt:** Which function controls a horizontal bridge, and what sign does it have here?

- Correct card: Cos
- Positive answer: Cos crosses or extends right.
- Negative answer: Cos crosses or extends left.
- Learning feedback: "Cos follows the x-coordinate. This point is to the right/left of the y-axis."

### 8.2 Sin Tower

**Prompt:** Which function controls the vertical tower, and what sign does it have here?

- Correct card: Sin
- Positive answer: Sin climbs up.
- Negative answer: Sin descends down.
- Learning feedback: "Sin follows the y-coordinate. This point is above/below the x-axis."

### 8.3 Tan Gate

**Prompt:** Which function checks the relationship between Sin and Cos, and what sign does it have here?

- Correct card: Tan
- Positive answer: The Sin and Cos signs match.
- Negative answer: The Sin and Cos signs differ.
- Learning feedback: "Tan = Sin / Cos. Same signs make Tan positive; different signs make Tan negative."

### 8.4 All card

The `All` card may be included as a lightweight distractor or an advanced bonus action. It should not be necessary to clear normal MVP obstacles. If used, it asks the player to submit all three signs simultaneously for a score bonus.

---

## 9. Hint and Feedback System

### 9.1 Progressive hints for incorrect quadrant selection

| Hint level | Content | Learning purpose |
|---|---|---|
| 1 | "Which two cardinal angles surround 120 degrees?" | Reconnect the learner with angle ranges. |
| 2 | "90 degrees is on positive y; 180 degrees is on negative x." | Connect range boundaries to axes. |
| 3 | Show the Unit Circle with the target angle highlighted. | Make the position visible without replacing the final choice. |

### 9.2 Feedback principles

- Feedback appears immediately after a choice.
- Feedback names the mathematical reason, not only correctness.
- Wrong answers are recoverable; the learner can retry.
- Hints reduce a bonus score but never prevent progression.
- The game records each attempt so misconceptions can be identified later.

### 9.3 Example feedback

For an incorrect claim that `Cos(120 degrees)` is positive:

> Not yet. The point for 120 degrees lies to the left of the y-axis. Its x-coordinate is negative, so cosine is negative.

---

## 10. Scoring, Rewards, and Win Condition

### 10.1 Scoring model

| Event | Base score |
|---|---:|
| Correct Quadrant on first attempt | 100 |
| Correct Cos, Sin, or Tan obstacle | 100 each |
| Correct reflection | 50 |
| Land completion bonus | 150 |
| Final Challenge question | 150 each |

Suggested modifiers:

- A wrong attempt changes no existing score but removes the first-attempt bonus for that prompt.
- Hint 1, Hint 2, and Hint 3 remove 10, 15, and 25 bonus points respectively.
- A fully correct land without hints earns a "Clear Pathfinder" bonus.

### 10.2 Rewards

- One visual Unit Circle fragment for each restored land.
- A completed Magical Unit Circle after all four fragments are collected.
- A completion badge after the Final Challenge.
- A personal results screen, emphasizing mastery progress rather than competition.

### 10.3 Win condition

The player wins after collecting all four land fragments, rebuilding the Magical Unit Circle, and completing the Final Challenge. A score threshold can award gold/silver/bronze recognition, but it must not block access to the final learning summary.

---

## 11. Reflection and Assessment

### 11.1 Reflection prompts

Each land ends with a short explanation-oriented question. Example for Q2:

**Why is Cos negative in Quadrant 2?**

- Because the position has a negative x-coordinate. **(Correct)**
- Because the point is above the x-axis.
- Because Sin is positive.

### 11.2 Evidence collected during play

The game records:

- Quadrant selections and correctness.
- Function-card selections and correctness.
- Sin, Cos, and Tan sign responses.
- Number of retries.
- Hint levels used.
- Reflection answer correctness.
- Time spent per prompt, if analytics is enabled.

### 11.3 Misconception classification

| Pattern | Probable misconception | Recommended Debrief message |
|---|---|---|
| Repeated wrong quadrant selection | Weak understanding of angle intervals or rotation direction | Review the four angle ranges around the Unit Circle. |
| Cos wrong, Sin correct | Confusion about the x-axis | Cos follows horizontal position: right is positive, left is negative. |
| Sin wrong, Cos correct | Confusion about the y-axis | Sin follows vertical position: up is positive, down is negative. |
| Sin/Cos correct, Tan wrong | Does not yet derive Tan from sign relationship | Same signs give positive Tan; different signs give negative Tan. |
| Correct answer but wrong reflection | Likely memorization or guessing | Revisit the coordinate-based explanation. |

---

## 12. Screen List

| Screen | Purpose | Essential content |
|---|---|---|
| Start Screen | Begin session | Title, short premise, Start button. |
| Tutorial | Establish metaphor | x/y axes, Cos movement, Sin movement, Tan relationship. |
| Kingdom Map | Select a destination | Four colored lands, locked/unlocked state, circle fragments. |
| Angle Card Screen | Select quadrant | Angle card, Q1-Q4 choices, optional Unit Circle and Hint button. |
| Obstacle Screen | Solve function/sign puzzle | Obstacle illustration, function cards, plus/minus selector, feedback. |
| Reflection Screen | Check reasoning | One explanation question and concise result. |
| Assembly Screen | Mark progress | Animated placement of the land fragment into the Unit Circle. |
| Final Challenge | Assess transfer | Mixed random Angle Cards, all core steps, no hints. |
| Results/Debrief | Summarize learning | Score, accuracy by skill, hint use, misconceptions, sign table. |

---

## 13. UX and Accessibility Requirements

- Never rely on color alone to identify a quadrant; pair color with labels such as Q1 and a distinct icon/pattern.
- Use large, tap-friendly choice buttons.
- Support keyboard navigation and visible focus states.
- Keep mathematical feedback short, direct, and readable.
- Provide Thai as the initial classroom language; keep game content architecture ready for English localization.
- Respect reduced-motion preferences; animations must be skippable or non-essential.
- Use degrees in the initial flow; add radians only in Final Challenge or an advanced mode.

---

## 14. MVP Technical Design

### 14.1 Recommended stack

| Layer | Recommendation | Role |
|---|---|---|
| Web application | Next.js with TypeScript | Pages, UI, game logic, and report screens. |
| Styling | Tailwind CSS and a component library | Responsive visual system and reusable controls. |
| Game state | Zustand or React state machine | Session flow, scores, attempts, hints, and unlocked lands. |
| Circle visualization | SVG | Crisp axes, sectors, angle rays, and highlighted points. |
| Animation | Framer Motion or CSS transitions | Short feedback-driven character movement. |
| Persistence for prototype | Browser localStorage | No account needed for early testing. |
| Persistence after validation | Supabase PostgreSQL | Student sessions, analytics, and optional teacher dashboard. |
| Deployment | Vercel with Supabase | Fast web deployment and managed backend. |

### 14.2 Game state model

```text
Session
  - currentLand
  - currentAngle
  - completedLands
  - totalScore
  - hintUsage
  - attempts
  - finalChallengeProgress
  - results
```

### 14.3 Content-driven question format

Each question should be stored as structured content rather than embedded in UI code:

```text
AngleQuestion
  - id
  - displayAngle
  - angleUnit: degree | radian
  - quadrant: 1 | 2 | 3 | 4
  - sinSign: positive | negative
  - cosSign: positive | negative
  - tanSign: positive | negative
  - hintLevels[]
  - reflectionPrompt
  - reflectionOptions[]
```

The sign answers should normally be derived from the quadrant in the game engine, then verified against authored question data during content testing.

---

## 15. Final Challenge

The Final Challenge measures transfer rather than recall of the four featured land angles.

- Contains five randomly selected questions.
- Draws from all quadrants.
- Uses angles not shown during the normal land sequence.
- May include degree angles such as 135, 225, and 315 degrees.
- Advanced mode may include radians such as `3pi/4`, `5pi/4`, and `5pi/3`.
- Provides no hints.
- Requires quadrant selection and all three signs.

The learner always receives a complete Debrief after the challenge, regardless of score.

---

## 16. Future Expansion (Out of MVP Scope)

Potential later features:

- Teacher dashboard showing class-level misconceptions.
- Student accounts and longitudinal learning progress.
- Cooperative classroom mode where learners discuss an Angle Card before answering.
- More angle representations: radians, negative angles, reference angles, and coordinate points.
- Optional direct-control 2D exploration mode, while retaining answer gates for learning validity.
- Cosmetic customization and narrative chapters.

Any multiplayer mode should be designed as a separate learning feature, not added merely to turn the game into an MMORPG.

---

## 17. MVP Acceptance Criteria

The MVP is ready for learner testing when a player can:

1. Start a new session without creating an account.
2. Receive an Angle Card and select a quadrant from Q1-Q4.
3. Receive all three levels of progressive hint after a wrong quadrant choice.
4. Solve Cos, Sin, and Tan obstacle prompts with plus/minus selections.
5. See visually meaningful success and failure feedback tied to x/y position.
6. Complete one reflection question per land.
7. Collect all four circle fragments.
8. Complete a five-question mixed Final Challenge without hints.
9. View a results page with accuracy by Quadrant, Sin, Cos, Tan, reflection, and Hint usage.

---

## 18. Design Principles

1. **Position before memorization:** show why the sign follows the point's position.
2. **Choice before explanation:** allow a learner to commit to an idea before receiving feedback.
3. **Recoverable failure:** wrong answers lead to analysis and retry, not punishment.
4. **Visual metaphor with mathematical fidelity:** movement and obstacles must accurately represent coordinate directions.
5. **Assessment inside play:** evidence of learning is gathered through normal gameplay, not detached testing screens.
6. **MVP discipline:** validate the learning loop before adding multiplayer, large maps, or complex controls.

