import { useEffect, useRef, useState } from "react"
import { Animated, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { Phone, ServerResponse } from "../../types"
import { useAppSelector } from "../../hooks/useAppSelector"
import { store } from "../../store"
import { Word2Sentence, getServerRequestURL, profileUpdator, serverRequest } from "../../utils"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"

const Phoneverification=()=>{

    const phone=useRef(getBasket("phonenumber")).current
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

    const updatePhone=async ()=>{
        let res:ServerResponse=await profileUpdator({phone:props.phone},(res)=>res.success?store.dispatch(setSharedInfo({...store.getState().sharedinfo.data,phone:props.phone})):null)
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
        requestRes.success?props.setPage(1):null
        setIsLoading(false)
    }

    return(
        <View style={{flex:1,padding:1}}>
            <Text>{Word2Sentence([props.phone.countryCode,props.phone.number],""," ")}</Text>
            <Pressable onPress={!isLoading?handler:null}>
            {
                !isLoading
                ?
                <Text>Request for OTP</Text>
                :
                <Image source={loading_gif} style={{width:20,height:20,resizeMode:"contain"}}/>
            }
            </Pressable>
            <Pressable onPress={()=>props.setPage(1)}><Text>Already have a verification code?</Text></Pressable>
        </View>
    )
}

const Verifyotp=(props:{setPage:any,setStatus:any})=>{

    const [request,setRequest]=useState<ServerResponse>()
    const [otp,setOtp]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [path,navigate]=useNavigation()

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
        <View style={{flex:1}}>
            <TextInput style={{borderBottomWidth:0.5}} placeholder="Enter the OTP" value={otp} onChangeText={(txt)=>setOtp(txt)}></TextInput>
            <Pressable onPress={!isLoading?verifyOtp:null}>
            {
                !isLoading
                ?
                <Text>Verify</Text>
                :
                <Image source={loading_gif} style={{width:20,height:20,resizeMode:"contain"}}/>
            }
            </Pressable>
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

export default Phoneverification