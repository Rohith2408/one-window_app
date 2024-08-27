import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Sharedinfo, Request } from "../../types";

let initialState:Request<Sharedinfo|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

export const sharedinfoSlice=createSlice({
    name:'sharedinfo',
    initialState:initialState,
    reducers:{
        initSharedInfo:(state,action:PayloadAction<Request<Sharedinfo>>)=>({...action.payload}),
        setSharedInfo:(state,action:PayloadAction<Sharedinfo>)=>{state.data=action.payload},
        resetSharedinfo:(state,action:PayloadAction)=>({...initialState}),
        updatEmail:(state,action:PayloadAction<string>)=>({...state,email:action.payload})
    }
});

export const {initSharedInfo,setSharedInfo,resetSharedinfo}=sharedinfoSlice.actions;
export default sharedinfoSlice.reducer;