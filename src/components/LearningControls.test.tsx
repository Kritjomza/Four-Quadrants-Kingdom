import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { deriveAngle } from '../game/math';
import { AngleCard } from './AngleCard';
import { FragmentProgress } from './FragmentProgress';
import { SignSelector } from './SignSelector';
import { SkillCard } from './SkillCard';
import { UnitCircle } from './UnitCircle';
import { QuadrantSelector } from './QuadrantSelector';

describe('learning controls', () => {
  it('presents Thai Angle Card content before English support', () => {
    render(<AngleCard angle={120} />);
    const card = screen.getByRole('group', { name: /การ์ดมุม/ });
    expect(card.textContent?.indexOf('การ์ดมุม')).toBeLessThan(card.textContent?.indexOf('Angle Card') ?? -1);
  });

  it('keeps sign controls disabled until a Skill Card is selected', () => {
    render(<SignSelector selected={null} disabled onSelect={vi.fn()} />);
    expect(screen.getByRole('button', { name: /เครื่องหมายบวก/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /เครื่องหมายลบ/ })).toBeDisabled();
  });

  it('exposes Skill selection state and symbolic identity', () => {
    render(<SkillCard skill="cos" selected onSelect={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Cos/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('x ↔')).toBeInTheDocument();
  });

  it('describes the highlighted Unit Circle point with positional evidence', () => {
    render(<UnitCircle angle={120} truth={deriveAngle(120)} />);
    expect(screen.getByRole('img', { name: /120°.*Q2.*ซ้าย.*เหนือ/i })).toBeInTheDocument();
  });

  it('reports fragment progress without relying on color', () => {
    render(<FragmentProgress fragments={['Q1', 'Q2']} />);
    expect(screen.getByText(/2 จาก 4/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Q1.*เก็บแล้ว/)).toBeInTheDocument();
  });

  it('places Q2 upper-left and Q1 upper-right in visual reading order', () => {
    render(<QuadrantSelector onSelect={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((button) => button.textContent?.match(/Q[1-4]/)?.[0])).toEqual(['Q2', 'Q1', 'Q3', 'Q4']);
  });
});
