import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Event, ServerResponse } from "../../types"
import { getServerRequestURL, serverRequest } from "../../utils"
import { validations } from "../../utils/validations"
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        // backgroundColor:"red"
    },
    email:{
        borderBottomColor:"black",
        borderBottomWidth:1
    },
    password:{
        borderBottomColor:"black",
        borderBottomWidth:1
    }
})

const Loginbase=(props:{auth:string})=>{

    const [email,setEmail]=useState("kumarrohith24081999@gmail.com")
    const [password,setPassword]=useState("Rohith")
    const [path,navigate]=useNavigation()

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
        <View style={[GeneralStyles.main_wrapper]}>
            <View>
                <Text>Email</Text>
                <TextInput onChangeText={(text)=>eventHandler({name:"emailInput",triggerBy:"email",data:text})} style={[GeneralStyles.email]}>{email}</TextInput>
            </View>
            <View>
                <Text>Password</Text>
                <TextInput onChangeText={(text)=>eventHandler({name:"passwordInput",triggerBy:"password",data:text})} style={[GeneralStyles.password]}>{password}</TextInput>
            </View>
            <Pressable onPress={()=>login(email,password)}><Text>Login</Text></Pressable>
        </View>
    )
}

export default Loginbase