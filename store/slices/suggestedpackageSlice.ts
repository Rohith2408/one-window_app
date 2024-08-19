import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreItem, Package} from "../../types";


let initialState:StoreItem<Package[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const suggestedPackageSlice=createSlice({
    name:'suggestedpackage',
    initialState:initialState,
    reducers:{
        initSuggestedPackage:(state,action:PayloadAction<StoreItem<Package[]>>)=>({...action.payload}),
        addSuggestedPackage:(state,action:PayloadAction<Package>)=>{state.data.push(action.payload)},
        updateSuggestedPackage:(state,action:PayloadAction<Package>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id);
            state.data[index]=action.payload;
        },
        removeSuggestedPackage:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item)=>item._id!=action.payload)},
        resetSuggestedPackage:(state,action:PayloadAction)=>({...initialState})
    }
})

export const {initSuggestedPackage,addSuggestedPackage,removeSuggestedPackage,updateSuggestedPackage,resetSuggestedPackage}=suggestedPackageSlice.actions;
export default suggestedPackageSlice.reducer;