import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Popup, StoreItem } from "../../misc/typeDefinations";

let initialState:StoreItem<Popup>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:{
        show:false
    }
}

const PopupSlice=createSlice({
    name:'error',
    initialState:initialState,
    reducers:{
        setPopup:(state,action:PayloadAction<Popup>)=>{state.data=action.payload},
        closePopup:(state,action:PayloadAction)=>({...initialState}),
        //acknowledgePopup:(state,action:PayloadAction<{status:boolean,data:any}>)=>{state.data.data?state.data.data.acknowledgement=action.payload:null},
        resetPopup:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {setPopup,closePopup,resetPopup}=PopupSlice.actions;
export default PopupSlice.reducer;