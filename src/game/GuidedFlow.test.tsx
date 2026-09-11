import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Game } from './Game';

describe('guided game flow', () => {
  beforeEach(() => localStorage.clear());

  it('recovers from a wrong land and completes Q1 in the required order', () => {
    render(<Game />);
    fireEvent.click(screen.getByRole('button', { name: /เริ่มการเดินทาง/ }));
    expect(screen.getByRole('heading', { name: /วิธีอ่านวงกลมหนึ่งหน่วย/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /เปิดแผนที่/ }));
    fireEvent.click(screen.getByRole('button', { name: /รับการ์ดมุม/ }));
    expect(screen.getByText('30°')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /ผาลมตะวันตก/ }));
    expect(screen.getByRole('img', { name: /30°.*Q1/ })).toBeInTheDocument();
    expect(screen.getByText(/ลองอีกครั้ง/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /ทุ่งอรุณ/ }));
    fireEvent.click(screen.getByRole('button', { name: /เข้าสู่ทุ่งอรุณ/ }));

    expect(screen.getByRole('heading', { name: /สะพาน Cos/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Cos/ }));
    fireEvent.click(screen.getByRole('button', { name: /เครื่องหมายบวก/ }));
    fireEvent.click(screen.getByRole('button', { name: /ใช้พลัง/ }));
    fireEvent.click(screen.getByRole('button', { name: /ไปหอคอย Sin/ }));

    fireEvent.click(screen.getByRole('button', { name: /Sin/ }));
    fireEvent.click(screen.getByRole('button', { name: /เครื่องหมายบวก/ }));
    fireEvent.click(screen.getByRole('button', { name: /ใช้พลัง/ }));
    fireEvent.click(screen.getByRole('button', { name: /ไปประตู Tan/ }));

    fireEvent.click(screen.getByRole('button', { name: /Tan/ }));
    fireEvent.click(screen.getByRole('button', { name: /เครื่องหมายบวก/ }));
    fireEvent.click(screen.getByRole('button', { name: /ใช้พลัง/ }));
    fireEvent.click(screen.getByRole('button', { name: /ตอบคำถามสะท้อนคิด/ }));

    fireEvent.click(screen.getByRole('button', { name: /ดูว่าจุดอยู่ซ้าย\/ขวา/ }));
    fireEvent.click(screen.getByRole('button', { name: /ส่งคำตอบ/ }));
    expect(screen.getByRole('heading', { name: /ชิ้นส่วน Q1/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /รับชิ้นส่วน/ }));
    expect(screen.getByText(/1 จาก 4/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /รับการ์ดมุม/ }));
    expect(screen.getByText('120°')).toBeInTheDocument();
  });

  it('requires a Skill Card before sign controls become active', () => {
    render(<Game initialPhase="obstacle" />);
    expect(screen.getByRole('button', { name: /เครื่องหมายบวก/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /Cos/ }));
    expect(screen.getByRole('button', { name: /เครื่องหมายบวก/ })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /^All/ })).not.toBeInTheDocument();
  });
});
