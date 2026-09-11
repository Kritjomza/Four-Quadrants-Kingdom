import type { Sign } from '../game/types';

export function SignSelector({ selected, disabled, onSelect, label = 'เลือกเครื่องหมาย' }: { selected: Sign | null; disabled: boolean; onSelect: (sign: Sign) => void; label?: string }) {
  return (
    <div className="sign-selector" aria-label={label}>
      <button aria-label={`${label} เครื่องหมายบวก`} aria-pressed={selected === 'positive'} disabled={disabled} onClick={() => onSelect('positive')}><b>+</b><span>บวก</span></button>
      <button aria-label={`${label} เครื่องหมายลบ`} aria-pressed={selected === 'negative'} disabled={disabled} onClick={() => onSelect('negative')}><b>−</b><span>ลบ</span></button>
    </div>
  );
}
