import {requireChatGPTUser} from '../chatgpt-auth';
import {env} from 'cloudflare:workers';
import Dashboard from './ui';
export const dynamic='force-dynamic';
export default async function Admin(){const user=await requireChatGPTUser('/admin');if(user.email.toLowerCase()!==(env as any).ADMIN_EMAIL?.toLowerCase())return <div className="admin"><h1>Family access only</h1><p>This dashboard is reserved for the invitation owner.</p><a href="/">Return to invitation</a></div>;return <Dashboard/>}
