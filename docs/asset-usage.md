# Asset usage

รายการนี้สรุปเฉพาะไฟล์ภาพที่ถูกเรียกจากหน้าเว็บหรือคอมโพเนนต์ที่ใช้จริงในปัจจุบัน ไม่รวมไฟล์ใน `public/assets/style-test` ที่ยังไม่ได้ถูกอ้างอิง

| ไฟล์ | ใช้ใน | หน้าที่ |
|---|---|---|
| `public/assets/style-test/q1-dawn-meadow-bg.webp` | หน้าเริ่มเกม, ฉากดินแดน, ฉากอุปสรรค, หน้าประกอบวงกลม | ฉากภูมิทัศน์พื้นหลังที่โหลดเร็ว |
| `public/assets/style-test/living-field-journal-style-board.png` | `LandArt` ผ่าน CSS crop | แผ่นภาพเดียวที่ครอปเป็นภาพตัวอย่าง Q1–Q4 บนแผนที่และตัวเลือกดินแดน |
| `public/assets/style-test/pathfinder-reference.png` | หน้าเริ่มเกม, `ObstacleScene`, `UnitCircleAssembly` | ตัวละคร Pathfinder หลัก |
| `public/assets/obstacles/cos-bridge/cos-bridge.png` | `CosBridge` | ภาพ sprite สะพานแนวนอน Cos ที่มีพื้นเดินต่อเนื่อง |
| `public/assets/obstacles/sin-tower/sin-tower.png` | `SinTower` | โครงหอคอยแนวตั้ง Sin; แท่นลิฟต์และการเคลื่อนที่เสริมด้วย CSS |
| `public/assets/obstacles/tan-gate/tan-gate.png` | `TanGate` | ซุ้มประตูตรวจสอบ Tan; แสงพลังและสถานะเปิด/ผิดเสริมด้วย CSS |

การ์ดมุม การ์ดพลัง ปุ่ม เครื่องหมาย แผนที่วงกลม และวงกลมประกอบใช้ HTML/SVG/CSS จึงไม่โหลดภาพเพิ่ม ส่วนไฟล์ PNG/WebP อื่นใน `public/assets/style-test` เป็นไฟล์ทดสอบหรือไฟล์สำรองที่ยังไม่ถูกอ้างอิงใน UI ปัจจุบัน
