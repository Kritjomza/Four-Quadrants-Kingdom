import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, expect, it } from 'vitest';
import { Game } from './Game';
import { SESSION_KEY } from './persistence';

function chooseFinal(quadrant: string, sin: 'บวก' | 'ลบ', cos: 'บวก' | 'ลบ', tan: 'บวก' | 'ลบ') {
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`เลือก ${quadrant}`) }));
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`Sin เครื่องหมาย${sin}`) }));
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`Cos เครื่องหมาย${cos}`) }));
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`Tan เครื่องหมาย${tan}`) }));
  fireEvent.click(screen.getByRole('button', { name: /ตรวจคำตอบทั้งหมด/ }));
}

beforeEach(() => localStorage.clear());

it('assembles four fragments, completes five All questions, shows results, and resets', () => {
  render(<Game initialState={{ phase: 'assembly', fragments: ['Q1', 'Q2', 'Q3', 'Q4'] }} />);
  expect(screen.getByRole('img', { name: /วงกลมเวทมนตร์.*4 ชิ้นส่วน/ })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /ประกอบวงกลม/ }));
  expect(within(screen.getByRole('group', { name: /การ์ดมุม/ })).getByText('45°')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sin เครื่องหมายบวก/ })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: /^All/ }));
  expect(screen.getByRole('button', { name: /Sin เครื่องหมายบวก/ })).toBeEnabled();

  chooseFinal('Q2', 'บวก', 'บวก', 'บวก');
  expect(screen.getByText(/ลองอีกครั้ง/)).toBeInTheDocument();
  chooseFinal('Q1', 'บวก', 'บวก', 'บวก');
  expect(within(screen.getByRole('group', { name: /การ์ดมุม/ })).getByText('135°')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /^All/ })); chooseFinal('Q2', 'บวก', 'ลบ', 'ลบ');
  fireEvent.click(screen.getByRole('button', { name: /^All/ })); chooseFinal('Q3', 'ลบ', 'ลบ', 'บวก');
  fireEvent.click(screen.getByRole('button', { name: /^All/ })); chooseFinal('Q4', 'ลบ', 'บวก', 'ลบ');
  fireEvent.click(screen.getByRole('button', { name: /^All/ })); chooseFinal('Q2', 'บวก', 'ลบ', 'ลบ');

  expect(screen.getByRole('heading', { name: /ผลลัพธ์และสรุปบทเรียน/ })).toBeInTheDocument();
  expect(screen.getByText(/Cos = x/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /เริ่มใหม่/ }));
  expect(screen.getByRole('button', { name: /เริ่มการเดินทาง/ })).toBeInTheDocument();
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});
