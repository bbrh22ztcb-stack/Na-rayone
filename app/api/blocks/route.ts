import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function POST(req:Request){try{const u=await requireUser(),{blockedId}=await req.json();if(blockedId===u.id)return json({error:'Нельзя заблокировать себя'},400);return json(await db.block.upsert({where:{blockerId_blockedId:{blockerId:u.id,blockedId}},update:{},create:{blockerId:u.id,blockedId}}),201)}catch(e){return error(e)}}
export async function DELETE(req:Request){try{const u=await requireUser(),blockedId=new URL(req.url).searchParams.get('blockedId');if(!blockedId)return json({error:'blockedId required'},400);await db.block.delete({where:{blockerId_blockedId:{blockerId:u.id,blockedId}}});return json({ok:true})}catch(e){return error(e)}}
