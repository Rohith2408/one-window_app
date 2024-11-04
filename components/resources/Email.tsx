import { useRef, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { getDevice, getServerRequestURL, serverRequest, setWordCase } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"
import verified_icon from '../../assets/images/misc/verified.png'
import useNavigation from "../../hooks/useNavigation"
import Textbox from "./Textbox"
import { ServerResponse } from "../../types"
import loading_gif from '../../assets/images/misc/loader.gif'
import { validations } from "../../utils/validations"
import { store } from "../../store"
import { addToBasket } from "../../constants/basket"
import { Verified } from "../../store/slices/verificationSlice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1
    },
    subwrapper:{
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
    text:{
        fontSize:18
    },
    verified_icon:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    verify:{
        fontSize:12
    }
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
    text:{
        fontSize:16
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

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:16
    },
    verified_icon:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    verify:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Email=(props:{value:{email:string|undefined,verified:boolean},placeholder:string,id:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const emailVerificationData=useAppSelector((state)=>state.verification).data?.find((item)=>item.type=="email")
    const [path,navigate]=useNavigation()
    const [message,setMessage]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState<string|undefined>(undefined);
    const dispatch=useAppDispatch()

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
            url:getServerRequestURL("add-phone/email","POST"),
            reqType: "POST",
            body:{
                email:props.value.email,
            }    
        });
        console.log("email res",res)
        res.success?dispatch(setSharedInfo({...store.getState().sharedinfo.data,email:props.value.email})):null
        !res.success?setError(setWordCase(res.message)):setMessage("Verification link has been sent to your email");
        addToBasket("verification-callback",{callback:verifyOtp})
        res.success?navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Verifyuser",flyerdata:{type:"email",data:{email:props.value.email}}}}}):null:null
        setIsLoading(false);
        return res
    }

    const verifyOtp=async (otp:string,data:{ email: string })=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("verify-otp","POST"),
            reqType: "POST",
            body:{
                otp:otp,
                type:"email"
            }    
        });
        if(res.success)
        {
            dispatch(Verified("email"));
            navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:{...props.value,verified:true}}}}):null
            setTimeout(()=>{
                navigate({type:"RemovePages",payload:[{id:"Flyer"}]});
            },100)
        }
        console.log("res",JSON.stringify(res,null,2));
        return res;
    }

    // res {
    //     "success": true,
    //     "message": "verification Successful",
    //     "data": {
    //       "missingFields": [],
    //       "emailLoginOtp": {
    //         "verified": true,
    //         "data": null,
    //         "expiry": "2024-10-04T08:02:59.946Z"
    //       }
    //     }
    //   }

    const verify=()=>{
        if(props.value.email)
        {
            let validationData=validations.EMAIL
            if(!validationData.regex.test(props.value.email))
            {
                setError(validationData.errorMessage)
            }
            else{
                setError(undefined)
                requestOtp();
            }
        }
        else{
            setError("Email cannot be empty")
        }
    }

    const updateEmail=(text:string)=>{
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:{...props.value,email:text}}}}):null
    }




    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.subwrapper,!props.value.verified?{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}:{}]}>
                <View style={{flex:1,gap:7}}>
                {
                    props.value.verified
                    ?
                    <Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.value.email}</Text>
                    :
                    <TextInput placeholder={props.placeholder} onChangeText={(text)=>updateEmail(text)} value={props.value.email} style={{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:0}}></TextInput>
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
                    <Pressable onPress={!isLoading?verify:null} style={[GeneralStyles.verify_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}>
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
            {
                error
                ?
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:"red",padding:10}]}>{error}</Text>
                :
                null
            }
        </View>
    )
}

export default Email