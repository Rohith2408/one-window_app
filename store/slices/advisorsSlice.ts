import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  Advisor, Request, User } from "../../types";

let initialState:Request<Advisor[]|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

const AdvisorsSlice=createSlice({
    name:'Advisors',
    initialState:initialState,
    reducers:{
        setAdvisors:(state,action:PayloadAction<Advisor[]>)=>{state.data=action.payload},
        initAdvisors:(state,action:PayloadAction<Request<Advisor[]>>)=>({...action.payload}),
        addAdvisor:(state,action:PayloadAction<Advisor>)=>{
            
            let existingAdvisor=state.data?.findIndex((item)=>action.payload.info._id==item.info._id)
            if(existingAdvisor==-1){
                state.data?.push(action.payload);
            }
            else{
                state.data[existingAdvisor]=action.payload
            }
        },
        updateAdvisor:(state,action:PayloadAction<Advisor>)=>{state.data=state.data?.map((item)=>item.info._id==action.payload.info._id?action.payload:item)}
}
})

export const {initAdvisors,setAdvisors,addAdvisor,updateAdvisor}=AdvisorsSlice.actions;
export default AdvisorsSlice.reducer;