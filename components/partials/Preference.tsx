import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { getBasket } from "../../constants/basket"
import { ListItem, PreferenceInfo } from "../../types";
import { useRef, useState } from "react";
import Listselection from "../resources/Listselection";
import { preferences } from "../../constants/preferences";
import { getDevice } from "../../utils";
import { Fonts, Themes } from "../../constants";
import { useAppSelector } from "../../hooks/useAppSelector";
import { store } from "../../store";
import delete_icon from '../../assets/images/misc/delete-black.png'
import { Image } from "expo-image";

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    text:{
        fontSize:12
    },
    heading:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    text:{
        fontSize:14
    },
    heading:{
        fontSize:16
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

const Preference=(props:{preferenceid:string})=>{

    let info:PreferenceInfo=preferences.find((item)=>item.id==props.preferenceid);
    //",props,info)
    const preference=useAppSelector((state)=>info.getInitialData(state.preferences.data))
    const Card=info.options.card
    const Device=useRef<keyof typeof styles>(getDevice()).current
    console.log("pres",preference);

    const selection=async (data:ListItem[])=>{
        console.log("setting",data);
        let res=await info.serverCommunicator(info.dataConverter(data));
        console.log("resss",JSON.stringify(res,null,2));
        res.success?info.responseHandler(res.data.preference):null
    }

    const deleteItem=async (data:ListItem)=>{
        let res=await info.serverCommunicator(info.dataConverter(preference.filter((item)=>item.label!=data.label)));
        res.success?info.responseHandler(res.data.preference):null
        //setPreference(preference.filter((item)=>info.options.idExtractor(item)!=info.options.idExtractor(data)))
    }

    console.log("prefe value",preference)
    

    return(
        <View style={{flex:1,gap:20}}>
            <View>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Selected</Text>
                <ScrollView>
                {
                    preference.map((item:ListItem)=>
                    <View style={{padding:10,flexDirection:'row'}}>
                        <View style={{flex:1}}><Card {...item}/></View>
                        <Pressable onPress={()=>deleteItem(item)}>
                            <Image style={{width:14,height:14,resizeMode:'contain'}} source={delete_icon}/>
                        </Pressable>
                    </View>
                    )
                }
                </ScrollView>
            </View>
            <View>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>All</Text>
                <Listselection
                {...{
                    direction:"vertical",
                    selectionStyle:"tick",
                    styles:{contentcontainer:{gap:10}},
                    onselection:selection,
                    initialSelection:info.getInitialData(),
                    options:info.options}}
                />
            </View>
        </View>
    )

}

export default Preference