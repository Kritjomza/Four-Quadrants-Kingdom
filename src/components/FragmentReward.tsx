import type { Land } from '../game/types';

export function FragmentReward({ land, onClaim }: { land: Land; onClaim: () => void }) {
  return <section className="screen reward-screen"><div className="fragment-large" aria-hidden="true">{land.quadrant}</div><div><h1>ได้รับชิ้นส่วน {land.quadrant}</h1><p className="screen-en">Land fragment restored</p></div><p>คุณเชื่อมโยงมุม ตำแหน่ง x/y และเครื่องหมายได้สำเร็จ</p><p className="screen-en">You connected angle, x/y position, and signs.</p><button className="primary-button" onClick={onClaim}>รับชิ้นส่วน <span>Claim fragment</span></button></section>;
}
