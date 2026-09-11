'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { GUIDED_LANDS } from '../game/content';
import { LandArt } from './LandArt';

export const ASSEMBLY_DURATION = 2600;
type AssemblyState = 'ready' | 'assembling' | 'complete';

export function UnitCircleAssembly({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<AssemblyState>('ready');
  const continueRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (stage !== 'assembling') return;
    const timer = window.setTimeout(() => setStage('complete'), ASSEMBLY_DURATION);
    return () => window.clearTimeout(timer);
  }, [stage]);
  useEffect(() => {
    if (stage === 'complete') continueRef.current?.focus({ preventScroll: true });
  }, [stage]);
  function assemble() {
    setStage(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'complete' : 'assembling');
  }

  return (
    <section className={`screen assembly-screen ritual-${stage}`}>
      <div className="ritual-heading">
        <h1>ประกอบวงกลมหนึ่งหน่วยเวทมนตร์</h1>
        <p className="screen-en">Assemble the Magical Unit Circle</p>
      </div>
      <div className="ritual-stage">
        <div className="ritual-halo" aria-hidden="true" />
        <div className="ritual-circle" role="img" aria-label={`วงกลมเวทมนตร์ประกอบจาก 4 ชิ้นส่วน${stage === 'complete' ? ' — ฟื้นฟูสำเร็จ' : ''}`}>
          <svg className="ritual-orbit" viewBox="0 0 500 500" aria-hidden="true">
            <circle cx="250" cy="250" r="230" />
            <circle cx="250" cy="250" r="218" />
            {Array.from({length: 48}, (_,i) => <path key={i} d={`M250 ${i % 4 === 0 ? 9 : 15}V23`} transform={`rotate(${i * 7.5} 250 250)`} />)}
          </svg>
          <div className="ritual-fragments">
            {GUIDED_LANDS.map((land, index) => <div key={land.quadrant} className={`ritual-fragment fragment-${land.quadrant.toLowerCase()}`} style={{'--fragment-index': index} as CSSProperties}>
              <LandArt quadrant={land.quadrant} />
              <span>{land.quadrant}</span>
            </div>)}
          </div>
          <svg className="ritual-geometry" viewBox="0 0 500 500" aria-hidden="true">
            <circle cx="250" cy="250" r="184" />
            <path d="M48 250H452M250 48V452" />
            <path d="M452 250l-9 -5v10ZM250 48l-5 9h10Z" fill="currentColor" />
            <text x="459" y="242">x</text><text x="260" y="44">y</text>
            <text x="449" y="278">0°</text><text x="247" y="28">90°</text>
            <text x="28" y="278">180°</text><text x="250" y="479">270°</text>
          </svg>
          <div className="ritual-core" aria-hidden="true"><span>1</span></div>
          <div className="ritual-burst" aria-hidden="true">{Array.from({length: 16},(_,i) => <i key={i} style={{'--spark-angle': `${i * 22.5}deg`} as CSSProperties} />)}</div>
        </div>
        <img className="ritual-pathfinder" src="/assets/style-test/pathfinder-reference.png" alt="" width="1024" height="1024" />
        <div className="ritual-collection" aria-label="ชิ้นส่วนที่เก็บครบแล้ว"><strong>ครบทั้ง 4 ดินแดน</strong>{GUIDED_LANDS.map(land => <span key={land.quadrant}><b>{land.quadrant}</b>{land.name.th}<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg></span>)}</div>
      </div>
      <div className="ritual-actions">
        <p className="ritual-status" role="status" aria-live="polite">{stage === 'ready' ? 'สี่ดินแดนรอพลังของคุณ เชื่อมชิ้นส่วนให้กลับเป็นหนึ่งเดียว' : stage === 'assembling' ? 'กำลังเชื่อมพลังของสี่ดินแดน…' : 'วงกลมหนึ่งหน่วยฟื้นคืนแล้ว! อาณาจักรกลับมาเป็นหนึ่งเดียว'}</p>
        {stage === 'ready' && <button className="primary-button ritual-button" onClick={assemble}>ประกอบวงกลม <span>Restore the kingdom</span></button>}
        {stage === 'assembling' && <button className="ritual-skip" onClick={() => setStage('complete')}>ข้ามแอนิเมชัน</button>}
        {stage === 'complete' && <button ref={continueRef} className="primary-button ritual-button" onClick={onComplete}>เข้าสู่บททดสอบสุดท้าย <span>Begin the final challenge</span></button>}
        <small>มุม → จตุภาค → ตำแหน่ง x / y → เครื่องหมาย</small>
      </div>
    </section>
  );
}
