'use client';
import dynamic from'next/dynamic';
const Map=dynamic(()=>import('@/components/Map'),{ssr:false});
export default function Page(){return <div className="stack"><h1>Карта района</h1><p className="muted">Показываются публичные события. Точное положение жителей скрыто по умолчанию.</p><Map/></div>}
