import{db}from'@/lib/db';
import{json}from'@/lib/http';
export async function GET(req:Request){const q=new URL(req.url).searchParams.get('q')||'';return json(await db.user.findMany({where:q?{name:{contains:q}}:{},select:{id:true,name:true,place:true,profession:true},take:100}))}
