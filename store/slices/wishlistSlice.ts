import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Request, wishlistItem } from "../../types";


let initialState:Request<wishlistItem[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const wishlistSlice=createSlice({
    name:'wishlist',
    initialState:initialState,
    reducers:{
        initWishlist:(state,action:PayloadAction<Request<wishlistItem[]>>)=>({...action.payload}),
        setWishlist:(state,action:PayloadAction<wishlistItem[]>)=>{state.data=action.payload},
        addWishlist:(state,action:PayloadAction<wishlistItem>)=>{state.data.push(action.payload)},
        updateWishlist:(state,action:PayloadAction<wishlistItem>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        removeWishlist:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item)=>item._id!=action.payload)},
        resetWishlist:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initWishlist,addWishlist,removeWishlist,updateWishlist,resetWishlist,setWishlist}=wishlistSlice.actions;
export default wishlistSlice.reducer;