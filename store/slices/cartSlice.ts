import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreItem, cartItem } from "../../misc/typeDefinations";

let initialState:StoreItem<cartItem[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        initCart:(state,action:PayloadAction<StoreItem<cartItem[]>>)=>({...action.payload}),
        addCart:(state,action:PayloadAction<cartItem>)=>{state.data.push(action.payload)},
        updateCart:(state,action:PayloadAction<cartItem>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        removeCart:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item)=>item._id!=action.payload)},
        resetCart:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initCart,addCart,removeCart,updateCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;