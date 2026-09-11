import type { Quadrant } from '../game/types';

// Reuse the four painted panels of the approved style board as one image atlas.
// Keeping the crop in CSS avoids four duplicate downloads and additional assets.
export function LandArt({ quadrant }: { quadrant: Quadrant }) {
  return <span aria-hidden="true" className={`land-art art-${quadrant.toLowerCase()}`} />;
}
