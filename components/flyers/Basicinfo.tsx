import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { store } from "../../store"
import useNavigation from "../../hooks/useNavigation"
import Textbox from "../resources/Textbox"
import { Countrycode, Dropdown, Event, ServerResponse } from "../../types"
import { getDevice, getServerRequestURL, profileUpdator, resetStore, serverRequest } from "../../utils"
import { Countrycodes, Fonts, Themes, appStandardStyles, secureStoreKeys } from "../../constants"
import { Image } from "expo-image"
import verified_icon from '../../assets/images/misc/verified.png'
import next_icon from '../../assets/images/misc/next.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import Transitionview from "../resources/Transitionview"
import Styledtext from "../resources/Styledtext"
import Dialcode from "../cards/Dialcode"
import { addToBasket } from "../../constants/basket"
import { validations } from "../../utils/validations"
import Countrypreference from "../partials/Countrypreference"
import Coursepreference from "../partials/Coursepreference"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { Verified } from "../../store/slices/verificationSlice"
import { setRemoveScreen } from "../../store/slices/removeScreenSlice"
import * as SecureStore from 'expo-secure-store'

type Listitem={
    id:string,
    component:React.FC<any>,
    data:any,
    isSkippable:boolean,
    emptyChecker:(data:any)=>boolean,
    title:{
        text:string,
        highlight:string
    },
    request?:{
        serverHandler:(data:any)=>Promise<ServerResponse>,
        responseHandler?:(res:ServerResponse)=>void
    }
}

const GeneralStyles=StyleSheet.create({
    wrapper:{
        borderWidth:1,
        borderColor:"#E3E3E3",
        padding:10,
        borderRadius:5
    },
    next_wrapper:{
        flexDirection:'row',
        alignItems:'center',
        gap:7.5,
        backgroundColor:'white',
        shadowOpacity:0.08,
        shadowRadius:6,
        padding:7.5,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:100
    }
})

const TabStyles=StyleSheet.create({
    card_title:{
        fontSize:20,
        lineHeight:30
    },
    field_title:{
        fontSize:18
    },
    next:{
        fontSize:18
    },
    next_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    },
    dial_code:{
        fontSize:18
    },
    countrypreference_card:{
        maxHeight:240
    },
    loading_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    verified_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    logout:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    card_title:{
        fontSize:16,
        lineHeight:22
    },
    field_title:{
        fontSize:12
    },
    next:{
        fontSize:14
    },
    next_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    },
    dial_code:{
        fontSize:14
    },
    countrypreference_card:{
        maxHeight:185
    },
    loading_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    verified_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    logout:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    card_title:{
        fontSize:18,
        lineHeight:26
    },
    field_title:{
        fontSize:14
    },
    next:{
        fontSize:16
    },
    next_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    dial_code:{
        fontSize:16
    },
    countrypreference_card:{
        maxHeight:200
    },
    loading_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    verified_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    logout:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    card_title:{
        fontSize:18,
        lineHeight:26
    },
    field_title:{
        fontSize:14
    },
    next:{
        fontSize:16
    },
    next_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    dial_code:{
        fontSize:16
    },
    countrypreference_card:{
        maxHeight:200
    },
    loading_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    verified_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    logout:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}


