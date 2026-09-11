---
name: Four Quadrants Kingdom
description: Living Field Journal — painted fantasy scenes, tactile CSS controls, precise mathematical geometry.
colors:
  night-ink: "#172238"
  night-deep: "#0f1728"
  parchment: "#f5e6c8"
  parchment-light: "#fff7e7"
  ink: "#2c241c"
  trail-teal: "#2f7774"
  brass: "#b8862e"
  focus: "#ffd76a"
  paper-edge: "#ac8954"
  button-green: "#285c53"
  button-green-hover: "#1b4a43"
  button-paper: "#fff7e4"
  skill-paper: "#fff4d9"
  skill-selected: "#ffe8af"
typography:
  headline:
    fontFamily: "IBM Plex Sans Thai, sans-serif"
    fontSize: "clamp(2rem,4vw,3.5rem)"
    lineHeight: 1.25
  display:
    fontFamily: "IBM Plex Sans Thai, sans-serif"
    fontSize: "clamp(3.3rem,6.5vw,6rem)"
    lineHeight: 1.2
  body:
    fontFamily: "IBM Plex Sans Thai, sans-serif"
    lineHeight: 1.55
  angle:
    fontFamily: "Georgia, serif"
    fontSize: "4rem"
  brand-label:
    fontSize: ".75rem"
    letterSpacing: ".025em"
rounded:
  button: "8px"
  skill: "9px"
  scene: "10px"
  angle: "12px"
  screen: "14px"
spacing:
  compact: "8px"
  controls: "12px"
  workbench: "20px"
  screen-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.button-green}"
    textColor: "{colors.button-paper}"
    rounded: "{rounded.button}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.button-green-hover}"
  skill-card:
    backgroundColor: "{colors.skill-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.skill}"
    padding: "12px"
  skill-card-selected:
    backgroundColor: "{colors.skill-selected}"
---

# Design System: Four Quadrants Kingdom

## Overview

**Creative North Star: "Living Field Journal"**

An explorer's field journal opens into a living fantasy landscape. Painted scenery provides wonder, parchment and brass make controls tactile, and crisp HTML/SVG keeps the mathematics readable. This implementation extends the approved visual world; it does not replace its identity.

Pathfinder remains the only personified figure. Scene-centered encounters connect movement to horizontal and vertical position, with choices beneath the landscape and the active angle inside it.

**Key Characteristics:**

- Painted scenery with CSS-built parchment controls and brass details.
- Thai-first typography, explicit signs, and digital geometry.
- Purposeful spatial motion, recoverable feedback, and reduced-motion support.
- Minimal raster assets reused from the existing approved work.

This document records the current cascade in `app/globals.css`, `app/journal.css`, and `app/layout.tsx`. Reviewer disposition is **ship for the initial Cos desktop/mobile screenshots only**; it does not certify every state visually.

## Colors

The palette pairs warm paper and brass with dark ink and muted trail greens.

### Primary

- **Button Green** anchors primary actions; its darker hover state preserves the same material.
- **Trail Teal** connects the interface compass to Pathfinder's established identity.
- **Brass** and **Paper Edge** provide selected states, framing, and physical detail.

### Neutral

- **Night Ink / Night Deep** support the surrounding world and selected sign controls.
- **Parchment / Parchment Light** supply the inherited paper vocabulary; current screens also use a warm radial paper gradient.
- **Ink** is the primary text color on paper. **Button Paper** supplies light action text.
- **Skill Paper / Skill Selected** distinguish available and selected skill cards.
- **Focus** supplies the digital keyboard outline.

**The Explicit Sign Rule.** Color accompanies visible labels, signs, and state cues; it never determines the mathematical answer.

## Typography

IBM Plex Sans Thai is loaded through `next/font/google` for Thai and Latin, with weights 400, 500, 600, and 700 and `display: swap`. The current implementation uses it across body and headings, superseding the earlier style guide's Noto Sans Thai body direction. Georgia supplies the angle numerals, compass-like land motifs, and the opening English subtitle.

The frontmatter records the large-screen headline/display roles. Mobile screen headings become 2rem; the opening title becomes 3.3rem. Body line height is 1.55, normal screen paragraphs are constrained to 68ch, and the opening title is limited to 10ch. Angle numerals shrink with the scene card so the landscape remains visible. The primary button retains the implemented weight of 750; this is not an additional downloaded font weight.

