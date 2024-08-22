import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Shortlisted, Request } from "../../misc/typeDefinations";

let initialState:Request<Shortlisted[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const shortlistedCoursesSlice=createSlice({
    name:'shortlistedcourses',
    initialState:initialState,
    reducers:{
        initShortlisted:(state,action:PayloadAction<Request<Shortlisted[]>>)=>({...action.payload}),
        addShortlisted:(state,action:PayloadAction<Shortlisted>)=>{state.data.push(action.payload)},
        updateShortlisted:(state,action:PayloadAction<Shortlisted>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        removeShortlisted:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item)=>item._id!=action.payload)},
        resetShortlisted:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initShortlisted,addShortlisted,removeShortlisted,updateShortlisted,resetShortlisted}=shortlistedCoursesSlice.actions;
export default shortlistedCoursesSlice.reducer;