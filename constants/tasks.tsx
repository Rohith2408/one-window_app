import { store } from "../store";
import { ServerResponse } from "../types";

export const tasks=[
    {
        id:"schedule-meeting",
        stages:[
            {id:"experts-list",level:0,data:undefined,screenFetcher:(data:any)=>({id:"Expertslist",props:{stageId:"experts-list",taskId:"schedule-meeting"}})},
            {id:"meeting-form",level:1,data:undefined,screenFetcher:(data:any)=>({id:"Form",props:{formid:"AddMeeting",forminitialdataid:data}})}
        ]
    },
    {
        id:"chat-expert",
        stages:[
            {id:"experts-list",level:0,data:undefined,screenFetcher:(data:any)=>({id:"Expertslist",props:{stageId:"experts-list",taskId:"chat-expert"}})},
            {id:"chat-window",level:1,data:undefined,screenFetcher:(data:any)=>{
                let chat=store.getState().chats.data.find((chat)=>chat.participants.find((participant)=>participant._id==data))
                return {id:"Message",props:{chatId:chat?._id}}
            }}
        ]
    },
    {
        id:"chat-AVA",
        stages:[
            // {id:"experts-list",level:0,data:undefined,screenFetcher:(data:any)=>({id:"Expertslist",props:{stageId:"experts-list",taskId:"chat-expert"}})},
            {id:"chat-window",level:0,data:undefined,screenFetcher:(data:any)=>{
                let chat=store.getState().chats.data.find((chat)=>chat.participants.find((participant)=>participant.role=="Virtual_Assistant"))
                return {id:"Message",props:{chatId:chat?._id}}
            }}
        ]
    },
    {
        id:"edit-profile",
        stages:[
            {id:"open-profile",level:0,data:undefined,screenFetcher:(data:any)=>({id:"Personalinfo",props:undefined})}
        ]
    }
]

export const taskApi=(action:"get"|"update",taskId:string,data?:any)=>{
    // let res:ServerResponse={
    //     success:false,
    //     message:"",
    //     data:undefined
    // }
    // if(action=="get")
    // {
    //     res.success=true;
    //     res.data=tasks.find((task)=>task.id==taskId)
    //     return res
    // }
    // if(action=="update")
    // {
    //     let task=tasks.find((task)=>task.id==taskId)
    //     task?.stages[data.stage][data.field]=data.data;
    //     res.success=true;
    //     return res
    // }
}

export const getTask=(taskId:string)=>tasks.find((task)=>task.id==taskId);
export const getStage=(taskId:string,stageId:string)=>tasks.find((task)=>task.id==taskId)?.stages.find((stage)=>stage.id==stageId);
export const setStageData=(taskId:string,stageId:string,data:any)=>{
    let task=tasks.find((task)=>task.id==taskId);
    if(task)
    {
        let stage=task.stages.find((stage)=>stage.id==stageId)
        if(stage)
        {
            stage.data=data;
        }
    }
}
export const getNextStageInfo=(taskId:string,stageId:string)=>{
    let currentStage=tasks.find((task)=>task.id==taskId)?.stages.find((stage)=>stage.id==stageId);
    if(currentStage!=undefined)
    {
        return tasks.find((task)=>task.id==taskId)?.stages.find((stage)=>stage.level==currentStage?.level+1)
    }
}

const next=(taskId:string,currentStage:number)=>{
    
}