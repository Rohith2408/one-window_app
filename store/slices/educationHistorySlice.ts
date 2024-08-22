import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EducationHistory, EducationHistory_Plus2, EducationHistory_PostGraduation, EducationHistory_School, EducationHistory_UnderGraduation, StoreAction, Request } from "../../types/index";

type EducationType="school" | "plus2" | "underGraduation" | "postGraduation"
type EducationData=EducationHistory_School | EducationHistory_Plus2 | EducationHistory_UnderGraduation | EducationHistory_PostGraduation

let initialState:Request<EducationHistory>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:{
        school: undefined,
        plus2: undefined,
        underGraduation: undefined,
        postGraduation:undefined
    }
}

export const educationHistorySlice=createSlice({
    name:'educationhistory',
    initialState:initialState,
    reducers:{
        initEducationHistory:(state,action:PayloadAction<Request<EducationHistory>>)=>({...action.payload}),
        setSchool:(state,action:PayloadAction<EducationHistory_School>)=>{state.data.school=action.payload},
        setPlus2:(state,action:PayloadAction<EducationHistory_Plus2>)=>{state.data.plus2=action.payload},
        setUnderGraduation:(state,action:PayloadAction<EducationHistory_UnderGraduation>)=>{state.data.underGraduation=action.payload},
        setPostGraduation:(state,action:PayloadAction<EducationHistory_PostGraduation>)=>{state.data.postGraduation=action.payload},
        setEducationHistory:(state,action:PayloadAction<EducationHistory>)=>{state.data=action.payload},
        removeEducationHistory:(state,action:PayloadAction<EducationType>)=>{state.data[action.payload]=undefined},
        resetEducationHistory:(state,action:PayloadAction)=>({...initialState})
    }
});

export const {initEducationHistory,removeEducationHistory,setSchool,setPlus2,setPostGraduation,setUnderGraduation,setEducationHistory,resetEducationHistory}=educationHistorySlice.actions;
export default educationHistorySlice.reducer;

