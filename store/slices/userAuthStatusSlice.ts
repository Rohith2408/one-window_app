import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Request, UserStatus } from "../../misc/typeDefinations";


let initialState:Request<UserStatus>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:{
        isAuthorized:true,
        isRegistered:true,
        role:"student"
    }
}

const UserAuthStatusSlice=createSlice({
    name:'userauthstatus',
    initialState:initialState,
    reducers:{
        setUserAuthStatus:(state,action:PayloadAction<UserStatus>)=>{state.data=action.payload},
        initUserAuthStatus:(state,action)=>({...action.payload}),
        resetUserAuthStatus:(state,action:PayloadAction)=>({...initialState,data:{
            isAuthorized:false,
            isRegistered:true,
            role:"student"
        }})
}
})

export const {initUserAuthStatus,setUserAuthStatus,resetUserAuthStatus}=UserAuthStatusSlice.actions;
export default UserAuthStatusSlice.reducer;