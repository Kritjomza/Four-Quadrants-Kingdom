import { render, screen } from '@testing-library/react';
import { deriveAngle, positionalExplanation } from '../game/math';
import { ObstacleScene } from './ObstacleScene';

it.each([
  ['cos', 'สะพาน Cos'],
  ['sin', 'หอคอย Sin'],
  ['tan', 'ประตู Tan'],
] as const)('renders one Pathfinder with the %s obstacle', (obstacle, label) => {
  render(<ObstacleScene obstacle={obstacle} truth={deriveAngle(120)} status={null} chosenSign={null} />);
  expect(screen.getByRole('img', { name: 'Pathfinder' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: label })).toBeInTheDocument();
});

it('shows the wrong chosen direction and positional x/y evidence', () => {
  const feedback = positionalExplanation(120);
  render(<ObstacleScene obstacle="cos" truth={deriveAngle(120)} status="incorrect" chosenSign="positive" feedback={feedback} />);
  expect(screen.getByRole('img', { name: 'Pathfinder' })).toHaveAttribute('data-motion', 'move-right');
  expect(screen.getByText(/ซ้ายแกน y.*เหนือแกน x/)).toBeInTheDocument();
});

it('opens Tan Gate only for a correct result', () => {
  const { rerender } = render(<ObstacleScene obstacle="tan" truth={deriveAngle(120)} status="incorrect" chosenSign="positive" />);
  expect(screen.getByRole('img', { name: 'ประตู Tan' })).toHaveAttribute('data-gate', 'failed');
  rerender(<ObstacleScene obstacle="tan" truth={deriveAngle(120)} status="correct" chosenSign="negative" />);
  expect(screen.getByRole('img', { name: 'ประตู Tan' })).toHaveAttribute('data-gate', 'open');
});
