import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Request, Test, TestSection } from "../../types/index";

let initialState:Request<Test[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

const TestScoresSlice=createSlice({
    name:'testscores',
    initialState:initialState,
    reducers:{
        initTestScores:(state,action:PayloadAction<Request<Test[]>>)=>({...action.payload}),
        addTest:(state,action:PayloadAction<Test>)=>{state.data.push(action.payload)},
        addTestSection:(state,action:PayloadAction<TestSection>)=>{
            let testIndex=state.data.findIndex((test)=>test.name==action.payload.testName)
            if(testIndex==-1)
            {
                state.data.push({
                    name:action.payload.testName,
                    scores: [{
                        description:action.payload.sectionName,
                        count:action.payload.score
                    }],
                    testDate:action.payload.testDate?action.payload.testDate:new Date()
                })
            }
            else
            {
                let sectionIndex=state.data[testIndex].scores.findIndex((section)=>section.description==action.payload.sectionName)
                if(sectionIndex==-1)
                {
                    state.data[testIndex].scores.push({
                        description: action.payload.sectionName,
                        count: action.payload.score
                    })
                }
                else
                {
                    state.data[testIndex].scores=state.data[testIndex].scores.map((section)=>section.description==action.payload.sectionName?{description:action.payload.sectionName,count:action.payload.score}:section)
                }
            }   
        },
        removeTest:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((test)=>test.name!=action.payload)},
        removeTestSection:(state,action:PayloadAction<{sectionID:string,testID:string}>)=>{
            let testIndex=state.data.findIndex((test)=>test._id==action.payload.testID)
            state.data[testIndex].scores=state.data[testIndex].scores.filter((section)=>section._id!=action.payload.sectionID)
        },
        setTests:(state,action:PayloadAction<Test[]>)=>{state.data=action.payload},
        resetTests:(state,action:PayloadAction)=>({...initialState})
}
})

export const {initTestScores,addTest,addTestSection,removeTest,removeTestSection,setTests,resetTests}=TestScoresSlice.actions;
export default TestScoresSlice.reducer;