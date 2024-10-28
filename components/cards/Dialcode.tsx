import { StyleSheet, Text, View } from "react-native"
import { Countrycode } from "../../types"
import { Word2Sentence, getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { useRef } from "react"

const TabStyles=StyleSheet.create({
    text:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Dialcode=(props:Countrycode)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{flex:1}}>
            <Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{(props.dial_code+"     ").substring(0,4)+" - "+props.name}</Text>
        </View>
    )

}

export default Dialcode