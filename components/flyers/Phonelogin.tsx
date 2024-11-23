import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Countrycode, Dropdown, Event, ServerResponse } from "../../types"
import { getDevice, getLocation, getServerRequestURL, serverRequest, setWordCase } from "../../utils"
import { useEffect, useRef, useState } from "react"
import Verifyuser from "./Verifyuser"
import { addToBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { Countrycodes, Fonts, Themes, appStandardStyles, secureStoreKeys } from "../../constants"
import Styledtext from "../resources/Styledtext"
import { validations } from "../../utils/validations"
import Transitionview from "../resources/Transitionview"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import back_icon from '../../assets/images/misc/back.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { Image } from "expo-image"
import Phoneinput from "../resources/Phoneinput"
import Dialcode from "../cards/Dialcode"
import Dropdownoptions from "./Dropdownoptions"
import { useAppSelector } from "../../hooks/useAppSelector"
import { store } from "../../store"
import * as SecureStore from 'expo-secure-store';
import * as Localization from 'expo-localization';

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        padding:10,
        gap:10
    },
    request_otp_wrapper:{
        alignSelf:"center",
        borderWidth:1,
        borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),
        padding:10,
        borderRadius:100
    },
    dial_code_wrapper:{
        // flex:1,
        borderWidth:1,
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5
    },
    phone_number_wrapper:{
        flex:1,
        borderWidth:1,
        borderRadius:5
    }
})

const TabStyles=StyleSheet.create({
    phone_number:{
        fontSize:22
    },
    enter_text:{
        fontSize:24
    },
    already_text:{
        fontSize:18
    },
    error:{
        fontSize:18
    },
    no_code:{
        fontSize:18
    },
    back_icon:{
        width:12,
        height:12,
        resizeMode:'contain'
    },
    loading:{
        width:25,
        height:25,
        resizeMode:"contain"
    },
    main_wrapper:{
        paddingTop:45
    },
    main:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
    phone_number:{
        fontSize:14
    },
    enter_text:{
        fontSize:16
    },
    already_text:{
        fontSize:11
    },
    error:{
        fontSize:11
    },
    no_code:{
        fontSize:11
    },
    back_icon:{
        width:8,
        height:8,
        resizeMode:'contain'
    },
    loading:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    main_wrapper:{
        paddingTop:25
    },
    main:{
        fontSize:18
    }
})

