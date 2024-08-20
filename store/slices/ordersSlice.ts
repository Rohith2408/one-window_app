import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order, StoreItem } from "../../types";

let initialState:StoreItem<Order[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

const OrdersSlice=createSlice({
    name:'orders',
    initialState:initialState,
    reducers:{
        initOrders:(state,action:PayloadAction<StoreItem<Order[]>>)=>({...action.payload}),
        setOrders:(state,action:PayloadAction<Order[]>)=>{state.data=action.payload},
        addOrders:(state,action:PayloadAction<Order>)=>{state.data.push(action.payload)},
        removeNotification:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((notification)=>notification._id!=action.payload)},
        resetOrders:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initOrders,setOrders,resetOrders,removeNotification}=OrdersSlice.actions;
export default OrdersSlice.reducer;