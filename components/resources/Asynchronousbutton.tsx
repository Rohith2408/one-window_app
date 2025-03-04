import { useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { ServerResponse } from "../../types"
import { getDevice } from "../../utils"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:100,
        borderWidth:1,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'white'
    },
    text:{
        position:"absolute"
    },
    loader:{
        
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:17
    },
    loader:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    wrapper:{
        padding:12,
        paddingLeft:17,
        paddingRight:17
    } 
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:13
    },
    loader:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    wrapper:{
        padding:7.5,
        paddingLeft:10,
        paddingRight:10
    }
})
const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:15
    },
    loader:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    wrapper:{
        padding:10,
        paddingLeft:15,
        paddingRight:15
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:15
    },
    loader:{
        width:17,
        height:17,
        resizeMode:"contain"
    },
    wrapper:{
        padding:10,
        paddingLeft:15,
        paddingRight:15
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Asynchronousbutton=(props:{successText:string,idleText:string,failureText:string,callback:()=>Promise<boolean>})=>{

    const [state,setState]=useState<"success"|"failure"|"idle"|"loading">("idle")
    const idleTextScale=useRef(new Animated.Value(1)).current
    const successTextScale=useRef(new Animated.Value(0)).current
    const failureTextScale=useRef(new Animated.Value(0)).current
    const loadingScale=useRef(new Animated.Value(0)).current
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const setScale=()=>{
        Animated.parallel([
            Animated.spring(idleTextScale,{
                toValue:state=="idle"?1:0,
                useNativeDriver:false
            }),
            Animated.spring(successTextScale,{
                toValue:state=="success"?1:0,
                useNativeDriver:false
            }),
            Animated.spring(failureTextScale,{
                toValue:state=="failure"?1:0,
                useNativeDriver:false
            }),
            Animated.spring(loadingScale,{
                toValue:state=="loading"?1:0,
                useNativeDriver:false
            })
        ]).start()
    }

    useEffect(()=>{
        setScale()
    },[state])

    const click=async ()=>{
        if(state=="idle")
        {
            setState("loading")
            let res=await props.callback()
            setState(res?"success":"failure")
            setTimeout(()=>setState("idle"),1500)
        }
    }


    return(
        <Pressable onPress={click} style={[GeneralStyles.wrapper,styles[Device].wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderWidth:1.5}]}>
            <Animated.Text style={[GeneralStyles.text,styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),transform:[{scale:idleTextScale}]}]}>{props.idleText}</Animated.Text>
            <Animated.Text style={[GeneralStyles.text,styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),transform:[{scale:successTextScale}]}]}>{props.successText}</Animated.Text>
            <Animated.Text style={[GeneralStyles.text,styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),transform:[{scale:failureTextScale}]}]}>{props.failureText}</Animated.Text>
            <Animated.Image source={loading_gif} style={[styles[Device].loader,{transform:[{scale:loadingScale}]}]}></Animated.Image>
        </Pressable>
    )

}

export default Asynchronousbutton
