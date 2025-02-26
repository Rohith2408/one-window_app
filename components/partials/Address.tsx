import { Pressable, StyleSheet, Text, View } from "react-native"
import Addresscard from "../cards/Addresscard"
import { useAppSelector } from "../../hooks/useAppSelector"
import Loadinglistscreen from "../resources/Loadinglistscreen";
import useNavigation from "../../hooks/useNavigation";
import { useEffect, useRef, useState } from "react";
import { getDevice, profileUpdator } from "../../utils";
import { Fonts, Themes, appStandardStyles } from "../../constants";
import Checkbox from "../resources/Checkbox";
import { ServerResponse } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setPersonalInfo } from "../../store/slices/personalinfoSlice";
import loc_icon from '../../assets/images/misc/location2.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { Image } from "expo-image";

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        paddingTop:10
    },
    checkbox:{
        borderWidth:1.5
    }
})

const TabStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:200
    },
    checkbox:{
        width:10,
        height:10
    }
})

const MobileSStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:150
    },
    checkbox:{
        width:7,
        height:7
    }
})

const MobileMStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:170
    },
    checkbox:{
        width:15,
        height:15
    }
})

const MobileLStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:170
    },
    checkbox:{
        width:20,
        height:20
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Address=()=>{

    const personalData=useAppSelector((state)=>state.personalinfo);
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [addressesType,setAddressesType]=useState<"same"|"different">(((personalData.data?.temporaryAddress && personalData.data.permanentAddress && Object.values(personalData.data.temporaryAddress).length!=0 && Object.values(personalData.data.permanentAddress).length!=0 && JSON.stringify(personalData.data.temporaryAddress)==JSON.stringify(personalData.data.permanentAddress)))?"same":"different")
    const dispatch=useAppDispatch();
    const [loading,setLoading]=useState(false);

    //const initAddressesType=()=>(personalData.data?.temporaryAddress && personalData.data.permanentAddress && JSON.stringify(personalData.data.temporaryAddress)==JSON.stringify(personalData.data.permanentAddress))
  
    const handleAddressType=async ()=>{
        if(addressesType=="same")
        {
            setAddressesType("different");
        }
        else
        {
            if(personalData.data?.temporaryAddress && Object.values(personalData.data.temporaryAddress).length!=0)
            {
                setLoading(true);
                let res:ServerResponse=await profileUpdator({personalDetails:{...personalData.data,permanentAddress:personalData.data?.temporaryAddress}},(res)=>{
                    console.log("res",res);
                    res.success?dispatch(setPersonalInfo(res.data.personalDetails)):null
                })
                setLoading(false)
            }
            setAddressesType("same");
        }
    }

    // useEffect(()=>{
    //     if(addressesType=="same")
    //     {
    //         if(personalData.data?.temporaryAddress && Object.values(personalData.data.temporaryAddress).length>0)
    //         {
    //             profileUpdator({personalDetails:{...personalData.data,permanentAddress:personalData.data?.temporaryAddress}},(res)=>{
    //                 res.success?dispatch(setPersonalInfo(res.data.personalDetails)):null
    //             })
    //         }
    //     }
    // },[addressesType,personalData.data?.permanentAddress,personalData.data?.temporaryAddress])

    return(
        <View style={[GeneralStyles.wrapper,appStandardStyles.screenMarginMedium]}>
        {
            personalData.responseStatus=="not_recieved"
            ?
            <View style={[styles[Device].card]}>
                <Loadinglistscreen cardGap={10} count={2} visibilityCount={2} direction="vertical"/>
            </View>
            :
            <View style={{flex:1,gap:30}}>
                <View style={{flexDirection:"row",alignItems:"center",gap:0}}>
                    <View style={{flex:1,flexDirection:"row",alignItems:"flex-start",gap:7}}>
                        <Image source={loc_icon} style={{width:20,height:20,resizeMode:"contain"}}/>
                        <Text style={{maxWidth:"90%",lineHeight:22,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}}>My Home address is the same as contact address</Text>
                    </View>
                    {
                        loading
                        ?
                        <Image style={[styles[Device].checkbox,{objectFit:"contain"}]} source={loading_gif}/>
                        :
                        <Pressable onPress={handleAddressType} style={[styles[Device].checkbox,{display:"flex",alignItems:"center",justifyContent:"center",borderWidth:1,borderRadius:10,borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}>
                            <View style={{width:"65%",height:"65%",backgroundColor:addressesType=="same"?Themes.Light.OnewindowPrimaryBlue(1):"white",borderRadius:10}}></View>
                        </Pressable>
                    }
                </View>
                <View style={{flex:1,gap:40}}>
                    <Addresscard data={personalData.data?.temporaryAddress} type="temporary"/>
                    {
                        addressesType=="different"
                        ?
                        <Addresscard data={personalData.data?.permanentAddress} type="permanent"/>
                        :
                        null
                    }
                </View>
            </View>
        }
        </View>
    )
}

export default Address