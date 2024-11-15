import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import Checkbox from "../resources/Checkbox"
import { useEffect, useRef, useState } from "react"
import { getDevice } from "../../utils"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setRemoveScreen } from "../../store/slices/removeScreenSlice"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    title:{
        fontSize:16,
        lineHeight:24
    },
    check_circle:{
        width:17,
        height:17,
        borderRadius:17
    },
    check_title:{
        fontSize:16
    },
    next:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    title:{
        fontSize:14,
        lineHeight:20
    },
    check_circle:{
        width:15,
        height:15,
        borderRadius:15
    },
    check_title:{
        fontSize:14
    },
    next:{
        fontSize:14
    }
})
const MobileMStyles=StyleSheet.create({
    title:{
        fontSize:16,
        lineHeight:24
    },
    check_circle:{
        width:17,
        height:17,
        borderRadius:17
    },
    check_title:{
        fontSize:16
    },
    next:{
        fontSize:16
    }
})
const MobileLStyles=StyleSheet.create({
    title:{
        fontSize:16,
        lineHeight:24
    },
    check_circle:{
        width:17,
        height:17,
        borderRadius:17
    },
    check_title:{
        fontSize:16
    },
    next:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Intermediatecompleted=(props:{intermediateCompletedBasketid:string})=>{

    const info=useRef(getBasket(props.intermediateCompletedBasketid)).current
    console.log("inf",info)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isCompleted,setIsCompleted]=useState(info.initialStatus!=undefined?info.initialStatus:true);
    const animindex=useRef(new Animated.Value(0)).current;
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()

    useEffect(()=>{
        Animated.spring(animindex,{
            toValue:isCompleted?0:1,
            useNativeDriver:false
        }).start()
    },[isCompleted])

    const next=()=>{
        //navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}})
        dispatch(setRemoveScreen({id:"Intermediatecompleted"}))
        info.callback(isCompleted)
    }

    return(
        <View style={[appStandardStyles.screenMarginSmall,{paddingTop:20,gap:15}]}>
            <Text style={[styles[Device].title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Have you successfully completed your course of study{info.institute?" at "+info.institute:""}?</Text>
            <View style={{gap:15}}>
                <View>
                    <Pressable onPress={()=>setIsCompleted(true)} style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <View style={[styles[Device].check_circle,{borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]}>
                            <Animated.View style={{alignSelf:"stretch",flex:1,borderRadius:100,transform:[{scale:animindex.interpolate({inputRange:[0,1],outputRange:[0.6,0]})}],backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}}/>
                        </View>
                        <View style={{flex:1}}><Text style={[styles[Device].check_title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Yes</Text></View>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={()=>setIsCompleted(false)} style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <View style={[styles[Device].check_circle,{borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]}>
                            <Animated.View style={{alignSelf:"stretch",flex:1,borderRadius:100,transform:[{scale:animindex.interpolate({inputRange:[0,1],outputRange:[0,0.6]})}],backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}}/>
                        </View>
                        <View style={{flex:1}}><Text style={[styles[Device].check_title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>No</Text></View>
                    </Pressable>
                </View>
            </View>
            <View style={{alignSelf:"flex-end"}}>
                <Pressable onPress={next} style={[{alignSelf:"center",borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}]}>
                    <Text style={[{padding:5,paddingLeft:15,paddingRight:15,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)},styles[Device].next]}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}



export default Intermediatecompleted