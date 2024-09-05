import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order, Request } from "../../types";

let initialState:Request<Order[]>={
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
        initOrders:(state,action:PayloadAction<Request<Order[]>>)=>({...action.payload}),
        setOrders:(state,action:PayloadAction<Order[]>)=>{state.data=action.payload},
        updateOrder:(state,action:PayloadAction<Order>)=>{state.data=state.data.map((item)=>item._id==action.payload._id?action.payload:item)},
        addOrders:(state,action:PayloadAction<Order>)=>{state.data.push(action.payload)},
        removeNotification:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((notification)=>notification._id!=action.payload)},
        resetOrders:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initOrders,addOrders,setOrders,resetOrders,removeNotification,updateOrder}=OrdersSlice.actions;
export default OrdersSlice.reducer;