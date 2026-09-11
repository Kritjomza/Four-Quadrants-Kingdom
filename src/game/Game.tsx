'use client';

import { useEffect, useReducer, useRef, useSyncExternalStore } from 'react';
import { AngleCard } from '../components/AngleCard';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { FragmentProgress } from '../components/FragmentProgress';
import { FragmentReward } from '../components/FragmentReward';
import { HintPanel } from '../components/HintPanel';
import { KingdomMap } from '../components/KingdomMap';
import { ObstacleScene } from '../components/ObstacleScene';
import { QuadrantSelector } from '../components/QuadrantSelector';
import { ReflectionPanel } from '../components/ReflectionPanel';
import { ScorePanel } from '../components/ScorePanel';
import { SignSelector } from '../components/SignSelector';
import { SkillCard } from '../components/SkillCard';
import { UnitCircle } from '../components/UnitCircle';
import { UnitCircleAssembly } from '../components/UnitCircleAssembly';
import { FinalChallenge } from '../components/FinalChallenge';
import { ResultsSummary } from '../components/ResultsSummary';
import { FINAL_QUESTIONS, GUIDED_LANDS, HINTS, REFLECTIONS } from './content';
import { deriveAngle } from './math';
import { clearSession, loadSession, saveSession } from './persistence';
import { gameReducer, initialGameState, type GamePhase, type GameState } from './reducer';
import type { Skill } from './types';
import { LandArt } from '../components/LandArt';

const obstacleNames = { cos: { th: 'สะพาน Cos', next: 'ไปหอคอย Sin' }, sin: { th: 'หอคอย Sin', next: 'ไปประตู Tan' }, tan: { th: 'ประตู Tan', next: 'ตอบคำถามสะท้อนคิด' } };

const subscribeToMount = () => () => {};
type GameProps = { initialPhase?: GamePhase; initialState?: Partial<GameState> };

export function Game(props: GameProps) {
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);
  if (!mounted) return <main className="game-shell"><section className="screen" aria-busy="true"><h1>อาณาจักรสี่จตุภาค</h1><p role="status">กำลังเปิดสมุดการเดินทาง…</p></section></main>;
  return <GameSession {...props} />;
}

