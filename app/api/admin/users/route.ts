import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function GET(){try{const u=await requireUser();if(!['ADMIN','MODERATOR'].includes(u.role))return json({error:'FORBIDDEN'},403);return json(await db.user.findMany({select:{id:true,name:true,email:true,place:true,role:true,verified:true,createdAt:true},orderBy:{createdAt:'desc'}}))}catch(e){return error(e)}}
export async function PATCH(req:Request){try{const u=await requireUser();if(u.role!=='ADMIN')return json({error:'FORBIDDEN'},403);const b=await req.json();return json(await db.user.update({where:{id:b.id},data:{role:b.role,verified:b.verified}}))}catch(e){return error(e)}}
