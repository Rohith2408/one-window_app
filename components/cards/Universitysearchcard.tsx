import { Image } from "expo-image"
import { useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Word2Sentence, getDevice, getThemeColor } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { UniversitySearchObj } from "../../types"
import location_icon from '../../assets/images/misc/location.png'
import go_icon from '../../assets/images/misc/back.png'

const GeneralStyles=StyleSheet.create({
    uni_wrapper:{
        alignSelf:'stretch',
        display:"flex",
        flexDirection:"row",
        gap:5,
        justifyContent:"center",
        alignItems:"flex-start",
        padding:7
    },
    uni_info_wrapper:{
        display:"flex",
        flex:1,
        alignSelf:'stretch',
        flexDirection:"column",
        gap:8
    }
})

const TabStyles=StyleSheet.create({
    uni_icon:{
        width:30,
        height:30,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:30,
        height:30,
        borderRadius:100,
        left:1,
        top:10
    },
    uni_text1:{
        fontSize:18
    },
    uni_text2:{
        fontSize:16
    },
    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    go_icon:{
        width:11,
        height:11,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:19,
        height:19,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:14
    },
    uni_text2:{
        fontSize:12
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    go_icon:{
        width:9,
        height:9,
        resizeMode:"contain"
    }
})
const MobileMStyles=StyleSheet.create({
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:19,
        height:19,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:14
    },
    uni_text2:{
        fontSize:12
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    go_icon:{
        width:9,
        height:9,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:19,
        height:19,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:14
    },
    uni_text2:{
        fontSize:12
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    go_icon:{
        width:9,
        height:9,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Universitysearchcard=(props:UniversitySearchObj & {index:number})=>{

    const Device=useRef(getDevice()).current

    return(
        <View style={[GeneralStyles.uni_wrapper]}>
            <View style={[styles[Device].uni_icon_bg,{position:"absolute",backgroundColor:getThemeColor(props.index%4)}]}></View>
            <Image source={props.logoSrc} style={[{position:'relative'},styles[Device].uni_icon]}/>
            <View style={[styles[Device].uni_info_wrapper,GeneralStyles.uni_info_wrapper]}>
                <Text style={[styles[Device].uni_text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.name,props.code],"","|")}</Text>
                <View style={{flexDirection:"row",gap:3}}>
                    <Image source={location_icon} style={[styles[Device].location_icon]}/>
                    <Text style={[styles[Device].uni_text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.location.city,props.location.state,props.location.country],"")}</Text>
                </View>
            </View>
            <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
        </View>
    )
}

export default Universitysearchcard