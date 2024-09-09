import { useRef, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import useNavigation from "../../hooks/useNavigation"
import sample_pic from '../../assets/images/misc/sampledp.png'
import loader from '../../assets/images/misc/loader.gif'
import { getDevice, profileUpdator } from "../../utils"
import * as ImagePicker from 'expo-image-picker';
import { ServerResponse } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Image } from "expo-image"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        padding:20,
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    option:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    option:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    option:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const DPoptions=()=>{

    const options=useRef([
        {title:"View",screen:""},
        {title:"Add/Update",icon:"",screen:"Personalinfo"},
        {title:"Remove"}
    ]).current
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()
    const info=useAppSelector((state)=>state.sharedinfo.data)
    const [loading,setloading]=useState(false);

    const show=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Dp",params:{image:sample_pic}}}):null
    }

    const uploadImage=async (file:any)=>{
        let formdata=new FormData();
        formdata.append('file',file),
        formdata.append('upload_preset', "bsjf7zim")
        formdata.append("cloud_name", "dffdp7skh")
        let serverRes=await fetch("https://api.cloudinary.com/v1_1/dffdp7skh/image/upload",{
            method:"POST",
            body:formdata
        })
        let res:any=await serverRes.json()
        console.log("cloudinary response",JSON.stringify(res));
        return res
    }

    const pickImage=async ()=>{
        let result:ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
            quality: 1,
        }); 
        return result
    }

    const add=async ()=>{
        const pickerRes=await pickImage()
        if(!pickerRes.canceled && pickerRes.assets[0]){
            setloading(true)
            let file="data:image/jpg;base64,"+pickerRes.assets[0].base64
            const uploadRes:any=await uploadImage(file);
            let serverRes=await profileUpdator({displayPicSrc:uploadRes.secure_url});
            console.log("server res",serverRes);
            if(serverRes.success)
            {
                dispatch(setSharedInfo({...info,displayPicSrc:serverRes.data.displayPicSrc}))
                navigate({type:"RemoveScreen"});
            }   
            
        }
    }


    return(
        <View style={[GeneralStyles.wrapper]}>
            <Pressable onPress={show} style={[{padding:10}]}><Text  style={[styles[Device].option,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>View</Text></Pressable>
            <Pressable onPress={add} style={[{padding:10}]}>
                <View style={{display:"flex",flexDirection:'row'}}>
                    <View style={{flex:1}}><Text style={[styles[Device].option,{alignSelf:'stretch'},{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Add/Update</Text></View>
                    {
                        loading
                        ?
                        <Image style={{width:20,height:20,resizeMode:"contain"}} source={loader} />
                        :
                        null
                    }
                </View>
            </Pressable>
            <Pressable style={[{padding:10}]}><Text  style={[styles[Device].option,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Remove</Text></Pressable>
        </View>
    )

}

export default DPoptions