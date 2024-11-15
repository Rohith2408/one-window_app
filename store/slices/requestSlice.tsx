import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Request, ServerResponse } from "../../types";

let initialState:Request<ServerResponse|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

export const requestSlice=createSlice({
    name:'request',
    initialState:initialState,
    reducers:{
        setRequest:(state,action:PayloadAction<ServerResponse>)=>{state.data=action.payload},
    }
});

export const {setRequest}=requestSlice.actions;
export default requestSlice.reducer;