const Basicinfo=()=>{

    const [dimensions,setDimesnions]=useState<LayoutRectangle>()
    const dataList=useRef<Listitem[]>([
        {
            id:"name",
            component:Name,
            title:{
                text:"Let’s get to know you better. What’s your name?",
                highlight:"know you better"
            },
            data:{
                firstName:store.getState().sharedinfo.data?.firstName,
                lastName:store.getState().sharedinfo.data?.firstName
            },
            isSkippable:false,
            emptyChecker:(data)=>!(data.firstName && data.lastName && validations.FIRSTNAME.regex.test(data.firstName) && validations.FIRSTNAME.regex.test(data.lastName)),
            request:{
                serverHandler:async (data:{firstName:string,lastName:string})=>{
                    let res:ServerResponse=await profileUpdator({...data},(res)=>{
                        res.success?store.dispatch(setSharedInfo({...store.getState().sharedinfo.data,...data})):null
                    })
                    return res;
                }
            }
        },
        {
            id:"email",
            component:Email,
            title:{
                text:"Please share your email so we can stay in touch!",
                highlight:"share your email"
            },
            data:{
                email:store.getState().sharedinfo.data?.email,
                isVerified:store.getState().verification.data?.find((item)=>item.type=="email")?.status
            },
            isSkippable:false,
            emptyChecker:(data)=>!(validations.EMAIL.regex.test(data.email) && data.isVerified)
        },
        {
            id:"phonenumber",
            component:Phonenumber,
            title:{
                text:"Please share your phone number so we can stay connected!",
                highlight:"share your phone number"
            },
            data:{
                countryCode:(store.getState().sharedinfo.data?.phone?.countryCode)?store.getState().sharedinfo.data?.phone?.countryCode:undefined,
                phoneNumber:store.getState().sharedinfo.data?.phone?.number,
                isVerified:store.getState().verification.data?.find((item)=>item.type=="phone")?.status
            },
            isSkippable:false,
            emptyChecker:(data)=>!(data.countryCode && data.phoneNumber && validations.PHONENUMBER.regex.test(data.phoneNumber) && data.isVerified)},
        {
            id:"countrypreference",
            component:Countrypreferencecard,
            title:{
                text:"Which country would you like to study in?",
                highlight:"country"
            },
            data:{countryPreference:store.getState().preferences.data?.country},
            isSkippable:false,
            emptyChecker:(data)=>data.countryPreference.length==0
        },
        {
            id:"coursepreference",
            component:Coursepreferencecard,
            title:{
                text:"What course or field of study are you interested in?",
                highlight:"course or field"
            },
            data:{coursePreference:store.getState().preferences.data?.courses},
            isSkippable:false,emptyChecker:(data)=>data.coursePreference.length==0
        },
        // {
        //     id:"dp",
        //     component:Dp,
        //     data:{dp:store.getState().sharedinfo.data?.displayPicSrc},
        //     title:{
        //         text:"Finally we'd love to see a picture of you! Upload one here.",
        //         highlight:"picture of you!"
        //     },
        //     isSkippable:true,
        //     emptyChecker:(data)=>!(data.dp.includes("anonymous-avatar-icon"))
        // }
    ]).current
    const requiredData=useRef(dataList.filter((item)=>item.emptyChecker(item.data))).current;
    const scrollRef=useRef()
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const setScreen=(screenIndex:number)=>{
        (dimensions && scrollRef.current)?scrollRef.current.scrollTo({x:screenIndex*dimensions.width,animated:true}):null
    }

    useEffect(()=>{
        //console.log(requiredData)
        requiredData.length==0?navigate({type:"RemoveSpecificScreen",payload:{id:"Basicinfo"}}):null
    },[])

    const logout=async ()=>{
        await SecureStore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,"");
        resetStore();
        navigate?navigate({type:"Logout"}):null
        //navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Basicinfo"}}):null
    }

    console.log("location",store.getState().location.data)
     
    return(
        <View style={{flex:1,paddingTop:10}} onLayout={(e)=>setDimesnions(e.nativeEvent.layout)}>
        <Pressable onPress={logout} style={[{alignSelf:"flex-end",borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderWidth:1.2,padding:7},appStandardStyles.screenMarginSmall]}><Text style={[styles[Device].logout,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Logout</Text></Pressable>
        {
            dimensions
            ?
            <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false} ref={scrollRef} horizontal pagingEnabled style={{width:dimensions.width,height:dimensions.height}}>
            {
                requiredData.map((item,i)=>
                    <View style={{width:dimensions.width,height:dimensions.height,padding:15}}><Container setScreen={setScreen} total={requiredData.length} index={i} {...item}/></View>
                )
            }
            </ScrollView>
            :
            null
        }
        </View>
    )
}

