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

const Loginbase=(props:{auth:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [errors,setErrors]=useState<{id:string,error:string}>();
    const tabs=useRef([{label:"Email",value:"email"},{label:"Phone",value:"phone"}]).current
    const [loginType,setLoginType]=useState("email");

    // const login=async (email:string,password:string)=>{
    //     let validEmail=validations.EMAIL.regex.test(email)
    //     let validPassword=validations.PASSWORD.regex.test(password)
    //     if(validEmail && validPassword)
    //     {
    //         let deviceToken=await SecureStore.getItemAsync(secureStoreKeys.DEVICE_TOKEN);
    //         let res:ServerResponse=await serverRequest({url:getServerRequestURL("login","POST"),reqType:"POST",routeType:"public",body:{email:email,password:password,DeviceToken:deviceToken}})
    //         console.log("err",res);
    //         if(res.success)
    //         {
    //             navigate?navigate({type:"Login"}):null
    //         }
    //         else{
    //             //setErrors([{id:"password",error:res.message}]);
    //         }
    //     }
    //     if(validEmail && !validPassword)
    //     {
    //         console.log("invalid password")
    //     }
    //     if(!validEmail && validPassword){

    //     }
    //     if(!validEmail && !validPassword)
    //     {

    //     }
    // }

    const openSignup=()=>{
        navigate?navigate({type:"Register"}):null
        setTimeout(()=>{
            navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Login"}}):null
        },200)
    }

    const openForgotPassword=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Forgotpassword"}}}):null
    }

    // const eventHandler=async (event:Event)=>{
    //     switch(event.name){
    //         case "emailInput":
    //             setEmail(event.data);
    //             break;

    //         case "passwordInput":
    //             setPassword(event.data)
    //         break;

    //         case "getSavedCredentials":
    //             // let authRes=await LocalAuthentication.authenticateAsync()
    //             // if(authRes.success)
    //             // {
    //             //     SecureStore.getItemAsync("8b5a309a4f01cfa2").then((res)=>{
    //             //         let credentials=JSON.parse(res);
    //             //         console.log(JSON.stringify(credentials));
    //             //         let currentUserCredentials=credentials.find((credential)=>credential.email==event.data.label)
    //             //         setState({email:currentUserCredentials.email,password:currentUserCredentials.password})
    //             //         eventHandler({name:"login",data:{email:currentUserCredentials.email,password:currentUserCredentials.password}})
    //             //     })
    //             // }
    //             // else
    //             // {
    //             //     setState({email:event.data.label,password:""})
    //             //     //console.log("error");
    //             // }
    //             break;

    //         case "login":
    //             login(email,password)
    //             // console.log("login",saveLoginInfo)
    //             // setLoginRequest({...initialState,requestStatus:"initiated"});
    //             // let deviceToken=await SecureStore.getItemAsync(EXPOSTORE.DEVICE_TOKEN);
    //             // let resp=await login(event.data.email,event.data.password,deviceToken);
    //             // if(resp.success)
    //             // {
    //             //     setLoginRequest({...initialState,requestStatus:"initiated",responseStatus:"recieved",haveAnIssue:false});
    //             //     await SecureStore.setItemAsync(EXPOSTORE.ACCESSTOKEN,resp.data.AccessToken);
    //             //     saveLoginInfo?await rememberMe(event.data.email,event.data.password,"8b5a309a4f01cfe7","8b5a309a4f01cfa2"):await forgetMe(event.data.email,"8b5a309a4f01cfe7","8b5a309a4f01cfa2")
    //             //     Keyboard.isVisible()?Keyboard.dismiss():null
    //             //     setTimeout(()=>{
    //             //         dispatch(setUserAuthStatus({
    //             //             isAuthorized:true,
    //             //             isRegistered:true,
    //             //             role:"student"
    //             //          }));
    //             //     },300)
    //             // }
    //             // else
    //             // {
    //             //     setLoginRequest({...initialState,requestStatus:"initiated",responseStatus:"recieved",haveAnIssue:true});
    //             //     setTimeout(()=>{
    //             //         setLoginRequest({...initialState});
    //             //     },100)
    //             //     dispatch(setError({
    //             //         show:true,
    //             //         message:resp.message
    //             //     }))
    //             // }
    //             break;

    //         case "guestlogin":
    //             // dispatch(setUserAuthStatus({
    //             //     isAuthorized:false,
    //             //     isRegistered:false,
    //             //     role:"guest"
    //             //  }));
    //             break;

    //         case "openRegistrationPage":
    //             // dispatch(setUserAuthStatus({
    //             //     isAuthorized: false,
    //             //     isRegistered: false,
    //             //     role: "student"
    //             // }))
    //             break;

    //         case "forgotpassword":
    //             // dispatch(setPopup({
    //             //     show: true,
    //             //     data:{
    //             //         container:{
    //             //             name:"forgotpasswordpopuppopup",
    //             //             dimensions:{
    //             //                 width:Dimensions.get('screen').width*0.75,
    //             //                 height:Dimensions.get('screen').height*(Platform.OS=="android"?0.7:0.6)
    //             //             },
    //             //         },
    //             //         type:"custom",
    //             //         headerIcon:face_icon
    //             //     }
    //             // }))
    //             break;
        
    //         case "setSaveLoginInfo":
    //             //setSaveLoginInfo(!event.data);
    //             break;
    //         }
    // }

    const tabSelected=(tab:ListItem[])=>{
        console.log("tab",tab[0].value)
        setLoginType(tab[0].value);
    }

    const login_email=(data:{email:string})=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Verifyuser",flyerdata:{type:"email",data:{email:data.email}}}}}):null
    }

    const login_phone=(data:{phone:{countryCode:string,phoneNumber:string}})=>{
        console.log("phone daTA",data);
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Verifyuser",flyerdata:{type:"phone",data:{phone:data.phone}}}}}):null
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
            <View style={[GeneralStyles.header_wrapper,styles[Device].header_wrapper]}>
                <View style={[GeneralStyles.header_wrapper_bg,{backgroundColor:Themes.Light.OnewindowPurple(1)}]}></View>
                {/* <Text style={[styles[Device].login,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Login</Text> */}
            </View>
            <View style={[GeneralStyles.body_wrapper,{position:"relative"}]}>
                <Image style={[styles[Device].girl_peek,{position:"absolute"}]} source={girlPeek_image}/>
                <View style={{alignSelf:'center',margin:20,position:"relative"}}>
                    <Image style={[styles[Device].airplane,{position:"absolute",transform:[{rotate:"-20deg"}]}]} source={airplane}/>
                    <Image style={[styles[Device].passport,{position:"absolute",transform:[{rotate:"20deg"}]}]} source={passport}/>
                    <Image style={[styles[Device].logo,{aspectRatio:5}]} source={logo}/>
                </View>
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
                {/* <View style={[GeneralStyles.actions_wrapper]}>
                    <View>
                        <Pressable onPress={openSignup}><Text style={[styles[Device].noaccount,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Don't have an account?</Text></Pressable>
                    </View>
                    <View>
                        <Pressable onPress={openForgotPassword}><Text style={[styles[Device].forgot,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Forgot Password?</Text></Pressable>
                    </View>
                </View> */}
            </View>
        </View>
    )
}

export default Loginbase