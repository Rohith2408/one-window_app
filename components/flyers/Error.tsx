import { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        paddingTop:20,
        justifyContent:"center",
        alignItems:'center',
        gap:15
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:26
    },
    subtext:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:28
    },
    subtext:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:16
    }
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Error=(props:{error:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    useEffect(()=>{
        setTimeout(()=>{
            navigate?navigate({type:"RemoveScreen"}):null
        },2500)
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <Text style={[styles[Device].text,{color:"red",fontFamily:Fonts.NeutrifStudio.Bold}]}>Oops!</Text>
            <Text style={[styles[Device].subtext,{color:Themes.Light.OnewindowPrimaryBlue(0.4),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.error}</Text>
        </View>
    )
}

export default Error