const Container=(props:Listitem & {index:number,total:number,setScreen:any})=>{

    let Card=props.component
    const [data,setData]=useState<any>(props.data)
    const [path,navigate]=useNavigation()
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<undefined|string>(undefined)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch();

    const skip=()=>{
        //props.index==(props.total-1)?navigate({type:"RemoveSpecificScreen",payload:{id:"Basicinfo"}}):props.setScreen(props.index+1)
        props.index==(props.total-1)?dispatch(setRemoveScreen({id:"Basicinfo"})):props.setScreen(props.index+1)
    }

    const next=async ()=>{
        setLoading(true)
        let res:ServerResponse=props.request?.serverHandler?await props.request?.serverHandler(data):{success:true,data:undefined,message:""}
        //res.success?props.index==(props.total-1)?navigate({type:"RemoveSpecificScreen",payload:{id:"Basicinfo"}}):props.setScreen(props.index+1):setError(res.message);
        res.success?props.index==(props.total-1)?dispatch(setRemoveScreen({id:"Basicinfo"})):props.setScreen(props.index+1):setError(res.message);
        setLoading(false)
    }

    //console.log("data",data,props.emptyChecker(data));
    
    return(
        <View style={{flex:1,padding:5,gap:15}}>
            <Styledtext styles={[styles[Device].card_title,{fontFamily:Fonts.NeutrifStudio.Medium}]} text={props.title.text} focusWord={props.title.highlight}/>
            <Card data={data} setData={setData} setError={setError}/>
            {
                error
                ?
                <Transitionview effect="pan"><Text style={[{color:'red',fontFamily:Fonts.NeutrifStudio.Medium}]}>{error}</Text></Transitionview>
                :
                null
            }
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                {
                    props.isSkippable
                    ?
                    <Pressable onPress={skip}><Text>Skip</Text></Pressable>
                    :
                    null
                }
                {
                    !props.emptyChecker(data)
                    ?
                    <Transitionview effect="zoom">
                        {/* <Pressable style={[{flexDirection:'row',alignItems:'center',gap:7.5,borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),padding:7.5,paddingLeft:15,paddingRight:15,borderRadius:100}]} onPress={next}>
                            <Text style={[styles[Device].next,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Next</Text>
                            <Image source={next_icon} style={[styles[Device].next_icon]}/>
                        </Pressable> */}
                        <Pressable style={[GeneralStyles.next_wrapper]} onPress={!loading?next:null}>
                            <Text style={[styles[Device].next,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Medium}]}>Next</Text>
                            <Image source={loading?loading_gif:next_icon} style={[styles[Device].next_icon]}/>
                        </Pressable>
                    </Transitionview>
                    :
                    null
                }
            </View>
        </View>
    )
}

