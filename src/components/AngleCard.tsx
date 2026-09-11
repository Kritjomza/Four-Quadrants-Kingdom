export function AngleCard({ angle }: { angle: number }) {
  return (
    <section className="angle-card" role="group" aria-label="การ์ดมุม Angle Card">
      <span>การ์ดมุม</span><small>Angle Card</small>
      <svg className="card-compass" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="39"/><path d="M50 3V97M3 50H97M22 22L78 78M22 78L78 22"/><path className="compass-needle" d="M50 14L59 50L50 86L41 50Z"/></svg>
      <strong>{angle}°</strong>
    </section>
  );
}
