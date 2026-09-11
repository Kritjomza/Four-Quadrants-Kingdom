import type { AnswerStatus } from '../game/reducer';
import type { LocalizedText } from '../game/types';

export function FeedbackPanel({ status, feedback }: { status: AnswerStatus; feedback: LocalizedText | null }) {
  if (!status || !feedback) return null;
  return <section className={`feedback-panel ${status}`} aria-live="polite"><strong>{status === 'correct' ? 'ถูกต้อง!' : 'ลองอีกครั้ง'}</strong><p>{feedback.th}</p>{feedback.en && <small>{feedback.en}</small>}</section>;
}
