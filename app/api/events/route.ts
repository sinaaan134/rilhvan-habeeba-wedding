import {getDb} from '../../../db';
import {events} from '../../../db/schema';
import {getChatGPTUser} from '../../chatgpt-auth';
import {env} from 'cloudflare:workers';
export async function POST(req:Request){try{if(req.headers.get('origin')!==new URL(req.url).origin)return new Response(null,{status:403});const user=await getChatGPTUser();if(user?.email.toLowerCase()===(env as any).ADMIN_EMAIL?.toLowerCase())return Response.json({ok:true});const x=await req.json() as Record<string, any>;if(!['view','venue','calendar','image','pdf','share','language'].includes(x.kind)||!/^[a-f0-9-]{36}$/.test(x.visitor)||!['mobile','tablet','desktop'].includes(x.device)||!['en','ml'].includes(x.language))return new Response(null,{status:400});await getDb().insert(events).values({id:crypto.randomUUID(),kind:x.kind,visitor:x.visitor,device:x.device,language:x.language,createdAt:Date.now()});return Response.json({ok:true});}catch{return new Response(null,{status:503})}}
