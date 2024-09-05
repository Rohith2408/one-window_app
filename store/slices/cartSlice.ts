import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, Request,PurchasedProduct } from "../../types";
import { compareProducts } from "../../utils";

let initialState:Request<CartItem[]>={
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
        initCart:(state,action:PayloadAction<Request<CartItem[]>>)=>({...action.payload}),
        addCart:(state,action:PayloadAction<CartItem>)=>{state.data.push(action.payload)},
        updateCart:(state,action:PayloadAction<CartItem>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        removeItemsCart:(state,action:PayloadAction<PurchasedProduct[]>)=>{state.data=state.data.filter((cartitem)=>action.payload.find((purchaseditem)=>compareProducts({intake:purchaseditem.intake,course:{id:purchaseditem.course._id,name:purchaseditem.course.name,icon:purchaseditem.course.university.logoSrc},category:purchaseditem.category},{intake:cartitem.intake,course:{id:cartitem.course._id,name:cartitem.course.name,icon:cartitem.course.university.logoSrc},category:cartitem.category}))?false:true)},
        setCart:(state,action:PayloadAction<CartItem[]>)=>{state.data=action.payload},
        removeCart:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item)=>item._id!=action.payload)},
        resetCart:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initCart,addCart,setCart,removeCart,updateCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;