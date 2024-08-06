import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreAction, StoreItem } from "../../misc/typeDefinations";

let initialState:StoreItem<Application[]>={
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
        initproducts:(state,action:PayloadAction<StoreItem<Application[]>>)=>({...action.payload}),
        addApplication:(state,action:PayloadAction<Application>)=>{state.data.push(action.payload)},
        updateApplication:(state,action:PayloadAction<Application>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        requestApplicationCancel:(state,action:PayloadAction<string>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload);
            state.data[index].cancellationRequest=true
        },
        removeApplication:(state,action:PayloadAction<string>)=>({...state,data:state.data.filter((item,index)=>item._id!=action.payload)}),
        resetproducts:(state,action:PayloadAction)=>({...initialState}),
    }
})

export const {initproducts,addApplication,updateApplication,removeApplication,resetproducts}=productsSlice.actions;
export default productsSlice.reducer;