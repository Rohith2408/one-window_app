import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Chat, Meeting, ServerResponse, Sharedinfo } from "../../types"
import meeting_icon from '../../assets/images/misc/meeting.png'
import { Image } from "expo-image"
import { useRef, useState } from "react"
import { Word2Sentence, formatDate, formatTime, getDevice, getServerRequestURL, serverRequest, setWordCase, truncateString } from "../../utils"
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import { Fonts, Themes } from "../../constants"
import clock_icon from '../../assets/images/misc/date.png'
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { updateMeeting } from "../../store/slices/meetingsSlice"
import loading_gif from '../../assets/images/misc/loader.gif'
import { useAppSelector } from "../../hooks/useAppSelector"
import seen_icon from '../../assets/images/misc/seen.png'
import delivered_icon from '../../assets/images/misc/delivered.png'
import default_icon from '../../assets/images/misc/defaultDP.png'
import go_icon from '../../assets/images/misc/back.png'
import ai_icon from '../../assets/images/profile/ai.png'

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:15
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"row",
        flex:1,
        gap:7
    },
    icon_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:'center'
    },
    info_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        gap:7.5,
    },
    actions_wrapper:{
        display:'flex',
        flexDirection:"column",
        gap:5
    },
    status:{
        position:"absolute",
        display:'flex',
        flexDirection:"row",
        gap:5,
        alignItems:'center'
    }
})

