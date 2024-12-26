import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
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
import banner from '../../assets/images/illustrations/login.png'
import next_icon from '../../assets/images/misc/next.png'
import pie_icon from '../../assets/images/props/pie.png'
import { addToBasket, removeFromBasket } from "../../constants/basket"
import Listselection from "../resources/Listselection"
import Transitionview from "../resources/Transitionview"
import Styledtext from "../resources/Styledtext"
import { googleSignin } from "../../firebaseConfig"
import * as Google from 'expo-auth-session/providers/google';

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1
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
    },
    login_button_wrapper:{
        borderRadius:7.5,
        borderWidth:1.2,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20,
        alignSelf:"stretch"
    }
})

const TabStyles=StyleSheet.create({
    body_wrapper:{
        gap:26
    },
    banner_wrapper:{
        gap:20
    },
    header_wrapper:{
        height:160,
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
        width:250,
        resizeMode: "contain"
    },
    airplane:{
        width:66,
        height:66,
        top:0,
        left:0,
        resizeMode:"contain"
    },
    passport:{
        width:52,
        height:52,
        top:"50%",
        left:"90%",
        resizeMode:"contain"
    },
    girl_peek:{
        width:120,
        height:120,
        top:-93,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    },
    banner:{
        width:400,
        height:400,
        resizeMode:"contain"
    },
    banner_text:{
        fontSize:24,
        lineHeight:38
    },
    next_icon:{
        width:20,
        height:20,
        objectFit:"contain"
    },
    login_text:{
        fontSize:22,
        padding:15
    },
    explore_text:{
        fontSize:20
    }
})

