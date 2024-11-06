import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import Gradienttext from "../resources/Gradienttext"
import useNavigation from "../../hooks/useNavigation";
import { useRef } from "react";
import { Fonts, Themes, secureStoreKeys, setComponentInfo } from "../../constants";
import * as SecureStore from 'expo-secure-store'
import { Image } from "expo-image";
import sample_pic from '../../assets/images/misc/sampledp.png'
import { Word2Sentence, getDevice, getServerRequestURL, resetStore, serverRequest } from "../../utils";
import personal_icon from '../../assets/images/profile/personal.png'
import cart_icon from '../../assets/images/profile/cart.png'
import expert_icon from '../../assets/images/profile/expert.png'
import favourites_icon from '../../assets/images/profile/favourites.png'
import orders_icon from '../../assets/images/profile/orders.png'
import products_icon from '../../assets/images/profile/products.png'
import preferences_icon from '../../assets/images/profile/preferences.png'
import ai_icon from '../../assets/images/profile/ai.png'
import { useAppSelector } from "../../hooks/useAppSelector";
import Loadingview from "../resources/Loadingview";
import defaultDP from '../../assets/images/misc/defaultDP.png'
import { addToBasket } from "../../constants/basket";
import Transitionview from "../resources/Transitionview";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:'white',
        paddingLeft:10,
        paddingRight:10
    },
    user_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    name_wrapper:{
        flex:3,
        display:"flex",
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:"center",
        gap:5
    },
    dp_wrapper:{
        flex:1,
        position:"relative",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    dp:{
        borderRadius:100
        // position:"absolute"
    },
    dpBg:{
        position:"absolute",
        zIndex:-1,
        borderRadius:500
    },
    name:{
        alignSelf:'center',
        //fontWeight:"700",
    },
    email:{
        //fontWeight:""
    },
    options_wrapper:{
        display:'flex',
        flexDirection: 'row',
        gap:20,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    option_wrapper:{
        display:'flex',
        flexDirection:'column',
        justifyContent:"center",
        alignItems:'center',
        gap:5,
    },
    logout_wrapper:{
        alignSelf:"flex-end"
    },
    logout:{
        borderRadius:100,
        // borderWidth:1
    }
})

const TabStyles=StyleSheet.create({
    name:{
        fontSize:34,
    },
    email:{
        fontSize:18
    },
    dp:{
        width:125,
        height:125,
        objectFit:"contain"
    },
    dpBg:{
        width:115,
        height:115,
        objectFit:"contain",
        bottom:5,
        right:35
    },
    option_icon:{
        width:55,
        height:55,
        objectFit:'contain'
    },
    options_text:{
        fontSize:20
    },
    user_wrapper:{
        flex:1
    },
    options_wrapper:{
        flex:6,
    },
    logout:{
        fontSize:22,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:25,
        paddingRight:25,
    },
    delete_account:{
        fontSize:14,
        paddingTop:10
    },
    loadingview_name:{
        width:200,
        height:26
    },
    loadingview_email:{
        width:150,
        height:22
    },
    loadingview_dp:{
        width:85,
        height:85,
        borderRadius:100
    }
})

const MobileSStyles=StyleSheet.create({
    name:{
        fontSize:22,
    },
    email:{
        fontSize:12
    },
    dp:{
        width:65,
        height:65,
        objectFit:"contain"
    },
    dpBg:{
        width:65,
        height:65,
        objectFit:"contain",
        bottom:10,
        right:0
    },
    option_icon:{
        width:34,
        height:34,
        objectFit:'contain'
    },
    options_text:{
        fontSize:12
    },
    user_wrapper:{
        flex:1
    },
    options_wrapper:{
        flex:6,
    },
    logout:{
        fontSize:12,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:12,
        paddingRight:12,
        fontWeight:"500"
    },
    delete_account:{
        fontSize:10,
        paddingTop:10,
        paddingBottom:10
    },
    loadingview_name:{
        width:150,
        height:20
    },
    loadingview_email:{
        width:100,
        height:20
    },
    loadingview_dp:{
        width:65,
        height:65,
        borderRadius:100
    }
})

const MobileMStyles=StyleSheet.create({
    name:{
        fontSize:26,
    },
    email:{
        fontSize:14
    },
    dp:{
        width:75,
        height:75,
        objectFit:"contain"
    },
    dpBg:{
        width:75,
        height:75,
        objectFit:"contain",
        bottom:10,
        right:0
    },
    option_icon:{
        width:40,
        height:40,
        objectFit:'contain'
    },
    options_text:{
        fontSize:14
    },
    user_wrapper:{
        flex:1
    },
    options_wrapper:{
        flex:6,
    },
    logout:{
        fontSize:14,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
        fontWeight:"500"
    },
    delete_account:{
        fontSize:12,
        paddingTop:10,
        paddingBottom:10
    },
    loadingview_name:{
        width:150,
        height:20
    },
    loadingview_email:{
        width:100,
        height:20
    },
    loadingview_dp:{
        width:65,
        height:65,
        borderRadius:100
    }
})

