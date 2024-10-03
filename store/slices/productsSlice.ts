import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product, PurchasedProduct, Request } from "../../types";

let initialState:Request<PurchasedProduct[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const productsSlice=createSlice({
    name:'products',
    initialState:initialState,
    reducers:{
        initProducts:(state,action:PayloadAction<Request<PurchasedProduct[]>>)=>({...action.payload}),
        addProduct:(state,action:PayloadAction<PurchasedProduct>)=>{state.data.push(action.payload)},
        addProducts:(state,action:PayloadAction<PurchasedProduct[]>)=>{state.data=[...state.data,...action.payload]},
        updateProduct:(state,action:PayloadAction<PurchasedProduct>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        requestProductCancel:(state,action:PayloadAction<string>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload);
            state.data[index].cancellationRequest=true
        },
        removeProduct:(state,action:PayloadAction<string>)=>({...state,data:state.data.filter((item,index)=>item._id!=action.payload)}),
        resetProducts:(state,action:PayloadAction)=>({...initialState}),
    }
})

export const {initProducts,addProduct,addProducts,updateProduct,removeProduct,resetProducts}=productsSlice.actions;
export default productsSlice.reducer;