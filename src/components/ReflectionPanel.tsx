import type { Reflection } from '../game/types';

export function ReflectionPanel({ reflection, selected, onSelect, onSubmit }: { reflection: Reflection; selected: string | null; onSelect: (id: string) => void; onSubmit: () => void }) {
  return <section className="screen"><div><h1>บันทึกสะท้อนคิด</h1><p className="screen-en">Reflection</p></div><h2>{reflection.prompt.th}</h2><p className="screen-en">{reflection.prompt.en}</p><div className="choice-list">{reflection.choices.map((choice) => <button key={choice.id} aria-pressed={selected === choice.id} onClick={() => onSelect(choice.id)}><strong>{choice.text.th}</strong><small>{choice.text.en}</small></button>)}</div><button className="primary-button" disabled={!selected} onClick={onSubmit}>ส่งคำตอบ <span>Submit</span></button></section>;
}
