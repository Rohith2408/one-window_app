import { StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useRef } from "react"
import { getDevice, getLightThemeColor } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"
import expert_icon from '../../assets/images/misc/expert.png'

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flexDirection:"column",
        gap:2,
        alignItems:"flex-start",
        justifyContent:"center",
        paddingLeft:8,
        paddingRight:8
    },
})

const TabStyles=StyleSheet.create({
    role:{
        fontSize:16
    },
    description:{
        fontSize:14,
        lineHeight:28
    },
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    icon_wrapper:{
        width:24,
        height:24,
        left:-12,
        top:7
    }
})

const MobileSStyles=StyleSheet.create({
    role:{
        fontSize:12
    },
    description:{
        fontSize:10,
        lineHeight:20
    },
    icon:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    icon_wrapper:{
        width:18,
        height:18,
        left:-8,
        top:4
    }
})

const MobileMStyles=StyleSheet.create({
    role:{
        fontSize:14
    },
    description:{
        fontSize:12,
        lineHeight:24
    },
    icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    icon_wrapper:{
        width:20,
        height:20,
        left:-8,
        top:5
    }
})

const MobileLStyles=StyleSheet.create({
    role:{
        fontSize:14
    },
    description:{
        fontSize:12,
        lineHeight:24
    },
    icon:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    icon_wrapper:{
        width:20,
        height:20,
        left:-8,
        top:5
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Expertintrocard=(props:{role:string,description:string,index:number})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={{flexDirection:"row",alignItems:"center",gap:5,position:"relative"}}>
                <View style={[styles[Device].icon_wrapper,{borderRadius:100,position:"absolute",backgroundColor:getLightThemeColor(props.index%4)}]}></View>
                <Image style={[styles[Device].icon]} source={expert_icon}/>
                <Text style={[{textAlign:"left"},{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].role]}>{props.role}</Text>
            </View>
            <View><Text style={[{textAlign:"left"},{color:Themes.Light.OnewindowPrimaryBlue(0.6),fontFamily:Fonts.NeutrifStudio.Regular},styles[Device].description]}>{props.description}</Text></View>
        </View>
    )
}

export default Expertintrocard