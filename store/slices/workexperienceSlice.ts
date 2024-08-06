import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreAction, StoreItem, WorkExperience } from "../../misc/typeDefinations";

let initialState:StoreItem<WorkExperience[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const workexperienceSlice=createSlice({
    name:'workexperience',
    initialState:initialState,
    reducers:{
        initWorkexperience:(state,action:PayloadAction<StoreItem<WorkExperience[]>>)=>({...action.payload}),
        addWorkexperience:(state,action:PayloadAction<WorkExperience>)=>{state.data.push(action.payload)},
        removeWorkexperience:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item)=>item._id!=action.payload)},
        updateWorkexperience:(state,action:PayloadAction<WorkExperience>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id)
            state.data[index]=action.payload;
        },
        setWorkExperience:(state,action:PayloadAction<WorkExperience[]>)=>{state.data=action.payload},
        resetWorkExperience:(state,action:PayloadAction)=>({...initialState})
    }
});

export const {initWorkexperience,addWorkexperience,removeWorkexperience,updateWorkexperience,setWorkExperience,resetWorkExperience}=workexperienceSlice.actions;
export default workexperienceSlice.reducer;