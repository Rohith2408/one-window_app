import { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes, appStandardStyles } from "../../constants"
const GeneralStyles=StyleSheet.create({
    main_wrapper:{
       flex:1,
        paddingTop:20,
        justifyContent:"center",
        alignItems:'center',
        gap:15
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

const Error=(props:{error:string,preventAutoHide?:boolean,hideInterval?:number})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    useEffect(()=>{
        if(!props.preventAutoHide)
        {
            setTimeout(()=>{
                navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
            },props.hideInterval?props.hideInterval:2500)
        }
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginSmall]}>
            <Text style={[styles[Device].text,{color:"red",fontFamily:Fonts.NeutrifStudio.Bold}]}>Oops!</Text>
            <Text style={[styles[Device].subtext,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(0.4),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.error}</Text>
        </View>
    )
}

export default Error