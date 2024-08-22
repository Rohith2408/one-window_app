import { LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { WorkExperience } from "../../types"
import { useRef, useState } from "react"
import Loadingview from "../resources/Loadingview"
import clock_icon from '../../assets/images/misc/clock.png'
import suitcase_icon from '../../assets/images/misc/workexperience.png'
import { Image } from "expo-image"
import { Word2Sentence, formatDate, getDevice, profileUpdator } from "../../utils"
import { Fonts, Themes } from "../../constants"
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { store } from "../../store"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setWorkExperience } from "../../store/slices/workexperienceSlice"
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        position:"relative"
    },
    sub_wrapper:{
        display:'flex',
        flexDirection:'row'
    },
    icon_wrapper:{
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    info_wrapper:{
        display:'flex',
        flexDirection:"column",
        alignItems:'flex-start',
        justifyContent:'center',
        gap:7,
        maxWidth:"85%"
    },
    timeline_wrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        gap:7
    },
    ongoing_wrapper:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:7,
        paddingRight:7,
        borderRadius:100
    },
    actions_wrapper:{
        position:'absolute',
        display:'flex',
        flexDirection:'row',
        gap:10,
        right:0,
        top:0,
        padding:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    wrapper:{
        gap:10,
        padding:15,
        borderRadius:20
    },
    sub_wrapper:{
        gap:10
    },
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    title:{
        fontSize:16
    },
    info:{
        fontSize:11,
    },
    ongoing:{
        fontSize:10
    },
    timeline:{
        fontSize:12
    },
    clock_icon:{
        width:12,
        height:12,
        resizeMode:'contain'
    },
    delete_icon:{
        width:14,
        height:14,
        objectFit:'contain'
    }
})
const MobileMStyles=StyleSheet.create({
    wrapper:{
        gap:10,
        padding:15,
        borderRadius:15
    },
    sub_wrapper:{
        gap:10
    },
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    title:{
        fontSize:20
    },
    info:{
        fontSize:11,
    },
    ongoing:{
        fontSize:11
    },
    timeline:{
        fontSize:12
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

const Workexperiencecard=(props:{data:WorkExperience})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useAppDispatch()
    const [path,navigate]=useNavigation()

    const remove=async ()=>{
        let workexperiences=store.getState().workexperience.data
        setIsLoading(true);
        await profileUpdator({workExperience:workexperiences.filter((item)=>item._id!=props.data._id)},(res)=>dispatch(setWorkExperience(res.data.workExperience)))
        setIsLoading(false)
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Workexperience",forminitialdataid:props.data._id}}}):null
    }

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}}>
        {
            dimensions
            ?
            <View style={[GeneralStyles.wrapper,styles[Device].wrapper,{backgroundColor:Themes.Light.OnewindowLightBlue}]}>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable onPress={edit}><Image source={edit_icon} style={[styles[Device].delete_icon]}></Image></Pressable>
                    <Pressable onPress={()=>!isLoading?remove():null}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]}></Image></Pressable>
                </View>
                <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper]}>
                    <View style={[GeneralStyles.icon_wrapper]}><Image source={suitcase_icon} style={[styles[Device].icon]}></Image></View>
                    <View style={[GeneralStyles.info_wrapper]}>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.data.companyName}</Text>
                        <Text style={[styles[Device].info,GeneralStyles.info,{color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.type,props.data.sector,props.data.designation],""," | ",true)}</Text>
                        <View style={[GeneralStyles.ongoing_wrapper,{backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}]}><Text style={[styles[Device].ongoing,{color:'white',fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.data.Ongoing?"Ongoing":"Completed"}</Text></View>
                    </View>
                </View>
                <View style={[GeneralStyles.timeline_wrapper]}>
                    <Image source={clock_icon} style={[styles[Device].clock_icon]}></Image>
                    <Text style={[styles[Device].timeline,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{formatDate(props.data.startDate)+" - "+formatDate(props.data.endDate)}</Text>
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Workexperiencecard