/** Finish independently of image loading, CSS animation events or audio playback. */
export function scheduleWelcome(
  {transition,complete,reducedMotion=false}:{transition:()=>void;complete:()=>void;reducedMotion?:boolean},
  after:(callback:()=>void,delay:number)=>()=>void=(callback,delay)=>{
    const timer=setTimeout(callback,delay);return()=>clearTimeout(timer);
  },
){
  let stopped=false;
  const finish=()=>{if(stopped)return;stopped=true;complete()};
  const cancelTransition=after(()=>{if(stopped)return;if(reducedMotion)finish();else transition()},2000);
  const cancelCompletion=after(finish,3000);
  return()=>{stopped=true;cancelTransition();cancelCompletion()};
}
