import { StyleSheet, Text, View } from "react-native"
import { Countrycode, Orderlogs } from "../../types"
import { Word2Sentence, formatDate, getDevice, getLightThemeColor, setWordCase } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { useRef } from "react"
import log_icon from "../../assets/images/misc/order-log.png"
import { Image } from "expo-image"

const TabStyles=StyleSheet.create({
    text:{
        fontSize:20
    },
    icon:{
        width:24,
        height:24,
        objectFit:'contain'
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:14
    },
    icon:{
        width:16,
        height:16,
        objectFit:'contain'
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:16
    },
    icon:{
        width:20,
        height:20,
        objectFit:'contain'
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:16
    },
    icon:{
        width:20,
        height:20,
        objectFit:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Orderlogscard=(props:Orderlogs & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{flexDirection:"column",justifyContent:'center',alignItems:'center',gap:10}}>
            <Image source={log_icon} style={[styles[Device].icon]}/>
            <Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{formatDate(props.time)}</Text>
            <Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{setWordCase(props.action)}</Text>
        </View>
    )

}

export default Orderlogscard