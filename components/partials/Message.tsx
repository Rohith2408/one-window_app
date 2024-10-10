import { useEffect, useRef, useState } from "react"
import { Animated, Keyboard, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Word2Sentence, getDevice, getServerRequestURL, pickDocument, serverRequest, setLastSeenMessage, setWordCase } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import Loadingview from "../resources/Loadingview"
import emptylist from '../../assets/images/misc/emptylist.png'
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { Chat,Message as MessageType, Participant, ServerResponse, TriggerObject } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addMessage, initMessages, resetMessages, seenMessage, startTypingMessage, stopTypingMessage } from "../../store/slices/messagesSlice"
import { requests } from "../../constants/requests"
import add_icon from '../../assets/images/misc/add.png'
import send_icon from '../../assets/images/misc/send.png'
import loading_icon from '../../assets/images/misc/loader.gif'
import Messagecard from "../cards/Messagecard"
import { store } from "../../store"
import socket from "../../socket"
import default_icon from '../../assets/images/misc/defaultDP.png'
import { TypingAnimation } from 'react-native-typing-animation';

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1
    },
    info_wrapper:{
        paddingTop:5,
        position:"relative",
        backgroundColor:'red'
    },
    info_wrapper_bg:{
        position:"absolute",
        padding:20,
        top:0,
        left:0,
        height:"125%",
        width:"100%",
        zIndex:-1
    },
    info_subwrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        padding:30
    },
    name_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"flex-start",
        gap:5
    },
    dp_wrapper:{
        display:"flex",
        position:"relative"
    },
    dp_bg:{
        position:"absolute",
        zIndex:-1,
        borderRadius:100
    },
    meetings_wrapper:{
        flex:1,
        padding:20,
        gap:20,
        backgroundColor:'white',
        borderRadius:30
    },
    messagebar_wrapper:{
        display:'flex',
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        padding:10,
        borderWidth:1.25,
        borderRadius:100,
        backgroundColor:"white",
        position:"relative"
    }
})

const TabStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    dp:{
        width:50,
        height:50,
        resizeMode:"contain"
    },
    dp_bg:{
        width:50,
        height:50,
        top:-5,
        left:10
    },
    meeting_heading:{
        fontSize:14
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    no_meetings:{
        fontSize:18
    },
    click_message:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:120,
        height:120,
        resizeMode:"contain"
    },
    activity_indicator:{
        width:30,
        height:30,
        objectFit:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    dp:{
        width:50,
        height:50,
        resizeMode:"contain"
    },
    dp_bg:{
        width:50,
        height:50,
        top:-5,
        left:10
    },
    meeting_heading:{
        fontSize:14
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    no_meetings:{
        fontSize:14
    },
    click_message:{
        fontSize:10,
        lineHeight:20
    },
    emptylist_image:{
        width:80,
        height:80,
        resizeMode:"contain"
    },
    loadingview_name:{
        width:150,
        height:30
    },
    activity_indicator:{
        width:26,
        height:26,
        objectFit:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    dp:{
        width:50,
        height:50,
        resizeMode:"contain"
    },
    dp_bg:{
        width:50,
        height:50,
        top:-5,
        left:10
    },
    meeting_heading:{
        fontSize:14
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    no_meetings:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    loadingview_name:{
        width:150,
        height:30
    },
    add:{
        width:20,
        height:20,
        objectFit:"contain"
    },
    send:{
        width:20,
        height:20,
        objectFit:"contain"
    },
    activity_indicator:{
        width:30,
        height:30,
        objectFit:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    dp:{
        width:50,
        height:50,
        resizeMode:"contain"
    },
    dp_bg:{
        width:50,
        height:50,
        top:-5,
        left:10
    },
    meeting_heading:{
        fontSize:14
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    no_meetings:{
        fontSize:16
    },
    click_message:{
        fontSize:12
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    loadingview_name:{
        width:150,
        height:30
    },
    add:{
        width:20,
        height:20,
        objectFit:"contain"
    },
    send:{
        width:20,
        height:20,
        objectFit:"contain"
    },
    activity_indicator:{
        width:30,
        height:30,
        objectFit:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Message=(props:{chatId:string})=>{

    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch();
    const Device=useRef<keyof typeof styles>(getDevice()).current
    let profile=useAppSelector((state)=>state.sharedinfo)
    let chat=useAppSelector((state)=>state.chats).data.find((chat)=>chat._id==props.chatId)
    let messages=useAppSelector((state)=>state.messages)
    const [keyboard,setKeyboard]=useState({duration:0,height:0});
    const [message,setMessage]=useState("")
    const [file,setFile]=useState<any|undefined>(undefined);
    const messageBarOffset=useRef(new Animated.Value(0)).current
    const [replyTo,setRepliedTo]=useState<MessageType|undefined>(undefined)
    const repliedToOffset=useRef(new Animated.Value(0)).current
    const sendButtonScale=useRef(new Animated.Value(0)).current
    const [sending,setSending]=useState(false);
    const scrollRef=useRef<any>();
    let bakedMessages=(chat && messages.data && profile.data)?bakeMessages(chat,profile.data._id,messages.data):[];
    const called=useRef(false);

    const fetchMessages=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("messages","GET")+"/"+props.chatId,
            reqType: "GET"
        })
        if(res.success)
        {
            dispatch(initMessages({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data?.reverse()
            }))
            //dispatch(addMessage({...res.data[0],content:"I am fine",sender:chat?.participants.find((item)=>item._id!=profile.data?._id)}))
        }
    }

    const showPicker=async ()=>{
        let res=await pickDocument(40);
        if(res.success)
        {
            setFile(res.data);
        }
        console.log("pickkk",res);
    }

    useEffect(()=>{
        Animated.timing(messageBarOffset, {
            duration: keyboard.duration*0.5,
            toValue: -keyboard.height+30,
            useNativeDriver: false,
          }).start();
    },[keyboard])

    useEffect(()=>{
        Animated.spring(sendButtonScale, {
            toValue: message.length==0?0:1,
            useNativeDriver: false,
          }).start();
    },[message])

    const triggerMessages=(triggerObject:TriggerObject)=>{
        switch(triggerObject.action){
            case "send":
                dispatch(addMessage({...triggerObject.data.message,type:"normal"}))
                break;

            case "typing":
                //triggerObject.data=="start"?dispatch(startTypingMessage({...triggerObject.sender,activity:'typing'})):dispatch(stopTypingMessage({...triggerObject.sender,activity:"inchat"}))
                break;

            case "seen":
                //dispatch(seenMessage({...triggerObject.sender,activity:"inchat"}))
                break;
        }
    }
    
    useEffect(()=>{
        let keyboardWillShow,keyboardWillHide
        if(!called.current)
        {
            if(!socket.listeners("trigger").includes(triggerMessages))
            {
                socket.on("trigger",triggerMessages)
            }
            keyboardWillShow = Keyboard.addListener('keyboardWillShow', (event) => setKeyboard({duration:event.duration,height:event.endCoordinates.height}));
            keyboardWillHide = Keyboard.addListener('keyboardWillHide', (event) => setKeyboard({duration:event.duration,height:0})); 
            called.current=true
        }
        fetchMessages()

        return ()=>{
            keyboardWillShow?.remove();
            keyboardWillHide?.remove();
            dispatch(resetMessages());
            typingTrigger("stop");
        }
    },[])

    const send_message=async ()=>{
        setSending(true);
        let data={chatId:props.chatId,content:message,repliedTo:replyTo?._id,uploaded_file:file};
        let requestInfo=requests.find((item)=>item.id=="message-send");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                messageTrigger(serverRes.data.message,serverRes.data.chat)
                requestInfo?.responseHandler(serverRes);
                setSending(false);
                setMessage("");
            }
        } 
    }

    const typingTrigger=(action:"start"|"stop")=>{
        console.log(chat?.participants.filter((item)=>item._id!=profile.data?._id));
        let triggerObj:TriggerObject={
            action:"typing",
            sender:{...profile.data,userType:"student",role:"student"},
            recievers:chat?.participants.filter((item)=>item._id!=profile.data?._id),
            data:action
        }
        socket.emit("trigger",triggerObj);
    }     

    const messageTrigger=(message:MessageType,chat:Chat)=>{
        let triggerObj:TriggerObject={
            action:"send",
            sender:{...profile.data,userType:"student",role:"student"},
            recievers:chat?.participants.filter((item)=>item._id!=profile.data?._id),
            data:{message,chat}
        }
        socket.emit("trigger",triggerObj);
    }

    //console.log("trigger message",socket.listeners("trigger"))
    console.log("Message",JSON.stringify(messages.data[messages.data.length-1],null,2));

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                <View style={[GeneralStyles.info_wrapper_bg,{backgroundColor:Themes.ExtraLight.OnewindowPurple}]}></View>
                <View style={[GeneralStyles.info_subwrapper]}>
                    <View style={[GeneralStyles.name_wrapper]}>
                        <Loadingview style={[styles[Device].loadingview_name]} isLoading={profile.responseStatus!="recieved"}><Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Bold}]}>{Word2Sentence([],"")}</Text></Loadingview>
                        {/* <Text style={[styles[Device].email,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{expert?.info.email}</Text> */}
                    </View>
                    <View style={[GeneralStyles.dp_wrapper]}>
                        <View style={[GeneralStyles.dp_bg,styles[Device].dp_bg,{backgroundColor:Themes.Light.OnewindowPurple(1)}]} />
                        {/* <Image style={[styles[Device].dp,{borderRadius:100}]} source={expert?.info.displayPicSrc} /> */}
                    </View>
                </View>
            </View>
            <View style={[GeneralStyles.meetings_wrapper]}>
                <View style={{flex:1}}>
                {
                    messages.responseStatus=="not_recieved"
                    ?
                    <Loadinglistscreen cardStyles={{width:"100%",height:Device=="MobileS"?100:(Device=="MobileM"?130:170)}} cardGap={30} count={3} direction="vertical"/>
                    :
                    messages.data.length==0
                    ?
                    <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                        <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                        <Text style={[styles[Device].no_meetings,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Conversation not started...!</Text>
                        {/* <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Click on the add button above to schedule a meet with the expert</Text> */}
                    </View>
                    :
                    <ScrollView ref={scrollRef} onContentSizeChange={()=>scrollRef.current?.scrollToEnd({ animated: true })} style={{flex:1}} contentContainerStyle={{gap:10,paddingBottom:keyboard.height}}>
                    {
                        messages.data.map((msg,i)=>
                        <Pressable onLongPress={()=>setRepliedTo(msg)} key={msg._id} style={[styles[Device].card_wrapper]}>
                            <Messagecard {...msg} index={i}/>
                        </Pressable>
                        )
                    }
                    </ScrollView>
                }
                </View>
                <Animated.View style={[GeneralStyles.messagebar_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)},{transform:[{translateY:messageBarOffset}]}]}>
                    <View style={{position:"absolute",top:0,paddingLeft:10}}><Activitybar participants={chat?.participants}/></View>
                    <Pressable onPress={showPicker}><Image source={add_icon} style={[styles[Device].add]}/></Pressable>
                    <View style={{flex:1,gap:5}}>
                        {
                            replyTo
                            ?
                            <Text style={{color:Themes.Light.OnewindowPrimaryBlue(0.75)}}>{"Replying to "+replyTo.content}</Text>
                            :
                            null
                        }
                        <TextInput onFocus={()=>typingTrigger("start")} onBlur={()=>typingTrigger("stop")} placeholder="Start Typing..." value={message} onChangeText={(txt)=>setMessage(txt)}/>
                    </View>
                    <Animated.View style={[{transform:[{scale:sendButtonScale}]}]}>
                        <Pressable onPress={!sending?send_message:null}><Image source={sending?loading_icon:send_icon} style={[styles[Device].send]}/></Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    )
}

