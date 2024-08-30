import { useRef, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { getDevice, getServerRequestURL, serverRequest } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"
import verified_icon from '../../assets/images/misc/verified.png'
import useNavigation from "../../hooks/useNavigation"
import Textbox from "./Textbox"
import { ServerResponse } from "../../types"
import loading_gif from '../../assets/images/misc/loader.gif'

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        alignItems:'center',
        padding:10
    },
    verify_wrapper:{
        borderWidth:1,
        borderRadius:20
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:14
    },
    verified_icon:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    verify:{
        fontSize:10
    }
})

const MobileMStyles=StyleSheet.create({
    
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Email=(props:{value:{email:string|undefined,verified:boolean},id:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const emailVerificationData=useAppSelector((state)=>state.verification).data?.find((item)=>item.type=="email")
    const [path,navigate]=useNavigation()
    const [message,setMessage]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    const openVerification=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Emailverification"}}):null
    }

    // const updateEmail=async ()=>{
    //     let res:ServerResponse=await profileUpdator({email:props.email},(res)=>res.success?store.dispatch(setSharedInfo({_id:res.data._id,
    //         firstName:res.data.firstName,
    //         lastName:res.data.lastName,
    //         email:res.data.email,
    //         displayPicSrc:res.data.displayPicSrc?res.data.displayPicSrc:"",
    //         phone:res.data.phone,
    //         LeadSource:res.data.LeadSource})):null)
    // }

    const requestOtp=async ()=>{
        setIsLoading(true)
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("email-verification","POST"),
            reqType: "POST"
        });
        !res.success?setMessage("Something went wrong"):setMessage("Verification link has been sent to your email");
        setIsLoading(false);
        return res
    }

    const updateEmail=(text:string)=>{
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:{...props.value,email:text}}}}):null
    }

    return(
        <View style={[GeneralStyles.wrapper,!props.value.verified?{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}:{}]}>
            <View style={{flex:1,gap:7}}>
            {
                props.value.verified
                ?
                <Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.value.email}</Text>
                :
                <TextInput onChangeText={(text)=>updateEmail(text)} value={props.value.email} style={{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold,padding:0}}></TextInput>
            }
            {
                message
                ?
                <Text style={{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular,fontSize:10}}>{message}</Text>
                :
                null
            }    
            </View>
            <View>
            {
                props.value.verified
                ?
                <Image source={verified_icon} style={[styles[Device].verified_icon]}></Image>
                :
                <Pressable onPress={!isLoading?requestOtp:null} style={[GeneralStyles.verify_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}>
                    {
                        isLoading
                        ?
                        <Image source={loading_gif} style={{width:15,height:15,resizeMode:"contain"}}/>
                        :
                        <Text style={[styles[Device].verify,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>Verify</Text>
                    }
                </Pressable>
            }
            </View>
        </View>
    )
}

export default Email