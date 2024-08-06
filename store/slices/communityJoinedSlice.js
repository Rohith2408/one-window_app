import { createSlice } from "@reduxjs/toolkit";

export const communityJoinedSlice=createSlice({
    name:'communityjoined',
    initialState:{
        networkRequestMade:false,
        haveAnIssue:false,
        issue:"",
        data:[]
    },
    reducers:{
        initCommunityjoined:(state,action)=>({...action.payload}),
        addCommunityjoined:(state,action)=>({...state,data:[...state.data,action.payload]}),
        removeCommunityjoined:(state,action)=>({...state,data:state.data.filter((item,index)=>item._id!=action.payload)}),
        updateCommunityjoined:(state,action)=>{
            state.data[state.data.findIndex((item)=>item._id==action.payload.id)]=action.payload.newdata;
            return state;
        }
    }
});

export const {initCommunityjoined,addCommunityjoined,removeCommunityjoined,updateCommunityjoined}=communityJoinedSlice.actions;
export default communityJoinedSlice.reducer;