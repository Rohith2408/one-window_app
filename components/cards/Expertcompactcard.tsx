import { StyleSheet, Text, View } from "react-native"
import { Advisor } from "../../types"
import { Word2Sentence, camelCaseToString, getDevice, getLightThemeColor, getThemeColor, setWordCase } from "../../utils"
import { Image } from "expo-image"
import { useRef } from "react"
import { Countries, Fonts, Themes } from "../../constants"
import default_icon from '../../assets/images/misc/defaultDP.png'
import go_icon from '../../assets/images/misc/back.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        display:"flex",
        flexDirection:"row",
        gap:10,
        alignItems:'center'
    }
})

const TabStyles=StyleSheet.create({
    dp:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    name:{
        fontSize:18
    },
    role:{
        fontSize:16
    },
    go:{
        width:12,
        height:12,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    dp:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    name:{
        fontSize:14
    },
    role:{
        fontSize:12
    },
    go:{
        width:8,
        height:8,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    name:{
        fontSize:16
    },
    role:{
        fontSize:14
    },
    go:{
        width:8,
        height:8,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    name:{
        fontSize:16
    },
    role:{
        fontSize:14
    },
    go:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Expertcompactcard=(props:Advisor & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    
    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View><Image style={[styles[Device].dp]} source={props.info.displayPicSrc?props.info.displayPicSrc:default_icon}/></View>
            <View style={{flex:1}}><Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{setWordCase(props.info.firstName)}</Text></View>
            <Text style={[styles[Device].role,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.3)}]}>{camelCaseToString(props.info.role)}</Text>
            <View><Image style={[styles[Device].go,{transform:[{scaleX:-1}]}]} source={go_icon}/></View>
        </View> 
    )
    
}

export default Expertcompactcard