import { Image } from "expo-image"
import { StyleSheet, Text, View } from "react-native"
import icon from '../../assets/images/misc/meeting.png'
import { ListItem } from "../../types"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    text:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    text:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Degreepreferencecard=(props:ListItem)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{padding:5,gap:5,flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
            <Image style={[styles[Device].icon]} source={icon}/>
            <View style={{flex:1}}><Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.label}</Text></View>
        </View>
    )

}

export default Degreepreferencecard