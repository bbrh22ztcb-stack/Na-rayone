import{currentUser}from'@/lib/auth';
import{json,error}from'@/lib/http';
export async function GET(){try{return json(await currentUser())}catch(e){return error(e)}}
