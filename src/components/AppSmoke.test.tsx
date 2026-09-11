import { render, screen } from '@testing-library/react';
import Page from '../../app/page';

it('renders the Thai-first prototype title', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { name: /อาณาจักรสี่จตุภาค/i })).toBeInTheDocument();
});
