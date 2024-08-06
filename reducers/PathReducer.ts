import { formatQueryParamsToString } from "../utils"

export type NavigationActions=
    {
        type:"set",
        payload:{
            path:string,
            params:any
        }
    }|
    {
        type:"add",
        payload:{
            path:string,
            params:any
        }
    }

export const NavigationReducer=(state:string,action:NavigationActions)=>{
    switch(action.type){
        case "set":
            return state+"/"+action.payload.path+"?"+formatQueryParamsToString(action.payload.params)
            break;

        case "add":
            return state+"/"+action.payload.path+"?"+formatQueryParamsToString(action.payload.params)
            break;
    }
}
