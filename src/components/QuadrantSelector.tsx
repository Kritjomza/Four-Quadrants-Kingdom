import { GUIDED_LANDS } from '../game/content';
import type { Quadrant } from '../game/types';

export function QuadrantSelector({ onSelect, disabled = false }: { onSelect: (quadrant: Quadrant) => void; disabled?: boolean }) {
  const spatialOrder: Quadrant[] = ['Q2', 'Q1', 'Q3', 'Q4'];
  return (
    <div className="quadrant-grid" aria-label="เลือกดินแดนจตุภาค">
      {spatialOrder.map((quadrant) => GUIDED_LANDS.find((land) => land.quadrant === quadrant)!).map((land) => (
        <button key={land.quadrant} className={`land-button land-${land.quadrant.toLowerCase()}`} disabled={disabled} onClick={() => onSelect(land.quadrant)}>
          <span className="land-motif" aria-hidden="true">{land.quadrant}</span>
          <strong>{land.name.th}</strong><small>{land.name.en}</small>
        </button>
      ))}
    </div>
  );
}