const TabStyles=StyleSheet.create({
    icon:{
        width:34,
        height:34,
        resizeMode:'contain'
    },
    title:{
        fontSize:20
    },
    datetime:{
        fontSize:16
    },
    attendees:{
        fontSize:12,
        lineHeight:16
    },
    edit:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    indicators:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    status:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    title:{
        fontSize:14
    },
    datetime:{
        fontSize:10,
        lineHeight:16
    },
    attendees:{
        fontSize:10
    },
    edit:{
        width:8,
        height:8,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    indicators:{
        width:6,
        height:6,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:26,
        height:26,
        resizeMode:'contain'
    },
    title:{
        fontSize:16
    },
    datetime:{
        fontSize:12
    },
    attendees:{
        fontSize:12
    },
    edit:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    indicators:{
        width:8,
        height:8,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    }
})

const MobileLStyles=StyleSheet.create({
    icon:{
        width:26,
        height:26,
        resizeMode:'contain'
    },
    title:{
        fontSize:14
    },
    datetime:{
        fontSize:12
    },
    attendees:{
        fontSize:12,
        lineHeight:16
    },
    edit:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    indicators:{
        width:8,
        height:8,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Chatcard=(props:Chat & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translate=useRef(new Animated.Value(0)).current
    const supersetHeight=useRef().current
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false)
    let profile=useAppSelector((state)=>state.sharedinfo).data
    let unseenMessages=getUnseenMessages(profile?._id,props);
    let chatInfo=BakeChatInfo(props,profile);
    let lastMessageInfo=BakeLastmessage(props,profile);
    let activeParticipants=getOnlineUsers(props,profile);
    const blockedUsers=useAppSelector((state)=>state.blockedusers).data
    const blockedByUsers=useAppSelector((state)=>state.blockedbyusers).data

    const animate=(y:number)=>{
        Animated.spring(translate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const openChat=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Message",params:{chatId:props._id}}}):null;
    }

    //console.log("ac",props.participants);

    return(
        <Pressable onPress={openChat} style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={[GeneralStyles.icon_wrapper]}>
                    <Image source={props.participants.find((participant)=>participant.role=="Virtual_Assistant")?ai_icon:chatInfo.dp.length==0?default_icon:chatInfo.dp} style={[{borderRadius:100},styles[Device].icon]}/>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    {
                        props?.participants.length==2 && props?.participants.filter((item)=>item._id!=profile?._id && (blockedByUsers?.find((user)=>user._id==item._id)!=undefined || blockedUsers?.find((user)=>user._id==item._id)!=undefined)).length==1
                        ?
                        null
                        :
                        <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height-5)} style={[GeneralStyles.status,styles[Device].status,{transform:[{translateY:translate}]}]}>
                            <View style={{width:5,height:5,borderRadius:10,backgroundColor:activeParticipants.length>=1?"#69FF6F":"lightgrey"}}></View>
                            <Text style={[styles[Device].status,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.participants.length==2?(activeParticipants.length==1?"Online":"Offline"):(activeParticipants.length+" Online")}</Text>
                            {
                                props.participants.filter((item)=>item.activity=="typing").length!=0
                                ?
                                <Text style={[styles[Device].status,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Typing</Text>
                                :
                                null
                            }
                        </Animated.View>
                    }
                    <Text style={[styles[Device].title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{chatInfo.name}</Text>
                    <View style={{display:"flex",alignItems:'center',flexDirection:'row',gap:5}}>
                        {
                            props?.participants.length==2 && props?.participants.filter((item)=>item._id!=profile?._id && (blockedByUsers?.find((user)=>user._id==item._id)!=undefined || blockedUsers?.find((user)=>user._id==item._id)!=undefined)).length==1
                            ?
                            <Text style={[styles[Device].datetime,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.participants.length==2?"User blocked":"Sent from a blocked user"}</Text>
                            :
                            <Text style={[styles[Device].datetime,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:(props.lastMessage!=undefined && lastMessageInfo.sender=="other" && lastMessageInfo.status=="unseen")?Fonts.NeutrifStudio.Bold:Fonts.NeutrifStudio.Regular}]}>{props.lastMessage==undefined?"Tap to chat":truncateString(props.lastMessage?.content,75,true)}</Text>
                            
                        }
                        {
                            props.lastMessage!=undefined && lastMessageInfo.sender=="current" && !(props?.participants.length==2 && props?.participants.filter((item)=>item._id!=profile?._id && (blockedByUsers?.find((user)=>user._id==item._id)!=undefined || blockedUsers?.find((user)=>user._id==item._id)!=undefined)).length==1)
                            ?    
                            <View style={{flexDirection:"row",gap:0}}>
                                <Image style={[styles[Device].indicators]} source={(lastMessageInfo.status=="unseen"?delivered_icon:seen_icon)} />
                                <Image style={[styles[Device].indicators]} source={(lastMessageInfo.status=="unseen"?delivered_icon:seen_icon)} />
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <View style={{alignSelf:"center"}}><Image style={[styles[Device].edit,{transform:[{scaleX:-1}]}]} source={go_icon}/></View>
                    {
                        unseenMessages.length!=0 && !(props?.participants.length==2 && props?.participants.filter((item)=>item._id!=profile?._id && (blockedByUsers?.find((user)=>user._id==item._id)!=undefined || blockedUsers?.find((user)=>user._id==item._id)!=undefined)).length==1)
                        ?
                        <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:'flex-end',backgroundColor:Themes.Light.OnewindowLightBlue,borderRadius:100}}>
                            <Text style={[styles[Device].datetime,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>{unseenMessages.length}</Text>
                        </View>
                        :
                        null
                    }
                </View>
            </View>
        </Pressable>
    )

}

const BakeLastmessage=(chat:Chat,profile:Sharedinfo)=>{
    let sender=(chat.lastMessage?.sender==profile._id)?"current":"other";
    let status;
    let lastMessageSeenInfo=chat.unSeenMessages.find((msg)=>msg.message._id==chat.lastMessage?._id)?.seen
    //console.log("seen",lastMessageSeenInfo);
    if(sender=="current"){
        status=lastMessageSeenInfo==undefined?"seen":"unseen";
    }
    else
    {
        status=(lastMessageSeenInfo==undefined || lastMessageSeenInfo?.find((user)=>user==profile._id))?"seen":"unseen";
    }
    return {sender,status}
}

const getUnseenMessages=(currentUserId:string,chat:Chat)=>{
    return chat.unSeenMessages.filter((msg)=>!msg.seen.find((userId)=>userId==currentUserId))
}

const BakeChatInfo=(chat:Chat,profile:Sharedinfo)=>{
    let name=chat.participants.length==2?chat.participants.find((participant)=>participant._id!=profile._id)?.firstName:"Group Chat"
    let dp=chat.participants.length==2?chat.participants.find((participant)=>participant._id!=profile._id)?.displayPicSrc:default_icon
    return {name,dp}
}

const getOnlineUsers=(chat:Chat,profile:Sharedinfo)=>{
   return chat.participants.filter((item)=>item.activity && item.activity!="offline" && item._id!=profile._id)
}

export default Chatcard