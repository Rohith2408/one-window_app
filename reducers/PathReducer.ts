import { baseAppUrl} from "../constants"
import {components} from "../constants/components"
import { decodePath, encodePath, formatQueryParamsToObj, formatQueryParamsToString, getAllCharOccurences } from "../utils"

export type NavigationActions=
    {
        type:"SetPath",
        payload:{
            path:string
        }
    }|
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
            cloneId?:string,
            params?:any,
            replaceIfExists?:boolean
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
        type:"UpdateParams",
        payload:{
            param:string,
            newValue:any
        }[]
    }|
    {
        type:"Logout",
    }|
    {
        type:"Login",
    }|
    {
        type:"Register",
    }|
    {
        type:"RemoveSpecificScreen",
        payload:{
            id:string
        }
    }|
    {
        type:"RemovePages",
        payload:{
            id:string
        }[]
    }

export const NavigationReducer=(state:string,action:NavigationActions)=>{
    let truncatedUrl=state.replace(baseAppUrl,"");
    let encodedPath=encodePath(state);
    switch(action.type){

        case "SetPath":
            return action.payload.path
            break;

        case "SetLayout":
            return baseAppUrl+action.payload.layoutScreen+action.payload.screens.reduce((acc,curr)=>acc+"/"+curr,"")+"?"+formatQueryParamsToString(action.payload.params)
            break;

        case "AddScreen":
            let exists=encodedPath.screens.find((screen)=>screen==action.payload.screen)
            console.log("scrren info",exists,action.payload.replaceIfExists);
            if(exists && action.payload)
            {
                encodedPath.screens=[...encodedPath.screens.filter((screen)=>screen!=action.payload.screen),action.payload.screen]
                console.log("scrren info",encodedPath.screens);
                action.payload.params?encodedPath.props={...encodedPath.props,...action.payload.params}:null
            }
            else if(!exists)
            {
                encodedPath.screens=[...encodedPath.screens,action.payload.screen]
                action.payload.params?encodedPath.props={...encodedPath.props,...action.payload.params}:null
            }
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

        case "RemoveSpecificScreen":
            requiredScreenProps=components.find((item)=>item.id==action.payload.id)?.props
            encodedPath.screens=encodedPath.screens.filter((item)=>item!=action.payload.id)
            if(requiredScreenProps)
            {
                requiredScreenProps.forEach((prop)=>{
                encodedPath.props?delete encodedPath.props[prop]:null
                })
            }
            return decodePath(encodedPath)
            break;

        case "RemovePages":
            action.payload.forEach((screenitem)=>{
                requiredScreenProps=components.find((item)=>item.id==screenitem.id)?.props
                encodedPath.screens=encodedPath.screens.filter((item)=>item!=screenitem.id)
                if(requiredScreenProps)
                {
                    requiredScreenProps.forEach((prop)=>{
                    encodedPath.props?delete encodedPath.props[prop]:null
                    })
                }
            })
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

        case "UpdateParams":
            if(encodedPath.props)
            {
                action.payload.forEach((item)=>{
                    encodedPath.props[item.param]=item.newValue
                })
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

        case "Login":
            return baseAppUrl+"Student/Base?tab=home"
            break;

        case "Register":
            return baseAppUrl+"Register/Registerbase"
            break;
    }
}
