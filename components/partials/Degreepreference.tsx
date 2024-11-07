import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import Coursepreferencecard from "../cards/Coursepreferencecard";
import { Image } from "expo-image";
import degreepreference_icon from "../../assets/images/misc/degreepreference.png"
import delete_icon from '../../assets/images/misc/delete-black.png'
import tick_icon from '../../assets/images/misc/tick.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { getDevice } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { Fonts, Themes, appStandardStyles, disciplines} from "../../constants";
import { preferences } from "../../constants/preferences";
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
        width:28,
        height:28,
        resizeMode:"contain"
    },
    delete_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    text:{
        fontSize:20
    },
    title:{
        fontSize:22
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    delete_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    text:{
        fontSize:14
    },
    title:{
        fontSize:16
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    text:{
        fontSize:16
    },
    title:{
        fontSize:18
    }
})

const MobileLStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    text:{
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

const Degreepreference=(props)=>{

    const Degrees=useRef(["Masters","Bachelors"]).current
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const selectedPreference=useAppSelector((state)=>state.preferences.data)?.degree;
    const [search,setSearch]=useState("");
    const [allPreferences,setAllPreferences]=useState(["Bachelors","Masters"]);
    const preferencedata=preferences.find((item)=>item.id=="degree");
    const [isloading,setIsloading]=useState(false)
    const selected=useRef("")

    useEffect(()=>{
        setAllPreferences(Degrees.filter((item)=>item.includes(search)))
    },[search])

    const onselect=async (selitem)=>{
        //console.log(selitem);
        selected.current=selitem
        setIsloading(true)
        //console.log(selitem,preferencedata);
        let serverRes=await preferencedata?.serverCommunicator(selectedPreference==selitem?undefined:selitem);
        //console.log(serverRes)
        if(serverRes?.success)
        {
            preferencedata?.responseHandler(serverRes.data.preference)
        }
        setIsloading(false)
        selected.current=""
    }

    console.log("sel",selectedPreference)

    return(
        <View style={{flex:1,paddingTop:20}}>
            {/* <TextInput placeholder="Search..." onChangeText={(txt)=>setSearch(txt)} value={search.trim()} style={{padding:10,borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}/> */}
            <Styledtext styles={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium},appStandardStyles.screenMarginMedium]} text="Select your preferred degree" focusWord="preferred"/>
            <ScrollView contentContainerStyle={{gap:20,padding:20}}>
            {
                allPreferences.map((item)=>
                <Pressable key={item} onPress={()=>onselect(item)} style={[GeneralStyles.card_wrapper]}>
                    <Image style={[styles[Device].icon]} source={degreepreference_icon} />
                    <View style={{flex:1}}><Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item}</Text></View>
                    {
                        isloading && item==selected.current
                        ?
                        <Image style={[styles[Device].delete_icon]} source={loading_gif} />
                        :
                        selectedPreference==item
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

export default Degreepreference