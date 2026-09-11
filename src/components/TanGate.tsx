export function TanGate({ state }: { state: 'closed' | 'failed' | 'open' }) {
  return <div className={`painted-gate gate-${state}`} data-gate={state} role="img" aria-label="ประตู Tan"><img src="/assets/style-test/tan-gate-closed.png" alt="" width="900" height="1100"/><span className="gate-magic"/><span className="gate-status">{state === 'open' ? 'เปิดประตูแล้ว' : state === 'failed' ? 'ลองตรวจเครื่องหมายอีกครั้ง' : 'Sin ÷ Cos'}</span></div>;
}
