import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function GET(req:Request){try{const u=await requireUser(),to=new URL(req.url).searchParams.get('with');if(!to)return json([]);return json(await db.message.findMany({where:{OR:[{senderId:u.id,receiverId:to},{senderId:to,receiverId:u.id}]},orderBy:{createdAt:'asc'},take:200}))}catch(e){return error(e)}}
export async function POST(req:Request){try{const u=await requireUser(),b=await req.json();if(!b.receiverId||!b.body)return json({error:'Нет получателя или текста'},400);const m=await db.message.create({data:{senderId:u.id,receiverId:b.receiverId,body:b.body}});await db.notification.create({data:{userId:b.receiverId,type:'MESSAGE',title:`Новое сообщение от ${u.name}`,body:b.body.slice(0,100)}});return json(m,201)}catch(e){return error(e)}}
