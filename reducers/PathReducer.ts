import { baseAppUrl} from "../constants"
import {components} from "../constants/components"
import { decodePath, encodePath, formatQueryParamsToObj, formatQueryParamsToString, getAllCharOccurences } from "../utils"

export type NavigationActions=
    {
        type:"SetLayout",
        payload:{
            layoutScreen:string
            screens:string[],
            params:any
        }
    }|
    {
        type:"AddScreen",
        payload:{
            screen:string,
            params:any
        }
    }|
    {
        type:"RemoveScreen"
    }|
    {
        type:"UpdateParam",
        payload:{
            param:string,
            newValue:any
        }
    }|
    {
        type:"Logout",
        //payload:null
    }

export const NavigationReducer=(state:string,action:NavigationActions)=>{
    let truncatedUrl=state.replace(baseAppUrl,"");
    let encodedPath=encodePath(state);
    switch(action.type){
        case "SetLayout":
            return baseAppUrl+action.payload.layoutScreen+action.payload.screens.reduce((acc,curr)=>acc+"/"+screen,"")+"?"+formatQueryParamsToString(action.payload.params)
            break;

        case "AddScreen":
            encodedPath.screens=[...encodedPath.screens,action.payload.screen]
            encodedPath.props={...encodedPath.props,...action.payload.params}
            console.log("add ",encodedPath)
            return decodePath(encodedPath)
            break;

        case "RemoveScreen":
            let requiredScreenProps=components.find((item)=>item.id==encodedPath.screens[encodedPath.screens.length-1])?.props
            encodedPath.screens.splice(encodedPath.screens.length-1)
            if(requiredScreenProps)
            {
                requiredScreenProps.forEach((prop)=>{
                encodedPath.props?delete encodedPath.props[prop]:null
                })
            }
            return decodePath(encodedPath)
            break;

        case "UpdateParam":
            if(encodedPath.props)
            {
                encodedPath.props[action.payload.param]=action.payload.newValue
                return decodePath(encodedPath)
            }
            else
            {
                return state
            }
            break;

        case "Logout":
            return baseAppUrl+"Login/Loginbase"
            break;
    }
}
