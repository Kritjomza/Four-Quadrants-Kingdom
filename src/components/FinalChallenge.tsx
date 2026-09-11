import { FINAL_QUESTIONS } from '../game/content';
import type { GameAction, GameState } from '../game/reducer';
import type { Quadrant, Skill } from '../game/types';
import { AngleCard } from './AngleCard';
import { FeedbackPanel } from './FeedbackPanel';
import { HintPanel } from './HintPanel';
import { SignSelector } from './SignSelector';
import { SkillCard } from './SkillCard';
import { UnitCircle } from './UnitCircle';
import { deriveAngle } from '../game/math';

export function FinalChallenge({ state, dispatch }: { state: GameState; dispatch: (action: GameAction) => void }) {
  const question = FINAL_QUESTIONS[state.finalIndex];
  const truth = deriveAngle(question.angle);
  const ready = state.selectedSkill === 'all';
  const complete = ready && state.finalDraft.quadrant && state.finalDraft.sin && state.finalDraft.cos && state.finalDraft.tan;
  return <section className="screen final-screen"><div><h1>บททดสอบสุดท้าย {state.finalIndex + 1}/{FINAL_QUESTIONS.length}</h1><p className="screen-en">Final Challenge · mixed quadrants</p></div><div className="final-question"><AngleCard angle={question.angle} /><UnitCircle angle={question.angle} truth={truth} compact /></div><p><strong>{question.prompt.th}</strong></p><p className="screen-en">{question.prompt.en}</p><div className="skill-row">{(['cos','sin','tan','all'] as Skill[]).map((skill) => <SkillCard key={skill} skill={skill} selected={state.selectedSkill === skill} onSelect={(value) => dispatch({ type: 'SELECT_SKILL', skill: value })} />)}</div><p className="instruction-line">เลือกการ์ด All ก่อน จึงจะระบุจตุภาคและเครื่องหมายทั้งหมดได้<br/><small>Select All before entering the combined answer.</small></p><div className="final-fields"><fieldset disabled={!ready}><legend>จตุภาค · Quadrant</legend>{(['Q1','Q2','Q3','Q4'] as Quadrant[]).map((quadrant) => <button key={quadrant} aria-label={`เลือก ${quadrant}`} aria-pressed={state.finalDraft.quadrant === quadrant} onClick={() => dispatch({ type: 'SELECT_FINAL_QUADRANT', quadrant })}>{quadrant}</button>)}</fieldset><div className="final-sign"><b>Sin · y</b><SignSelector label="Sin" selected={state.finalDraft.sin} disabled={!ready} onSelect={(sign) => dispatch({ type: 'SELECT_FINAL_SIGN', fn: 'sin', sign })} /></div><div className="final-sign"><b>Cos · x</b><SignSelector label="Cos" selected={state.finalDraft.cos} disabled={!ready} onSelect={(sign) => dispatch({ type: 'SELECT_FINAL_SIGN', fn: 'cos', sign })} /></div><div className="final-sign"><b>Tan · Sin ÷ Cos</b><SignSelector label="Tan" selected={state.finalDraft.tan} disabled={!ready} onSelect={(sign) => dispatch({ type: 'SELECT_FINAL_SIGN', fn: 'tan', sign })} /></div></div><button className="primary-button" disabled={!complete} onClick={() => dispatch({ type: 'SUBMIT_FINAL' })}>ตรวจคำตอบทั้งหมด <span>Check combined answer</span></button>{state.answerStatus === 'incorrect' && <HintPanel hint={{ th: 'ดู x เพื่อหา Cos ดู y เพื่อหา Sin แล้วเปรียบเทียบเครื่องหมายเพื่อหา Tan', en: 'Use x for Cos, y for Sin, then compare signs for Tan.' }} />}<FeedbackPanel status={state.answerStatus} feedback={state.feedback} /></section>;
}
