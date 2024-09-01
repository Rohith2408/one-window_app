import { StyleSheet, Text, View } from "react-native"
import { QuickFilterInfo } from "../../types"
import { Image } from "expo-image"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    title:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Quickfiltercard=(props:QuickFilterInfo)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{display:'flex',flexDirection:'row',alignItems:"center",gap:5,padding:5}}>
            <Image style={[styles[Device].icon]} source={props.icon}/>
            <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text>
        </View>
    )

}

export default Quickfiltercard