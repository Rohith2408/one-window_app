import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import Loadingview from "../resources/Loadingview"
import Workexperiencecard from "../cards/Workexperiencecard"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import add_icon from '../../assets/images/misc/add.png'
import { Image } from "expo-image"
import { getDevice } from "../../utils"

const GeneralStyles=StyleSheet.create({
    add_wrapper:{
        position:'absolute',
        bottom:20,
        right:0
    }
})

const TabStyles=StyleSheet.create({
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    }
})
const MobileMStyles=StyleSheet.create({
    add_icon:{
        width:38,
        height:38,
        resizeMode:"contain"
    }
})
const MobileLStyles=StyleSheet.create({
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    }
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Workexperience=(props:any)=>{

    const workExperiences=useAppSelector((state)=>state.workexperience)
    const [path,navigate]=useNavigation()
    const [dimensions,setDimesnions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    useEffect(()=>{

    },[])

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Workexperience"}}}):null
    }

    return(
        <View style={{flex:1,paddingTop:30}}>
        {
            workExperiences.responseStatus=="not_recieved"
            ?
            <Loadinglistscreen cardGap={30} cardHeight={Device=="MobileS"?150:(Device=="MobileM"?200:250)}></Loadinglistscreen>
            :
            <View style={{flex:1,gap:30}}>
                <Pressable onPress={add} style={[GeneralStyles.add_wrapper]}><Image style={[styles[Device].add_icon]} source={add_icon}></Image></Pressable>
                {
                    workExperiences.data.map((item,i)=>
                    <View key={item._id} style={{width:'100%',height:Device=="MobileS"?150:(Device=="MobileM"?170:200)}}><Workexperiencecard data={item} index={i}></Workexperiencecard></View>
                    )
                }
            </View>
        }
        </View>
    )
}

export default Workexperience