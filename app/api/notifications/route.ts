import{db}from'@/lib/db';
import{requireUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function GET(){try{const u=await requireUser();return json(await db.notification.findMany({where:{userId:u.id},orderBy:{createdAt:'desc'},take:100}))}catch(e){return error(e)}}
export async function PATCH(){try{const u=await requireUser();await db.notification.updateMany({where:{userId:u.id},data:{read:true}});return json({ok:true})}catch(e){return error(e)}}
