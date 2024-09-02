import { useEffect, useRef, useState } from "react"
import { Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { ServerResponse } from "../../types"
import { useAppSelector } from "../../hooks/useAppSelector"
import { store } from "../../store"
import { getServerRequestURL, profileUpdator, serverRequest } from "../../utils"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import loading_gif from '../../assets/images/misc/loader.gif'

const Emailverification=(props:{email:string})=>{

    const [page,setPage]=useState(0)
    const ref=useRef<any>()
    const [unit,setUnit]=useState<any>();
    const [status,setStatus]=useState<ServerResponse>({success:false,message:"",data:undefined})

    useEffect(()=>{
        (ref.current && unit!=undefined)?ref.current.scrollTo({x:unit*page,animated:true}):null
    },[page,unit])

    return(
        <View onLayout={(e)=>setUnit(e.nativeEvent.layout.width)} style={{flex:1,padding:0,paddingTop:30}}>
            {
                unit
                ?
                <ScrollView ref={ref} scrollEnabled={false} horizontal contentContainerStyle={{width:(3*unit)}}>
                    <Requestotp email={props.email} setPage={setPage}/>
                    <Verifyotp setPage={setPage}/>
                    <Verifiedotp status={status}/>
                </ScrollView>
                :
                null
            }
        </View>
    )
}

const Requestotp=(props:{email:string,setPage:any})=>{

    const [email,setEmail]=useState(props.email);
    const [request,setRequest]=useState<ServerResponse>()
    //const email=useAppSelector((state)=>state.sharedinfo.data?.email);
    const [delay,setDelay]=useState(0)

    const updateEmail=async ()=>{
        let res:ServerResponse=await profileUpdator({email:props.email},(res)=>res.success?store.dispatch(setSharedInfo({_id:res.data._id,
            firstName:res.data.firstName,
            lastName:res.data.lastName,
            email:res.data.email,
            displayPicSrc:res.data.displayPicSrc?res.data.displayPicSrc:"",
            phone:res.data.phone,
            LeadSource:res.data.LeadSource})):null)
    }

    const requestOtp=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("otp-request","POST"),
            reqType: "POST",
            body:{type:"email"}
        })
        res.success?props.setPage(1):null
        return res
    }

    return(
        <View style={{flex:1,padding:1}}>
            <TextInput value={email} onChangeText={(txt)=>setEmail(txt)}></TextInput>
            <Pressable onPress={requestOtp}><Text>Request for OTP</Text></Pressable>
            <Pressable onPress={()=>props.setPage(1)}><Text>Already have a verification code?</Text></Pressable>
        </View>
    )
}

const Verifyotp=(props:{setPage:any})=>{

    const [request,setRequest]=useState<ServerResponse>()
    const [otp,setOtp]=useState("")

    const verifyOtp=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("otp-verify","POST"),
            reqType: "POST",
            body:{type:"email"}
        })
        res.success?props.setPage(2):null
        return res
    }

    return(
        <View style={{flex:1}}>
            <TextInput style={{borderBottomWidth:0.5}} placeholder="Enter the OTP" value={otp} onChangeText={(txt)=>setOtp(txt)}></TextInput>
            <Pressable onPress={verifyOtp}><Text>Verify</Text></Pressable>
            <Pressable onPress={()=>props.setPage(0)}><Text>Don't have a verification code?</Text></Pressable>
        </View>
    )
}

const Verifiedotp=(props:{status:ServerResponse})=>{

    return(
        <View style={{flex:1}}>
            <Text style={{backgroundColor:props.status.success?"green":"red"}}>{props.status.message}</Text>
        </View>
    )

}

export default Emailverification