

let timers:{id:string,time:number,watch:any|undefined,maxTime:number}[]=[];

export const resetTimer=(id:string)=>{
    timers=timers.map((timer)=>{
        if(timer.id==id)
        {
            clearInterval(timer.watch)
            return {
                ...timer,
                time:timer.maxTime,
                watch:undefined,
            }
        }
        else{
            return timer
        }
    })
}

export const addTimer=(id:string,maxTime:number)=>{
    timers.push({
        id:id,
        time:maxTime,
        watch:undefined,
        maxTime:maxTime,
    });
}

export const removeTimer=(id:string)=>{
    timers=timers.filter((timer)=>timer.id!=id)
}

export const startTimer=(id:string,onEnd:()=>void)=>{
    console.log("Timer Started");
    timers=timers.map((timer)=>{
        if(timer.id==id)
        {
            timer.watch?clearInterval(timer.watch):null;
            return {
                ...timer,
                time:timer.maxTime,
                watch:setInterval(()=>{
                    let current=timers.find((timer)=>timer.id==id);
                    console.log("Current time "+current?.time);
                    if(current)
                    {
                        if(current.time<=0)
                        {
                            onEnd();
                            clearInterval(current.watch);
                            timers=timers.map((timer)=>{
                                if(timer.id==id)
                                {
                                    return {
                                        ...timer,
                                        time:0,
                                        watch:undefined
                                    }
                                }
                                else{
                                    return timer
                                }
                            })
                        }
                        else
                        {
                            timers=timers.map((timer)=>{
                                if(timer.id==id)
                                {
                                    return {
                                        ...timer,
                                        time:timer.time-100,
                                    }
                                }
                                else{
                                    return timer
                                }
                            })
                        }
                    }
                },100),
            }
        }
        else{
            return timer
        }
    })
}