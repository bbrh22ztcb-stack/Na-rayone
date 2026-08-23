import{cookies}from'next/headers';
import{json}from'@/lib/http';
export async function POST(){(await cookies()).delete('session');return json({ok:true})}
