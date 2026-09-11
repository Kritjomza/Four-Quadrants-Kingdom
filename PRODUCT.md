# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Phase 3 implementation target: Next.js, TypeScript, Tailwind CSS, Zustand or equivalent lightweight state store, SVG, CSS or Framer Motion, and localStorage. Phase 2 creates art direction and assets only.

## Users

Upper-secondary students who know basic angles but lack confidence identifying quadrants and trigonometric signs. Initial classroom use targets desktop and tablet browsers in Thai. Future English localization is required.

## Product Purpose

Four Quadrants Kingdom is a single-player, 10–15 minute educational adventure puzzle game. Learners restore a magical Unit Circle while reasoning through the chain: Angle → Quadrant → x/y Position → Cos/Sin Sign → Tan Sign.

Success means learners can identify quadrants, connect cosine to horizontal position and sine to vertical position, derive tangent signs, explain their reasoning, and transfer it to unfamiliar non-axis angles.

## Positioning

The game teaches trigonometric signs through spatial movement and causal explanation, not sign-table memorization. Each quadrant becomes a land; Cos Bridge, Sin Tower, and Tan Gate embody the coordinate and sign relationships.

## Operating Context

Teachers or students launch a browser session without an account. The learner completes four ordered lands, then a five-question mixed-quadrant challenge and debrief. Prototype progress and evidence remain local to the device.

## Capabilities and Constraints

- Single-player 2D web game; no multiplayer, accounts, rankings, or free-roam controls.
- Four lands: Q1 Dawn Meadow, Q2 Westwind Cliffs, Q3 Shadow Caverns, Q4 Tidefall Coast. The active Angle Card determines the correct land.
- One player-controlled protagonist travels through every land. Cos, Sin, and Tan are skill cards, not separate characters.
- Each guided land uses one Angle Card. The player identifies its quadrant and chooses the matching land. A wrong land shows the angle on an interactive Unit Circle, then allows retry.
- Inside the correct land, Cos Bridge tests horizontal/x position, Sin Tower tests vertical/y position, and Tan Gate tests the relationship between sine and cosine signs.
- For each obstacle, the player chooses the matching skill card and then a positive or negative sign. All is reserved for combined-sign challenges and the Final Challenge.
- Correct answers complete the obstacle, animate Pathfinder success, award points, and explain the mathematics. Incorrect answers show a recoverable visual consequence, explain the relevant x/y relationship, reveal a progressive hint, and allow retry.
- Completing all required obstacles awards that land's fragment. Collecting four fragments assembles the Magical Unit Circle and unlocks the Final Challenge.
- Angle cards exclude 0°, 90°, 180°, 270°, 360°, and all other axis-aligned coterminal angles in MVP.
- Required encounters: quadrant selection, Cos Bridge, Sin Tower, Tan Gate, reflection, land reward, final challenge, results.
- Assessment is formative: unlimited retries, no pass/fail progression gate, motivational points, progressive hints, and a final summary for every learner.
- Phase 1 produces analysis and specifications only. No implementation or generated assets.

## Brand Commitments

- Product name: Four Quadrants Kingdom.
- 2D fantasy adventure; colorful, friendly, clear silhouettes, consistent proportions.
- Mathematical labels, numbers, axes, and signs render through HTML or SVG, not baked into images.

## Evidence on Hand

The supplied learning brief, mathematical sign reference, target audience, feature constraints, and recommended stack are authoritative. No existing art, learner research, classroom benchmark, or validated Thai terminology set was supplied.

## Product Principles

- Spatial reasoning before memorization.
- Every action produces learning evidence.
- Feedback explains causes, not only correctness.
- Persistence and self-correction remain safe and rewarded.
- Scope stays classroom-testable for a small team.

## Authoritative Mathematical Model

Signs derive from the angle's normalized position, never from background art or hardcoded visual assumptions.

| Quadrant | Sin | Cos | Tan |
|---|---:|---:|---:|
| Q1 | + | + | + |
| Q2 | + | - | - |
| Q3 | - | - | + |
| Q4 | - | + | - |

Example: 120° lies between 90° and 180°, so it belongs to Q2. Its point is left of the y-axis and above the x-axis; therefore cosine is negative, sine is positive, and tangent is negative because the signs differ.

## Accessibility & Inclusion

Support keyboard and touch input, visible focus, 44×44 px minimum targets, non-color sign cues, reduced motion, readable Thai text, screen-reader labels, and future English localization. Target WCAG 2.2 AA for the web interface.
