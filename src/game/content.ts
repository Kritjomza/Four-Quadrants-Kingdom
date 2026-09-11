import type { FinalQuestion, Land, LocalizedText, Quadrant, Reflection, Skill } from './types';

export const GUIDED_LANDS: Land[] = [
  { id: 'dawn', quadrant: 'Q1', angle: 30, name: { th: 'ทุ่งอรุณ', en: 'Dawn Meadow' }, description: { th: 'ดินแดนขวาบนแห่งแสงแรก', en: 'The upper-right land of first light' }, motif: 'sunrise' },
  { id: 'westwind', quadrant: 'Q2', angle: 120, name: { th: 'ผาลมตะวันตก', en: 'Westwind Cliffs' }, description: { th: 'หน้าผาซ้ายบนเหนือทะเลเมฆ', en: 'Upper-left cliffs above the clouds' }, motif: 'wind' },
  { id: 'shadow', quadrant: 'Q3', angle: 210, name: { th: 'ถ้ำเงาผลึก', en: 'Shadow Caverns' }, description: { th: 'ถ้ำซ้ายล่างที่เรืองแสงจากผลึก', en: 'Lower-left caves lit by crystals' }, motif: 'crystal' },
  { id: 'tidefall', quadrant: 'Q4', angle: 330, name: { th: 'ชายฝั่งธารคลื่น', en: 'Tidefall Coast' }, description: { th: 'ชายฝั่งขวาล่างใต้สายน้ำตก', en: 'Lower-right coast beneath the falls' }, motif: 'wave' },
];

const reflectionChoices = (quadrant: Quadrant): Reflection['choices'] => [
  { id: 'position', text: { th: 'ดูว่าจุดอยู่ซ้าย/ขวาและเหนือ/ใต้แกน', en: 'Use whether the point is left/right and above/below the axes' } },
  { id: 'color', text: { th: 'จำสีของดินแดนเท่านั้น', en: 'Memorize only the land color' } },
  { id: 'guess', text: { th: `เดาจากชื่อ ${quadrant}`, en: `Guess from the name ${quadrant}` } },
];

export const REFLECTIONS: Reflection[] = GUIDED_LANDS.map((land) => ({
  id: `reflection-${land.id}`,
  quadrant: land.quadrant,
  prompt: { th: `วิธีใดอธิบายเครื่องหมายใน ${land.quadrant} ได้ดีที่สุด?`, en: `Which method best explains the signs in ${land.quadrant}?` },
  choices: reflectionChoices(land.quadrant),
  correctChoiceId: 'position',
  explanation: { th: 'ตำแหน่ง x บอกเครื่องหมายของ Cos ตำแหน่ง y บอกเครื่องหมายของ Sin และ Tan มาจาก Sin ÷ Cos', en: 'The x-position gives Cos, the y-position gives Sin, and Tan comes from Sin ÷ Cos.' },
}));

export const FINAL_QUESTIONS: FinalQuestion[] = [
  { id: 'final-1', angle: 45, prompt: { th: 'ระบุจตุภาคและเครื่องหมายทั้งสาม', en: 'Identify the quadrant and all three signs' } },
  { id: 'final-2', angle: 135, prompt: { th: 'ระบุจตุภาคและเครื่องหมายทั้งสาม', en: 'Identify the quadrant and all three signs' } },
  { id: 'final-3', angle: 225, prompt: { th: 'ระบุจตุภาคและเครื่องหมายทั้งสาม', en: 'Identify the quadrant and all three signs' } },
  { id: 'final-4', angle: 315, prompt: { th: 'ระบุจตุภาคและเครื่องหมายทั้งสาม', en: 'Identify the quadrant and all three signs' } },
  { id: 'final-5', angle: 160, prompt: { th: 'ระบุจตุภาคและเครื่องหมายทั้งสาม', en: 'Identify the quadrant and all three signs' } },
];

export const HINTS: Record<'quadrant' | Exclude<Skill, 'all'>, LocalizedText[]> = {
  quadrant: [
    { th: 'เริ่มจากดูว่ามุมอยู่ระหว่างแกนใด', en: 'Start by locating the angle between two axes.' },
    { th: 'ติดตามรังสีจากแกน x บวกทวนเข็มนาฬิกา', en: 'Trace the ray counterclockwise from the positive x-axis.' },
  ],
  cos: [
    { th: 'Cos ติดตามตำแหน่งแนวนอน x', en: 'Cos follows horizontal position x.' },
    { th: 'ขวาเป็นบวก ซ้ายเป็นลบ', en: 'Right is positive; left is negative.' },
  ],
  sin: [
    { th: 'Sin ติดตามตำแหน่งแนวตั้ง y', en: 'Sin follows vertical position y.' },
    { th: 'เหนือเป็นบวก ใต้เป็นลบ', en: 'Above is positive; below is negative.' },
  ],
  tan: [
    { th: 'Tan = Sin ÷ Cos', en: 'Tan = Sin ÷ Cos.' },
    { th: 'เครื่องหมายเหมือนกันได้บวก ต่างกันได้ลบ', en: 'Same signs give positive; different signs give negative.' },
  ],
};
