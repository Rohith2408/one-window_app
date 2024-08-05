import { formatQueryParams } from "../utils"

export type NavigationActions=
    {
        type:"set",
        payload:{
            path:string,
            params:any
        }
    }

export const NavigationReducer=(state:string,action:NavigationActions)=>{
    switch(action.type){
        case "set":
            return state+"/"+action.payload.path+"?"+formatQueryParams(action.payload.params)
            break;
    }
}
