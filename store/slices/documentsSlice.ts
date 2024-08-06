import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Docinfo, Document, Documents, StoreItem } from "../../misc/typeDefinations";

let initialState:StoreItem<Documents|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

type Fields="personal"|"resume"|"passportBD"|"academic"|"secondarySchool"|"plus2"|"degree"|"bachelors"|"masters"|"transcripts"|"bonafide"|"CMM"|"PCM"|"OD"|"test"|"languageProf"|"general"|"workExperiences"

export const documentsSlice=createSlice({
    name:'documents',
    initialState:initialState,
    reducers:{
        // let docPaths=[
//     {pathArray:['personal','resume'],isArray:false},
//     {pathArray:['personal','passportBD'],isArray:false},
//     {pathArray:['personal','passportADD'],isArray:false},
//     {pathArray:['academic','secondarySchool'],isArray:false},
//     {pathArray:['academic','plus2'],isArray:false},
//     {pathArray:['academic','degree'],isArray:false},
//     {pathArray:['academic','bachelors','transcripts'],isArray:false},
//     {pathArray:['academic','bachelors','bonafide'],isArray:false},
//     {pathArray:['academic','bachelors','CMM'],isArray:false},
//     {pathArray:['academic','bachelors','PCM'],isArray:false},
//     {pathArray:['academic','bachelors','OD'],isArray:false},
//     {pathArray:['academic','masters','transcripts'],isArray:false},
//     {pathArray:['academic','masters','bonafide'],isArray:false},
//     {pathArray:['academic','masters','CMM'],isArray:false},
//     {pathArray:['academic','masters','PCM'],isArray:false},
//     {pathArray:['academic','masters','OD'],isArray:false},
//     {pathArray:['test','languageProf'],isArray:true},
//     {pathArray:['test','general'],isArray:true},
//     {pathArray:['workExperiences'],isArray:true},
// ]
        initDocuments:(state,action:PayloadAction<StoreItem<Documents>>)=>{
            state.responseStatus=action.payload.responseStatus
            state.haveAnIssue=action.payload.haveAnIssue
            state.issue=action.payload.issue,
            state.requestStatus=action.payload.requestStatus
            state.data={
                personal:{
                    resume:action.payload.data.personal?.resume,
                    passportADD:action.payload.data.personal?.passportADD,
                    passportBD:action.payload.data.personal?.passportBD
                },
                academic:{
                    degree:action.payload.data.academic?.degree,
                    plus2:action.payload.data.academic?.plus2,
                    secondarySchool:action.payload.data.academic?.secondarySchool,
                    bachelors:{
                        transcripts:action.payload.data.academic?.bachelors?.transcripts,
                        bonafide:action.payload.data.academic?.bachelors?.bonafide,
                        CMM:action.payload.data.academic?.bachelors?.CMM,
                        PCM:action.payload.data.academic?.bachelors?.PCM,
                        OD:action.payload.data.academic?.bachelors?.OD
                    },
                    masters:{
                        transcripts:action.payload.data.academic?.masters?.transcripts,
                        bonafide:action.payload.data.academic?.masters?.bonafide,
                        CMM:action.payload.data.academic?.masters?.CMM,
                        PCM:action.payload.data.academic?.masters?.PCM,
                        OD:action.payload.data.academic?.masters?.OD
                    }
                },
                workExperiences:action.payload.data.workExperiences,
                test:{
                    languageProf:action.payload.data.test?.languageProf,
                    general:action.payload.data.test?.general
                }
            }
        },
        setDocuments:(state,action:PayloadAction<Documents>)=>{state.data=action.payload},
        addDocument:(state,action:PayloadAction<{pathArray:string[],isArray:boolean,data:Document}>)=>{
            let temp:any=state.data;
            action.payload.pathArray.forEach((path,i)=>{
                if(i<=action.payload.pathArray.length-2)
                {
                    temp=temp[path];
                }
            })
            if(action.payload.isArray)
            {
                temp[action.payload.pathArray[action.payload.pathArray.length-1]]
                ?
                temp[action.payload.pathArray[action.payload.pathArray.length-1]].push(action.payload.data)
                :
                temp[action.payload.pathArray[action.payload.pathArray.length-1]]=[action.payload.data]
                
            }
            else
            {
                temp[action.payload.pathArray[action.payload.pathArray.length-1]]=action.payload.data
            }
        },
        removeDocument:(state,action:PayloadAction<Docinfo>)=>{
            let temp:any=state.data;
            action.payload.pathArray.forEach((path,i)=>{
                if(i<=action.payload.pathArray.length-2)
                {
                    temp=temp[path];
                }
            })
            if(action.payload.isArray)
            {
                temp[action.payload.pathArray[action.payload.pathArray.length-1]].length==1
                ?
                delete temp[action.payload.pathArray[action.payload.pathArray.length-1]]
                :
                temp[action.payload.pathArray[action.payload.pathArray.length-1]]=temp[action.payload.pathArray[action.payload.pathArray.length-1]].filter((item:Document)=>item._id!=action.payload._id)
            }
            else
            {
                delete temp[action.payload.pathArray[action.payload.pathArray.length-1]]
            }
        },
        resetDocuments:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initDocuments,addDocument,removeDocument,resetDocuments,setDocuments}=documentsSlice.actions;
export default documentsSlice.reducer;
