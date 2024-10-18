import { useEffect, useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import { getBasket } from "../../constants/basket"
const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:20,
        justifyContent:"center",
        alignItems:'center',
        gap:40
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:16,
        lineHeight:26
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
        lineHeight:22
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

const Warning=()=>{

    const [path,navigate]=useNavigation()
    const info:{warningMessage?:string,proceedCallback:()=>Promise<boolean>,yesLabel?:string,noLabel?:string}=getBasket("warning");
    const Device=useRef<keyof typeof styles>(getDevice()).current

    useEffect(()=>{

    },[])

    const close=()=>{
        navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}});
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View><Text style={[styles[Device].subtext,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(0.4),fontFamily:Fonts.NeutrifStudio.Regular}]}>{info.warningMessage}</Text></View>
            <View style={{flexDirection:"row",gap:10}}>
                <View style={[{flex:1}]}><Asynchronousbutton successText="Success" idleText={info.yesLabel?info.yesLabel:"Proceed"} failureText="Something went wront" callback={info.proceedCallback}/></View>
                <Pressable onPress={close} style={{flex:1,alignItems:'center',justifyContent:"center",borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}>
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{info.noLabel?info.noLabel:"No"}</Text></Pressable>
            </View>
        </View>
    )
}

export default Warning