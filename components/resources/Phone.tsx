import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Countrycode, Dropdown as DropdownType, ServerResponse} from "../../types"
import Dropdown from "./Dropdown"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"
import { useRef, useState } from "react"
import { Word2Sentence, getDevice, getServerRequestURL, serverRequest } from "../../utils"
import { addToBasket } from "../../constants/basket"
import { Image } from "expo-image"
import verified_icon from '../../assets/images/misc/verified.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { Verified } from "../../store/slices/verificationSlice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { validations } from "../../utils/validations"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        padding:10
    },
    sub_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        alignItems:'center',
        gap:10,
    },
    verify_wrapper:{
        alignSelf:"center",
        borderWidth:1,
        borderRadius:20
    }
})

const TabStyles=StyleSheet.create({
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
        fontSize:14
    },
    verified_icon:{
        width:16,
        height:16,
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

const Phone=(props:{codes:DropdownType,id:string,value:{countryCode:Countrycode[],phoneNumber:string,verified:boolean}})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const dispatch=useAppDispatch();

    const phoneInput=(number:string)=>{
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:{...props.value,phoneNumber:number}}}}):null
    }

    const openVerification=()=>{
        addToBasket("phonenumber",{countryCode:props.value.countryCode[0].dial_code,number:props.value.phoneNumber})
        navigate?navigate({type:"AddScreen",payload:{screen:"Phoneverification"}}):null
    }

    const verify=()=>{
        if(props.value.phoneNumber && props.value.countryCode)
        {
            let validationData=validations.PHONENUMBER
            if(!validationData.regex.test(props.value.phoneNumber))
            {
                //setError(validationData.errorMessage)
            }
            else{
                //setError(undefined)
                requestOtp();
            }
        }
        else{
            //setError("Email cannot be empty")
        }
    }

    const requestOtp=async ()=>{
        setIsLoading(true)
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("add-phone/email","POST"),
            reqType: "POST",
            body:{
                phoneNumber:props.value.phoneNumber, 
                countryCode:props.value.countryCode[0].dial_code
            }    
        });
        console.log("phone res",res)
        //!res.success?setError("Something went wrong"):setMessage("Verification link has been sent to your email");
        addToBasket("verification-callback",{callback:verifyOtp})
        res.success?navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Verifyuser",flyerdata:{type:"phone",data:{phone:{countryCode:props.value.countryCode[0].dial_code,phoneNumber:props.value.phoneNumber}}}}}}):null:null
        setIsLoading(false);
        return res
    }

    const verifyOtp=async (otp:string,data:any)=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("verify-otp","POST"),
            reqType: "POST",
            body:{
                otp:otp,
                type:"phone"
            }    
        });
        if(res.success)
        {
            dispatch(Verified("phone"));
            navigate({type:"RemovePages",payload:[{id:"Form"},{id:"Flyer"}]});
        }
        console.log("res",JSON.stringify(res,null,2));
        return res;
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
        {
            !props.value.verified
            ?
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={{flex:2}}><Dropdown {...props.codes} value={props.value.countryCode} id={props.id}/></View>
                <View style={[{flex:5,padding:10,flexDirection:"row"},!props.value.verified?{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}:{}]}>
                    <TextInput style={[styles[Device].text,{flex:1,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]} onChangeText={(txt)=>phoneInput(txt)} value={props.value.phoneNumber}/>
                    <Pressable onPress={!isLoading?verify:null} style={[GeneralStyles.verify_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}>
                    {
                        isLoading
                        ?
                        <Image source={loading_gif} style={{width:15,height:15,resizeMode:"contain"}}/>
                        :
                        <Text  style={[styles[Device].verify,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>Verify</Text>
                    }
                    </Pressable>
                    {/* <Pressable onPress={openVerification} style={[GeneralStyles.verify_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}><Text style={[styles[Device].verify,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>Verify</Text></Pressable> */}
                </View>
            </View>
            :
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={{flex:1}}><Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{Word2Sentence([props.value.countryCode[0].dial_code,props.value.phoneNumber],""," ")}</Text></View>
                <Image source={verified_icon} style={[styles[Device].verified_icon]}></Image>
            </View>
        }
        </View>
    )
}

export default Phone