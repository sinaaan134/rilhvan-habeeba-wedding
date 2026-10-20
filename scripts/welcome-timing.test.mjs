import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scheduleWelcome} from '../lib/welcome-timing.ts';
function clock(){let now=0;const tasks=new Set();return {after(fn,delay){const task={at:now+delay,fn};tasks.add(task);return()=>tasks.delete(task)},advance(ms){const end=now+ms;for(;;){const task=[...tasks].filter(t=>t.at<=end).sort((a,b)=>a.at-b.at)[0];if(!task)break;now=task.at;tasks.delete(task);task.fn()}now=end}}}
test('opens without any image-load or animation-end events',()=>{const c=clock(),events=[];scheduleWelcome({transition:()=>events.push('transition'),complete:()=>events.push('main')},c.after);c.advance(1999);assert.deepEqual(events,[]);c.advance(1);assert.deepEqual(events,['transition']);c.advance(1000);assert.deepEqual(events,['transition','main']);c.advance(5000);assert.equal(events.length,2)});
test('reduced motion opens once at two seconds',()=>{const c=clock(),events=[];scheduleWelcome({reducedMotion:true,transition:()=>events.push('transition'),complete:()=>events.push('main')},c.after);c.advance(3000);assert.deepEqual(events,['main'])});
test('unmount cancels pending transition and completion',()=>{const c=clock(),events=[];const cancel=scheduleWelcome({transition:()=>events.push('transition'),complete:()=>events.push('main')},c.after);c.advance(1000);cancel();c.advance(5000);assert.deepEqual(events,[])});
