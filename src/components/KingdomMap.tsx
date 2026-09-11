import { GUIDED_LANDS } from '../game/content';
import type { Quadrant } from '../game/types';

export function KingdomMap({ currentIndex, fragments, onContinue }: { currentIndex: number; fragments: Quadrant[]; onContinue: () => void }) {
  const current = GUIDED_LANDS[currentIndex];
  const spatialOrder: Quadrant[] = ['Q2', 'Q1', 'Q3', 'Q4'];
  return (
    <section className="screen map-screen">
      <div><h1>แผนที่อาณาจักร</h1><p className="screen-en">Kingdom Map</p></div>
      <div className="map-compass" aria-label="แผนที่สี่จตุภาค">
        {spatialOrder.map((quadrant) => GUIDED_LANDS.find((land) => land.quadrant === quadrant)!).map((land) => <div key={land.quadrant} className={`map-land land-${land.quadrant.toLowerCase()} ${fragments.includes(land.quadrant) ? 'done' : ''}`}><b>{land.quadrant}</b><span>{land.name.th}</span><small>{fragments.includes(land.quadrant) ? 'เก็บชิ้นส่วนแล้ว ✓' : land.quadrant === current.quadrant ? 'จุดหมายถัดไป' : 'ยังไม่สำรวจ'}</small></div>)}
      </div>
      <button className="primary-button" onClick={onContinue}>รับการ์ดมุม <span>Get Angle Card</span></button>
    </section>
  );
}
