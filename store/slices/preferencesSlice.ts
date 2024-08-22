import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Preference, Preferences, Request } from "../../misc/typeDefinations";

let initialState:Request<Preferences|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

type Fields="degree"|"intake"|"budget"|"courses"|"country"|"exploreButton"|"theme"|"currency"|"language"

export const preferencesSlice=createSlice({
    name:'preferences',
    initialState:initialState,
    reducers:{
        initPreferences:(state,action:PayloadAction<Request<Preferences>>)=>({...action.payload}),
        setPreference:(state,action:PayloadAction<Preferences>)=>{state.data=action.payload},
        updatePreferences:(state,action:PayloadAction<Preference>)=>{
            // state.data
            // ?
            // state.data[action.payload.type]=action.payload.data
            // :
            // null
        },
        resetPreferences:(state,action:PayloadAction)=>({...initialState})
    }
});

export const {initPreferences,updatePreferences,setPreference,resetPreferences}=preferencesSlice.actions;
export default preferencesSlice.reducer;