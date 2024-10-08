import { useEffect, useRef, useState } from "react"
import { Animated, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Word2Sentence, getDevice, getServerRequestURL, pickDocument, serverRequest, setLastSeenMessage } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import Loadingview from "../resources/Loadingview"
import emptylist from '../../assets/images/misc/emptylist.png'
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { Message as MessageType, Participant, ServerResponse } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addMessage, initMessages, resetMessages, seenMessage, startTypingMessage, stopTypingMessage } from "../../store/slices/messagesSlice"
import { requests } from "../../constants/requests"
import add_icon from '../../assets/images/misc/add.png'
import send_icon from '../../assets/images/misc/send.png'
import loading_icon from '../../assets/images/misc/loader.gif'
import Messagecard from "../cards/Messagecard"

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
        backgroundColor:"white"
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
                data:setLastSeenMessage(chat,res.data?.reverse(),profile.data?._id)
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

    useEffect(()=>{
        let keyboardWillShow = Keyboard.addListener('keyboardWillShow', (event) => setKeyboard({duration:event.duration,height:event.endCoordinates.height}));
        let keyboardWillHide = Keyboard.addListener('keyboardWillHide', (event) => setKeyboard({duration:event.duration,height:0}));
        fetchMessages().then(()=>{
            //console.log("ppa",chat?.participants.find((item)=>item._id!=profile.data?._id))
            //dispatch(seenMessage(chat?.participants.find((item)=>item._id!=profile.data?._id)))
            //dispatch(startTypingMessage(chat?.participants.find((item)=>item._id!=profile.data?._id)))
            setTimeout(()=>{
                //dispatch(stopTypingMessage(chat?.participants.find((item)=>item._id!=profile.data?._id)));
            },1000)
            //requests.find((item)=>item.id=="message-send")?.serverCommunicator({chatId:props.chatId,content:"Hie",uploaded_file:undefined});
        })

        return ()=>{
            keyboardWillShow?.remove();
            keyboardWillHide?.remove();
            dispatch(resetMessages());
        }
    },[])

    const send_message=async ()=>{
        setSending(true);
        let data={chatId:props.chatId,content:message,repliedTo:replyTo,uploaded_file:file};
        let requestInfo=requests.find((item)=>item.id=="message-send");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
                setSending(false);
                setMessage("");
            }
        } 
    }

    //console.log("msgs",JSON.stringify(messages.data,null,2));

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
                        <View key={msg._id} style={[styles[Device].card_wrapper]}>
                            <Messagecard {...msg} index={i}/>
                        </View>
                        )
                    }
                    </ScrollView>
                }
                </View>
                <Animated.View style={[GeneralStyles.messagebar_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)},{transform:[{translateY:messageBarOffset}]}]}>
                    <Pressable onPress={showPicker}><Image source={add_icon} style={[styles[Device].add]}/></Pressable>
                    <View style={{flex:1}}><TextInput placeholder="Start Typing..." value={message} onChangeText={(txt)=>setMessage(txt)}></TextInput></View>
                    <Animated.View style={[{transform:[{scale:sendButtonScale}]}]}>
                        <Pressable onPress={!sending?send_message:null}><Image source={sending?loading_icon:send_icon} style={[styles[Device].send]}/></Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    )
}

export default Message