import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Advisor } from "../../types"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useRef } from "react"
import { Word2Sentence, getChatType, getDevice } from "../../utils"
import { Image } from "expo-image"
import Meetingcard from "../cards/Meetingcard"
import { Fonts, Themes } from "../../constants"
import add_icon from '../../assets/images/misc/add.png'
import useNavigation from "../../hooks/useNavigation"
import emptylist from '../../assets/images/illustrations/sad_male.png'
import { store } from "../../store"
import chat_icon from '../../assets/images/misc/chat.png'
import default_icon from '../../assets/images/misc/defaultDP.png'
import Transitionview from "../resources/Transitionview"

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
        gap:15,
        backgroundColor:'white',
        borderRadius:30
    },
    add_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        position:'absolute',
        gap:7.5,
        bottom:20,
        right:10,
        zIndex:1,
        backgroundColor:"white",
        borderRadius:100,
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:2,
        padding:7
    }
})

const TabStyles=StyleSheet.create({
    info_wrapper:{
        height:110,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:22
    },
    email:{
        fontSize:16
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
        fontSize:18
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    },
    no_meetings:{
        fontSize:20
    },
    click_message:{
        fontSize:16,
        lineHeight:20
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    add_text:{
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
        width:22,
        height:22,
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
    add_text:{
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
        fontSize:20
    },
    email:{
        fontSize:14
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
        fontSize:18
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:26,
        height:26,
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
        width:140,
        height:140,
        resizeMode:"contain"
    },
    add_text:{
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
        fontSize:20
    },
    email:{
        fontSize:14
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
        fontSize:16
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:28,
        height:28,
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
    add_text:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Expert=(props:{expertid:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    let expert=useAppSelector((state)=>state.advisors).data?.find((item)=>item.info._id==props.expertid)
    let meetings=useAppSelector((state)=>state.meeting).data.filter((meeting)=>meeting.member._id==props.expertid)
    const [path,navigate]=useNavigation()

    const bookslot=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"AddMeeting",forminitialdataid:props.expertid}}}):null
    }

    const chat=()=>{
        let profile=store.getState().sharedinfo.data;
        let chatId=store.getState().chats.data.find((chat)=>getChatType(chat)=="advisors" && chat.participants.find((participant)=>participant._id==props.expertid))?._id
        navigate?navigate({type:"AddScreen",payload:{screen:"Message",params:{chatId:chatId}}}):null
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <Pressable onPress={bookslot} style={[GeneralStyles.add_wrapper]}>
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.75)},styles[Device].add_text]}>Schedule a meeting</Text>
                <Image style={[styles[Device].add_icon]} source={add_icon}></Image>
            </Pressable>
            <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                <View style={[GeneralStyles.info_wrapper_bg,{backgroundColor:Themes.Light.OnewindowRed(1)}]}></View>
                <View style={[GeneralStyles.info_subwrapper]}>
                    <View style={[GeneralStyles.name_wrapper]}>
                        <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Bold}]}>{Word2Sentence([expert?.info.firstName,expert?.info.lastName],"")}</Text>
                        <Text style={[styles[Device].email,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{expert?.info.email}</Text>
                    </View>
                    <View style={[GeneralStyles.dp_wrapper]}>
                        <View style={[GeneralStyles.dp_bg,styles[Device].dp_bg,{backgroundColor:"#FF9081"}]} />
                        <Image style={[styles[Device].dp,{borderRadius:100}]} source={expert?.info.displayPicSrc?expert.info.displayPicSrc:default_icon} />
                    </View>
                </View>
            </View>
            <View style={[GeneralStyles.meetings_wrapper]}>
                <View style={{display:'flex',flexDirection:'row',padding:10}}>
                    <View style={{flex:1}}><Text style={[styles[Device].meeting_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Meetings</Text></View>
                    <Pressable onPress={chat}><Image style={[styles[Device].add_icon]} source={chat_icon}/></Pressable>
                </View>
                <View style={{flex:1}}>
                {
                    meetings.length==0
                    ?
                    <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                        <Transitionview effect="zoom"><Image source={emptylist} style={[styles[Device].emptylist_image]}/></Transitionview>
                        <Text style={[styles[Device].no_meetings,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>It's awfully quiet in here...!</Text>
                        <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Click on the add button below to schedule a meet with the expert</Text>
                    </View>
                    :
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:10,paddingTop:5}}>
                    {
                        meetings.map((meeting,i)=>
                        <Transitionview effect="pan"><View key={meeting._id}><Meetingcard data={meeting} index={i}/></View></Transitionview>
                        )
                    }
                    </ScrollView>
                }
                </View>
            </View>
        </View>
    )   

}

export default Expert