const MobileSStyles=StyleSheet.create({
    body_wrapper:{
        gap:5
    },
    banner_wrapper:{
        gap:20
    },
    header_wrapper:{
        height:85,
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
        width:130,
        resizeMode: "contain"
    },
    airplane:{
        width:44,
        height:44,
        top:0,
        left:0,
        resizeMode:"contain"
    },
    passport:{
        width:30,
        height:30,
        top:"50%",
        left:"90%",
        resizeMode:"contain"
    },
    girl_peek:{
        width:70,
        height:70,
        top:-54,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    },
    banner:{
        width:190,
        height:190,
        resizeMode:"contain"
    },
    banner_text:{
        fontSize:16,
        lineHeight:30
    },
    next_icon:{
        width:14,
        height:14,
        objectFit:"contain"
    },
    login_text:{
        fontSize:14
    },
    explore_text:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    body_wrapper:{
        gap:10
    },
    banner_wrapper:{
        gap:24
    },
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
        width: 150,
        resizeMode: "contain"
    },
    airplane:{
        width:46,
        height:46,
        top:0,
        left:0,
        resizeMode:"contain"
    },
    passport:{
        width:32,
        height:32,
        top:"50%",
        left:"90%",
        resizeMode:"contain"
    },
    girl_peek:{
        width:80,
        height:80,
        top:-62,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    },
    banner:{
        width:230,
        height:230,
        resizeMode:"contain"
    },
    banner_text:{
        fontSize:18,
        lineHeight:34
    },
    next_icon:{
        width:16,
        height:16,
        objectFit:"contain"
    },
    login_text:{
        fontSize:16
    },
    explore_text:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    body_wrapper:{
        gap:5
    },
    banner_wrapper:{
        gap:24
    },
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
        width: 150,
        resizeMode: "contain"
    },
    airplane:{
        width:50,
        height:50,
        top:0,
        left:0,
        resizeMode:"contain"
    },
    passport:{
        width:36,
        height:36,
        top:"50%",
        left:"90%",
        resizeMode:"contain"
    },
    girl_peek:{
        width:80,
        height:80,
        top:-62,
        left:"60%",
        zIndex:-1,
        resizeMode:"contain"
    },
    banner:{
        width:240,
        height:240,
        resizeMode:"contain"
    },
    banner_text:{
        fontSize:18,
        lineHeight:34
    },
    next_icon:{
        width:16,
        height:16,
        objectFit:"contain"
    },
    login_text:{
        fontSize:16
    },
    explore_text:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Loginbase=(props:{auth:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [errors,setErrors]=useState<{id:string,error:string}>();
    const tabs=useRef([{label:"Email",value:"email"},{label:"Phone",value:"phone"}]).current
    const [loginType,setLoginType]=useState("email");
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '231285782629-393b2jhqgsao4j83nhu5j7b7pc99buv7.apps.googleusercontent.com',
      });
    
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
        if(res.success)
        {
            navigate({type:"Login"})
        }
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
        if(res.success)
        {
            navigate({type:"Login"})
        }
        return res.success
    }

    useEffect(()=>{
        addToBasket("login_phone",{callback:login_phone})
        addToBasket("login_email",{callback:login_email})
    },[loginType])

    const emailLogin=()=>{
        // navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Emaillogin"}}})
        navigate({type:"AddScreen",payload:{screen:"Emaillogin"}})
    }

    const phoneLogin=()=>{
        navigate({type:"AddScreen",payload:{screen:"Phonelogin"}})
    }

    const googleLogin=(accessToken)=>{
        googleSignin(accessToken).then((res:ServerResponse)=>navigate(res.success?{type:"Login"}:{type:"AddScreen",payload:{screen:"Error",params:{error:res.message}}})) ;
    }

    const openExplore=async ()=>{
        await SecureStore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,"");
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token, accessToken } = response.params;
            googleLogin(accessToken); 
        }
      }, [response]);

    return(
        <ScrollView style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.header_wrapper,styles[Device].header_wrapper,{position:"relative"}]}>
                <Image source={pie_icon} style={{width:30,height:30,resizeMode:"contain",position:'absolute',top:"30%",left:"10%"}}/>
                <View style={{width:50,height:50,borderRadius:200,backgroundColor:Themes.ExtraLight.OnewindowPurple,transform:[{translateY:-25}],position:'absolute',top:"100%",left:"75%"}}></View>
                <View style={[GeneralStyles.header_wrapper_bg,{backgroundColor:Themes.Light.OnewindowPurple(1)}]}></View>
                {/* <Text style={[styles[Device].login,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Login</Text> */}
            </View>
            <View style={[GeneralStyles.body_wrapper,styles[Device].body_wrapper,{position:"relative"}]}>
                {/* <Image style={[styles[Device].girl_peek,{position:"absolute"}]} source={girlPeek_image}/> */}
                <Transitionview effect="zoom" delay={400}><View style={{alignSelf:'center',margin:20}}><Image style={[styles[Device].logo,{aspectRatio:5}]} source={logo}/></View></Transitionview>
                <View style={{display:"flex",flexDirection:"column",gap:10,position:"relative"}}>
                    <Transitionview effect="pan" delay={300}><Image style={[styles[Device].airplane,{position:"absolute",transform:[{rotate:"-20deg"}]}]} source={airplane}/></Transitionview>
                    <Transitionview effect="pan" delay={300}><Image style={[styles[Device].passport,{position:"absolute",transform:[{rotate:"20deg"}]}]} source={passport}/></Transitionview>
                    <View style={[styles[Device].banner_wrapper,{flexDirection:"column",alignItems:'center'}]}>
                        <Image source={banner} style={[{alignSelf:"center"},styles[Device].banner]}/>
                        <Transitionview effect="pan" delay={200}>
                            <Text style={[styles[Device].banner_text,{padding:10,textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,maxWidth:"80%"}]}>Explore over 8000 Universities and 70000 Courses</Text>
                            {/* <Styledtext styles={[styles[Device].banner_text,{padding:10,textAlign:"center",fontFamily:Fonts.NeutrifStudio.Regular}]} text="Explore over 8000 Universities and 70000 Courses" focusWord="8000 Universities"/> */}
                        </Transitionview>
                        {/* <Text style={[styles[Device].login,{textAlign:"center",fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>We make studying abroad easier</Text> */}
                    </View>
                </View>
                <View style={{flexDirection:"column",gap:25,alignItems:'center',padding:10}}>
                    <Pressable onPress={emailLogin} style={[GeneralStyles.login_button_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}]}>
                        <Styledtext styles={[{padding:10,fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].login_text]} text="Login with Email" focusWord="Email"/>
                        {/* <Image source={next_icon} style={[styles[Device].next_icon]}/> */}
                    </Pressable>
                    <Pressable onPress={phoneLogin} style={[GeneralStyles.login_button_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}]}>
                        <Styledtext styles={[{padding:10,fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].login_text]} text="Login with Mobile" focusWord="Mobile"/>
                        {/* <Text style={[styles[Device].login_text,{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}></Text> */}
                        {/* <Image source={next_icon} style={[styles[Device].next_icon]}/> */}
                    </Pressable>
                    <Pressable onPress={()=>promptAsync()} style={[GeneralStyles.login_button_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}]}>
                        <Styledtext styles={[{padding:10,fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].login_text]} text="Login with Google" focusWord="Google"/>
                    </Pressable>
                    <Pressable onPress={openExplore}>
                        <Styledtext styles={[{padding:10,fontFamily:Fonts.NeutrifStudio.Medium,textAlign:"center",lineHeight:22},styles[Device].explore_text]} text="Ready to Explore? Discover your dream university today!" focusWord="Discover your dream university today!"/>
                        {/* <Image source={next_icon} style={[styles[Device].next_icon]}/> */}
                    </Pressable>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default Loginbase