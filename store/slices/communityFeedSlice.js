import { createSlice } from "@reduxjs/toolkit";

export const communityFeedSlice=createSlice({
    name:'communityfeed',
    initialState:null,
    reducers:{
        initCommunityFeed:(state,action)=>[...action.payload],
        addCommunityFeed:(state,action)=>[...state,action.payload],
        removeCommunityFeed:(state,action)=>state.filter((item,index)=>item._id!=action.payload),
        updateCommunityFeed:(state,action)=>state.map((item)=>item._id==action.payload._id?action.payload:item)
    }
})

export const {initCommunityFeed,addCommunityFeed,removeCommunityFeed,updateCommunityFeed}=communityFeedSlice.actions;
export default communityFeedSlice.reducer;