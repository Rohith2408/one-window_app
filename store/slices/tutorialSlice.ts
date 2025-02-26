import { PayloadAction, createSlice } from "@reduxjs/toolkit";

let initialState:{id:string,x:number,y:number}[]|null=[]

const TutorialSlice=createSlice({
    name:'tutorial',
    initialState:initialState,
    reducers:{
        setTutorial:(state,action:PayloadAction<{id:string,x:number,y:number}[]>)=>([...action.payload]),
        addTutorial:(state,action:PayloadAction<{id:string,x:number,y:number}>)=>{
            let index=state.findIndex((item)=>item.id==action.payload.id)
            if(index==-1)
            {
                return [...state,action.payload]
            }
            else
            {
                return state.map((item)=>item.id==action.payload.id?action.payload:item) 
            }
        },
        resetTutorial:(state,action:PayloadAction)=>[]
}
})

export const {setTutorial,resetTutorial,addTutorial}=TutorialSlice.actions;
export default TutorialSlice.reducer;