import type { AnswerStatus, Obstacle } from '../game/reducer';
import type { AngleTruth, LocalizedText, Sign } from '../game/types';
import { CosBridge } from './CosBridge';
import { Pathfinder } from './Pathfinder';
import { SinTower } from './SinTower';
import { TanGate } from './TanGate';

export function ObstacleScene({ obstacle, status, chosenSign, feedback }: { obstacle: Obstacle; truth: AngleTruth; status: AnswerStatus; chosenSign: Sign | null; feedback?: LocalizedText }) {
  return (
    <div className={`obstacle-stage stage-${obstacle}`}>
      <div className="obstacle-art">{obstacle === 'cos' ? <CosBridge /> : obstacle === 'sin' ? <SinTower /> : <TanGate state={status === 'correct' ? 'open' : status === 'incorrect' ? 'failed' : 'closed'} />}</div>
      <Pathfinder obstacle={obstacle} sign={chosenSign} active={status !== null} />
      {feedback && <p className="scene-evidence">{feedback.th}</p>}
    </div>
  );
}
