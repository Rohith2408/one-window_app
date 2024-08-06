import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  Advisor, StoreItem, User } from "../../misc/typeDefinations";

let initialState:StoreItem<Advisor[]|undefined>={
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
        initAdvisors:(state,action:PayloadAction<StoreItem<Advisor[]>>)=>({...action.payload}),
        addAdvisor:(state,action:PayloadAction<StoreItem<Advisor>>)=>{
            let existingAdvisor=state.data.findIndex((item)=>action.payload.data.info._id==item.info._id)
            if(existingAdvisor==-1){
                state.data.push(action.payload.data);
            }
            else{
                state.data[existingAdvisor]=action.payload.data
            }
        }
}
})

export const {initAdvisors,setAdvisors}=AdvisorsSlice.actions;
export default AdvisorsSlice.reducer;