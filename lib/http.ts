import { NextResponse } from 'next/server';
export const json=(data:unknown,status=200)=>NextResponse.json(data,{status});
export function error(e:unknown){const msg=e instanceof Error?e.message:'ERROR';return json({error:msg},msg==='UNAUTHORIZED'?401:400)}
