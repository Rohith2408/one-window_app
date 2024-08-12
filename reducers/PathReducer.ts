import { baseAppUrl } from "../constants"
import { formatQueryParamsToString, getAllCharOccurences } from "../utils"

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
    }|
    {
        type:"remove",
        payload:null
    }

export const NavigationReducer=(state:string,action:NavigationActions)=>{
    let truncatedUrl=state.replace(baseAppUrl,"");
    console.log("truncated",truncatedUrl)
    switch(action.type){
        case "set":
            return "/"+action.payload.path+"?"+formatQueryParamsToString(action.payload.params)
            break;

        case "add":
            return state.substring(0,state.indexOf("?"))+"/"+action.payload.path+"?"+formatQueryParamsToString(action.payload.params)
            break;

        case "remove":
            let slashIndexs=getAllCharOccurences(truncatedUrl,"/");
            console.log("ss",slashIndexs,truncatedUrl.substring(slashIndexs[slashIndexs.length-1],truncatedUrl.length))
            return slashIndexs.length<=2?state:state.replace(truncatedUrl.substring(slashIndexs[slashIndexs.length-1],truncatedUrl.length),"")
            break;
    }
}
