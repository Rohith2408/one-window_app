import { Keyboard, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { ServerResponse } from "../../types"
import { getDevice, getServerRequestURL, serverRequest } from "../../utils"
import { useEffect, useRef, useState } from "react"
import Verifyuser from "./Verifyuser"
import { addToBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes, appStandardStyles, secureStoreKeys } from "../../constants"
import Textbox from "../resources/Textbox"
import Styledtext from "../resources/Styledtext"
import { validations } from "../../utils/validations"
import Transitionview from "../resources/Transitionview"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import back_icon from '../../assets/images/misc/back.png'
import { Image } from "expo-image"
import * as SecureStore from 'expo-secure-store';

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        padding:10,
        gap:10
    },
    request_otp_wrapper:{
        alignSelf:"center",
        borderWidth:1,
        borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),
        padding:10,
        borderRadius:100
    }
})

const TabStyles=StyleSheet.create({
    email:{
        fontSize:18
    },
    enter_text:{
        fontSize:18
    },
    already_text:{
        fontSize:14
    },
    error:{
        fontSize:14
    },
    no_code:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
    email:{
        fontSize:14
    },
    enter_text:{
        fontSize:14
    },
    already_text:{
        fontSize:11
    },
    error:{
        fontSize:11
    },
    no_code:{
        fontSize:11
    }
})

const MobileMStyles=StyleSheet.create({
    email:{
        fontSize:16
    },
    enter_text:{
        fontSize:18
    },
    already_text:{
        fontSize:12
    },
    error:{
        fontSize:12
    },
    no_code:{
        fontSize:12
    },
    back_icon:{
        width:8,
        height:8,
        resizeMode:'contain'
    }
})

const MobileLStyles=StyleSheet.create({
    email:{
        fontSize:16
    },
    enter_text:{
        fontSize:16
    },
    already_text:{
        fontSize:12
    },
    error:{
        fontSize:12
    },
    no_code:{
        fontSize:12
    },
    back_icon:{
        width:14,
        height:14,
        resizeMode:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Emaillogin=()=>{

    const [email,setEmail]=useState("");
    const [error,setError]=useState<undefined|string>()
    const [screen,setScreen]=useState<"request-otp"|"verify-otp">("request-otp")
    const scrollRef=useRef()
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const verify_email=async (otp:string,data:{ email: string })=>{
        let deviceToken=await SecureStore.getItemAsync(secureStoreKeys.DEVICE_TOKEN);
        console.log("DT",deviceToken);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("verify-user","POST"),
            reqType: "POST",
            routeType:"public",
            body:{email:data.email,otp:otp,type:"email"}
        })
        //console.log("resss",res);
        if(res.success)
        {
            navigate({type:"Login"})
        }
        return res
    }

    const request_otp=async ()=>{
        setError(undefined);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("login","POST"),
            reqType:"POST",
            routeType:"public",
            body:{email:email}
        })
        console.log("login res",res);
        res.success?setScreen("verify-otp"):setError(res.message);
        return res.success;
    }

    useEffect(()=>{
        console.log(dimensions,scrollRef);
        (dimensions && scrollRef.current)?scrollRef.current.scrollTo({x:screen=="request-otp"?0:dimensions.width,animated:true}):null
    },[screen])

    useEffect(()=>{
        SecureStore.getItemAsync(secureStoreKeys.DEVICE_TOKEN).then((deviceToken)=>console.log("DT",deviceToken));
        addToBasket("verification-callback",{callback:verify_email});
    },[])


    return(
        <View style={[{flex:1,paddingTop:25},appStandardStyles.screenMarginSmall]} onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false} ref={scrollRef} horizontal pagingEnabled style={{flex:1}}>
                <View style={{width:dimensions.width,gap:30}}>
                    <View style={{flexDirection:"column",gap:15}}>
                        <Styledtext styles={[styles[Device].enter_text,{fontFamily:Fonts.NeutrifStudio.Medium}]} focusWord="Email" text="Please enter your Email id"/>
                        <View style={{gap:10,flexDirection:"column"}}>
                            <TextInput returnKeyType="next" autoCapitalize="none" onChangeText={(txt)=>setEmail(txt)} value={email} placeholder="Ex. user@gmail.com" style={[styles[Device].email,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)},{borderWidth:1,borderColor:"#E3E3E3",padding:10,borderRadius:5}]}/>
                            {
                                error
                                ?
                                <Transitionview effect="fade"><Text style={[styles[Device].error,{alignSelf:"flex-start"},{fontFamily:Fonts.NeutrifStudio.Regular,color:"red"}]}>{error}</Text></Transitionview>
                                :
                                null
                            }
                            {
                                validations.EMAIL.regex.test(email)
                                ?
                                <Transitionview effect="fade"><Pressable onPress={()=>setScreen("verify-otp")}><Text style={[styles[Device].already_text,{alignSelf:"flex-end"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Already have an OTP?</Text></Pressable></Transitionview>
                                :
                                null
                            }
                        </View>
                    </View>
                    {
                        validations.EMAIL.regex.test(email)
                        ?
                        <Transitionview effect="zoom">
                            <View style={{width:"50%",alignSelf:"center"}}><Asynchronousbutton idleText="Request OTP" successText="Success!" failureText="Failed" callback={request_otp}/></View>
                            {/* <Pressable style={[GeneralStyles.request_otp_wrapper]} onPress={request_otp}><Text style={[{alignSelf:"center"},{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Request OTP</Text></Pressable> */}
                        </Transitionview>
                        :
                        null
                    }
                </View>
                <View style={{width:dimensions.width}}>
                    <View style={{flexDirection:"row",alignItems:'center',gap:5}}>
                        <Image source={back_icon} style={[styles[Device].back_icon,{opacity:0.5}]}/>
                        <Pressable onPress={()=>{setScreen("request-otp")}}><Text style={[styles[Device].no_code,{alignSelf:"flex-start"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Don't have a code?</Text></Pressable>
                    </View>
                    <View style={{flex:1}}>
                    {
                        validations.EMAIL.regex.test(email) && !error
                        ?
                        <Verifyuser type="email" data={{email:email}}/>
                        :
                        null
                    }  
                    </View>
                </View>
            </ScrollView>
            :
            null
        }
        </View>
    )
}

export default Emaillogin