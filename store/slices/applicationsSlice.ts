import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Application, StoreAction, Request } from "../../misc/typeDefinations";

let initialState:Request<Application[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const applicationsSlice=createSlice({
    name:'applications',
    initialState:initialState,
    reducers:{
        initApplications:(state,action:PayloadAction<Request<Application[]>>)=>({...action.payload}),
        addApplication:(state,action:PayloadAction<Application>)=>{state.data.push(action.payload)},
        updateApplication:(state,action:PayloadAction<Application>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        requestApplicationCancel:(state,action:PayloadAction<string>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload);
            state.data[index].cancellationRequest=true
        },
        removeApplication:(state,action:PayloadAction<string>)=>({...state,data:state.data.filter((item,index)=>item._id!=action.payload)}),
        resetApplications:(state,action:PayloadAction)=>({...initialState}),
    }
})

export const {initApplications,addApplication,updateApplication,removeApplication,resetApplications}=applicationsSlice.actions;
export default applicationsSlice.reducer;