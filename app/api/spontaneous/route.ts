import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function GET(){return json(await db.post.findMany({where:{type:'GENERAL',expiresAt:{gt:new Date()}},include:{author:true},orderBy:{createdAt:'desc'}}))}
export async function POST(req:Request){try{const u=await requireUser(),b=await req.json();if(!b.title||!b.body||!b.expiresAt)return json({error:'Заполните обязательные поля'},400);return json(await db.post.create({data:{title:b.title,body:b.body,category:b.category||'Компания',type:'GENERAL',expiresAt:new Date(b.expiresAt),authorId:u.id}}),201)}catch(e){return error(e)}}
