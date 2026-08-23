'use client';
import{useRouter}from'next/navigation';
export default function Logout(){const r=useRouter();return <button className="btn" onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});r.push('/login');r.refresh()}}>Выйти</button>}
