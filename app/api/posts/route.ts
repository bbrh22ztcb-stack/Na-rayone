import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
import{rateLimit}from'@/lib/rate';
export async function GET(){return json(await db.post.findMany({include:{author:true},orderBy:{createdAt:'desc'},take:100}))}
export async function POST(req:Request){try{const u=await requireUser();if(!rateLimit('post:'+u.id,10,3600000))return json({error:'Слишком много публикаций'},429);const b=await req.json();if(!b.title||!b.body)return json({error:'Заполните заголовок и текст'},400);return json(await db.post.create({data:{title:b.title,body:b.body,category:b.category||'Другое',authorId:u.id,expiresAt:b.expiresAt?new Date(b.expiresAt):null}}),201)}catch(e){return error(e)}}
