import { useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Event, ListItem, ServerResponse } from "../../types"
import { Word2Sentence, getDevice, getServerRequestURL, serverRequest } from "../../utils"
import { validations } from "../../utils/validations"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes, secureStoreKeys } from "../../constants"
import Form from "../resources/Form"
import * as SecureStore from 'expo-secure-store'
import airplane from '../../assets/images/props/airplane.png'
import girlPeek_image from '../../assets/images/misc/girl-peek.png'
import passport from '../../assets/images/props/passport.png'
import logo from '../../assets/images/logo.png'
import { addToBasket, removeFromBasket } from "../../constants/basket"
import Listselection from "../resources/Listselection"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        padding:10
    },
    header_wrapper:{
        padding:0,
        position:"relative",
        display:"flex",
        justifyContent:"center",
        alignItems:'center'

    },
    header_wrapper_bg:{
        position:"absolute",
        padding:20,
        top:0,
        left:0,
        height:"125%",
        width:"100%",
        zIndex:-1
    },
    header_subwrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        padding:30,
        backgroundColor:'red'
    },
    name_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"flex-start",
        gap:5
    },
    dp_wrapper:{
        display:"flex",
        position:"relative"
    },
    dp_bg:{
        position:"absolute",
        zIndex:-1,
        borderRadius:100
    },
    body_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        padding:20,
        gap:20,
        backgroundColor:'white',
        borderRadius:30,
        zIndex:1
    },
    actions_wrapper:{
        display:"flex",
        flexDirection:"column",
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    girl_peek:{
        width:80,
        height:80,
        top:-62,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    }
})

const TabStyles=StyleSheet.create({
    header_wrapper:{
        height:125,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    login:{
        fontSize:26
    },
    forgot:{
        fontSize:12
    },
    noaccount:{
        fontSize:14
    },
    logo:{
        width: 175,
        resizeMode: "contain"
    },
    airplane:{
        width:40,
        height:40,
        top:-25,
        left:-80,
        resizeMode:"contain"
    },
    passport:{
        width:26,
        height:26,
        top:35,
        left:210,
        resizeMode:"contain"
    },
    girl_peek:{
        width:80,
        height:80,
        top:-62,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    header_wrapper:{
        height:100,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    dp:{
        width:50,
        height:50,
        resizeMode:"contain"
    },
    dp_bg:{
        width:50,
        height:50,
        top:-5,
        left:10
    },
    meeting_heading:{
        fontSize:14
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    add_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    login:{
        fontSize:24
    },
    forgot:{
        fontSize:12
    },
    noaccount:{
        fontSize:14
    },
    logo:{
        width: 150,
        resizeMode: "contain"
    },
    airplane:{
        width:40,
        height:40,
        top:-25,
        left:-75,
        resizeMode:"contain"
    },
    passport:{
        width:30,
        height:30,
        top:25,
        left:185,
        resizeMode:"contain"
    },
    girl_peek:{
        width:70,
        height:70,
        top:-54,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    header_wrapper:{
        height:100,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    login:{
        fontSize:24
    },
    forgot:{
        fontSize:12
    },
    noaccount:{
        fontSize:14
    },
    logo:{
        width: 175,
        resizeMode: "contain"
    },
    airplane:{
        width:50,
        height:50,
        top:-25,
        left:-80,
        resizeMode:"contain"
    },
    passport:{
        width:30,
        height:30,
        top:35,
        left:210,
        resizeMode:"contain"
    },
    girl_peek:{
        width:80,
        height:80,
        top:-62,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    header_wrapper:{
        height:125,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    login:{
        fontSize:26
    },
    forgot:{
        fontSize:12
    },
    noaccount:{
        fontSize:14
    },
    logo:{
        width: 175,
        resizeMode: "contain"
    },
    airplane:{
        width:40,
        height:40,
        top:-25,
        left:-80,
        resizeMode:"contain"
    },
    passport:{
        width:26,
        height:26,
        top:35,
        left:210,
        resizeMode:"contain"
    },
    girl_peek:{
        width:80,
        height:80,
        top:-62,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Gettoken=(props:{auth:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [errors,setErrors]=useState<{id:string,error:string}>();
    const tabs=useRef([{label:"Email",value:"email"},{label:"Phone",value:"phone"}]).current
    const [loginType,setLoginType]=useState("email");

    const openSignup=()=>{
        navigate?navigate({type:"Register"}):null
        setTimeout(()=>{
            navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Login"}}):null
        },200)
    }

    const openForgotPassword=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Forgotpassword"}}}):null
    }


    const tabSelected=(tab:ListItem[])=>{
        console.log("tab",tab[0].value)
        setLoginType(tab[0].value);
    }

    const login_email=(data:{email:string})=>{
        addToBasket("verification-callback",{callback:verify_email})
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Verifyuser",flyerdata:{type:"email",data:{email:data.email},callback:verify_email}}}}):null
    }

    const login_phone=(data:{phone:{countryCode:string,phoneNumber:string}})=>{
        addToBasket("verification-callback",{callback:verify_phone})
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Verifyuser",flyerdata:{type:"phone",data:{phone:data.phone}}}}}):null
    }

    const verify_email=async (otp:string,data:{ email: string })=>{
        
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("verify-user","POST"),
            reqType: "POST",
            routeType:"public",
            body:{email:data.email,otp:otp,type:"email"}
        })
        // if(res.success)
        // {
        //     navigate({type:"RemoveSpecificScreen",payload:{id:"Verifyloginotp"}})
        //     navigate({type:"Login"})
        // }
        if(res.success)
        {
            //navigate({type:"RemoveSpecificScreen",payload:{id:"Verifyuser"}})
            navigate({type:"Login"})
        }
        //res.success?navigate({type:""}):null
        return res.success
    }

    const verify_phone=async (otp:string,data:{ phone: { countryCode: string; number: string } })=>{
        console.log("phone veeeee",otp,data)
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("verify-user","POST"),
            reqType: "POST",
            routeType:"public",
            body:{...data.phone,otp:otp,type:"phone"}
        })
        // if(res.success)
        // {
        //     navigate({type:"RemoveSpecificScreen",payload:{id:"Verifyloginotp"}})
        //     navigate({type:"Login"})
        // }
        if(res.success)
        {
            //navigate({type:"RemoveSpecificScreen",payload:{id:"Verifyuser"}})
            navigate({type:"Login"})
        }
        //res.success?navigate({type:""}):null
        return res.success
    }

    useEffect(()=>{
        addToBasket("login_phone",{callback:login_phone})
        addToBasket("login_email",{callback:login_email})
        
        // return ()=>{
        //     removeFromBasket("login_phone")
        //     removeFromBasket("login_email")
        // }
    },[loginType])

    //console.log("current tab",loginType);

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.body_wrapper,{position:"relative"}]}>
                {/* <Image style={[styles[Device].girl_peek,{position:"absolute"}]} source={girlPeek_image}/> */}
                <Listselection
                    direction="horizontal"
                    selectionStyle="background"
                    initialSelection={[tabs[0]]}
                    blurUnSelected={true}
                    styles={{contentcontainer:{gap:10}}}
                    onselection={tabSelected}
                    options={{
                        list:tabs,
                        idExtractor:(data:ListItem)=>data.label,
                        labelExtractor:(data:any)=>data.label,
                        selectionMode:"single"
                    }}
                />
                {
                    loginType=="email"
                    ?
                    <Form key="email" formid="Login_email" formbasket="login_email"/>
                    :
                    <Form key="phone" formid="Login_phone" formbasket="login_phone"/>
                }
            </View>
        </View>
    )
}

export default Gettoken