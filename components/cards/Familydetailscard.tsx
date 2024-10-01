import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { FamilyInfo, WorkExperience } from "../../types"
import { useRef, useState } from "react"
import Loadingview from "../resources/Loadingview"
import clock_icon from '../../assets/images/misc/clock.png'
import suitcase_icon from '../../assets/images/misc/workexperience.png'
import { Image } from "expo-image"
import { Word2Sentence, formatDate, getDevice, profileUpdator } from "../../utils"
import { Fonts, Themes } from "../../constants"
import delete_icon from '../../assets/images/misc/delete-black.png'
import edit_icon from '../../assets/images/misc/edit-black.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { store } from "../../store"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setWorkExperience } from "../../store/slices/workexperienceSlice"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import { setFamilyinfo } from "../../store/slices/familyInfoSlice"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        paddingTop:10
    },
    card_wrapper:{

    },
    icon_wrapper:{
        display:'flex',
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:'center'
    },
    info_wrapper:{
        flex:1,
        display:'flex',
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start"
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
        gap:12
    },
    card_icon:{
        width:28,
        height:28,
        resizeMode:'contain'
    },
    edit_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    delete_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    location_icon:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    info_icon:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    text1:{
        fontSize:18
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14
    },
    title:{
        fontSize:13
    }
})

const MobileSStyles=StyleSheet.create({
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:25,
        height:25,
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
        fontSize:14
    },
    text2:{
        fontSize:12
    },
    text3:{
        fontSize:12
    },
    title:{
        fontSize:10
    },
})
const MobileMStyles=StyleSheet.create({
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:25,
        height:25,
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
        fontSize:16
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14
    },
    title:{
        fontSize:12
    },
})
const MobileLStyles=StyleSheet.create({
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:25,
        height:25,
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
        fontSize:16
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14
    },
    title:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Familydetailscard=(props:{data:FamilyInfo,index:number})=>{

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
        let familydetails=store.getState().familyinfo.data
        setIsLoading(true);
        //console.log(familydetails.filter((item)=>item.RelationshipWithStudent!=props.data.RelationshipWithStudent)); 
        await profileUpdator({familyDetails:familydetails.filter((item)=>item.RelationshipWithStudent!=props.data.RelationshipWithStudent)},(res)=>dispatch(setFamilyinfo(res.data.familyDetails)))
        setIsLoading(false)
    }

    // const edit=()=>{
    //     addToBasket("currentlyworking",{callback:addWork,initialStatus:!props.data.Ongoing})
    //     navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Currentlyworking",flyerdata:{currentlyWorkingBasketid:"currentlyworking"}}}}):null
    // }

    const edit=()=>{
        //console.log(props.data.RelationshipWithStudent)
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Familydetails",forminitialdataid:props.data.RelationshipWithStudent}}}):null
    }

    //console.log("family",props.data)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,padding:5}}>
        {
            dimensions
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={suitcase_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
                        <View style={{width:5,height:5,borderRadius:100,backgroundColor:"green"}}></View>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data.RelationshipWithStudent}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.data.GuardianFirstName+" "+props.data.GuardianLastName}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon]} source={edit_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.GuardianEmail,props.data.GuardianContactNumber.countryCode+props.data.GuardianContactNumber.number],"","|")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon]} source={clock_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.GuardianQualification,props.data.GuardianOccupation],"","|")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Familydetailscard