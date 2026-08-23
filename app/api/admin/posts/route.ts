import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function DELETE(req:Request){try{const u=await requireUser();if(!['ADMIN','MODERATOR'].includes(u.role))return json({error:'FORBIDDEN'},403);const id=new URL(req.url).searchParams.get('id');if(!id)return json({error:'id required'},400);await db.post.delete({where:{id}});return json({ok:true})}catch(e){return error(e)}}
