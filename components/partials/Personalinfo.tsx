import { useEffect, useRef } from "react"
import { Image } from "expo-image"
import { Pressable, StyleSheet, Text, View } from "react-native"
import personal_icon from '../../assets/images/profile/personalinfo/mydetails.png'
import documents_icon from '../../assets/images/profile/personalinfo/documents.png'
import address_icon from '../../assets/images/profile/personalinfo/address.png'
import work_icon from '../../assets/images/profile/personalinfo/workexperience.png'
import education_icon from '../../assets/images/profile/personalinfo/education.png'
import test_icon from '../../assets/images/profile/personalinfo/tests.png'
import go_icon from '../../assets/images/misc/back.png'
import expert_icon from '../../assets/images/profile/expert.png'
import preferences_icon from '../../assets/images/profile/preferences.png'
import { getDevice, getServerRequestURL, resetStore, serverRequest } from "../../utils"
import { Fonts, Themes, appStandardStyles, secureStoreKeys, setComponentInfo } from "../../constants"
import useNavigation from "../../hooks/useNavigation"
import * as SecureStore from 'expo-secure-store'
import { addToBasket } from "../../constants/basket"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        backgroundColor:'white',
        paddingTop:10
    },
    option_wrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        gap:7,
        padding:10
    },
    go_icon:{
        transform:[{scaleX:-1}]
    },
    logout_wrapper:{
        alignSelf:"flex-end",
        padding:10
    },
})

const TabStyles=StyleSheet.create({
    main_wrapper:{
        gap:17
    },
    option_wrapper:{
        gap:10
    },
    option_icon:{
        width:40,
        height:40,
        objectFit:'contain'
    },
    options_text:{
        fontSize:20
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:10,
        height:10,
        objectFit:'contain'
    }
})

const MobileSStyles=StyleSheet.create({
    main_wrapper:{
        gap:10
    },
    option_wrapper:{
        gap:5
    },
    option_icon:{
        width:30,
        height:30,
        objectFit:'contain'
    },
    options_text:{
        fontSize:13
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:10,
        height:10,
        objectFit:'contain'
    }
})

const MobileMStyles=StyleSheet.create({
    main_wrapper:{
        gap:15
    },
    option_wrapper:{
        gap:10
    },
    option_icon:{
        width:32,
        height:32,
        objectFit:'contain'
    },
    options_text:{
        fontSize:15
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:8,
        height:8,
        objectFit:'contain'
    }
})

const MobileLStyles=StyleSheet.create({
    main_wrapper:{
        gap:17
    },
    option_wrapper:{
        gap:10
    },
    option_icon:{
        width:34,
        height:34,
        objectFit:'contain'
    },
    options_text:{
        fontSize:16
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:8,
        height:8,
        objectFit:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Personalinfo=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const options=useRef([
        {title:"My Details",icon:personal_icon,screen:{id:"Form",title:"My Details",params:{formid:"Mydetails"}}},
        {title:"Family Details",icon:documents_icon,screen:{id:"Familydetails"}},
        {title:"Address",icon:address_icon,screen:{id:"Address"}},
        {title:"Education History",icon:education_icon,screen:{id:"Educationhistory",params:undefined}},
        {title:"Work Experience",icon:work_icon,screen:{id:"Workexperience",params:undefined}},
        {title:"Test Scores",icon:test_icon,screen:{id:"Testscores",params:undefined}},
        {title:"Documents",icon:documents_icon,screen:{id:"Documents",params:{documentstab:"Personal"}}},
    ]).current
    const [path,navigate]=useNavigation()

    const openScreen=(screen:{id:string,params:any,title?:string})=>{
        screen.id=="Form"?setComponentInfo("Form","title",screen.title):null
        navigate?navigate({type:"AddScreen",payload:{screen:screen.id,params:screen.params}}):null
    }

    const logout=async ()=>{
        await SecureStore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,"");
        resetStore();
        navigate?navigate({type:"Logout"}):null
    }

    const deleteAccount=async ()=>{
        let res=await serverRequest({
            url:getServerRequestURL("delete-account","GET"),
            reqType:"PUT"
        })
        if(res.success)
        {
            await logout();
            setTimeout(()=>{
                navigate?navigate({type:"AddScreen",payload:{screen:"Successfull",params:{message:"Account Deleted Successfully"}}}):null;
            },500)
        }
        return res.success
    }

    const deleteWarning=()=>{
        addToBasket("warning",{warningTitle:"You’re leaving?",warningMessage:"Are you sure you want to delete your account, this action can't be undone!",proceedCallback:deleteAccount,yesLabel:"Delete",noLabel:"No"});
        navigate?navigate({type:"AddScreen",payload:{screen:"Warning"}}):null;
    }

    useEffect(()=>{

    },[])

    return(
        <View style={[{flex:1,flexDirection:"column"},appStandardStyles.screenMarginMini]}>
            <View style={[GeneralStyles.main_wrapper,styles[Device].main_wrapper]}>
            {
                options.map((option)=>
                <Pressable key={option.title} onPress={()=>openScreen(option.screen)}><Option {...option} Device={Device}></Option></Pressable>
                )
            }
            </View>
            <View style={[GeneralStyles.logout_wrapper]}>
                <Pressable onPress={deleteWarning} style={[GeneralStyles.logout,{borderWidth:0,borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}]}><Text style={[GeneralStyles.logout,styles[Device].delete_account,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Medium}]}>Delete Account?</Text></Pressable>
            </View>
        </View>
    )

}

const Option=(props:{icon:string,title:string,Device:keyof typeof styles})=>{

    return(
        <View style={[GeneralStyles.option_wrapper]}>
            <Image source={props.icon} style={[styles[props.Device].option_icon]}></Image>
            <View style={{flex:1}}><Text style={[styles[props.Device].options_text,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text></View>
            <Image source={go_icon} style={[GeneralStyles.go_icon,styles[props.Device].go_icon]}></Image>
        </View>
    )
}

export default Personalinfo