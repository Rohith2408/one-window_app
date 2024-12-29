import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { Address, WorkExperience } from "../../types"
import { useRef, useState } from "react"
import Loadingview from "../resources/Loadingview"
import clock_icon from '../../assets/images/misc/clock.png'
import location_icon from '../../assets/images/misc/location.png'
import { Image } from "expo-image"
import { Word2Sentence, formatDate, getDevice, profileUpdator } from "../../utils"
import { Fonts, Themes, setComponentInfo } from "../../constants"
import delete_icon from '../../assets/images/misc/delete-black.png'
import edit_icon from '../../assets/images/misc/edit-black.png'
import add_icon from '../../assets/images/misc/add.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { store } from "../../store"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setWorkExperience } from "../../store/slices/workexperienceSlice"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import { setPersonalInfo } from "../../store/slices/personalinfoSlice"


const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        paddingTop:10
    },
    card_wrapper:{

    },
    info_wrapper:{
        flex:1,
        display:'flex',
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start",
    },
    actions_wrapper:{
        display:'flex',
        flexDirection:"column",
        alignItems:"center",
        justifyContent:'center'
    },
    title_wrapper:{
        position:'absolute',
        top:0,
        left:0,
        display:"flex",
        flexDirection:"row",
        gap:5,
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    info_wrapper:{
        gap:15
    },
    card_icon:{
        width:28,
        height:28,
        resizeMode:'contain'
    },
    edit_icon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    delete_icon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    location_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    info_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    text1:{
        fontSize:17
    },
    text2:{
        fontSize:15
    },
    text3:{
        fontSize:15
    },
    title:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
    info_wrapper:{
        gap:6
    },
    card_icon:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    edit_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    delete_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    info_icon:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    text1:{
        fontSize:13
    },
    text2:{
        fontSize:11
    },
    text3:{
        fontSize:11
    },
    title:{
        fontSize:9
    },
})

const MobileMStyles=StyleSheet.create({
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    edit_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    delete_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    info_icon:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    text1:{
        fontSize:15
    },
    text2:{
        fontSize:13
    },
    text3:{
        fontSize:13
    },
    title:{
        fontSize:11
    },
})

const MobileLStyles=StyleSheet.create({
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    edit_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    delete_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    info_icon:{
        width:10,
        height:10,
        resizeMode:'contain'
    },
    text1:{
        fontSize:15
    },
    text2:{
        fontSize:13
    },
    text3:{
        fontSize:13
    },
    title:{
        fontSize:11
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Addresscard=(props:{data:Address|undefined,type:"permanent"|"temporary"})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useAppDispatch()
    const [path,navigate]=useNavigation()
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const remove=async ()=>{
        let data=props.type=="permanent"?{...store.getState().personalinfo.data,permanentAddress:undefined}:{...store.getState().personalinfo.data,temporaryAddress:undefined}
        setIsLoading(true);
        await profileUpdator({personalDetails:data},(res)=>dispatch(setPersonalInfo(res.data.personalDetails)))
        setIsLoading(false)
    }

    const openForm=()=>{
        setComponentInfo("Form","title",props.type=="permanent"?"Home Address":"Contact Address")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:props.type=="permanent"?"Permanentaddress":"Temporaryaddress"}}}):null
    }

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            props.data==undefined || Object.keys(props.data).length==0
            ?
            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                <View><Image source={location_icon} style={[styles[Device].card_icon]} /></View>
                <View style={{flex:1}}><Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.type=="permanent"?"Home Address":"Contact Address"}</Text></View>
                <Pressable onPress={openForm}><Image source={add_icon} style={[styles[Device].edit_icon]} /></Pressable>
            </View>
            :
            <View style={{flexDirection:'row',gap:5}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={location_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.5)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
                        <View style={{width:5,height:5,borderRadius:100,backgroundColor:"orange"}}></View>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.type=="permanent"?"Home Address":"Contact Address"}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.data.addressLine1+", "+(props.data.addressLine2?props.data.addressLine2:"")+", "+(props.data.addressLine3?props.data.addressLine3:"")}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        {/* <Image style={[styles[Device].location_icon]} source={edit_icon}/> */}
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")+"-"+props.data.pinCode}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openForm} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Addresscard