import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function POST(req:Request){try{const u=await requireUser(),{eventId,status}=await req.json();if(!['GOING','MAYBE'].includes(status))return json({error:'Некорректный статус'},400);const a=await db.attendance.upsert({where:{userId_eventId:{userId:u.id,eventId}},update:{status},create:{userId:u.id,eventId,status}});const e=await db.event.findUnique({where:{id:eventId}});if(e&&e.organizerId!==u.id)await db.notification.create({data:{userId:e.organizerId,type:'EVENT_JOIN',title:'Новый участник',body:`${u.name} отметил участие в «${e.title}»`}});return json(a)}catch(e){return error(e)}}
