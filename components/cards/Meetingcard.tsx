import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Meeting, ServerResponse } from "../../types"
import meeting_icon from '../../assets/images/misc/meeting.png'
import { Image } from "expo-image"
import { useRef, useState } from "react"
import { Word2Sentence, formatDate, formatTime, getDevice, getServerRequestURL, serverRequest, setWordCase } from "../../utils"
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import { Fonts, Themes, setComponentInfo } from "../../constants"
import clock_icon from '../../assets/images/misc/date.png'
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { updateMeeting } from "../../store/slices/meetingsSlice"
import loading_gif from '../../assets/images/misc/loader.gif'
import { store } from "../../store"

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
        gap:10,
    },
    actions_wrapper:{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center'
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
        fontSize:16,
        lineHeight:20
    },
    edit:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    delete:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    clock:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    status:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    title:{
        fontSize:12
    },
    datetime:{
        fontSize:10,
        lineHeight:16
    },
    attendees:{
        fontSize:10,
        lineHeight:16
    },
    edit:{
        width:14,
        height:14,
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
    status:{
        fontSize:10
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:28,
        height:28,
        resizeMode:'contain'
    },
    title:{
        fontSize:16
    },
    datetime:{
        fontSize:14
    },
    attendees:{
        fontSize:14,
        lineHeight:18
    },
    edit:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    delete:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    status:{
        fontSize:12
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
        lineHeight:18
    },
    edit:{
        width:14,
        height:14,
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

const Meetingcard=(props:{data:Meeting,index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translate=useRef(new Animated.Value(0)).current
    const supersetHeight=useRef().current
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false)

    const animate=(y:number)=>{
        Animated.spring(translate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const reschedule=()=>{
        setComponentInfo("Form","title","Meeting")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"UpdateMeeting",forminitialdataid:props.data._id}}}):null
    }

    const cancel=async ()=>{
        setIsloading(true)
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("modify-slot","POST"),
            reqType:"POST",
            body:{
                meetingId: props.data._id, 
                option: "cancelEvent"
            }
        })
        setIsloading(false)
        console.log("cancel response",JSON.stringify(res,null,2));
        if(res.success)
        {
            dispatch(updateMeeting({
                _id:res.data._id,
                description:res.data.data.summary,
                attendees:res.data.data.attendees.map((item:any)=>item.email),
                link:res.data.data.hangoutLink,
                startDate:res.data.data.start,
                endDate:res.data.data.end,
                status:res.data.status,
                member:res.data.member
            }))
        }
    }

    console.log("meeting",props.data._id,props.status);

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={[GeneralStyles.icon_wrapper]}>
                    <Image source={meeting_icon} style={[styles[Device].icon]}/>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height-5)} style={[GeneralStyles.status,styles[Device].status,{transform:[{translateY:translate}]}]}>
                        <View style={{width:5,height:5,borderRadius:10,backgroundColor:"lightgreen"}}></View>
                        <Text style={[styles[Device].status,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{setWordCase(props.data.status)}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.data.description}</Text>
                    <View style={{display:"flex",alignItems:'center',flexDirection:'row',gap:5}}>
                        <Image style={[styles[Device].clock]} source={clock_icon} />
                        <Text style={[styles[Device].datetime,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>{getdatatime(props.data.startDate.dateTime,props.data.endDate.dateTime)}</Text>
                    </View>
                    <View style={{gap:5,flexDirection:"row"}}>
                        {/* <Text style={[styles[Device].attendees,{color:'black',fontFamily:Fonts.NeutrifStudio.Regular}]}>Attendees </Text> */}
                        <Image style={[styles[Device].clock]} source={clock_icon} />
                        <Text style={[styles[Device].attendees,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>{Word2Sentence(props.data.attendees.filter((attendee)=>attendee.toLowerCase()!=store.getState().sharedinfo.data?.email?.toLowerCase()),"",",",true)}</Text>
                    </View>
                </View>
                {
                    props.data.status!="cancelled"
                    ?
                    <View style={[GeneralStyles.actions_wrapper]}>
                        <Pressable onPress={reschedule} style={{flex:1}}><Image style={[styles[Device].edit]} source={edit_icon}/></Pressable>
                        <Pressable onPress={()=>!(isLoading)?cancel():null} style={{justifyContent:'flex-end'}}><Image style={[styles[Device].delete]} source={(isLoading)?loading_gif:delete_icon}/></Pressable>
                    </View>
                    :
                    null
                }
            </View>
        </View>
    )

}

const getdatatime=(start:string,end:string)=>{
    let startDate=new Date(start)
    let endDate=new Date(end)
    return formatDate(start).slice(0,-6) +" , " + formatTime(start)+"-"+formatTime(end)
}

export default Meetingcard