import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, Keyboard, KeyboardAvoidingView, LayoutRectangle, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Word2Sentence, getDevice, getKeyboardHeight, getServerRequestURL, getViewportDimensions, pickDocument, serverRequest, setLastSeenMessage, setWordCase } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import Loadingview from "../resources/Loadingview"
import emptylist from '../../assets/images/illustrations/sad_male.png'
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
import default_icon from '../../assets/images/misc/defaultDP.png'
import close_icon from '../../assets/images/misc/close.png'
import { TypingAnimation } from 'react-native-typing-animation';
import { getSocket } from "../../socket"
import Transitionview from "../resources/Transitionview"
import ai_icon from '../../assets/images/profile/ai.png'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { KeyboardEvent } from "react-native"
import { EmitterSubscription } from "react-native"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1
    },
    info_wrapper:{
        paddingTop:5,
        position:"relative",
        
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
        gap:5,
        paddingLeft:10
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
        height:125,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:24
    },
    email:{
        fontSize:16
    },
    activity:{
        fontSize:16
    },
    dp:{
        width:70,
        height:70,
        resizeMode:"contain"
    },
    dp_bg:{
        width:70,
        height:70,
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
        fontSize:20
    },
    click_message:{
        fontSize:16
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    loadingview_name:{
        width:170,
        height:50
    },
    add:{
        width:28,
        height:28,
        objectFit:"contain"
    },
    send:{
        width:30,
        height:30,
        objectFit:"contain"
    },
    activity_indicator:{
        width:50,
        height:50,
        objectFit:"contain"
    },
    close_icon:{
        width:20,
        height:20,
        objectFit:"contain"
    },
    message:{
        fontSize:18
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
    activity:{
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
        width:120,
        height:120,
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
    },
    close_icon:{
        width:10,
        height:10,
        objectFit:"contain"
    },
    message:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:22
    },
    activity:{
        fontSize:14
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
        width:160,
        height:160,
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
    },
    close_icon:{
        width:12,
        height:12,
        objectFit:"contain"
    },
    message:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:22
    },
    activity:{
        fontSize:14
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
        width:160,
        height:160,
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
    },
    close_icon:{
        width:12,
        height:12,
        objectFit:"contain"
    },
    message:{
        fontSize:16
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
    const [keyboard,setKeyboard]=useState<KeyboardEvent>();
    const [message,setMessage]=useState("")
    const [file,setFile]=useState<any|undefined>(undefined);
    const messageBarOffset=useRef(new Animated.Value(0)).current
    const [replyTo,setRepliedTo]=useState<MessageType|undefined>(undefined)
    const repliedToOffset=useRef(new Animated.Value(0)).current
    const sendButtonScale=useRef(new Animated.Value(0)).current
    const [sending,setSending]=useState(false);
    const scrollRef=useRef<any>();
    let bakedMessages=(chat && messages.data && profile.data?._id)?bakeMessages(chat,profile.data._id,messages.data):[];
    const called=useRef(false);
    const textInputRef=useRef<any>();
    const blockedByUsers=useAppSelector((state)=>state.blockedbyusers).data
    const blockedUsers=useAppSelector((state)=>state.blockedusers).data
    const insets = useSafeAreaInsets();

    const fetchMessages=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("messages","GET")+"/"+props.chatId,
            reqType: "GET"
        })
        //console.log("messages",res);
        let clone=[...res.data];
        if(res.success)
        {
            dispatch(initMessages({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:clone.reverse()
            }))
            //dispatch(addMessage({...res.data[0],content:"I am fine",sender:chat?.participants.find((item)=>item._id!=profile.data?._id)}))
        }
        return res
    }

    const showPicker=async ()=>{
        let res=await pickDocument(40);
        if(res.success)
        {
            setFile(res.data);
            textInputRef.current?.focus();
        }
        //console.log("pickkk",res);
    }

    useEffect(()=>{
        if(keyboard)
        {
            //console.log("Keyboard",getKeyboardHeight(keyboard,getViewportDimensions(insets)));
            Animated.timing(messageBarOffset, {
                duration: keyboard.duration,
                toValue: -getKeyboardHeight(keyboard,getViewportDimensions(insets)),
                useNativeDriver: false,
            }).start();
        }   
    },[keyboard])

    useEffect(()=>{
        Animated.spring(sendButtonScale, {
            toValue: message.length==0?0:1,
            useNativeDriver: false,
          }).start();
    },[message])

    const triggerMessages=(triggerObject:TriggerObject)=>{
        //console.log("Message trigger",triggerObject.action,triggerObject.data)
        switch(triggerObject.action){
            case "send":
                dispatch(addMessage({...triggerObject.data.message,type:"normal"}))
                seen_message()
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
        //console.log("rendered");
        let keyboardWillShow:EmitterSubscription,keyboardWillHide:EmitterSubscription
        if(!called.current)
        {
            if(!getSocket().listeners("trigger").includes(triggerMessages))
            {
                getSocket().on("trigger",triggerMessages)
            }
            keyboardWillShow = Keyboard.addListener(Platform.OS=="android"?'keyboardDidShow':'keyboardWillShow', (event) => setKeyboard(event));
            keyboardWillHide = Keyboard.addListener(Platform.OS=="android"?'keyboardDidHide':'keyboardWillHide', (event) => setKeyboard(event)); 
            called.current=true
        }
        fetchMessages().then((res)=>{
            if(res.success)
            {
                getUnseenMessages(profile.data?._id,chat).length!=0?seen_message():null
            }
        })

        return ()=>{
            keyboardWillShow?.remove();
            keyboardWillHide?.remove();
            dispatch(resetMessages());
            typingTrigger("stop");
            getSocket().removeListener("trigger",triggerMessages)
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
                setMessage("");
                setRepliedTo(undefined);
                setFile(undefined);
            }
            setSending(false);
        } 
    }

    const seen_message=async ()=>{
        let data={chatId:props.chatId};
        let requestInfo=requests.find((item)=>item.id=="message-seen");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                seenTrigger(serverRes.data)
                requestInfo?.responseHandler(serverRes);
            }
        } 
    }

    const typingTrigger=(action:"start"|"stop")=>{
        let recievers=chat?.participants.filter((item)=>item._id!=profile.data?._id && blockedUsers?.find((user)=>user._id==item._id)==undefined)
        if(profile.data?._id && recievers)
        {
            let triggerObj:TriggerObject={
                action:"typing",
                sender:{...profile.data,userType:"student",role:"student"},
                recievers:recievers.map((reciever)=>({
                    _id:reciever._id,
                    firstName:reciever.firstName,
                    lastName:reciever.lastName,
                    displayPicSrc: reciever.displayPicSrc,
                    email: reciever.email,
                    userType:reciever.userType,
                    role:reciever.role
                })),
                data:action
            }
            getSocket().emit("trigger",triggerObj);
        }
    }     

    const messageTrigger=(message:MessageType,chat:Chat)=>{
        let triggerObj:TriggerObject={
            action:"send",
            sender:{...profile.data,userType:"student",role:"student"},
            recievers:chat?.participants.filter((item)=>item._id!=profile.data?._id && blockedUsers?.find((user)=>user._id==item._id)==undefined),
            data:{message,chat}
        }
        getSocket().emit("trigger",triggerObj);
    }

    const seenTrigger=(chat:Chat)=>{
        let triggerObj:TriggerObject={
            action:"seen",
            sender:{...profile.data,userType:"student",role:"student"},
            recievers:chat?.participants.filter((item)=>item._id!=profile.data?._id && blockedUsers?.find((user)=>user._id==item._id)==undefined),
            data:chat
        }
        getSocket().emit("trigger",triggerObj);
    }

    const reply=(msg:MessageType)=>{
        if(msg.sender && msg.sender._id)
        {
            setRepliedTo(msg)
            textInputRef.current?.focus();
        }
    }

    const showChatOptions=()=>{
        //c
        navigate?navigate({type:"AddScreen",payload:{screen:"Chatoptions",params:{chatId:props.chatId}}}):null
    }

    //console.log("messages data",getViewportDimensions(insets))

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                <View style={[GeneralStyles.info_wrapper_bg,{backgroundColor:Themes.ExtraLight.OnewindowPurple}]}></View>
                <View style={[GeneralStyles.info_subwrapper]}>
                    <View style={[GeneralStyles.name_wrapper]}>
                        <View style={styles[Device].loadingview_name}><Loadingview style={[styles[Device].loadingview_name]} isLoading={profile.responseStatus!="recieved"}><Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Bold}]}>{Word2Sentence([],"")}</Text></Loadingview></View>
                        <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{chat?.participants.length==2?chat.participants.find((participant)=>participant._id!=profile.data?._id)?.firstName:"Group Name"}</Text>
                        {
                            chat?.participants.length==2 && chat?.participants.filter((item)=>item._id!=profile.data?._id && (blockedByUsers?.find((user)=>user._id==item._id)!=undefined || blockedUsers?.find((user)=>user._id==item._id)!=undefined)).length==1
                            ?
                            null
                            :
                            <View style={{flexDirection:'row',alignItems:"center",gap:5}}>
                                <View style={{width:5,height:5,borderRadius:10,backgroundColor:chat?.participants.find((participant)=>participant._id!=profile.data?._id)?.activity=="offline"?"red":"green"}}></View>
                                <Text style={[styles[Device].activity,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{chat?.participants.find((participant)=>participant._id!=profile.data?._id)?.activity}</Text>
                            </View>
                        }
                    </View>
                    <Pressable onPress={showChatOptions} style={[GeneralStyles.dp_wrapper]}>
                        <View style={[GeneralStyles.dp_bg,styles[Device].dp_bg,{backgroundColor:Themes.Light.OnewindowPurple(1)}]} />
                        <Image style={[styles[Device].dp,{borderRadius:100}]} source={chat?.participants.find((participant)=>participant.role=="Virtual_Assistant")?ai_icon:chat?.participants.length==2?chat.participants.find((participant)=>participant._id!=profile.data?._id)?.displayPicSrc:default_icon} />
                    </Pressable>
                </View>
            </View>
            <View style={[GeneralStyles.meetings_wrapper]}>
                <View style={{flex:1}}>
                {
                    messages.responseStatus=="not_recieved"
                    ?
                    <View style={{flex:1}}><Loadinglistscreen cardGap={30} count={4} visibilityCount={3} direction="vertical"/></View>
                    :
                    bakedMessages.length==0
                    ?
                    <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                        <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                        <Text style={[styles[Device].no_meetings,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Conversation not started...!</Text>
                        {/* <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Click on the add button above to schedule a meet with the expert</Text> */}
                    </View>
                    :
                    <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} onContentSizeChange={()=>scrollRef.current?.scrollToEnd({ animated: true })} style={{flex:1}} contentContainerStyle={{gap:30,paddingTop:20,paddingBottom:keyboard?getKeyboardHeight(keyboard,getViewportDimensions(insets)):0}}>
                    {
                        bakedMessages.map((msg,i)=>
                        <Pressable onLongPress={()=>reply(msg)} key={msg._id}>
                            <Messagecard {...msg} index={i}/>
                        </Pressable>
                        )
                    }
                    </ScrollView>
                }
                </View>
                {
                    chat?.participants.length==2 && chat?.participants.filter((item)=>item._id!=profile.data?._id && (blockedUsers?.find((user)=>user._id==item._id)!=undefined || blockedByUsers?.find((user)=>user._id==item._id)!=undefined)).length==1
                    ?
                    chat?.participants.filter((item)=>item._id!=profile.data?._id && (blockedUsers?.find((user)=>user._id==item._id)!=undefined)).length==1
                    ?
                    <View style={{borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}><Text style={[styles[Device].message,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),padding:10}]}>{"Reciever has been blocked, unblock to start conversation"}</Text></View>
                    :
                    <View style={{borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}><Text style={[styles[Device].message,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),padding:10}]}>{"You have been blocked by the reciever"}</Text></View>
                    :
                    <Animated.View style={[GeneralStyles.messagebar_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)},{transform:[{translateY:messageBarOffset}]}]}>
                        <View style={{position:"absolute",bottom:"200%",flexDirection:"row",alignItems:"center",paddingLeft:10,gap:10}}>
                            <Activitybar participants={chat?.participants}/>
                            {
                                file
                                ?
                                <Transitionview effect="panY" style={[{flexDirection:"row",alignItems:"center",justifyContent:'flex-end'}]}>
                                    <Text  style={{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}}>{file.name}</Text>
                                </Transitionview>
                                :
                                null
                            }
                        </View>
                        <Pressable onPress={showPicker}><Image source={add_icon} style={[styles[Device].add]}/></Pressable>
                        <View style={{flex:1,gap:5}}>
                            {
                                replyTo
                                ?
                                <Transitionview effect="panY" style={[{flexDirection:"row",alignItems:"center",gap:5}]}>
                                    <Text style={{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.75)}}>{"Replying to "+replyTo.sender?.firstName+"-"+replyTo.content}</Text>
                                    <Pressable hitSlop={{left:15,right:15,top:15,bottom:15}} onPress={()=>setRepliedTo(undefined)}><Image style={[styles[Device].close_icon]} source={close_icon}/></Pressable>
                                </Transitionview>
                                :
                                null
                            }
                            <TextInput style={[styles[Device].message,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]} ref={textInputRef} onFocus={()=>typingTrigger("start")} onBlur={()=>typingTrigger("stop")} placeholder="Start Typing..." value={message} onChangeText={(txt)=>setMessage(txt)}/>
                        </View>
                        {
                            (file!=undefined) || (file==undefined && message.length>0)
                            ?
                            <Transitionview effect="zoom"><Pressable onPress={!sending?send_message:null}><Image source={sending?loading_icon:send_icon} style={[styles[Device].send]}/></Pressable></Transitionview>
                            :
                            null
                        }
                    </Animated.View>
                }
            </View>
        </View>
    )
}

const Activitybar=(props:{participants:Participant[]})=>{

    return (
        <View style={{flex:1,flexDirection:'row',gap:5}}>
        {
            setParticipantsOrder(props.participants.filter((item)=>item && item._id)).map((item)=>
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
        <Animated.View onLayout={(e)=>animate(0)} style={{opacity:props.participant.activity=="offline"?0.3:1,transform:[{translateY:offset}]}}>
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

const getUnseenMessages=(currentUserId:string,chat:Chat)=>{
    return chat.unSeenMessages.filter((msg)=>!msg.seen.find((userId)=>userId==currentUserId))
}

export default Message