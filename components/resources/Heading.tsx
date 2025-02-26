import { Text } from "react-native"
import { View } from "react-native"
import { getDevice } from "../../utils"
import { StyleSheet } from "react-native"
import { Fonts, Themes } from "../../constants"
import { useRef } from "react"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flexDirection:"row",
        gap:7.5,
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    heading:{
        fontSize:16,
        lineHeight:18
    }
})

const MobileSStyles=StyleSheet.create({
    heading:{
        fontSize:10,
        lineHeight:14
    }
})

const MobileMStyles=StyleSheet.create({
    heading:{
        fontSize:13,
        lineHeight:20
    }
})

const MobileLStyles=StyleSheet.create({
    heading:{
        fontSize:14,
        lineHeight:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Heading=(props:{heading:string,alignment?:"center"|"left"})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.main_wrapper,props.alignment=="center"?{alignSelf:"center"}:""]}>
            <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.3)}]}>{props.heading}</Text>
            <View style={{width:100,height:1,backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.1)}}/>
        </View>
    )
}

export default Heading