import { PayloadAction, createSlice } from "@reduxjs/toolkit";

let initialState:{id:string|undefined}={id:undefined}

export const removeScreenSlice=createSlice({
    name:'removescreen',
    initialState:initialState,
    reducers:{
        setRemoveScreen:(state,action:PayloadAction<{id:string}>)=>action.payload,
        resetRemoveScreen:(state,action)=>(initialState),
    }
});

export const {setRemoveScreen,resetRemoveScreen}=removeScreenSlice.actions;
export default removeScreenSlice.reducer;