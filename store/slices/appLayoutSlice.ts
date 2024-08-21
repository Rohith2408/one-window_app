import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Userbaselayout from "../../components/partialviews/userbaselayout";
import { Page, Request } from "../../misc/typeDefinations";

let initialState:Request<Page[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

const ApplayoutSlice=createSlice({
    name:'applayout',
    initialState:initialState,
    reducers:{
        addPage:(state,action:PayloadAction<Page>)=>{state.data.push(action.payload)},
        removePage:(state,action:PayloadAction)=>{state.data=state.data.slice(0,-1)},
        setPages:(state,action:PayloadAction<Page[]>)=>{state.data=action.payload},
        initApplayout:(state,action:PayloadAction<Page[]>)=>{
            state.data=action.payload
        },
        resetApplayout:(state,action:PayloadAction)=>({...initialState})
}
})

export const {initApplayout,setPages,addPage,removePage,resetApplayout}=ApplayoutSlice.actions;
export default ApplayoutSlice.reducer;