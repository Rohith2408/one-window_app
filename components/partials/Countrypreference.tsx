import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Image } from "expo-image";
import countrypreference_icon from "../../assets/images/misc/location.png"
import delete_icon from '../../assets/images/misc/delete-black.png'
import tick_icon from '../../assets/images/misc/tick.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { getDevice } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { Countries, Fonts, Themes, disciplines} from "../../constants";
import { preferences } from "../../constants/preferences";
import { getBasket } from "../../constants/basket";
import Styledtext from "../resources/Styledtext";

const GeneralStyles=StyleSheet.create({
    card_wrapper:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    }
})  

const TabStyles=StyleSheet.create({
    icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    },
    delete_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    preference:{
        fontSize:18
    },
    title:{
        fontSize:20
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    delete_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    preference:{
        fontSize:14
    },
    title:{
        fontSize:16
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    preference:{
        fontSize:16
    },
    title:{
        fontSize:18
    }
})

const MobileLStyles=StyleSheet.create({
    icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    preference:{
        fontSize:16
    },
    title:{
        fontSize:18
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Countrypreference=(props)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [search,setSearch]=useState("");
    const selectedPreferences=useAppSelector((state)=>state.preferences.data)?.country;
    const [allPreferences,setAllPreferences]=useState(Countries.map((country)=>country.name));
    const preferencedata=preferences.find((item)=>item.id=="country");
    const [isloading,setIsloading]=useState(false)
    const selected=useRef("")
    const info=getBasket("countrypreference-card");

    useEffect(()=>{
        setAllPreferences(Countries.filter((item)=>item.name.includes(search)).map((country)=>country.name))
    },[search])

    const onselect=async (selitem)=>{
        selected.current=selitem
        setIsloading(true)
        console.log(selitem,preferencedata);
        let serverRes=await preferencedata?.serverCommunicator(selectedPreferences?.find((item2)=>item2==selitem)?selectedPreferences.filter((item)=>item!=selitem):[...selectedPreferences,selitem]);
        if(serverRes?.success)
        {
            info?.eventHandler?info.eventHandler({name:"preference-selected",data:serverRes.data.preference.country,triggerBy:"Countrypeference"}):null;
            preferencedata?.responseHandler(serverRes.data.preference)
        }
        setIsloading(false)
        selected.current=""
    }

    return(
        <View style={{paddingTop:info?.eventHandler?0:25,gap:30}}>
            <Styledtext styles={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Select your preferred country" focusWord="preferred"/>
            <ScrollView persistentScrollbar contentContainerStyle={{gap:30,paddingBottom:10,paddingRight:15}}>
            {
                selectedPreferences?.map((item)=>
                <Pressable key={item} onPress={()=>onselect(item)} style={[GeneralStyles.card_wrapper]}>
                    <Image style={[styles[Device].icon]} source={countrypreference_icon} />
                    <View style={{flex:1}}><Text style={[styles[Device].preference,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item}</Text></View>
                    {
                        isloading && item==selected.current
                        ?
                        <Image style={[styles[Device].delete_icon]} source={loading_gif} />
                        :
                        <Image style={[styles[Device].delete_icon]} source={tick_icon} />
                    }
                </Pressable>
                )
            }
            {
                allPreferences.filter((item)=>!selectedPreferences?.find((item2)=>item2==item)).map((item)=>
                <Pressable key={item} onPress={()=>onselect(item)} style={[GeneralStyles.card_wrapper]}>
                    <Image style={[styles[Device].icon]} source={countrypreference_icon} />
                    <View style={{flex:1}}><Text  style={[styles[Device].preference,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item}</Text></View>
                    {
                        isloading && item==selected.current
                        ?
                        <Image style={[styles[Device].delete_icon]} source={loading_gif} />
                        :
                        selectedPreferences?.find((item2)=>item2==item)
                        ?
                        <Image style={[styles[Device].delete_icon]} source={tick_icon} />
                        :
                        null
                    }
                </Pressable>
                )
            }
            </ScrollView>
        </View>
    )
}

const Card=()=>{

}

export default Countrypreference