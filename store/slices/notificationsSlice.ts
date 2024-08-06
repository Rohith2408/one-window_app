import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Notification, StoreItem, UserStatus } from "../../misc/typeDefinations";

let initialState:StoreItem<Notification[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

const NotificationsSlice=createSlice({
    name:'notifications',
    initialState:initialState,
    reducers:{
        initNotifications:(state,action:PayloadAction<StoreItem<Notification[]>>)=>({...action.payload}),
        setNotifications:(state,action:PayloadAction<Notification[]>)=>{state.data=action.payload},
        addNotifications:(state,action:PayloadAction<Notification>)=>{state.data.push(action.payload)},
        removeNotification:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((notification)=>notification._id!=action.payload)},
        resetNotifications:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initNotifications,setNotifications,resetNotifications,removeNotification}=NotificationsSlice.actions;
export default NotificationsSlice.reducer;