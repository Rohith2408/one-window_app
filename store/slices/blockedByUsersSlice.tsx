import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  Advisor, Request, User } from "../../types";

let initialState:Request<User[]|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

const blockedByUsersSlice=createSlice({
    name:'blockedbyusers',
    initialState:initialState,
    reducers:{
        setBlockedByUsers:(state,action:PayloadAction<User[]>)=>{state.data=action.payload},
        initBlockedByUsers:(state,action:PayloadAction<Request<User[]>>)=>({...action.payload}),
        addBlockedByUser:(state,action:PayloadAction<User>)=>{
            let existingUser=state.data?.findIndex((item)=>action.payload._id==item._id)
            if(existingUser==-1 || existingUser==undefined){
                state.data?.push(action.payload);
            }
            else{
                state.data[existingUser]=action.payload
            }
        }
}
})

export const {initBlockedByUsers,setBlockedByUsers,addBlockedByUser}=blockedByUsersSlice.actions;
export default blockedByUsersSlice.reducer;