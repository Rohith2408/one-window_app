import { useEffect, useRef, useState } from "react"
import { Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Phone, ServerResponse } from "../../types"
import { useAppSelector } from "../../hooks/useAppSelector"
import { store } from "../../store"
import { Word2Sentence, getDevice, getServerRequestURL, profileUpdator, serverRequest } from "../../utils"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    },
    scroll_wrapper:{
        width:"100%",
        height:"100%",
        padding:20
    },
    request_otp_wrapper:{
        flex:1,
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:'center',
        gap:14
    }
})

const TabStyles=StyleSheet.create({

})

const MobileSStyles=StyleSheet.create({
    phone_number:{
        fontSize:18
    },
    request_otp_text:{
        fontSize:16
    },
    already_text:{
        fontSize:14
    },
    verification_status:{
        fontSize:24
    }
})

const MobileMStyles=StyleSheet.create({
    phone_number:{
        fontSize:24
    },
    request_otp_text:{
        fontSize:16
    },
    already_text:{
        fontSize:14
    },
    otp_input:{
        fontSize:24
    },
    verify_button:{
        fontSize:16
    },
    no_code:{
        fontSize:14
    },
    verification_status:{
        fontSize:24
    }
})

const MobileLStyles=StyleSheet.create({

})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Phoneverification=()=>{

    const phone=useRef(getBasket("phonenumber")).current
    const [page,setPage]=useState(0)
    const ref=useRef<any>()
    const [unit,setUnit]=useState<any>();
    const [status,setStatus]=useState<ServerResponse>({success:false,message:"",data:undefined})
    const Device=useRef<keyof typeof styles>(getDevice()).current

    useEffect(()=>{
        (ref.current && unit!=undefined)?ref.current.scrollTo({x:unit*page,animated:true}):null
    },[page,unit])

    return(
        <View onLayout={(e)=>setUnit(e.nativeEvent.layout.width)} style={[GeneralStyles.main_wrapper]}>
            {/* <Text style={{padding:20,alignSelf:"center"}}>Phone number verification</Text> */}
            {
                unit
                ?
                <ScrollView style={[GeneralStyles.scroll_wrapper]} ref={ref} scrollEnabled={false} horizontal contentContainerStyle={{width:(3*unit),justifyContent:'center',alignItems:"center"}}>
                    <Requestotp phone={phone} setPage={setPage}/>
                    <Verifyotp setStatus={setStatus} setPage={setPage}/>
                    <Verifiedotp status={status}/>
                </ScrollView>
                :
                null
            }
        </View>
    )
}

const Requestotp=(props:{phone:Phone,setPage:any})=>{

    const [request,setRequest]=useState<ServerResponse>()
    const [delay,setDelay]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const updatePhone=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("phone","PUT"),
            body:{
                phone: props.phone
            },
            reqType:"PUT"
        })
         //profileUpdator({phone:props.phone},(res)=>res.success?store.dispatch(setSharedInfo({...store.getState().sharedinfo.data,phone:props.phone})):null)
        return res
    }

    const requestOtp=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("otp-request","POST"),
            reqType: "POST",
            body:{type:"phone"}
        })
        return res
    }

    const handler=async ()=>{
        setIsLoading(true);
        let updateRes:ServerResponse=await updatePhone()
        let requestRes:ServerResponse=updateRes.success?await requestOtp():updateRes;
        console.log("otp request",updateRes,requestRes);
        requestRes.success?props.setPage(1):null
        setIsLoading(false)
    }

    return(
        <View style={[GeneralStyles.request_otp_wrapper]}>
            <Text style={[styles[Device].phone_number,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.phone.countryCode,props.phone.number],""," ")}</Text>
            <Pressable style={{borderWidth:1,borderRadius:15,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={!isLoading?handler:null}>
            {
                !isLoading
                ?
                <Text style={[styles[Device].request_otp_text,{padding:10,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Request for OTP</Text>
                :
                <Image source={loading_gif} style={{width:20,height:20,resizeMode:"contain"}}/>
            }
            </Pressable>
            <Pressable onPress={()=>props.setPage(1)}><Text style={[styles[Device].already_text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Already have a verification code?</Text></Pressable>
        </View>
    )
}

const Verifyotp=(props:{setPage:any,setStatus:any})=>{

    const [request,setRequest]=useState<ServerResponse>()
    const [otp,setOtp]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const verifyOtp=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("otp-verify","POST"),
            reqType:"POST",
            body:{otp:otp}
        })
        props.setStatus(res);
        res.success?props.setPage(2):null
        res.success?setTimeout(()=>{
            navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"phone",newvalue:{...getBasket("phone"),verified:true}}}}):null
            navigate?navigate({type:"RemoveScreen"}):null
        },1000):null
        setIsLoading(false);
        return res
    }

    return(
        <View style={[GeneralStyles.request_otp_wrapper]}>
            <TextInput style={[styles[Device].otp_input,{width:"80%",borderBottomWidth:1,borderBottomColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]} placeholder="Enter the OTP" value={otp} onChangeText={(txt)=>setOtp(txt)}></TextInput>
            <Pressable style={{borderWidth:1,borderRadius:15,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}onPress={!isLoading?verifyOtp:null}>
            {
                !isLoading
                ?
                <Text style={[styles[Device].request_otp_text,{padding:10,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Verify</Text>
                :
                <Image source={loading_gif} style={{width:20,height:20,resizeMode:"contain"}}/>
            }
            </Pressable>
            <Pressable onPress={()=>props.setPage(0)}><Text style={[styles[Device].already_text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Don't have a verification code?</Text></Pressable>
        </View>
    )
}

const Verifiedotp=(props:{status:ServerResponse})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.request_otp_wrapper]}>
            <Text style={[styles[Device].verification_status,{fontFamily:Fonts.NeutrifStudio.Bold,color:props.status.success?"green":"red"}]}>{"Verification Succesfull"}</Text>
        </View>
    )

}

export default Phoneverification