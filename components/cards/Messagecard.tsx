import { StyleSheet, Text, View } from "react-native"
import { Message} from "../../types"
import { useRef, useState } from "react"
import { getDevice} from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { profile } from "console"
import { Fonts, Themes } from "../../constants"
import { TypingAnimation } from 'react-native-typing-animation';
import { Image } from "expo-image"
import default_icon from '../../assets/images/misc/defaultDP.png'

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
    },
    sender_dp:{
        width:15,
        height:15,
        resizeMode:"contain"
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
    },
    sender_dp:{
        width:15,
        height:15,
        resizeMode:"contain"
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
    },
    sender_dp:{
        width:20,
        height:20,
        resizeMode:"contain"
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
    },
    sender_dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Messagecard=(props:Message & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false)
    const profile=useAppSelector((state)=>state.sharedinfo).data

    console.log("msgs",props.content)

    return(
        <View style={[GeneralStyles.wrapper]}>
        {
            props.type=="normal"
            ?
            <Normal {...props}/>
            :
            props.type=="typing"
            ?
            <Typing {...props}/>
            :
            <Seen {...props}/>
        }
        </View>
    )

}

const Seen=(props:Message)=>{

    return(
        <View style={{alignSelf:"flex-end"}}>
            <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Regular,color:"lightgrey"}]}>{props.content}</Text>
        </View>
    )
}

const Typing=(props:Message)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{alignSelf:"flex-start",flexDirection:'row',alignItems:"center",gap:1}}>
            <Image style={[styles[Device].sender_dp]} source={props.sender?.displayPicSrc?props.sender?.displayPicSrc:default_icon} />
            <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.content}</Text>
            <View>
                <TypingAnimation
                    dotColor="black"
                    dotMargin={5}
                    dotAmplitude={2}
                    dotSpeed={0.25}
                    dotRadius={2.5}
                    dotX={12}
                    dotY={0}
                />
            </View>
        </View>
    )
}

const Normal=(props:Message)=>{

    const profile=useAppSelector((state)=>state.sharedinfo).data
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{flexDirection:"row",alignItems:"center",alignSelf:props.sender?._id==profile?._id?"flex-end":"flex-start",backgroundColor:(props.sender?._id==profile?._id)?Themes.Light.OnewindowLightBlue:"#F6F6F6",borderRadius:20}}>
            {
                props.sender?._id!=profile?._id
                ?
                <Image style={[styles[Device].sender_dp,{transform:[{translateY:-styles[Device].sender_dp.height/1.5}],borderRadius:100}]} source={props.sender?.displayPicSrc?props.sender?.displayPicSrc:default_icon} />
                :
                null
            }
            <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.content}</Text>
            {
                props.sender?._id==profile?._id
                ?
                <Image style={[styles[Device].sender_dp,{transform:[{translateY:-styles[Device].sender_dp.height/1.5}],borderRadius:100}]} source={props.sender?.displayPicSrc?props.sender?.displayPicSrc:default_icon} />
                :
                null
            }
        </View>
    )
}

export default Messagecard