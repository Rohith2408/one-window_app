import { useEffect, useRef, useState } from "react"
import { Animated,  Pressable, StyleSheet, Text,  View } from "react-native"
import { getDevice,truncateString } from "../../utils"
import { Fonts, Themes, disciplines, subDisciplines, topUniversities } from "../../constants"

const GeneralStyles=StyleSheet.create({

})

const TabStyles=StyleSheet.create({
    search:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    search:{
        fontSize:14
    }
})
const MobileMStyles=StyleSheet.create({
    search:{
        fontSize:16
    }
})
const MobileLStyles=StyleSheet.create({
    search:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Dynamicplaceholder=()=>{

    const animstate=useRef(new Animated.Value(0)).current
    const [placeholder,setPlaceholder]=useState(0)
    const placeholders=useRef([...topUniversities,...disciplines,...subDisciplines]).current
    const Device=useRef(getDevice()).current

    const getIndex=(prev:number)=>{
        //console.log(prev)
        return prev==placeholders.length?0:prev+1
    }

    useEffect(()=>{
        animstate.addListener((val)=>{
            if(val.value==1)
            {
                setPlaceholder(((prev)=>getIndex(prev)))
            }
        })
    },[animstate])

    useEffect(()=>{
        Animated.loop(
            Animated.sequence([
              Animated.timing(animstate, {
                delay:1000,
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              }),
              Animated.timing(animstate, {
                delay:500,
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
              }),
            ])
        ).start();
    },[])

    return(
        <View style={{flexDirection:'row'}}>
            <Text style={[styles[Device].search,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Search for </Text>
            <Animated.Text style={[styles[Device].search,{flex:1,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.6),transform:[{translateY:animstate.interpolate({inputRange:[0,1],outputRange:[0,10]})}],opacity:Animated.subtract(new Animated.Value(1),animstate)}]}>{truncateString(placeholders[placeholder],22,true)}</Animated.Text>
        </View>
    )
}

export default Dynamicplaceholder