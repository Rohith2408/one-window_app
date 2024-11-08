import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  Advisor, Request, User } from "../../types";

let initialState:Request<User[]|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

const blockedUsersSlice=createSlice({
    name:'blockedusers',
    initialState:initialState,
    reducers:{
        setBlockedUsers:(state,action:PayloadAction<User[]>)=>{state.data=action.payload},
        initBlockedUsers:(state,action:PayloadAction<Request<User[]>>)=>({...action.payload}),
        addBlockedUser:(state,action:PayloadAction<User>)=>{
            let existingUser=state.data?.findIndex((item)=>action.payload._id==item._id)
            if(existingUser==-1 || existingUser==undefined){
                state.data?.push(action.payload);
            }
            else{
                state.data[existingUser]=action.payload
            }
        },
        removeBlockedUser:(state,action:PayloadAction<string>)=>{
            state.data=state.data?.filter((item)=>item._id!=action.payload)
        }
}
})

export const {initBlockedUsers,setBlockedUsers,addBlockedUser,removeBlockedUser}=blockedUsersSlice.actions;
export default blockedUsersSlice.reducer;