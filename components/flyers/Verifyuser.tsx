import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Phone, ServerResponse } from "../../types"
import { getDevice, getServerRequestURL, replaceCharacters, serverRequest } from "../../utils"
import { useRef, useState } from "react"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import { getBasket } from "../../constants/basket"

type idData = 
  | { phone: { countryCode: string; number: string } }
  | { email: string }

  const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:10,
        paddingTop:20,
        paddingBottom:30,
        gap:25
    },
    heading:{
        flexWrap: 'wrap'
    }
})

const TabStyles=StyleSheet.create({
    heading:{
        fontSize:20,
        lineHeight:28
    },
    otp:{
        fontSize:18
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
        fontSize:17,
        lineHeight:28
    },
    otp:{
        fontSize:15
    }
})

const MobileLStyles=StyleSheet.create({
    heading:{
        fontSize:18,
        lineHeight:28
    },
    otp:{
        fontSize:16
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
    const [path,navigate]=useNavigation()
    const otpLength=useRef(6).current
    console.log("verify user props",props);

    const verify=async ()=>{
        let res:ServerResponse=await getBasket("verification-callback").callback(otp,props.data);
        return res.success
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <Text style={[GeneralStyles.heading,styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Please enter the otp sent to {props.type=="email"?replaceCharacters(props.data.email,3,props.data.email.length-3,"*"):replaceCharacters(props.data.phone.phoneNumber,3,props.data.phone.phoneNumber.length-2,"*")}</Text>
            <View style={{flex:1}}><TextInput placeholder="OTP" style={[styles[Device].otp,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)},{borderBottomWidth:1,borderBottomColor:"#E3E3E3"}]} onChangeText={(txt)=>setOtp(txt)}></TextInput></View>
            {
                otp.length>=otpLength
                ?
                <Asynchronousbutton idleText="Verify" successText="Success!" failureText="Failed" callback={verify}/>
                // <Pressable onPress={verify}><Text>Verify</Text></Pressable>
                :
                null
            }
        </View>
    )
}

export default Verifyuser