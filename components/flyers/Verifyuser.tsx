import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Phone, ServerResponse } from "../../types"
import { getDevice, getServerRequestURL, replaceCharacters, serverRequest } from "../../utils"
import { useEffect, useRef, useState } from "react"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import { getBasket } from "../../constants/basket"
import Styledtext from "../resources/Styledtext"
import Transitionview from "../resources/Transitionview"

type idData = 
  | { phone: { countryCode: string; number: string } }
  | { email: string }

  const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:10,
        paddingTop:10,
        paddingBottom:30,
        gap:30
    },
    heading:{
        flexWrap: 'wrap'
    },
    error:{
        fontSize:14
    }
})

const TabStyles=StyleSheet.create({
    heading:{
        fontSize:24,
        lineHeight:28
    },
    otp:{
        fontSize:22
    },
    error:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    heading:{
        fontSize:16,
        lineHeight:28
    },
    otp:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    heading:{
        fontSize:18,
        lineHeight:28
    },
    otp:{
        fontSize:16
    },
    error:{
        fontSize:12
    }
})

const MobileLStyles=StyleSheet.create({
    heading:{
        fontSize:18,
        lineHeight:28
    },
    otp:{
        fontSize:16
    },
    error:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Verifyuser=(props:{type:"mobile"|"email",data:idData,callback:(otp:string,data:idData)=>ServerResponse})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [otp,setOtp]=useState("")
    const [error,setError]=useState<undefined|string>()
    const [path,navigate]=useNavigation()
    const otpLength=useRef(6).current
    console.log("verify user props",props);

    const verify=async ()=>{
        let res:ServerResponse=await getBasket("verification-callback").callback(otp,props.data);
        !res.success?setError(res.message):null
        return res.success
    }

    useEffect(()=>{
        otp.length==otpLength?verify():null
    },[otp])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={{flexDirection:"column",gap:10}}>
                <Styledtext styles={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} focusWord="enter the otp" text={"Please enter the otp sent to "+ (props.type=="email"?replaceCharacters(props.data.email,3,props.data.email.length-3,"*").substring(0,10):replaceCharacters(props.data.phone.phoneNumber,3,props.data.phone.phoneNumber.length-2,"*").substring(0,10))}/>
                <View style={{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}><TextInput maxLength={otpLength} placeholder="Ex. 999999" style={[styles[Device].otp,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)},{borderWidth:0,borderColor:"#E3E3E3",padding:10}]} onChangeText={(txt)=>{txt.length<=otpLength?setOtp(txt):setOtp(otp)}}></TextInput></View>
                {
                    error
                    ?
                    <Transitionview effect="fade"><Text style={[styles[Device].error,{alignSelf:"flex-start"},{fontFamily:Fonts.NeutrifStudio.Regular,color:"red"}]}>{error}</Text></Transitionview>
                    :
                    null
                }
            </View>
            {
                otp.length==otpLength
                ?
                <View style={{alignSelf:"center",width:"50%"}}><Asynchronousbutton idleText="Verify" successText="Success!" failureText="Failed" callback={verify}/></View>
                // <Pressable onPress={verify}><Text>Verify</Text></Pressable>
                :
                null
            }
        </View>
    )
}

export default Verifyuser