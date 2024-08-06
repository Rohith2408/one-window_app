import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Skill, StoreItem } from "../../misc/typeDefinations";

let initialState:StoreItem<Skill[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const skillsSlice=createSlice({
    name:'skills',
    initialState:initialState,
    reducers:{
        initSkills:(state,action:PayloadAction<StoreItem<Skill[]>>)=>({...action.payload}),
        setSkills:(state,action:PayloadAction<Skill[]>)=>{state.data=action.payload},
        addSkill:(state,action:PayloadAction<Skill>)=>{state.data.push(action.payload)},
        removeSkill:(state,action:PayloadAction<number>)=>{state.data=state.data.filter((item,i)=>i!=action.payload)},
        updateSkill:(state,action:PayloadAction<{_id:number,data:string}>)=>{
            state.data[action.payload._id]=action.payload.data
        },
        resetSkills:(state,action:PayloadAction)=>({...initialState})
    }
});

export const {initSkills,addSkill,removeSkill,updateSkill,resetSkills,setSkills}=skillsSlice.actions;
export default skillsSlice.reducer;