const Activitybar=(props:{participants:Participant[]})=>{



    return (
        <View style={{flex:1,flexDirection:'row',gap:5}}>
        {
            setParticipantsOrder(props.participants).map((item)=>
            <View key={item._id}><Activityindicator participant={item}/></View>
            )
        }
        </View>
    )
}

const Activityindicator=(props:{participant:Participant})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [dimensions,setDimensions]=useState<LayoutRectangle|undefined>(undefined)
    const offset=useRef(new Animated.Value(0)).current

    const animate=(val:number)=>{
        Animated.spring(offset,{
            toValue:val,
            useNativeDriver:true
        }).start()
    }


    return(
        <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height)} style={{opacity:props.participant.activity=="offline"?0.3:1,transform:[{translateY:offset}]}}>
            {
                props.participant.activity=="online"
                ?
                <View style={{zIndex:1,alignSelf:"flex-end",borderWidth:2,borderColor:"white",transform:[{translateY:7.5}],width:15,height:15,borderRadius:30,backgroundColor:"#69FF6F"}}/>
                :
                props.participant.activity=="typing"
                ?
                <View style={{zIndex:1,alignSelf:"center",transform:[{translateY:-7.5}]}}>
                    <TypingAnimation
                    dotColor="black"
                    dotMargin={5}
                    dotAmplitude={2}
                    dotSpeed={0.25}
                    dotRadius={2}
                    dotX={12}
                    dotY={0}
                    />
                </View>
                :
                null
            }
            <Image source={props.participant.displayPicSrc?props.participant.displayPicSrc:default_icon} style={[styles[Device].activity_indicator,{borderRadius:100}]}/>
        </Animated.View>
    )
}

const setParticipantsOrder=(participants:Participant[])=>{
    return [...participants.filter((item)=>item.activity=="typing"),...participants.filter((item)=>item.activity=="inchat"),...participants.filter((item)=>item.activity=="online"),...participants.filter((item)=>item.activity=="offline")];
}

const bakeMessages=(chat:Chat,userId:string,messages:MessageType[])=>{
    return setLastSeenMessage(chat,messages,userId)//[...setLastSeenMessage(chat,messages,userId),...chat.participants.filter((participant)=>participant.activity=="typing").map((item)=>({_id:item.firstName+"/typing",content:setWordCase(item.firstName)+" is typing",sender:item,type:"typing"}))]
}

export default Message