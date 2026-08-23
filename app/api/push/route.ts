import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function POST(req:Request){try{const u=await requireUser(),b=await req.json();if(!b.endpoint||!b.p256dh||!b.auth)return json({error:'Некорректная подписка'},400);return json(await db.pushSubscription.upsert({where:{endpoint:b.endpoint},update:{p256dh:b.p256dh,auth:b.auth,userId:u.id},create:{endpoint:b.endpoint,p256dh:b.p256dh,auth:b.auth,userId:u.id}}),201)}catch(e){return error(e)}}
