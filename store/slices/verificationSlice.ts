import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Verification, Request} from "../../types/index";

let initialState:Request<Verification[]|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

type verificationTypes="phone"|"email"

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
            console.log("called",state);
        },
        setVerification:(state,action:PayloadAction<Verification[]>)=>{state.data=action.payload},
        updateVerification:(state,action:PayloadAction<Verification>)=>{
            console.log("called slice")
            return {...state,data:state.data?.map((item)=>item.type==action.payload.type?action.payload:item)}
        },
        resetVerification:(state,action:PayloadAction)=>({...initialState})
}
})

export const {initVerification,updateVerification,setVerification,resetVerification,Verified}=VerificationSlice.actions;
export default VerificationSlice.reducer;