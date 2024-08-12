import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bakeMessagesWithSeenInfo, getParticipantsLastSeenMessage, setWordCase } from "../../utils/index";
import { Message, Participant, StoreItem } from "../../types";

let initialState:StoreItem<Message[]>={
    requestStatus:"not_initiated",
    responseStatus:"not_recieved",
    haveAnIssue:false,
    issue:"",
    data:[]
}

export const messagesSlice=createSlice({
    name:'messages',
    initialState:initialState,
    reducers:{
        initMessages:(state,action:PayloadAction<StoreItem<Message[]>>)=>({...action.payload}),
        resetMessages:(state,action:PayloadAction)=>({...initialState}),
        addMessage:(state,action:PayloadAction<Message>)=>{
            state.data=[...state.data.filter((msg)=>msg.type!="typing"),action.payload,...state.data.filter((msg)=>msg.type=="typing")]
        },
        startTypingMessage:(state,action:PayloadAction<Participant>)=>{
            let typingMessages=state.data.filter((msg)=>msg.type=="typing")
            if(typingMessages.findIndex((msg)=>msg.sender?._id==action.payload._id)==-1)
            {
                //doesnt exists
                typingMessages.push({_id:action.payload.firstName+"/typing",content:setWordCase(action.payload.firstName)+" is typing",sender:action.payload,type:"typing"})
                state.data=[...state.data.filter((msg)=>msg.type!="typing"),...typingMessages]
                console.log("slice",JSON.stringify([...state.data.filter((msg)=>msg.type!="typing"),...typingMessages],null,2))
            }
        },
        stopTypingMessage:(state,action:PayloadAction<Participant>)=>{
            state.data=state.data.filter((msg)=>((msg.type!="typing")|| (msg.type=="typing" && msg.sender?._id!=action.payload._id)))
        },
        seenMessage:(state,action:PayloadAction<Participant>)=>{
            state.data=[...state.data.filter((msg)=>msg.type!="typing").filter((msg)=>((msg.type!="seen")||(msg.type=="seen" && msg.sender?._id!=action.payload._id))),{_id:action.payload.firstName+"/seen",content:"Seen by "+setWordCase(action.payload.firstName),sender:action.payload,type:"seen"},...state.data.filter((msg)=>msg.type=="typing")]
        },
        removeMessage:(state,action:PayloadAction<string>)=>{state.data=state.data.filter((item,index)=>item._id!=action.payload)},
        updateMessage:(state,action:PayloadAction<Message>)=>{
            let index=state.data.findIndex((item)=>item._id==action.payload._id)
            state.data[index]=action.payload;
        }
    }
});


export const {initMessages,addMessage,removeMessage,updateMessage,resetMessages,startTypingMessage,stopTypingMessage,seenMessage}=messagesSlice.actions;
export default messagesSlice.reducer;

// let initialState={
//     items:[]
// }
// addItems:(state,action)=>({items:[...state.items,action.payload]})
// removeItems:(state,action)=>{items:state.items.filter((item)=>item.id!=action.data)}
// updateItem:(state,action)=>{items:state.items.map((item)=>item.id==action.id?{...item,price:action.price}:item)}
//updatePrice:(state,action)=>{items:state.}
// {
//     id:1,
//     name:""
// }