import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function POST(req:Request){try{const u=await requireUser(),b=await req.json();if(!b.reason)return json({error:'Укажите причину'},400);return json(await db.report.create({data:{reason:b.reason,details:b.details,reporterId:u.id,targetUserId:b.targetUserId,targetPostId:b.targetPostId}}),201)}catch(e){return error(e)}}
