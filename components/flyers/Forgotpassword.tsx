import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import { Request, ServerResponse } from "../../types"
import { useEffect, useRef, useState } from "react"
import { getDevice, getServerRequestURL, serverRequest, setWordCase } from "../../utils"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import useNavigation from "../../hooks/useNavigation"
import { addToBasket, getBasket } from "../../constants/basket"
import { validations } from "../../utils/validations"

const initialState:Request<null>={
    requestStatus:"not_initiated" ,
    responseStatus: "not_recieved",
    haveAnIssue:false,
    issue:"",
    data:null
}

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
        gap:20
    }
})

const TabStyles=StyleSheet.create({

})

const MobileSStyles=StyleSheet.create({
    email:{
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
    email:{
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

// const Forgotpassword=()=>{

//     const Device=useRef(getDevice()).current
//     const [email,setEmail]=useState("")
//     const [request,setRequest]=useState<Request<null>>(initialState)
//     const [path,navigate]=useNavigation()
    
//     const requestOtp=async ()=>{
//         setRequest({...initialState,requestStatus:"initiated"})
        // let res:ServerResponse=await serverRequest({
        //     url:getServerRequestURL("forgot-password-getcode","POST"),
        //     reqType:"POST",
        //     routeType:"public",
        //     body:{
        //         email:email
        //     }
        // })
//         console.log("RESS",res)
//         if(res.success)
//         {
//             addToBasket("Forgotpassword",{email:email})
//             navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
//             navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Forgotpassword",forminitialdataid:"Forgotpassword"}}}):null
//         }
//         setRequest({...request,requestStatus:"initiated",responseStatus:"recieved",haveAnIssue:!res.success,issue:!res.success?setWordCase(res.message):"Code sent successfully , please check you email!"})
//         setTimeout(()=>{
//             setRequest(initialState)
//         },2000)
//     }

//     return(
//         <View style={[GeneralStyles.wrapper]}>
//             <TextInput autoCapitalize="none" value={email} onChangeText={(txt:string)=>setEmail(txt)} placeholder="Enter your registered email..." style={[GeneralStyles.email,styles[Device].email,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:15,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}></TextInput>
//             <Pressable onPress={requestOtp}>
//             {
//                 request.requestStatus=="initiated"
//                 ?
//                     request.responseStatus=="recieved"
//                     ?
//                     <Text style={[styles[Device].response_text,{color:request.haveAnIssue?"red":"green",fontFamily:Fonts.NeutrifStudio.Regular}]}>{request.issue}</Text>
//                     :
//                     <Image style={[styles[Device].loader]} source={loading_gif}/>
//                 :
//                 <Text style={[styles[Device].verification_text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Request for verification code</Text>
//             }
//             </Pressable>
//         </View>
//     )

// }

const Forgotpassword=()=>{

    //const phone=useRef(getBasket("phonenumber")).current
    const [page,setPage]=useState(0)
    const ref=useRef<any>()
    const [unit,setUnit]=useState<any>();
    const [status,setStatus]=useState<ServerResponse>({success:false,message:"",data:undefined})
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const email=useRef("");

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
                    <Requestotp setEmail={(txt:string)=>email.current=txt} setPage={setPage}/>
                    <Verifyotp email={email.current} setStatus={setStatus} setPage={setPage}/>
                    <Verifiedotp status={status}/>
                </ScrollView>
                :
                null
            }
        </View>
    )
}

const Requestotp=(props:{setPage:any,setEmail:any})=>{

    const [request,setRequest]=useState<ServerResponse>()
    const [delay,setDelay]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [email,setEmail]=useState("");
    const [error,setError]=useState<string|undefined>("");

    const requestOtp=async ()=>{
        console.log("forgot",email);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("forgot-password-getcode","POST"),
            reqType:"POST",
            routeType:"public",
            body:{
                email:email
            }
        })
        return res
    }

    const handler=async ()=>{
        setIsLoading(true);
        //let updateRes:ServerResponse=await updatePhone()
        let requestRes:ServerResponse=await requestOtp()
        console.log("otp request",requestRes);
        requestRes.success?props.setEmail(email):null
        requestRes.success?props.setPage(1):null
        setIsLoading(false)
    }

    const emailInput=(txt:string)=>{
        setEmail(txt)
        let emailValidationData=validations.EMAIL
        let emailValidation=emailValidationData.regex.test(txt);
        //console.log(emailValidation)
        setError(!emailValidation?emailValidationData.errorMessage:undefined)
    }

    const alreadyHasCode=()=>{
        props.setEmail(email)
        props.setPage(1)
    }

    return(
        <View style={[GeneralStyles.request_otp_wrapper]}>
            <TextInput placeholder="Enter your email" onChangeText={(text)=>emailInput(text)} style={[styles[Device].email,{borderBottomWidth:1,width:"85%",borderBottomColor:Themes.Light.OnewindowPrimaryBlue(1)},{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}/>
            {
                error!=undefined
                ?
                <Text style={{fontFamily:Fonts.NeutrifStudio.Medium,fontSize:14,color:"red"}}>{error}</Text>
                :
                null
            }
            {
                error==undefined
                ?
                <View style={{gap:15}}>
                    <Pressable style={{alignSelf:"flex-start",borderWidth:1,borderRadius:15,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={!isLoading?handler:null}>
                    {
                        !isLoading
                        ?
                        <Text style={[styles[Device].request_otp_text,{padding:10,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Request for OTP</Text>
                        :
                        <Image source={loading_gif} style={{width:20,height:20,resizeMode:"contain"}}/>
                    }
                    </Pressable>
                    <Pressable onPress={alreadyHasCode}><Text style={[styles[Device].already_text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Already have a verification code?</Text></Pressable>
                </View>
                :
                null
            }

        </View>
    )
}

const Verifyotp=(props:{setPage:any,setStatus:any,email:string})=>{

    const [request,setRequest]=useState<ServerResponse>()
    const [otp,setOtp]=useState("")
    const [password,setPassword]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const verifyOtp=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("reset-password","POST"),
            reqType:"POST",
            routeType:"public",
            body:{
            otp:otp,
            email:props.email,
            password:password
            
        }})
        console.log("reset res",JSON.stringify(res,null,2))
        props.setStatus(res);
        res.success?props.setPage(2):null
        // res.success?setTimeout(()=>{
        //     navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"phone",newvalue:{...getBasket("phone"),verified:true}}}}):null
        //     navigate?navigate({type:"RemoveScreen"}):null
        // },1000):null
        setIsLoading(false);
        return res
    }

    return(
        <View style={[GeneralStyles.request_otp_wrapper]}>
            <TextInput style={[styles[Device].otp_input,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold,width:"80%",borderBottomWidth:1,borderBottomColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]} placeholder="Enter the OTP" value={otp} onChangeText={(txt)=>setOtp(txt)}></TextInput>
            <TextInput style={[styles[Device].otp_input,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold,width:"80%",borderBottomWidth:1,borderBottomColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]} placeholder="Enter your new password" value={password} onChangeText={(txt)=>setPassword(txt)}></TextInput>
            <Pressable style={{borderWidth:1,borderRadius:15,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}onPress={!isLoading?verifyOtp:null}>
            {
                !isLoading
                ?
                <Text style={[styles[Device].request_otp_text,{padding:10,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Reset Password</Text>
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
            <Text style={[styles[Device].verification_status,{fontFamily:Fonts.NeutrifStudio.Bold,color:props.status.success?"green":"red"}]}>
                {props.status.success?"Password Reset Successfull":"Password Reset Failed"}
            </Text>
        </View>
    )

}

export default Forgotpassword