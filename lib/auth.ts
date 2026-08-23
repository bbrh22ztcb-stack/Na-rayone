import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
const secret=new TextEncoder().encode(process.env.JWT_SECRET||'dev-secret-change-me');
export async function signIn(userId:string){return new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('30d').sign(secret)}
export async function currentUser(){const token=(await cookies()).get('session')?.value;if(!token)return null;try{const {payload}=await jwtVerify(token,secret);return db.user.findUnique({where:{id:String(payload.sub)}})}catch{return null}}
export async function requireUser(){const u=await currentUser();if(!u)throw new Error('UNAUTHORIZED');return u}
