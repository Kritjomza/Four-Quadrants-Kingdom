import type { AnswerStatus, Obstacle } from '../game/reducer';
import type { AngleTruth, LocalizedText, Sign } from '../game/types';
import { CosBridge } from './CosBridge';
import { Pathfinder } from './Pathfinder';
import { SinTower } from './SinTower';
import { TanGate } from './TanGate';
import { AngleCard } from './AngleCard';
import { LandArt } from './LandArt';

export function ObstacleScene({ obstacle, truth, status, chosenSign, feedback }: { obstacle: Obstacle; truth: AngleTruth; status: AnswerStatus; chosenSign: Sign | null; feedback?: LocalizedText }) {
  return (
    <div className={`obstacle-stage stage-${obstacle} outcome-${status ?? 'waiting'}`}>
      <LandArt quadrant={truth.quadrant} />
      <div className="scene-angle"><AngleCard angle={truth.normalized} /></div>
      <div className="scene-route" aria-label="เส้นทางในดินแดน">{(['cos', 'sin', 'tan'] as const).map((step, index) => <span key={step} aria-current={step === obstacle ? 'step' : undefined}>{index + 1} · {step.toUpperCase()}</span>)}</div>
      <div className="obstacle-art">{obstacle === 'cos' ? <CosBridge /> : obstacle === 'sin' ? <SinTower /> : <TanGate state={status === 'correct' ? 'open' : status === 'incorrect' ? 'failed' : 'closed'} />}</div>
      <Pathfinder obstacle={obstacle} sign={chosenSign} active={status !== null} />
      {feedback && <p className="scene-evidence">{feedback.th}</p>}
    </div>
  );
}
