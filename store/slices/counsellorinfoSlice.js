import { createSlice } from "@reduxjs/toolkit";

const counsellorinfoSlice=createSlice({
    name:'counsellorinfo',
    initialState:{
        _id: undefined,
            numberOfStudentsAssisted: undefined,
            name: undefined,
            displayPicSrc: undefined,
            email: undefined,
            userType: undefined,
            appointmentLink: undefined,
            linkedIn:undefined
    },
    reducers:{
        initCounsellorinfo:(state,action)=>state=action.payload
}
})

export const {initCounsellorinfo}=counsellorinfoSlice.actions;
export default counsellorinfoSlice.reducer;