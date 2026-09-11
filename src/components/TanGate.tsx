export function TanGate({ state }: { state: 'closed' | 'failed' | 'open' }) {
  return <div className={`asset-obstacle tan-asset gate-${state}`} data-gate={state} role="img" aria-label="ประตู Tan"><img src="/assets/obstacles/tan-gate/tan-gate.png" alt="" width="1024" height="1536"/><span className="gate-magic" aria-hidden="true"/><span className="gate-status">{state === 'open' ? 'เปิดประตูแล้ว' : state === 'failed' ? 'ลองตรวจเครื่องหมายอีกครั้ง' : 'Sin ÷ Cos'}</span></div>;
}
