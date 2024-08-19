import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product, StoreItem } from "../../types";

let initialState:StoreItem<Product[]>={
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
        initproducts:(state,action:PayloadAction<StoreItem<Product[]>>)=>({...action.payload}),
        addProduct:(state,action:PayloadAction<Product>)=>{state.data.push(action.payload)},
        updateProduct:(state,action:PayloadAction<Product>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        requestProductCancel:(state,action:PayloadAction<string>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload);
            state.data[index].cancellationRequest=true
        },
        removeProduct:(state,action:PayloadAction<string>)=>({...state,data:state.data.filter((item,index)=>item._id!=action.payload)}),
        resetproducts:(state,action:PayloadAction)=>({...initialState}),
    }
})

export const {initproducts,addProduct,updateProduct,removeProduct,resetproducts}=productsSlice.actions;
export default productsSlice.reducer;