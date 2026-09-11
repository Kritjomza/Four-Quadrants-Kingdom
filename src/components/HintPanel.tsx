import type { LocalizedText } from '../game/types';

export function HintPanel({ hint }: { hint: LocalizedText }) {
  return <aside className="hint-panel"><strong>คำใบ้</strong><p>{hint.th}</p>{hint.en && <small>{hint.en}</small>}</aside>;
}
