import { createSlice } from "@reduxjs/toolkit";

export const communityPostsSlice=createSlice({
    name:'communityposts',
    initialState:null,
    reducers:{
        initCommunityPosts:(state,action)=>[...action.payload],
        addCommunityPosts:(state,action)=>[...state,action.payload],
        removeCommunityPosts:(state,action)=>state.filter((item,index)=>item._id!=action.payload),
        updateCommunityPosts:(state,action)=>state.map((item)=>item._id==action.payload._id?action.payload:item)
    }
})

export const {initCommunityPosts,addCommunityPosts,removeCommunityPosts,updateCommunityPosts}=communityPostsSlice.actions;
export default communityPostsSlice.reducer;