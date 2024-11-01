import { Pressable, StyleSheet, Text, View } from "react-native"
import { ProgramIntake } from "../../types"
import { Word2Sentence, formatDate, getDevice, getMonth, getThemeColor } from "../../utils"
import { Image } from "expo-image"
import { useRef } from "react"
import { Fonts, Themes } from "../../constants"
import intake_icon from '../../assets/images/misc/date.png'

const GeneralStyles=StyleSheet.create({
    uni_wrapper:{
        alignSelf:'stretch',
        display:"flex",
        flexDirection:"row",
        gap:7.5,
        justifyContent:"center",
        alignItems:"flex-start",
        padding:10
    },
    uni_info_wrapper:{
        display:"flex",
        flex:1,
        alignSelf:'stretch',
        flexDirection:"column",
        gap:8
    }
})

const TabStyles=StyleSheet.create({
    uni_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:20,
        height:20,
        borderRadius:100,
        left:5,
        top:15
    },
    intake_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    intakemonth:{
        fontSize:18
    },
    deadline:{
        fontSize:16
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    uni_icon:{
        width:17,
        height:17,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:15,
        height:15,
        borderRadius:100,
        left:5,
        top:15
    },
    intake_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    intakemonth:{
        fontSize:14
    },
    deadline:{
        fontSize:12
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    }
})
const MobileMStyles=StyleSheet.create({
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:17,
        height:17,
        borderRadius:100,
        left:5,
        top:15
    },
    intake_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    intakemonth:{
        fontSize:16
    },
    deadline:{
        fontSize:14
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    }
})
const MobileLStyles=StyleSheet.create({
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:17,
        height:17,
        borderRadius:100,
        left:5,
        top:15
    },
    intake_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    intakemonth:{
        fontSize:16
    },
    deadline:{
        fontSize:14
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Intakecard=(props:ProgramIntake & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    // console.log(props.deadlineMonth)

    return(
        <View style={[GeneralStyles.uni_wrapper]}>
            <View style={[styles[Device].uni_icon_bg,{position:"absolute",backgroundColor:getThemeColor(props.index%4)}]}></View>
            <Image source={intake_icon} style={[{position:'relative'},styles[Device].uni_icon]}/>
            <View style={[styles[Device].uni_info_wrapper,GeneralStyles.uni_info_wrapper]}>
                <Text style={[styles[Device].intakemonth,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{getMonth(props.courseStartingMonth+1,true)}</Text>
                <View style={{flexDirection:"row",gap:3}}>
                    {/* <Image source={intake_icon} style={[styles[Device].intake_icon,{opacity:0.5}]}/> */}
                    <Text style={[styles[Device].deadline,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{"Application Deadline: "+getMonth(props.deadlineMonth+1,true)}</Text>
                </View>
            </View>
            {/* <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/> */}
        </View>
    )

}

export default Intakecard