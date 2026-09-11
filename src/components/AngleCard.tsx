export function AngleCard({ angle }: { angle: number }) {
  return (
    <section className="angle-card" role="group" aria-label="การ์ดมุม Angle Card">
      <span>การ์ดมุม</span><small>Angle Card</small>
      <strong>{angle}°</strong>
    </section>
  );
}
