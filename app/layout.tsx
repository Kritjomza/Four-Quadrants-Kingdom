import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './journal.css';
import './game-effects.css';
import { IBM_Plex_Sans_Thai } from 'next/font/google';

const journalFont = IBM_Plex_Sans_Thai({ weight: ['400', '500', '600', '700'], subsets: ['thai', 'latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'อาณาจักรสี่จตุภาค | Four Quadrants Kingdom',
  description: 'ต้นแบบเกมเรียนรู้เครื่องหมายตรีโกณมิติผ่านตำแหน่งบนวงกลมหนึ่งหน่วย',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="th">
      <body className={journalFont.className}>{children}</body>
    </html>
  );
}
