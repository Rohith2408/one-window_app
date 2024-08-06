import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Recommendation, StoreItem } from "../../misc/typeDefinations";

type RecommendationType={
    criteria: {
    ug_gpa?:number,
    gre?:number,
    sub_discipline?: string[]
}|undefined,
data:Recommendation[]
}

let initialState:StoreItem<RecommendationType|undefined>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:undefined
}

export const recommendationsSlice=createSlice({
    name:'recommendedcourses',
    initialState:initialState,
    reducers:{
        initRecommendations:(state,action:PayloadAction<StoreItem<RecommendationType>>)=>({...action.payload}),
        setRecommendations:(state,action:PayloadAction<RecommendationType>)=>{state.data=action.payload},
        addRecommendation:(state,action)=>{},
        removeRecommendation:(state,action)=>{}
    }
})

export const {initRecommendations,addRecommendation,removeRecommendation,setRecommendations}=recommendationsSlice.actions;
export default recommendationsSlice.reducer;