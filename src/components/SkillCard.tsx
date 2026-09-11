import type { Skill } from '../game/types';

const skills: Record<Skill, { th: string; symbol: string }> = {
  cos: { th: 'พลังแนวนอน', symbol: 'x ↔' },
  sin: { th: 'พลังแนวตั้ง', symbol: 'y ↕' },
  tan: { th: 'พลังความสัมพันธ์', symbol: 'y ÷ x' },
  all: { th: 'พลังรวม', symbol: 'Σ ±' },
};

export function SkillCard({ skill, selected, onSelect, disabled = false }: { skill: Skill; selected: boolean; onSelect: (skill: Skill) => void; disabled?: boolean }) {
  const item = skills[skill];
  return (
    <button className={`skill-card skill-${skill}`} aria-pressed={selected} disabled={disabled} onClick={() => onSelect(skill)}>
      <span className="skill-symbol" aria-hidden="true">{item.symbol}</span>
      <strong>{skill === 'all' ? 'All' : skill[0].toUpperCase() + skill.slice(1)}</strong>
      <small>{item.th}</small>
    </button>
  );
}