**The Digital Geometry Rule.** Render numbers, angles, signs, labels, and axes with HTML or SVG, never baked into raster scenery.

## Layout

The centered screen is capped at 1120px. Desktop shell padding is 24px; paper screens use 38px 48px padding and 24px gaps. The HUD sits above the scene, using the same paper-and-brass vocabulary. The obstacle stage is at least 390px tall, with an angle card in the upper-left, route markers in the upper-right, Pathfinder near the lower-left, and the obstacle occupying the middle/right.

At 900px and below, the answer workbench changes from three columns to one, and signs become a horizontal row. At 600px and below, shell padding becomes 10px, screen padding becomes 28px 20px, the stage minimum becomes 380px, scene art and angle cards shrink, and land tiles remain a two-column grid. Opening land previews change from four columns to two. Existing base rules at 760px still stack tutorial/quadrant layouts; a 620px rule stacks final/debrief content. The 601px minimum-width rule sizes the opening Pathfinder by height. These are cascade facts, not a new universal breakpoint scale.

LandArt reuses CSS crops of `living-field-journal-style-board.png`: background size 460% 335%, vertical position 7%, and horizontal positions 3.5%, 34.6%, 65.8%, and 97.5%. These are not four separate production landscapes. The opening scene also uses the existing Dawn Meadow WebP.

## Elevation & Depth

Depth combines illustrated scenery, dark scene overlays, restrained drop shadows, and inset paper borders. The shared journal shadow is `0 18px 48px #080f1a55`. Primary actions use `0 6px 14px #14251d40, inset 0 0 0 3px #ffffff12`; angle cards use `0 12px 20px #52391c26`. Shadows distinguish layers and raised choices rather than replacing their borders.

## Shapes

Controls use gently curved corners while angle cards have a double brass border, diamond corner ornaments, and a slight resting rotation. Screens contain a fine inset border. Compass geometry remains circular and precise; rewards use an asymmetric fragment silhouette. Card frames and ornament are CSS, not new raster assets.

## Components

### Buttons and choice cards

Primary actions have a 54px minimum height, a thin green border, a 3px upward hover shift, and a 1px downward pressed shift. Disabled actions use .65 opacity. Keyboard focus uses a 3px Focus outline with 3px offset. The opening primary action has its own warm gold treatment.

Skill cards lift 6px and rotate slightly on hover; selected cards lift 8px, gain a stronger brass edge, and use Skill Selected. Sign buttons retain explicit positive/negative labels, a 48px minimum height, and a dark selected background. Mobile skill cards reduce padding and keep a 112px minimum height.

### Angle card and map

The parchment angle card is framed with a 5px double border and CSS diamond tabs, with an SVG compass. The scene version is smaller than the standalone quadrant card. Map tiles combine cropped existing scenery, a dark text overlay, explicit land labels, and a brass current/completed state.

### Obstacles and feedback

Cos Bridge and Sin Tower are CSS constructions; rejected alpha-test assets are not substitutes for their shipped geometry. The protagonist and Tan Gate use actual existing PNG assets. No new raster asset files were introduced by this refinement.

Pathfinder translates left/right for cosine and vertically for sine. The tower lift moves on success; the Tan Gate pivots open and reveals a light layer. Motion is causal: the shared exit easing is `cubic-bezier(.16,1,.3,1)`, feedback enters over 250ms, tower lift movement takes 650ms, and the gate opening takes 700ms. Incorrect obstacle feedback uses a short 260ms displacement; successful restoration lasts 750ms. The inherited Pathfinder transition is 520ms. Reduced motion disables animations and reduces transition duration to .01ms, leaving final states visible.

## Do's and Don'ts

- **Do** extend Living Field Journal with painted scenes, restrained brasswork, and legible geometry.
- **Do** keep movement meaningful to the coordinate/sign explanation.
- **Do** preserve keyboard focus, explicit state text, touch targets, and reduced motion.
- **Do** distinguish the current reusable style-board crops from future production landscapes.
- **Don't** introduce a new art identity, glossy plastic styling, or personified skill cards.
- **Don't** embed mathematical text into images or let scenery determine signs.
- **Don't** claim that every game state has visual certification from the initial Cos screenshots.
