import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error, StoreItem } from "../../misc/typeDefinations";

let initialState:StoreItem<Error>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:{
        show:false,
        message:""
    }
}

const ErrorSlice=createSlice({
    name:'error',
    initialState:initialState,
    reducers:{
        setError:(state,action:PayloadAction<Error>)=>{state.data=action.payload},
        initError:(state,action:PayloadAction<StoreItem<Error>>)=>({...action.payload})
}
})

export const {initError,setError}=ErrorSlice.actions;
export default ErrorSlice.reducer;