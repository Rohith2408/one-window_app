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
import { Themes, disciplines} from "../../constants";
import { preferences } from "../../constants/preferences";

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
    
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    delete_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
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
        console.log(selitem);
        selected.current=selitem
        setIsloading(true)
        console.log(selitem,preferencedata);
        let serverRes=await preferencedata?.serverCommunicator(selectedPreference==selitem?undefined:selitem);
        console.log(serverRes)
        if(serverRes?.success)
        {
            preferencedata?.responseHandler(serverRes.data.preference)
        }
        setIsloading(false)
        selected.current=""
    }

    console.log("sel",selectedPreference)

    return(
        <View style={{flex:1,paddingTop:25,gap:20}}>
            {/* <TextInput placeholder="Search..." onChangeText={(txt)=>setSearch(txt)} value={search.trim()} style={{padding:10,borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}/> */}
            <ScrollView contentContainerStyle={{gap:30,paddingBottom:10}}>
            {
                allPreferences.map((item)=>
                <Pressable key={item} onPress={()=>onselect(item)} style={[GeneralStyles.card_wrapper]}>
                    <Image style={[styles[Device].icon]} source={degreepreference_icon} />
                    <View style={{flex:1}}><Text>{item}</Text></View>
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