const MobileLStyles=StyleSheet.create({
    name:{
        fontSize:26,
    },
    email:{
        fontSize:14
    },
    dp:{
        width:75,
        height:75,
        objectFit:"contain"
    },
    dpBg:{
        width:75,
        height:75,
        objectFit:"contain",
        bottom:10,
        right:0
    },
    option_icon:{
        width:40,
        height:40,
        objectFit:'contain'
    },
    options_text:{
        fontSize:14
    },
    user_wrapper:{
        flex:1
    },
    options_wrapper:{
        flex:6,
    },
    logout:{
        fontSize:14,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
    },
    delete_account:{
        fontSize:12,
        paddingTop:10
    },
    loadingview_name:{
        width:150,
        height:20
    },
    loadingview_email:{
        width:100,
        height:20
    },
    loadingview_dp:{
        width:65,
        height:65,
        borderRadius:100
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Profile=(props:any)=>{

    const sharedInfo=useAppSelector((state)=>state.sharedinfo)
    const [path,navigate]=useNavigation()
    const containerRef = useRef<any>(null);
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const options=useRef([
        {title:"Personal Info",icon:personal_icon,screen:"Personalinfo"},
        {title:"Experts",icon:expert_icon,screen:"Experts"},
        {title:"Preferences",icon:preferences_icon,screen:"Preferences"},
        {title:"AI",icon:ai_icon,screen:"Recommendations"},
        {title:"Wishlist",icon:favourites_icon,screen:"Wishlist"},
        {title:"Cart",icon:cart_icon,screen:"Cart"},
        {title:"My Orders",icon:orders_icon,screen:"Myorders"},
        {title:"My Products",icon:products_icon,screen:"Myproducts"}
    ]).current

    const press=()=>{
        if (containerRef.current) {
            containerRef.current.measureInWindow((x, y, width, height) => {
              setComponentInfo("Popup","customPlacement",{initial:{x:x/Dimensions.get("screen").width,y:y/Dimensions.get("screen").height,opacity:0,scale:0,width:width/Dimensions.get("screen").width,height:height/Dimensions.get("screen").height},final:{x:0.25,y:0.25,opacity:1,scale:0.5,width:0.5,height:0.5}})
             // navigate({type:"AddScreen",payload:{screen:"Popup",params:{popupid:"Error",popupdata:{message:"Hie there"}}}})
            });
          }
    }

    const logout=async ()=>{
        await SecureStore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,"");
        resetStore();
        navigate?navigate({type:"Logout"}):null
    }

    const showDpOptions=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"DPoptions"}}):null
    }

    const openScreen=(screen:string)=>{
        screen?navigate?navigate({type:"AddScreen",payload:{screen:screen}}):null:null
    }

    const deleteAccount=async ()=>{
        let res=await serverRequest({
            url:getServerRequestURL("delete-account","GET"),
            reqType:"PUT"
        })
        console.log("delete",res);
        if(res.success)
        {
            await logout();
            setTimeout(()=>{
                navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Successfull",flyerdata:{message:"Account Deleted Successfully"}}}}):null;
            },500)
        }
        return res.success
    }

    const deleteWarning=()=>{
        addToBasket("warning",{warningMessage:"Are you sure you want to delete your account , this action can't be undone!",proceedCallback:deleteAccount,yesLabel:"Delete",noLabel:"No"});
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Warning"}}}):null;
    }

    //console.log(sharedInfo.responseStatus!="recieved")

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.user_wrapper,styles[Device].user_wrapper]}>
                <View style={[GeneralStyles.name_wrapper]}>
                    <Transitionview effect="pan"><Loadingview style={[styles[Device].loadingview_name]} isLoading={sharedInfo.responseStatus!="recieved"}><Text style={[GeneralStyles.name,styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{(sharedInfo.data?.firstName || sharedInfo.data?.lastName)?sharedInfo.data?.firstName+" "+sharedInfo.data?.lastName:"User"}</Text></Loadingview></Transitionview>
                    <Transitionview effect="pan"><Loadingview style={[styles[Device].loadingview_email]} isLoading={sharedInfo.responseStatus!="recieved"}><Text style={[GeneralStyles.email,styles[Device].email,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{sharedInfo.data?.email}</Text></Loadingview></Transitionview>
                </View>
                <Pressable onPress={showDpOptions} style={[GeneralStyles.dp_wrapper]}>
                    <View style={[GeneralStyles.dpBg,styles[Device].dpBg,{backgroundColor:Themes.Light.OnewindowRed(1)}]}></View>
                    <Loadingview style={[styles[Device].loadingview_dp]} isLoading={sharedInfo.responseStatus!="recieved"}>
                        <Image source={sharedInfo.data?.displayPicSrc?sharedInfo.data.displayPicSrc:defaultDP} style={[GeneralStyles.dp,styles[Device].dp]}></Image>
                    </Loadingview>
                </Pressable>
            </View>
            <View style={[GeneralStyles.options_wrapper,styles[Device].options_wrapper]}>
            {
                options.map((option,i)=>
                <Transitionview style={[{width:"45%",height:"20%",display:"flex",alignItems:'center',justifyContent:'center'}]} effect="pan" delay={30*i}><Pressable key={option.title} onPress={()=>openScreen(option.screen)}><Option key={option.title} {...option} Device={Device}></Option></Pressable></Transitionview>
                )
            }
            </View>
            <View style={[GeneralStyles.logout_wrapper]}>
                <Pressable onPress={logout} style={[GeneralStyles.logout,{borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}]}><Text style={[GeneralStyles.logout,styles[Device].logout,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Logout</Text></Pressable>
            </View>
            {/* <View style={[GeneralStyles.logout_wrapper]}>
                <Pressable onPress={deleteWarning} style={[GeneralStyles.logout,{borderWidth:0,borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}]}><Text style={[GeneralStyles.logout,styles[Device].delete_account,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Medium}]}>Delete Account?</Text></Pressable>
            </View> */}
        </View>
    )
}

const Option=(props:{icon:string,title:string,Device:keyof typeof styles})=>{

    return(
        <View style={[GeneralStyles.option_wrapper]}>
            <Image source={props.icon} style={[styles[props.Device].option_icon]}></Image>
            <Text style={[styles[props.Device].options_text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text>
        </View>
    )
}


export default Profile