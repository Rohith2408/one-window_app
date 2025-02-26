import { useEffect, useRef } from "react"
import { Linking, Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import { getBasket } from "../../constants/basket"
import Transitionview from "../resources/Transitionview"
import { ServerResponse } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setRemoveScreen } from "../../store/slices/removeScreenSlice"
import * as WebBrowser from 'expo-web-browser';

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:20,
        justifyContent:"center",
        alignItems:'center',
        gap:30
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:20,
        lineHeight:26
    },
    no:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:26
    },
    subtext:{
        fontSize:14,
        lineHeight:20
    },
    no:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:28
    },
    subtext:{
        fontSize:16,
        lineHeight:22
    },
    no:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:16,
        lineHeight:24
    },
    no:{
        fontSize:16
    }
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

type WarningProps={
    warningTitle?:string,
    warningMessage?:string,
    url:string,
    proceedCallback:()=>Promise<boolean>,
    yesLabel?:string,
    noLabel?:string
}

const Refundpolicy=()=>{

    const [path,navigate]=useNavigation()
    const info:WarningProps=getBasket("refundpolicy");
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()

    useEffect(()=>{

    },[])

    const close=()=>{
        dispatch(setRemoveScreen({id:"Refundpolicy"}));
    }

    const proceed=async ()=>{
        let res=await info.proceedCallback()
        close()
        return res
    }

    const openInAppBrowser = async () => {
        const result = await WebBrowser.openBrowserAsync(info.url);
        console.log(result); 
    };

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginSmall]}>
            <Transitionview effect="panY" delay={200}><Text style={[styles[Device].text,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Just a sec!</Text></Transitionview>   
            <View><Text style={[styles[Device].subtext,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(0.4),fontFamily:Fonts.NeutrifStudio.Regular}]}>Please review our refund and cancellation policies before placing your order!</Text></View>
            <Pressable onPress={openInAppBrowser}><Text style={[styles[Device].subtext,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Show refund policy</Text></Pressable>
            <View style={{flexDirection:"row",gap:10}}>
                <View style={[{flex:1}]}><Asynchronousbutton successText="Success" idleText="I Agree" failureText="Something went wront" callback={proceed}/></View>
                <Pressable onPress={close} style={{flex:1,alignItems:'center',justifyContent:"center",borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}><Text style={[styles[Device].no,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Back</Text></Pressable>
            </View>
        </View>
    )
}

export default Refundpolicy