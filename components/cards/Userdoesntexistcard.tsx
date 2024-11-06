import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Chat, Meeting, ServerResponse, Sharedinfo } from "../../types"
import meeting_icon from '../../assets/images/misc/meeting.png'
import { Image } from "expo-image"
import { useRef, useState } from "react"
import { Word2Sentence, formatDate, formatTime, getDevice, getServerRequestURL, serverRequest, setWordCase } from "../../utils"
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

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:15,
        opacity:0.5
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
        justifyContent:"center",
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
        width:26,
        height:26,
        resizeMode:'contain'
    },
    title:{
        fontSize:18
    },
    datetime:{
        fontSize:16
    },
    attendees:{
        fontSize:16,
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
        width:12,
        height:12,
        resizeMode:"contain"
    },
    indicators:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
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
        fontSize:14
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

const Userdoesntexist=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()

    const info=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Error",flyerdata:{error:"This chat is no longer available , this happens when all the members of the chatroom have deleted their accounts and are no longer a part of onewindow",preventAutoHide:true}}}}):null;
    }

    return(
        <Pressable onPress={info} style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={[GeneralStyles.icon_wrapper]}>
                    <Image source={default_icon} style={[{borderRadius:100},styles[Device].icon]}/>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <Text style={[styles[Device].title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Chat unavailable</Text>
                </View>
            </View>
        </Pressable>
    )

}


export default Userdoesntexist