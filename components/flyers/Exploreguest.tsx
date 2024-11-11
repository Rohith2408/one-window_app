import { useEffect, useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import Styledtext from "../resources/Styledtext"
const GeneralStyles=StyleSheet.create({
    main_wrapper:{
       flex:1,
        paddingTop:20,
        justifyContent:"center",
        alignItems:'center',
        gap:15,
        flexDirection:"column",
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:30
    },
    subtext:{
        fontSize:16,
        lineHeight:28
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:26
    },
    subtext:{
        fontSize:14,
        lineHeight:20
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:28
    },
    subtext:{
        fontSize:16,
        lineHeight:24
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:16,
        lineHeight:24
    }
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Exploreguest=()=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const close=()=>{
        navigate?navigate({type:"RemovePages",payload:[{id:"Exploreguest"},{id:"Explore"}]}):null
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <Styledtext styles={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Psst... Wanna see more?!" focusWord="Wanna"/>
            <Pressable><Text style={[styles[Device].subtext,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>It's just a login away. Sign in to keep exploring</Text></Pressable>
        </View>
    )
}

export default Exploreguest