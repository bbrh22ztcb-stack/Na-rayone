import{db}from'@/lib/db';
import{signIn}from'@/lib/auth';
import bcrypt from'bcryptjs';
import{cookies}from'next/headers';
import{json,error}from'@/lib/http';
export async function POST(req:Request){try{const b=await req.json();if(!b.name||!b.email||!b.password||b.password.length<8)return json({error:'Заполните обязательные поля; пароль минимум 8 символов'},400);if(await db.user.findUnique({where:{email:b.email}}))return json({error:'Email уже зарегистрирован'},409);const u=await db.user.create({data:{name:b.name,email:b.email,passwordHash:await bcrypt.hash(b.password,12),birthDate:new Date(b.birthDate),place:b.place||'Гальнево'}});const t=await signIn(u.id);(await cookies()).set('session',t,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:2592000,path:'/'});return json({ok:true})}catch(e){return error(e)}}
