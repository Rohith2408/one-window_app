import Degreepreference from "../components/cards/Degreepreferencecard"
import { store } from "../store"
import { ListItem } from "../types"
import { Countries, disciplines, subDisciplines } from "./misc"

const preferences=[
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
        getInitialData:()=>[{label:store.getState().preferences.data?.degree,value:store.getState().preferences.data?.degree}]
    },
    {
        id:"language",
        title:"Language",
        options:{
            list:[{label:"English",value:"English"},{label:"Telugu",value:"Telugu"},{label:"Hindi",value:"Hindi"}],
            idExtractor:(item:ListItem)=>item.label,
            labelExtractor:(item:ListItem)=>item.label,
            card:Degreepreference,
            selectionMode:"single"
        },
        getInitialData:()=>[{label:store.getState().preferences.data?.language,value:store.getState().preferences.data?.language}]
    },
    {
        id:"course",
        title:"Course",
        options:{
            list:subDisciplines.map((item)=>({label:item,value:item})),
            idExtractor:(item:ListItem)=>item.label,
            labelExtractor:(item:ListItem)=>item.label,
            card:Degreepreference,
            selectionMode:"multi"
        },
        getInitialData:()=>store.getState().preferences.data?.courses?.map((item)=>({label:item,value:item}))
    },
    {
        id:"country",
        title:"country",
        options:{
            list:Countries.map((item)=>({label:item,value:item})),
            idExtractor:(item:ListItem)=>item.label,
            labelExtractor:(item:ListItem)=>item.label,
            card:Degreepreference,
            selectionMode:"multi"
        },
        getInitialData:()=>store.getState().preferences.data?.country?.map((item)=>({label:item,value:item}))
    }
]

export {preferences}