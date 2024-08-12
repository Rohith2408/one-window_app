import { FormField, Form } from "../types";

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
            fields:FormField[]
        }
    }|
    {
        type:"reset",
        payload:{
            initialValue:FormField[]
        }
    }|
    {
        type:"clear"
    }


export const FormReducer=(state:FormField[],action:FormAction)=>{
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