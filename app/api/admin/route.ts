import {getChatGPTUser} from '../../chatgpt-auth';
import {env} from 'cloudflare:workers';
import {getDb} from '../../../db';
import {wishes,events} from '../../../db/schema';
import {desc,eq} from 'drizzle-orm';
export async function GET(){const u=await getChatGPTUser();if(!u||u.email.toLowerCase()!==(env as any).ADMIN_EMAIL?.toLowerCase())return new Response('Forbidden',{status:403});return Response.json({wishes:await getDb().select().from(wishes).orderBy(desc(wishes.createdAt)),events:await getDb().select().from(events).orderBy(desc(events.createdAt)).limit(50000)},{headers:{'Cache-Control':'no-store'}})}
export async function DELETE(req:Request){const u=await getChatGPTUser();if(!u||u.email.toLowerCase()!==(env as any).ADMIN_EMAIL?.toLowerCase()||req.headers.get('origin')!==new URL(req.url).origin)return new Response('Forbidden',{status:403});const {id}=await req.json() as {id:string};await getDb().delete(wishes).where(eq(wishes.id,id));return Response.json({ok:true})}
