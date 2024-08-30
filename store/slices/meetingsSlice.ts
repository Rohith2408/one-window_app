import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {Meeting, Request } from "../../types/index";

let initialState:Request<Meeting[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

const MeetingsSlice=createSlice({
    name:'Meetings',
    initialState:initialState,
    reducers:{
        initMeetings:(state,action:PayloadAction<Request<Meeting[]>>)=>({...action.payload}),
        setMeetings:(state,action:PayloadAction<Meeting[]>)=>{state.data=action.payload},
        addMeeting:(state,action:PayloadAction<Meeting>)=>{state.data?.push(action.payload)},
        removeMeeting:(state,action:PayloadAction<string>)=>{state.data=state.data?.filter((meeting)=>meeting._id!=action.payload)},
        updateMeeting:(state,action:PayloadAction<Meeting>)=>{state.data=state.data?.map((meeting)=>meeting._id==action.payload._id?action.payload:meeting)}
}
})

export const {initMeetings,setMeetings,addMeeting,removeMeeting,updateMeeting}=MeetingsSlice.actions;
export default MeetingsSlice.reducer;