const Name=(props:{setData:any,data:any})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{gap:20}}>
            <View style={{flexDirection:"column",gap:5}}>
                <Text style={[styles[Device].field_title,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>Firstname</Text>
                <Textbox eventHandler={(e:Event)=>props.setData({...props.data,firstName:e.data})} placeholder="No special characters allowed" value={props.data.firstName} id="firstname"/>
            </View>
            <View style={{flexDirection:"column",gap:5}}>
                <Text style={[styles[Device].field_title,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>Lastname</Text>
                <Textbox eventHandler={(e:Event)=>props.setData({...props.data,lastName:e.data})} placeholder="No special characters allowed" value={props.data.lastName} id="lastname"/>
            </View>
            {/* <TextInput placeholder="Firstname" onChangeText={(txt)=>props.setData({...props.data,firstName:txt})} value={props.data.firstName}/> */}
            {/* <TextInput placeholder="Lastname" onChangeText={(txt)=>props.setData({...props.data,lastName:txt})} value={props.data.lastName}/> */}
        </View>
    )
}

const Email=(props:{setData:any,data:any,setError:any})=>{
    
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [otp,setOtp]=useState<undefined|string>(undefined)
    const [loading,setLoading]=useState({type:"request-otp",status:false})
    const [error,setError]=useState<undefined|string>(undefined)
    const [showOtpUi,setShowOtpUi]=useState(false);
    const dispatch=useAppDispatch()
    const otpLength=useRef(6).current

    const requestOtp=async ()=>{
        props.setError(undefined);
        dispatch(setSharedInfo({...store.getState().sharedinfo.data,email:props.data.email}))
        setLoading({type:"request-otp",status:true})
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("add-phone/email","POST"),
            reqType: "POST",
            body:{
                email:props.data.email
            }   
        });
        res.success?setShowOtpUi(true):props.setError(res.message)
        setLoading({type:"request-otp",status:false})
        return res
    }

    const verifyOtp=async (otp:string)=>{
        props.setError(undefined);
        setLoading({type:"verify-otp",status:true})
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
            setLoading({type:"verify-otp",status:false})
            dispatch(Verified("email"));
            setShowOtpUi(false)
            props.setData({...props.data,isVerified:true});
        }
        return res;
    }

    useEffect(()=>{
        if(otp?.length==otpLength)
        {   
            verifyOtp(otp)
        }
    },[otp])
    
    return(
        <View style={{gap:20}}>
            <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
                <View style={{flex:1,flexDirection:"column",gap:5}}>
                    {/* <Text style={[styles[Device].field_title,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>Email</Text> */}
                    <Textbox readonly={props.data.isVerified} eventHandler={(e:Event)=>props.setData({...props.data,email:e.data})} placeholder="Enter your email" value={props.data.email} id="email"/>
                </View>
                {
                    validations.EMAIL.regex.test(props.data.email) && !props.data.isVerified
                    ?
                    <Transitionview effect="zoom">
                        {
                            loading.type=="request-otp" && loading.status
                            ?
                            <Image source={loading_gif} style={[styles[Device].loading_icon,{alignSelf:"center"}]}/>
                            :
                            <Pressable onPress={requestOtp} style={[{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]}>
                                <Text style={[styles[Device].dial_code,{color:Themes.Light.OnewindowPrimaryBlue(1),padding:10,fontFamily:Fonts.NeutrifStudio.Regular}]}>Verify</Text>
                            </Pressable>
                        }
                    </Transitionview>
                    :
                    null
                }
                {
                    props.data.isVerified
                    ?
                    <Transitionview effect="zoom">
                        <Image source={verified_icon} style={[styles[Device].verified_icon,{alignSelf:"center"}]}/>
                    </Transitionview>
                    :
                    null
                }
            </View>
            {
                showOtpUi
                ?
                <Transitionview effect="pan">
                    <View style={{flexDirection:"row",gap:5}}>
                        <View style={{flex:1}}><Textbox eventHandler={(e:Event)=>setOtp(e.data)} placeholder="Enter the 6 digit OTP sent to your mail" value={otp} id="otp"/></View>
                        {
                            loading.type=="verify-otp" && loading.status
                            ?
                            <Image source={loading_gif} style={[styles[Device].loading_icon,{alignSelf:"center"}]}/>
                            :
                            null
                        }
                    </View>
                </Transitionview>
                :
                null
            }
        </View>
    )
}

