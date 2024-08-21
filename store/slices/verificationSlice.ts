import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Verification, Request, UserStatus } from "../../misc/typeDefinations";

let initialState:Request<Verification[]|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

type verificationTypes="mobile"|"email"

const VerificationSlice=createSlice({
    name:'verification',
    initialState:initialState,
    reducers:{
        initVerification:(state,action:PayloadAction<Request<Verification[]>>)=>({...action.payload}),
        Verified:(state,action:PayloadAction<verificationTypes>)=>{
            if(state.data)
            {
                let index=state.data.findIndex((item)=>item.type==action.payload)
                state.data[index].status=true
            }
        },
        setVerification:(state,action:PayloadAction<Verification[]>)=>{state.data=action.payload},
        resetVerification:(state,action:PayloadAction)=>({...initialState})
}
})

export const {initVerification,setVerification,resetVerification}=VerificationSlice.actions;
export default VerificationSlice.reducer;