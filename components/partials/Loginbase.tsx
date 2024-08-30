import { useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Event, ServerResponse } from "../../types"
import { Word2Sentence, getDevice, getServerRequestURL, serverRequest } from "../../utils"
import { validations } from "../../utils/validations"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import Form from "../resources/Form"

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
        padding:20,
        gap:20,
        backgroundColor:'white',
        borderRadius:30
    },
    actions_wrapper:{
        display:"flex",
        flexDirection:"column",
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
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
    }
})

const MobileMStyles=StyleSheet.create({
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

const Loginbase=(props:{auth:string})=>{

    const [email,setEmail]=useState("kumarrohith24081999@gmail.com")
    const [password,setPassword]=useState("Rohith@24")
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const login=async (email:string,password:string)=>{
        let validEmail=validations.EMAIL.regex.test(email)
        let validPassword=validations.PASSWORD.regex.test(password)
        if(validEmail && validPassword)
        {
            let res:ServerResponse=await serverRequest({url:getServerRequestURL("login","POST"),reqType:"POST",routeType:"public",body:{email:email,password:password}})
            if(res.success)
            {
                navigate?navigate({type:"Login"}):null
            }
        }
        if(validEmail && !validPassword)
        {
            console.log("invalid password")
        }
        if(!validEmail && validPassword){

        }
        if(!validEmail && !validPassword)
        {

        }
    }

    const openSignup=()=>{
        navigate?navigate({type:"Register"}):null
    }

    const eventHandler=async (event:Event)=>{
        switch(event.name){
            case "emailInput":
                setEmail(event.data);
                break;

            case "passwordInput":
                setPassword(event.data)
            break;

            case "getSavedCredentials":
                // let authRes=await LocalAuthentication.authenticateAsync()
                // if(authRes.success)
                // {
                //     SecureStore.getItemAsync("8b5a309a4f01cfa2").then((res)=>{
                //         let credentials=JSON.parse(res);
                //         console.log(JSON.stringify(credentials));
                //         let currentUserCredentials=credentials.find((credential)=>credential.email==event.data.label)
                //         setState({email:currentUserCredentials.email,password:currentUserCredentials.password})
                //         eventHandler({name:"login",data:{email:currentUserCredentials.email,password:currentUserCredentials.password}})
                //     })
                // }
                // else
                // {
                //     setState({email:event.data.label,password:""})
                //     //console.log("error");
                // }
                break;

            case "login":
                login(email,password)
                // console.log("login",saveLoginInfo)
                // setLoginRequest({...initialState,requestStatus:"initiated"});
                // let deviceToken=await SecureStore.getItemAsync(EXPOSTORE.DEVICE_TOKEN);
                // let resp=await login(event.data.email,event.data.password,deviceToken);
                // if(resp.success)
                // {
                //     setLoginRequest({...initialState,requestStatus:"initiated",responseStatus:"recieved",haveAnIssue:false});
                //     await SecureStore.setItemAsync(EXPOSTORE.ACCESSTOKEN,resp.data.AccessToken);
                //     saveLoginInfo?await rememberMe(event.data.email,event.data.password,"8b5a309a4f01cfe7","8b5a309a4f01cfa2"):await forgetMe(event.data.email,"8b5a309a4f01cfe7","8b5a309a4f01cfa2")
                //     Keyboard.isVisible()?Keyboard.dismiss():null
                //     setTimeout(()=>{
                //         dispatch(setUserAuthStatus({
                //             isAuthorized:true,
                //             isRegistered:true,
                //             role:"student"
                //          }));
                //     },300)
                // }
                // else
                // {
                //     setLoginRequest({...initialState,requestStatus:"initiated",responseStatus:"recieved",haveAnIssue:true});
                //     setTimeout(()=>{
                //         setLoginRequest({...initialState});
                //     },100)
                //     dispatch(setError({
                //         show:true,
                //         message:resp.message
                //     }))
                // }
                break;

            case "guestlogin":
                // dispatch(setUserAuthStatus({
                //     isAuthorized:false,
                //     isRegistered:false,
                //     role:"guest"
                //  }));
                break;

            case "openRegistrationPage":
                // dispatch(setUserAuthStatus({
                //     isAuthorized: false,
                //     isRegistered: false,
                //     role: "student"
                // }))
                break;

            case "forgotpassword":
                // dispatch(setPopup({
                //     show: true,
                //     data:{
                //         container:{
                //             name:"forgotpasswordpopuppopup",
                //             dimensions:{
                //                 width:Dimensions.get('screen').width*0.75,
                //                 height:Dimensions.get('screen').height*(Platform.OS=="android"?0.7:0.6)
                //             },
                //         },
                //         type:"custom",
                //         headerIcon:face_icon
                //     }
                // }))
                break;
        
            case "setSaveLoginInfo":
                //setSaveLoginInfo(!event.data);
                break;
            }
    }

    useEffect(()=>{
        // login(email,password)
    },[])

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.header_wrapper,styles[Device].header_wrapper]}>
                <View style={[GeneralStyles.header_wrapper_bg,{backgroundColor:Themes.Light.OnewindowPurple(1)}]}></View>
                <Text style={[styles[Device].login,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Login</Text>
            </View>
            <View style={[GeneralStyles.body_wrapper]}>
                <Form formid="Login" />
                <View style={[GeneralStyles.actions_wrapper]}>
                    <View>
                        <Pressable onPress={openSignup}><Text style={[styles[Device].noaccount,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Don't have an account?</Text></Pressable>
                    </View>
                    <View>
                        <Text style={[styles[Device].forgot,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Forgot Password?</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Loginbase