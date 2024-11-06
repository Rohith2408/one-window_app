import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { ListItem } from "../../types"
import { useEffect, useRef } from "react"
import { getDevice } from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:50
    }
})

const TabStyles=StyleSheet.create({
    check:{
        width:16,
        height:16,
        borderRadius:100,
        backgroundColor:"white"
    },
    highlighter:{
        width:12,
        height:12,
        borderRadius:100
    },
    label:{
        fontSize:20
    }
})

const MobileSStyles=StyleSheet.create({
    check:{
        width:10,
        height:10,
        borderRadius:100,
        backgroundColor:"white"
    },
    highlighter:{
        width:8,
        height:8,
        borderRadius:100
    },
    label:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    check:{
        width:12,
        height:12,
        borderRadius:100,
        backgroundColor:"white"
    },
    highlighter:{
        width:10,
        height:10,
        borderRadius:100
    },
    label:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    check:{
        width:12,
        height:12,
        borderRadius:100,
        backgroundColor:"white"
    },
    highlighter:{
        width:10,
        height:10,
        borderRadius:100
    },
    label:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Checkbox=(props:{options:{yes:ListItem,no:ListItem}} & {value:"yes"|"no"|undefined,id:string,eventHandler:(event:Event)=>void})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const scale=useRef(new Animated.Value(0)).current
    const [path,navigate]=useNavigation()

    useEffect(()=>{
        Animated.spring(scale,{
            toValue:props.value=="yes"?1:0,
            useNativeDriver:true
        }).start();
    },[props.value])

    const onCheck=(val:"yes"|"no")=>{
        console.log("val",val);
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:val}}}):null
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <Pressable onPress={()=>onCheck("yes")} style={{flexDirection:"row",alignItems:"center",gap:5}}>
                <View style={[styles[Device].check]}>
                    <Animated.View style={[{transform:[{scale:scale}]},styles[Device].highlighter,{backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}]}></Animated.View>
                </View>
                <Animated.Text style={[styles[Device].text,{opacity:scale.interpolate({inputRange:[0,1],outputRange:[0.5,1]})},{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.options.yes.label}</Animated.Text>
            </Pressable>
            <Pressable onPress={()=>onCheck("no")} style={{display:"flex",flexDirection:"row",alignItems:"center",gap:5}}>
                <View style={[styles[Device].check]}>
                    <Animated.View style={[{transform:[{scale:Animated.subtract(new Animated.Value(1),scale)}]},styles[Device].highlighter,{backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}]}></Animated.View>
                </View>
                <Animated.Text style={[styles[Device].text,{opacity:scale.interpolate({inputRange:[0,1],outputRange:[1,0.5]})},{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.options.no.label}</Animated.Text>
            </Pressable>
        </View>
    )
}

export default Checkbox