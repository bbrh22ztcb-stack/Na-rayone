'use client';
import{useRouter}from'next/navigation';
export default function Join({eventId,status}:{eventId:string,status?:any}){const r=useRouter();async function go(s:string){const q=await fetch('/api/events/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId,status:s})});if(q.ok)r.refresh();else alert((await q.json()).error)}return <div className="row"><button className="btn primary" onClick={()=>go('GOING')}>{status==='GOING'?'Вы идёте':'Пойду'}</button><button className="btn" onClick={()=>go('MAYBE')}>Возможно</button></div>}
