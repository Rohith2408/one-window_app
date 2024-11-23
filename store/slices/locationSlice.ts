import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Request } from "../../types/index";
import { LocationGeocodedAddress } from "expo-location";

let initialState:Request<LocationGeocodedAddress|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

const LocationSlice=createSlice({
    name:'Location',
    initialState:initialState,
    reducers:{
        initLocation:(state,action:PayloadAction<Request<LocationGeocodedAddress>>)=>({...action.payload}),
        setLocation:(state,action:PayloadAction<LocationGeocodedAddress>)=>{state.data=action.payload},
}
})

export const {initLocation,setLocation}=LocationSlice.actions;
export default LocationSlice.reducer;