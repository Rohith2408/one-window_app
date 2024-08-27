import { StyleSheet, Text, View } from "react-native"
import { Institute } from "../../types"
import { useRef } from "react"
import { Word2Sentence, getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({

})

const TabStyles=StyleSheet.create({

})

const MobileSStyles=StyleSheet.create({
    name:{
        fontSize:12,
        lineHeight:16
    },
    location:{
        fontSize:10
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

const Institutionscard=(props:Institute)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    console.log("aa",props)

    return(
        <View style={{flex:1}}>
            <Text style={[styles[Device].name,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.InstitutionName}</Text>
            <Text style={[styles[Device].location,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>{Word2Sentence([props.District,props.State])}</Text>
        </View>
    )

}

export default Institutionscard