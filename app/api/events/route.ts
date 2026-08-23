import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function GET(){return json(await db.event.findMany({where:{status:'ACTIVE',startsAt:{gte:new Date()}},include:{organizer:true,attendances:{include:{user:true}}},orderBy:{startsAt:'asc'}}))}
export async function POST(req:Request){try{const u=await requireUser(),b=await req.json();if(!b.title||!b.startsAt||!b.endsAt)return json({error:'Недостаточно данных'},400);return json(await db.event.create({data:{title:b.title,description:b.body||'',startsAt:new Date(b.startsAt),endsAt:new Date(b.endsAt),lat:Number(b.lat)||56.3,lng:Number(b.lng)||38.15,placeName:b.placeName||'Место не указано',organizerId:u.id}}),201)}catch(e){return error(e)}}
