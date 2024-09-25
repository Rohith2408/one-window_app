import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import Loadingview from "../resources/Loadingview"
import Workexperiencecard from "../cards/Workexperiencecard"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import add_icon from '../../assets/images/misc/add.png'
import { Image } from "expo-image"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import emptylist from '../../assets/images/misc/emptylist.png'
import { addToBasket } from "../../constants/basket"

const GeneralStyles=StyleSheet.create({
    add_wrapper:{
        position:'absolute',
        bottom:20,
        right:0,
        zIndex:1,
        backgroundColor:"white",
        borderRadius:100
    }
})

const TabStyles=StyleSheet.create({
    add_icon:{
        width:40,
        height:40,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:18
    },
    click_message:{
        fontSize:14
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:'100%',
        height:75
    }
})

const MobileSStyles=StyleSheet.create({
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:14
    },
    click_message:{
        fontSize:10,
        lineHeight:16
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:50
    }
})
const MobileMStyles=StyleSheet.create({
    add_icon:{
        width:38,
        height:38,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:75
    }
})
const MobileLStyles=StyleSheet.create({
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:'100%',
        height:75
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

    const addWork=(currentlyworking:boolean)=>{
        console.log("currently",currentlyworking)
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:currentlyworking?"Workexperience_working":"Workexperience_completed"}}}):null
    }

    const openCurrentlyWorkingFlyer=()=>{
        addToBasket("currentlyworking",{callback:addWork})
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Currentlyworking",flyerdata:{currentlyWorkingBasketid:"currentlyworking"}}}}):null
    }   

    return(
        <View style={{flex:1,paddingTop:30}}>
        {
            workExperiences.responseStatus=="not_recieved"
            ?
            <Loadinglistscreen cardStyles={styles[Device].card} cardGap={30} count={3} direction="vertical"/>
            :
            <View style={{flex:1,gap:30}}>
                <Pressable onPress={openCurrentlyWorkingFlyer} style={[GeneralStyles.add_wrapper]}><Image style={[styles[Device].add_icon]} source={add_icon}></Image></Pressable>
                <View style={{flex:1}}>
                {
                    workExperiences.data.length==0
                    ?
                    <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                        <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                        <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>It's awfully quiet in here...!</Text>
                        <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Click on the add button below to start adding your work experience</Text>
                    </View>
                    :
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:50,paddingTop:20}}>
                    {
                        workExperiences.data.map((item,i)=>
                        <View key={item._id} style={[styles[Device].card]}><Workexperiencecard data={item} index={i}></Workexperiencecard></View>
                        )
                    }
                    </ScrollView>
                }
                </View>
            </View>
        }
        </View>
    )
}

export default Workexperience