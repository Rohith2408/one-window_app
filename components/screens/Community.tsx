import { Text, View } from "react-native"
import empty_image from "../../assets/images/illustrations/sad.png"
import { Image } from "expo-image"
import { StyleSheet } from "react-native"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    card:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    no_feed:{
        fontSize:18
    },
    no_feed_sub:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    no_feed:{
        fontSize:14
    },
    no_feed_sub:{
        fontSize:10,
        lineHeight:20
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    }
})
const MobileMStyles=StyleSheet.create({
    no_feed:{
        fontSize:18
    },
    no_feed_sub:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    }
})
const MobileLStyles=StyleSheet.create({
    no_feed:{
        fontSize:18
    },
    no_feed_sub:{
        fontSize:16,
        lineHeight:20
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Community=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
           <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:'center',gap:15}}>
                <Transitionview effect="panY"><Image source={empty_image} style={[styles[Device].emptylist_image]}/></Transitionview>
                <View style={{flexDirection:"column",alignItems:'center',gap:5}}>
                    <Text style={[styles[Device].no_feed,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Nothing to see here...!</Text>
                    <Text style={[styles[Device].no_feed_sub,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>University deadlines, programs, and scholarships—check back for fresh updates!!</Text>
                </View>
            </View>
        </View>
    )
}

export default Community