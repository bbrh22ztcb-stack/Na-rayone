const hits=new Map<string,{n:number,t:number}>();
export function rateLimit(key:string,limit=60,windowMs=60000){const now=Date.now(),v=hits.get(key);if(!v||now-v.t>windowMs){hits.set(key,{n:1,t:now});return true}v.n++;return v.n<=limit}