const MobileMStyles=StyleSheet.create({
    phone_number:{
        fontSize:16
    },
    enter_text:{
        fontSize:18
    },
    already_text:{
        fontSize:12
    },
    error:{
        fontSize:12
    },
    no_code:{
        fontSize:12
    },
    back_icon:{
        width:8,
        height:8,
        resizeMode:'contain'
    },
    loading:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    main_wrapper:{
        paddingTop:25
    },
    main:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    phone_number:{
        fontSize:16
    },
    enter_text:{
        fontSize:18
    },
    already_text:{
        fontSize:12
    },
    error:{
        fontSize:12
    },
    no_code:{
        fontSize:12
    },
    back_icon:{
        width:8,
        height:8,
        resizeMode:'contain'
    },
    loading:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    main_wrapper:{
        paddingTop:25
    },
    main:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Phonelogin=()=>{

    const userLocation=useAppSelector((state)=>state.location);
    const [phone,setPhone]=useState<{countryCode:Countrycode[],phoneNumber:string}>({countryCode:[],phoneNumber:""})
    const [error,setError]=useState<undefined|string>()
    const [screen,setScreen]=useState<"request-otp"|"verify-otp"|"dial-code">("request-otp")
    const scrollRef=useRef()
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const screens=useRef(["request-otp","verify-otp","dial-code"]).current;

    const verify_phone=async (otp:string,data:{ phone: { countryCode: string; number: string } })=>{
        //console.log("phone veeeee",otp,data)
        let deviceToken=await SecureStore.getItemAsync(secureStoreKeys.DEVICE_TOKEN);
        console.log("phone veeeee",otp,data)
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("verify-user","POST"),
            reqType: "POST",
            routeType:"public",
            body:{...data.phone,otp:otp,type:"phone",DeviceToken:deviceToken}
        })
        if(res.success)
        {
            navigate({type:"Login"})
        }
        return res.success
    }

    const request_otp=async ()=>{
        setError(undefined);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("login","POST"),
            reqType:"POST",
            routeType:"public",
            body:{...phone,countryCode:phone.countryCode[0].dial_code}
        })
        console.log(res.data);
        res.success?setScreen("verify-otp"):setError(res.message);
        return res.success;
    }

    const dialcodeSelected=(event:Event)=>{
        console.log("event",event.data);
        setScreen("request-otp")
        setPhone({...phone,countryCode:event.data})
    }

    // const showDialcodes=()=>{
    //     addToBasket("dialcodes-dropdownoptions",{
    //         options:{
    //             card:Dialcode,
    //             list:Countrycodes,
    //             labelExtractor:(item:Countrycode)=>item.dial_code,
    //             idExtractor:(item:Countrycode)=>item.code,
    //             searchEvaluator:(item:Countrycode,search:string)=>(item.dial_code+item.code+item.name).toLowerCase().trim().includes(search.toLowerCase().trim()),
    //         },
    //         preventCloseOnApply:true,
    //         eventHandler:dialcodeSelected,
    //         selectionMode:"single",
    //         selected:phone.countryCode
    //     })
    //     setScreen("dial-code")
    // }

    const showDialcodes=()=>{
        let data:Dropdown={
            options:{
                card:Dialcode,
                list:Countrycodes,
                labelExtractor:(item:Countrycode)=>item.dial_code,
                idExtractor:(item:Countrycode)=>item.code,
                searchEvaluator:(item:Countrycode,search:string)=>(item.dial_code+item.code+item.name).toLowerCase().trim().includes(search.toLowerCase().trim()),
            },
            selected:phone.countryCode[0]?.dial_code?phone.countryCode:[],
            eventHandler:dialcodeSelected,
            selectionMode:"single"
        }
        addToBasket("dial-codes",data)
        navigate({type:"AddScreen",payload:{screen:"Dropdownoptions",params:{basketid:"dial-codes"}}});
    }

    useEffect(()=>{
        (dimensions && scrollRef.current)?scrollRef.current.scrollTo({x:(screens.findIndex((item)=>screen==item))*dimensions.width,animated:true}):null
    },[screen])

    useEffect(()=>{

    },[phone])

    useEffect(()=>{
        addToBasket("verification-callback",{callback:verify_phone});
        let currentCode=Countrycodes.find((code)=>code.code==Localization.getLocales()[0]?.regionCode);
        currentCode?setPhone({...phone,countryCode:[currentCode]}):null
    },[])

    // useEffect(()=>{
    //     if(userLocation.responseStatus=="recieved" && userLocation.data)
    //     {
    //         let currentCode=Countrycodes.find((code)=>code.code==Localization.getLocales()[0]?.regionCode);
    //         currentCode?setPhone({...phone,countryCode:[currentCode]}):null
    //     }
    // },[userLocation])

    console.log("number",phone,userLocation)

    return(
        <View style={[{flex:1},appStandardStyles.screenMarginSmall,styles[Device].main_wrapper]} onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false} ref={scrollRef} horizontal pagingEnabled style={{flex:1}}>
                <View style={{width:dimensions.width,gap:30}}>
                    <View style={{flexDirection:"column",gap:25}}>
                        <Styledtext styles={[styles[Device].enter_text,{fontFamily:Fonts.NeutrifStudio.Medium}]} focusWord="mobile number" text="Please enter your mobile number"/>
                        <View style={{gap:10,flexDirection:"column"}}>
                            <View style={{flexDirection:"row",gap:15}}>
                                <Pressable style={[GeneralStyles.dial_code_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}]} onPress={showDialcodes}><Text style={[styles[Device].phone_number,{padding:10,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{phone.countryCode[0]?.dial_code?phone.countryCode[0].dial_code:"Select"}</Text></Pressable>
                                <View style={[GeneralStyles.phone_number_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}]}><TextInput maxLength={10} style={[styles[Device].phone_number,{padding:10,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]} placeholder="Ex. 9999999999" onChangeText={(txt)=>setPhone({...phone,phoneNumber:txt})} value={phone.phoneNumber}/></View>
                            </View>
                            {
                                error
                                ?
                                <Transitionview effect="fade"><Text style={[styles[Device].error,{alignSelf:"flex-start"},{fontFamily:Fonts.NeutrifStudio.Regular,color:"red"}]}>{setWordCase(error)}</Text></Transitionview>
                                :
                                null
                            }
                            {
                                phone.countryCode?.length==1 && validations.PHONENUMBER.regex.test(phone.phoneNumber)
                                ?
                                <Transitionview effect="fade"><Pressable onPress={()=>setScreen("verify-otp")}><Text style={[styles[Device].already_text,{alignSelf:"flex-end"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Already have an OTP?</Text></Pressable></Transitionview>
                                :
                                null
                            }
                        </View>
                    </View>
                    {
                        phone.countryCode?.length==1 && validations.PHONENUMBER.regex.test(phone.phoneNumber)
                        ?
                        <Transitionview effect="zoom">
                            <View style={{width:"50%",alignSelf:"center"}}><Asynchronousbutton idleText="Request OTP" successText="Success!" failureText="Failed" callback={request_otp}/></View>
                            {/* <Pressable style={[GeneralStyles.request_otp_wrapper]} onPress={request_otp}><Text style={[{alignSelf:"center"},{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Request OTP</Text></Pressable> */}
                        </Transitionview>
                        :
                        null
                    }
                </View>
                <View style={{width:dimensions.width}}>
                    <View style={{flexDirection:"row",alignItems:'center',gap:5}}>
                        <Image source={back_icon} style={[styles[Device].back_icon,{opacity:0.5}]}/>
                        <Pressable onPress={()=>setScreen("request-otp")}><Text style={[styles[Device].no_code,{alignSelf:"flex-start"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Don't have a code?</Text></Pressable>
                    </View>
                    <View style={{flex:1}}>
                        {
                            screen=="verify-otp" && phone.countryCode?.length==1 && validations.PHONENUMBER.regex.test(phone.phoneNumber) && !error
                            ?
                            <Verifyuser type="mobile" data={{phone:{countryCode:phone.countryCode[0].dial_code,phoneNumber:phone.phoneNumber}}}/>
                            :
                            null
                        }
                    </View>
                </View>
                {/* <View style={{width:dimensions.width}}>
                    <View style={{flexDirection:"row",alignItems:'center',gap:5}}>
                        <Image source={back_icon} style={[styles[Device].back_icon,{opacity:0.5}]}/>
                        <Pressable onPress={()=>setScreen("request-otp")}><Text style={[styles[Device].no_code,{alignSelf:"flex-start"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Back</Text></Pressable>
                    </View>
                    <View style={{flex:1}}>
                    {
                        screen=="dial-code"
                        ?
                        <Transitionview style={[{flex:1}]} effect="fade"><Dropdownoptions basketid="dialcodes-dropdownoptions"/></Transitionview>
                        :
                        null
                    }
                    </View>
                </View> */}
            </ScrollView>
            :
            <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
                <Image source={loading_gif} style={[styles[Device].loading]}/>
                <Text style={[styles[Device].wait,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Just a moment</Text>
            </View>
        }
        </View>
    )
}

export default Phonelogin

