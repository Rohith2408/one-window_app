import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import { Request, ServerResponse } from "../../types"
import { useRef, useState } from "react"
import { getDevice, getServerRequestURL, serverRequest, setWordCase } from "../../utils"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"

const initialState:Request<null>={
    requestStatus:"not_initiated" ,
    responseStatus: "not_recieved",
    haveAnIssue:false,
    issue:"",
    data:null
}

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        gap:20,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    email:{
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        borderWidth:1
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    verification_text:{
        fontSize:12
    },
    response_text:{
        fontSize:12
    },
    email:{
        fontSize:14
    },
    loader:{
        width:18,
        height:18,
        resizeMode:"contain"
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

const Forgotpassword=()=>{

    const Device=useRef(getDevice()).current
    const [email,setEmail]=useState("")
    const [request,setRequest]=useState<Request<null>>(initialState)
    const [path,navigate]=useNavigation()
    
    const requestOtp=async ()=>{
        setRequest({...initialState,requestStatus:"initiated"})
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("forgot-password-getcode","POST"),
            reqType:"POST",
            routeType:"public",
            body:{
                email:email
            }
        })
        console.log("RESS",res)
        if(res.success)
        {
            addToBasket("Forgotpassword",{email:email})
            navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
            navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Forgotpassword",forminitialdataid:"Forgotpassword"}}}):null
        }
        setRequest({...request,requestStatus:"initiated",responseStatus:"recieved",haveAnIssue:!res.success,issue:!res.success?setWordCase(res.message):"Code sent successfully , please check you email!"})
        setTimeout(()=>{
            setRequest(initialState)
        },2000)
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <TextInput autoCapitalize="none" value={email} onChangeText={(txt:string)=>setEmail(txt)} placeholder="Enter your registered email..." style={[GeneralStyles.email,styles[Device].email,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:15,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}></TextInput>
            <Pressable onPress={requestOtp}>
            {
                request.requestStatus=="initiated"
                ?
                    request.responseStatus=="recieved"
                    ?
                    <Text style={[styles[Device].response_text,{color:request.haveAnIssue?"red":"green",fontFamily:Fonts.NeutrifStudio.Regular}]}>{request.issue}</Text>
                    :
                    <Image style={[styles[Device].loader]} source={loading_gif}/>
                :
                <Text style={[styles[Device].verification_text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Request for verification code</Text>
            }
            </Pressable>
        </View>
    )

}

export default Forgotpassword