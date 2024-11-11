import { useRef, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import useNavigation from "../../hooks/useNavigation"
import sample_pic from '../../assets/images/misc/sampledp.png'
import loader from '../../assets/images/misc/loader.gif'
import { encodePath, getDevice, profileUpdator } from "../../utils"
import * as ImagePicker from 'expo-image-picker';
import { Chat, ServerResponse } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Image } from "expo-image"
import { addToBasket } from "../../constants/basket"
import { requests } from "../../constants/requests"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        padding:20,
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    option:{
        fontSize:20
    }
})

const MobileSStyles=StyleSheet.create({
    option:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    option:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    option:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Chatoptions=()=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()
    const info=useAppSelector((state)=>state.sharedinfo.data)
    const [loading,setLoading]=useState(false);
    const blockedByUsers=useAppSelector((state)=>state.blockedbyusers).data
    const blockedUsers=useAppSelector((state)=>state.blockedusers).data
    let profile=useAppSelector((state)=>state.sharedinfo)
    let chat=useAppSelector((state)=>state.chats).data.find((chat)=>chat._id==encodePath(path)?.props?.chatId)

    const setUser=async ()=>{
        let user=chat?.participants.find((item)=>item._id!=profile.data?._id)
        setLoading(true);
        let data={
            studentId:user?._id,
            action:blockedUsers?.find((blockeduser)=>blockeduser._id==user?._id)!=undefined?"unblock":"block"
        }
        let requestInfo=requests.find((item)=>item.id=="block/unblock-user");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        setLoading(false)
    }

    const show=()=>{
        addToBasket("viewimage",chat?.participants.find((item)=>item._id!=profile.data?._id)?.displayPicSrc)
        //navigate?navigate({type:"AddScreen",payload:{screen:"Dp",params:{image:sample_pic}}}):null
        chat?.participants.length==2?navigate({type:"AddScreen",payload:{screen:"Dp"}}):null     
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <Pressable onPress={show} style={[{padding:10}]}><Text  style={[styles[Device].option,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>View</Text></Pressable>
            {
                chat?.participants.length==2 
                ?
                <Pressable onPress={setUser} style={[{padding:10,flexDirection:'row',alignItems:"center"}]}>
                    <View style={{flex:1}}><Text  style={[styles[Device].option,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{chat?.participants.filter((item)=>item._id!=profile.data?._id && blockedUsers?.find((user)=>user._id==item._id)!=undefined).length==1?"Unblock":"Block"}</Text></View>
                    {
                        loading
                        ?
                        <Transitionview effect="zoom"><Image style={{width:20,height:20,resizeMode:"contain"}} source={loader} /></Transitionview>
                        :
                        null
                    }
                </Pressable>
                :
                null
            }
            {/* <Pressable style={[{padding:10}]}><Text  style={[styles[Device].option,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Remove</Text></Pressable> */}
        </View>
    )

}

export default Chatoptions