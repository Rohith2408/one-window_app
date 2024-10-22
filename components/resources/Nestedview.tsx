import { Image } from "expo-image"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import arrow_icon from '../../assets/images/misc/back.png'
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        // flex:1,
        display:'flex',
        flexDirection:'column',
        gap:5,
    },
    arrow:{
        transform:[{rotate:"-90deg"}]
    }
})

const TabStyles=StyleSheet.create({
    arrow:{
        width:10,
        height:10
    },
    title:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    arrow:{
        width:10,
        height:10
    },
    title:{
        fontSize:14
    }
})
const MobileMStyles=StyleSheet.create({
    arrow:{
        width:10,
        height:10
    },
    title:{
        fontSize:14
    }
})
const MobileLStyles=StyleSheet.create({
    arrow:{
        width:10,
        height:10
    },
    title:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Nestedview=(props:{title:string,maxHeight:number,children:React.ReactNode})=>{

    const height=useRef(new Animated.Value(0)).current
    const [isFocussed,setIsFocussed]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current

    // console.log(props)

    useEffect(()=>{
        Animated.timing(height,{
            toValue:isFocussed?1:0,
            useNativeDriver:false,
            duration:200
        }).start()
    },[isFocussed])

    return(
        <View style={[GeneralStyles.wrapper]}>
            <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} style={{flexDirection:"row"}} onPress={()=>setIsFocussed(!isFocussed)}>
                <View style={{flex:1}}><Text style={[styles[Device].title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{props.title}</Text></View>
                <Animated.Image source={arrow_icon} style={[styles[Device].arrow,{transform:[{rotate:height.interpolate({inputRange:[0,1],outputRange:["90deg","-90deg"]})}]}]}></Animated.Image>
            </Pressable>
            <Animated.View style={[{width:"100%",height:height.interpolate({inputRange:[0,1],outputRange:[0,props.maxHeight]})}]}>
                <ScrollView showsVerticalScrollIndicator persistentScrollbar style={{flex:1}}>{props.children}</ScrollView>
            </Animated.View>
        </View>
    )

}

export default Nestedview