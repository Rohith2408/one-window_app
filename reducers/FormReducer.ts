import { FormData, Form } from "../types";

export type FormAction=
    {
        type:"update",
        payload:{
            id:string|number,
            data:any
        }
    }|
    {
        type:"set",
        payload:{
            fields:FormData[]
        }
    }|
    {
        type:"reset",
        payload:{
            initialValue:FormData[]
        }
    }|
    {
        type:"clear"
    }


export const FormReducer=(state:FormData[],action:FormAction)=>{
    switch(action.type){
        case "update":
            //const currentField=state.find((field)=>field.id==action.payload.id)
            return state.map((field)=>field.id==action.payload.id?({...field,value:action.payload.data}):field)
            break;

        case "reset":
            return action.payload.initialValue
            break

        case "set":
            return action.payload.fields
            break;

        case "clear":
            return state.map((field)=>({...field,value:undefined}))
            break
    }
}