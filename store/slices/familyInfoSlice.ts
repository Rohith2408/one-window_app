import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import { FamilyInfo, Request} from "../../misc/typeDefinations";

let initialState:Request<FamilyInfo[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

type Field="GuardianFirstName"|"GuardianLastName"|"GuardianEmail"|"GuardianOccupation"|"GuardianQualification"|"RelationshipWithStudent"|"GuardianContactNumber"

const familyinfoSlice=createSlice({
    name:'familyinfo',
    initialState:initialState,
    reducers:{
        initFamilyinfo:(state,action:PayloadAction<Request<FamilyInfo[]>>)=>({...action.payload}),
        setFamilyinfo:(state,action:PayloadAction<FamilyInfo[]>)=>{state.data=action.payload},
        updateFamilyinfo:(state,action:PayloadAction<{id:number,field:Field,data:any}>)=>{
            state.data[action.payload.id][action.payload.field]=action.payload.data
        },
        resetFamilyInfo:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initFamilyinfo,updateFamilyinfo,setFamilyinfo,resetFamilyInfo}=familyinfoSlice.actions;
export default familyinfoSlice.reducer;