import { StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        paddingTop:20,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center',
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:30
    },
    subtext:{
        fontSize:18
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
        fontSize:28
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

const Nointernet=()=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <Text style={[styles[Device].text,{color:"red",fontFamily:Fonts.NeutrifStudio.Bold}]}>No Internet Connection</Text>
            <Text style={[styles[Device].subtext,{textAlign:'center',lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.4),fontFamily:Fonts.NeutrifStudio.Regular}]}>Please check your internet connection and try again</Text>
        </View>
    )

}

export default Nointernet