function GameSession({ initialPhase, initialState }: GameProps) {
  const gameRef = useRef<HTMLElement>(null);
  const [state, dispatch] = useReducer(gameReducer, undefined, () => {
    const base = typeof window === 'undefined' ? initialGameState : loadSession(window.localStorage);
    return { ...base, ...initialState, ...(initialPhase ? { phase: initialPhase } : {}) };
  });
  useEffect(() => {
    gameRef.current?.scrollIntoView?.({ block: 'start', behavior: 'instant' });
    gameRef.current?.focus({ preventScroll: true });
  }, [state.phase]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const freshStart = state.phase === 'start' && state.score === 0 && state.fragments.length === 0 && state.responses.length === 0;
    if (freshStart) clearSession(window.localStorage);
    else saveSession(window.localStorage, state);
  }, [state]);

  const land = GUIDED_LANDS[state.currentLandIndex] ?? GUIDED_LANDS[0];
  const truth = deriveAngle(land.angle);
  const header = state.phase !== 'start' && state.phase !== 'tutorial';

  return (
    <main ref={gameRef} tabIndex={-1} className={`game-shell phase-${state.phase} world-${land.quadrant.toLowerCase()}`}>
      {header && <header className="hud"><div className="brand-mark"><b>อาณาจักรสี่จตุภาค</b><small>Four Quadrants Kingdom</small></div><FragmentProgress fragments={state.fragments} /><ScorePanel score={state.score} /></header>}
      {state.phase === 'start' && <section className="screen start-screen"><div className="start-orbit" aria-hidden="true"><span>Q2</span><span>Q1</span><span>Q3</span><span>Q4</span></div><div className="start-copy"><h1 aria-label="อาณาจักรสี่จตุภาค">อาณาจักร<br />สี่จตุภาค</h1><p className="screen-en">Four Quadrants Kingdom</p><p>ฟื้นฟูวงกลมหนึ่งหน่วยด้วยพลังของตำแหน่งและเครื่องหมาย</p><p className="screen-en">Restore the Unit Circle through position and signs.</p></div><button className="primary-button" onClick={() => dispatch({ type: 'START' })}>เริ่มการเดินทาง <span>Begin journey</span></button><img className="start-pathfinder" src="/assets/style-test/pathfinder-reference.png" alt="นักสำรวจพร้อมออกเดินทาง" width="1024" height="1024" /><div className="start-lands" aria-label="สี่ดินแดนที่รอการฟื้นฟู">{GUIDED_LANDS.map(item => <div key={item.quadrant}><LandArt quadrant={item.quadrant} /><span>{item.name.th}</span></div>)}</div></section>}
      {state.phase === 'tutorial' && <section className="screen tutorial-screen"><div><h1>วิธีอ่านวงกลมหนึ่งหน่วย</h1><p className="screen-en">Reading the Unit Circle</p></div><div className="tutorial-layout"><UnitCircle angle={120} truth={deriveAngle(120)} /><div className="rule-stack"><p><b>Cos = x</b><span>ขวา + · ซ้าย −</span></p><p><b>Sin = y</b><span>เหนือ + · ใต้ −</span></p><p><b>Tan = Sin ÷ Cos</b><span>เหมือนกัน + · ต่างกัน −</span></p></div></div><button className="primary-button" onClick={() => dispatch({ type: 'COMPLETE_TUTORIAL' })}>เปิดแผนที่ <span>Open map</span></button></section>}
      {state.phase === 'map' && <KingdomMap currentIndex={state.currentLandIndex} fragments={state.fragments} onContinue={() => dispatch({ type: 'OPEN_ANGLE' })} />}
      {state.phase === 'quadrant' && <section className="screen quadrant-screen"><div><h1>มุมนี้อยู่ดินแดนใด?</h1><p className="screen-en">Which Quadrant Land holds this angle?</p></div><div className="quadrant-layout"><AngleCard angle={land.angle} /><QuadrantSelector onSelect={(quadrant) => dispatch({ type: 'SELECT_QUADRANT', quadrant })} /></div>{state.showUnitCircle && <div className="retry-area"><UnitCircle angle={land.angle} truth={truth} /><FeedbackPanel status={state.answerStatus} feedback={state.feedback} /><HintPanel hint={HINTS.quadrant[Math.min(state.hintLevel - 1, HINTS.quadrant.length - 1)]} /></div>}</section>}
      {state.phase === 'land-intro' && <section className={`screen land-intro land-${land.quadrant.toLowerCase()}`}><LandArt quadrant={land.quadrant} /><span className="land-symbol">{land.quadrant}</span><div><h1>{land.name.th}</h1><p className="screen-en">{land.name.en}</p><p>{land.description.th}</p><p className="screen-en">{land.description.en}</p></div><FeedbackPanel status={state.answerStatus} feedback={state.feedback} /><button className="primary-button" onClick={() => dispatch({ type: 'ENTER_LAND' })}>เข้าสู่{land.name.th} <span>Enter {land.name.en}</span></button></section>}
      {state.phase === 'obstacle' && <section className="screen obstacle-screen"><div><h1>{obstacleNames[state.currentObstacle].th}</h1><p className="screen-en">เลือกการ์ดพลัง แล้วเลือกเครื่องหมาย · Choose a Skill Card, then a sign</p></div><ObstacleScene obstacle={state.currentObstacle} truth={truth} status={state.answerStatus} chosenSign={state.selectedSign} feedback={state.feedback ?? undefined} /><div className="answer-workbench"><div className="skill-row">{(['cos', 'sin', 'tan'] as Skill[]).map((skill) => <SkillCard key={skill} skill={skill} selected={state.selectedSkill === skill} onSelect={(value) => dispatch({ type: 'SELECT_SKILL', skill: value })} disabled={state.answerStatus === 'correct'} />)}</div><SignSelector selected={state.selectedSign} disabled={!state.selectedSkill || state.answerStatus === 'correct'} onSelect={(sign) => dispatch({ type: 'SELECT_SIGN', sign })} /><button className="primary-button" disabled={!state.selectedSkill || !state.selectedSign || state.answerStatus === 'correct'} onClick={() => dispatch({ type: 'SUBMIT_OBSTACLE' })}>ใช้พลัง <span>Use skill</span></button></div>{state.answerStatus === 'incorrect' && <HintPanel hint={HINTS[state.currentObstacle][Math.min(state.hintLevel - 1, 1)]} />}<FeedbackPanel status={state.answerStatus} feedback={state.feedback} />{state.answerStatus === 'correct' && <button className="primary-button" onClick={() => dispatch({ type: 'ADVANCE_OBSTACLE' })}>{obstacleNames[state.currentObstacle].next}</button>}</section>}
      {state.phase === 'reflection' && <><ReflectionPanel reflection={REFLECTIONS[state.currentLandIndex]} selected={state.selectedReflection} onSelect={(choiceId) => dispatch({ type: 'SELECT_REFLECTION', choiceId })} onSubmit={() => dispatch({ type: 'SUBMIT_REFLECTION' })} /><FeedbackPanel status={state.answerStatus} feedback={state.feedback} /></>}
      {state.phase === 'reward' && <FragmentReward land={land} onClaim={() => dispatch({ type: 'CLAIM_FRAGMENT' })} />}
      {state.phase === 'assembly' && <UnitCircleAssembly onComplete={() => dispatch({ type: 'COMPLETE_ASSEMBLY' })} />}
      {state.phase === 'final' && <FinalChallenge state={state} dispatch={dispatch} />}
      {state.phase === 'results' && <ResultsSummary state={state} onReset={() => { clearSession(window.localStorage); dispatch({ type: 'RESET' }); }} />}
    </main>
  );
}
