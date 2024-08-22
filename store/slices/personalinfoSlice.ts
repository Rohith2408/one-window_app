import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import { Personalinfo, Request} from "../../misc/typeDefinations";

let initialState:Request<Personalinfo|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

//type Field="firstName"|"lastName"|"displayPicSrc"|"email"|"DOB"|"Gender"|"temporaryAddress"|"permanentAddress"|"nationality"|"countyOfBirth"|"maritalStatus"|"validPassport"|"validPermit"|"visaRejectedDetails"

const personalinfoSlice=createSlice({
    name:'personalinfo',
    initialState:initialState,
    reducers:{
        initPersonalInfo:(state,action:PayloadAction<Request<Personalinfo>>)=>({...action.payload}),
        setPersonalInfo:(state,action:PayloadAction<Personalinfo>)=>{state.data=action.payload},
        // updatePersonalInfo:(state,action:PayloadAction<{field:Field,data:any}>)=>{
        //     state.data
        //     ?
        //     state.data[action.payload.field]=action.payload.data
        //     :
        //     null
        // },
        resetPersonalInfo:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initPersonalInfo,updatePersonalInfo,setPersonalInfo,resetPersonalInfo}=personalinfoSlice.actions;
export default personalinfoSlice.reducer;