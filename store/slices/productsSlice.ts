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
        setProducts:(state,action:PayloadAction<PurchasedProduct[]>)=>{state.data=(action.payload)},
        addProducts:(state,action:PayloadAction<PurchasedProduct[]>)=>{state.data=[...state.data,...action.payload]},
        updateProduct:(state,action:PayloadAction<PurchasedProduct>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        requestProductCancel:(state,action:PayloadAction<string>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload);
            state.data[index].cancellationRequest=true
        },
        replaceProducts:(state,action:PayloadAction<PurchasedProduct[]>)=>{
            let unReplacedProducts=[...action.payload]
            state.data=[...state.data.map((existingItem)=>{
                let updatedData=unReplacedProducts.find((item2)=>item2._id==existingItem._id)
                if(updatedData)
                {
                    unReplacedProducts=unReplacedProducts.filter((item)=>existingItem._id!=item._id)
                    return updatedData
                }
                else
                {
                    return existingItem
                }
            }),...unReplacedProducts]
        },
        removeProduct:(state,action:PayloadAction<string>)=>({...state,data:state.data.filter((item,index)=>item._id!=action.payload)}),
        resetProducts:(state,action:PayloadAction)=>({...initialState}),
    }
})

export const {initProducts,replaceProducts,setProducts,addProducts,updateProduct,removeProduct,resetProducts}=productsSlice.actions;
export default productsSlice.reducer;