import Degreepreference from "../components/cards/Degreepreferencecard"
import { store } from "../store"
import { ListItem, PreferenceInfo, ServerResponse } from "../types"
import { profileUpdator } from "../utils"
import { Countries, disciplines, subDisciplines } from "./misc"
import { setPreference } from "../store/slices/preferencesSlice";

const preferences:PreferenceInfo[]=[
    {
        id:"degree",
        title:"Degree",
        options:{
            list:[{label:"Bachelors",value:"Bachelors"},{label:"Masters",value:"Masters"}],
            idExtractor:(item:ListItem)=>item.label,
            labelExtractor:(item:ListItem)=>item.label,
            card:Degreepreference,
            selectionMode:"single"
        },
        dataConverter:(data:ListItem[])=>(data[0].value),
        serverCommunicator:async (data:any)=>{
            let currentPreferences=store.getState().preferences.data
            let res:ServerResponse=await profileUpdator({preference:{...currentPreferences,degree:data}})
            return res;
        },
        responseHandler:(data:any)=>{
            let currentPreferences=store.getState().preferences.data
            store.dispatch(setPreference(data));
        },
        getInitialData:()=>[{label:store.getState().preferences.data?.degree,value:store.getState().preferences.data?.degree}]
    },
    {
        id:"country",
        title:"Country",
        options:{
            list:Countries.map((item)=>({label:item.name,value:item.name})),
            idExtractor:(item:ListItem)=>item.label,
            labelExtractor:(item:ListItem)=>item.label,
            card:Degreepreference,
            selectionMode:"multi"
        },
        dataConverter:(data:ListItem[])=>(data.map((item)=>item.value)),
        serverCommunicator:async (data:string[])=>{
            let currentPreferences=store.getState().preferences.data
            console.log("Countryahahah",data,);
            let res:ServerResponse=await profileUpdator({preference:{...currentPreferences,country:data}})
            return res;
        },
        responseHandler:(data:any)=>{
            let currentPreferences=store.getState().preferences.data
            store.dispatch(setPreference(data));
        },
        getInitialData:()=>store.getState().preferences.data?.country?.map((item)=>({label:item,value:item}))
    },
    {
        id:"courses",
        title:"Course",
        options:{
            list:subDisciplines.map((item)=>({label:item,value:item})),
            idExtractor:(item:ListItem)=>item.label,
            labelExtractor:(item:ListItem)=>item.label,
            card:Degreepreference,
            selectionMode:"multi"
        },
        dataConverter:(data:ListItem[])=>(data.map((item)=>item.value)),
        serverCommunicator:async (data:any)=>{
            let currentPreferences=store.getState().preferences.data
            console.log("recieved request",data,{...currentPreferences,courses:data})
            let res:ServerResponse=await profileUpdator({preference:{...currentPreferences,courses:data}})
            console.log("server response",JSON.stringify(res,null,2));
            return res;
        },
        responseHandler:(data:any)=>{
            let currentPreferences=store.getState().preferences.data
            store.dispatch(setPreference(data));
        },
        getInitialData:()=>{
            console.log("settiong init data",store.getState().preferences.data?.courses)
            return store.getState().preferences.data?.courses?.map((item)=>({label:item,value:item}))
        }
    },
    // {
    //     id:"language",
    //     title:"Language",
    //     options:{
    //         list:[{label:"English",value:"English"},{label:"Telugu",value:"Telugu"},{label:"Hindi",value:"Hindi"}],
    //         idExtractor:(item:ListItem)=>item.label,
    //         labelExtractor:(item:ListItem)=>item.label,
    //         card:Degreepreference,
    //         selectionMode:"single"
    //     },
    //     getInitialData:()=>[{label:store.getState().preferences.data?.language,value:store.getState().preferences.data?.language}]
    // },
    // {
    //     id:"course",
    //     title:"Course",
    //     options:{
    //         list:subDisciplines.map((item)=>({label:item,value:item})),
    //         idExtractor:(item:ListItem)=>item.label,
    //         labelExtractor:(item:ListItem)=>item.label,
    //         card:Degreepreference,
    //         selectionMode:"multi"
    //     },
    //     getInitialData:()=>store.getState().preferences.data?.courses?.map((item)=>({label:item,value:item}))
    // },
    // {
    //     id:"country",
    //     title:"country",
    //     options:{
    //         list:Countries.map((item)=>({label:item,value:item})),
    //         idExtractor:(item:ListItem)=>item.label,
    //         labelExtractor:(item:ListItem)=>item.label,
    //         card:Degreepreference,
    //         selectionMode:"multi"
    //     },
    //     getInitialData:()=>store.getState().preferences.data?.country?.map((item)=>({label:item,value:item}))
    // }
]

export {preferences}