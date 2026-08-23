import{db}from'@/lib/db';
import{signIn}from'@/lib/auth';
import bcrypt from'bcryptjs';
import{cookies}from'next/headers';
import{json,error}from'@/lib/http';
export async function POST(req:Request){try{const{email,password}=await req.json(),u=await db.user.findUnique({where:{email}});if(!u||!(await bcrypt.compare(password,u.passwordHash)))return json({error:'Неверный email или пароль'},401);const t=await signIn(u.id);(await cookies()).set('session',t,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:2592000,path:'/'});return json({ok:true})}catch(e){return error(e)}}