const Phonenumber=(props:{setData:any,data:any,setError:any})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [otp,setOtp]=useState<undefined|string>(undefined)
    const [loading,setLoading]=useState({type:"request-otp",status:false})
    const [error,setError]=useState<undefined|string>(undefined)
    const [showOtpUi,setShowOtpUi]=useState(false);
    const dispatch=useAppDispatch()
    const otpLength=useRef(6).current

    const showDialCodes=()=>{
        let data:Dropdown={
            options:{
                card:Dialcode,
                list:Countrycodes,
                labelExtractor:(item:Countrycode)=>item.dial_code,
                idExtractor:(item:Countrycode)=>item.code,
                searchEvaluator:(item:Countrycode,search:string)=>(item.dial_code+item.code+item.name).toLowerCase().trim().includes(search.toLowerCase().trim()),
            },
            selected:props.data.countryCode?[Countrycodes.find((item)=>item.dial_code==props.data.countryCode)]:[],
            eventHandler:(e:Event)=>{setDialCode(e.data[0])},
            selectionMode:"single"
        }
        addToBasket("dial-codes",data)
        navigate({type:"AddScreen",payload:{screen:"Dropdownoptions",params:{basketid:"dial-codes"}}});
    }

    const setDialCode=(data:Countrycode)=>{
        console.log("dialcode",data);
        props.setData({...props.data,countryCode:data.dial_code})
    }

    const requestOtp=async ()=>{
        props.setError(undefined);
        dispatch(setSharedInfo({...store.getState().sharedinfo.data,phone:{
            number:props.data.phoneNumber, 
            countryCode:props.data.countryCode
        }}))
        setLoading({type:"request-otp",status:true})
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("add-phone/email","POST"),
            reqType: "POST",
            body:{
                phoneNumber:props.data.phoneNumber, 
                countryCode:props.data.countryCode
            }    
        });
        console.log("ressss p",res);
        res.success?setShowOtpUi(true):props.setError(res.message)
        setLoading({type:"request-otp",status:false})
        return res
    }

    const verifyOtp=async (otp:string)=>{
        props.setError(undefined);
        setLoading({type:"verify-otp",status:true})
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
            setLoading({type:"verify-otp",status:false})
            dispatch(Verified("phone"));
            setShowOtpUi(false)
            props.setData({...props.data,isVerified:true});
        }
        return res;
    }

    useEffect(()=>{
        if(otp?.length==otpLength)
        {   
            verifyOtp(otp)
        }
    },[otp])
    
    return(
        <View style={{gap:20}}>
            <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
                <Pressable onPress={!props.data.isVerified?showDialCodes:null} style={[{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]}>
                    <Text style={[styles[Device].dial_code,{color:Themes.Light.OnewindowPrimaryBlue(props.data.countryCode?1:0.5),padding:10,fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.data.countryCode?props.data.countryCode:"Select"}</Text>
                </Pressable>
                <View style={{flex:1}}><Textbox readonly={props.data.isVerified} eventHandler={(e:Event)=>props.setData({...props.data,phoneNumber:e.data})} placeholder="Phonenumber" value={props.data.phoneNumber} id="phonenumber"/></View>
                {
                    props.data.countryCode!=undefined && props.data.phoneNumber!=undefined && validations.PHONENUMBER.regex.test(props.data.phoneNumber) && !props.data.isVerified
                    ?
                    <Transitionview effect="zoom">
                        {
                            loading.type=="request-otp" && loading.status
                            ?
                            <Image source={loading_gif} style={[styles[Device].loading_icon,{alignSelf:"center"}]}/>
                            :
                            <Pressable onPress={requestOtp} style={[{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}]}>
                                <Text style={[styles[Device].dial_code,{color:Themes.Light.OnewindowPrimaryBlue(1),padding:10,fontFamily:Fonts.NeutrifStudio.Regular}]}>Verify</Text>
                            </Pressable>
                        }
                    </Transitionview>
                    :
                    null
                }
                {
                    props.data.isVerified
                    ?
                    <Transitionview effect="zoom">
                        <Image source={verified_icon} style={[styles[Device].verified_icon,{alignSelf:"center"}]}/>
                    </Transitionview>
                    :
                    null
                }
            </View>
            {
                showOtpUi
                ?
                <Transitionview effect="pan">
                    <View style={{flexDirection:"row",gap:5}}>
                        <View style={{flex:1}}><Textbox eventHandler={(e:Event)=>setOtp(e.data)} placeholder="Enter the 6 digit OTP sent to your mobile" value={otp} id="otp"/></View>
                        {
                            loading.type=="verify-otp" && loading.status
                            ?
                            <Image source={loading_gif} style={[styles[Device].loading_icon,{alignSelf:"center"}]}/>
                            :
                            null
                        }
                    </View>
                </Transitionview>
                :
                null
            }
        </View>
    )
}

const Countrypreferencecard=(props:{setData:any,data:any})=>{

    const [load,setLoad]=useState(false);
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const setPreference=(event:Event)=>{
        props.setData({countryPreference:event.data})
    }

    useEffect(()=>{
        addToBasket("countrypreference-card",{eventHandler:setPreference});
        setLoad(true);
    },[])

    return(
        <View style={[{flex:1},styles[Device].countrypreference_card]}>
            {
                load
                ?
                <Countrypreference/>
                :
                null
            }
        </View>
    )
}

const Dp=(props:{setData:any})=>{

    return(
        <View><Text>Dp</Text></View>
    )
}

const Coursepreferencecard=(props:{setData:any,data:any})=>{

    const [load,setLoad]=useState(false);
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const setPreference=(event:Event)=>{
        props.setData({coursePreference:event.data})
    }

    useEffect(()=>{
        addToBasket("coursepreference-card",{eventHandler:setPreference});
        setLoad(true);
    },[])

    return(
        <View style={[{flex:1},styles[Device].countrypreference_card]}>
            {
                load
                ?
                <Coursepreference/>
                :
                null
            }
        </View>
    )
}

const getDialCode=()=>{
    let code=Countrycodes.find((item)=>item.code==store.getState().location.data?.isoCountryCode)
    console.log("code",store.getState().location.data?.isoCountryCode);
    return (code?[code]:[])
}


export default Basicinfo