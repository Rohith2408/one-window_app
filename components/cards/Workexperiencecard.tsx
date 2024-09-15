import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { WorkExperience } from "../../types"
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

const Workexperiencecard=(props:{data:WorkExperience,index:number})=>{

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
        let workexperiences=store.getState().workexperience.data
        setIsLoading(true);
        await profileUpdator({workExperience:workexperiences.filter((item)=>item._id!=props.data._id)},(res)=>dispatch(setWorkExperience(res.data.workExperience)))
        setIsLoading(false)
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Workexperience",forminitialdataid:props.data._id}}}):null
    }

    //console.log("ids",props.data)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,padding:5}}>
        {
            dimensions
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={suitcase_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
                        <View style={{width:5,height:5,borderRadius:100,backgroundColor:props.data.Ongoing?"lightblue":"green"}}></View>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data.Ongoing?"Ongoing":"Completed"}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.data.companyName}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon]} source={edit_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.sector,props.data.type,props.data.designation],"","|")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon]} source={clock_icon}/>
                        {
                            props.data.Ongoing
                            ?
                            <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{formatDate(props.data.startDate)}</Text>
                            :
                            <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([formatDate(props.data.startDate),formatDate(props.data.endDate)],"","-")}</Text>
                        }
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            // <View style={[GeneralStyles.wrapper,styles[Device].wrapper,{backgroundColor:props.index%2==0?Themes.Light.OnewindowRed(0.5):Themes.Light.OnewindowYellow(0.5)}]}>
            //     <View style={[GeneralStyles.actions_wrapper]}>
            //         <Pressable onPress={edit}><Image source={edit_icon} style={[styles[Device].delete_icon]}></Image></Pressable>
            //         <Pressable onPress={()=>!isLoading?remove():null}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]}></Image></Pressable>
            //     </View>
            //     <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper]}>
            //         <View style={[GeneralStyles.icon_wrapper]}><Image source={suitcase_icon} style={[styles[Device].icon]}></Image></View>
            //         <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
            //             <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold}]}>{props.data.companyName}</Text>
            //             <Text style={[styles[Device].info,GeneralStyles.info,{color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.type,props.data.sector,props.data.designation],""," | ",true)}</Text>
            //             <View style={[GeneralStyles.ongoing_wrapper,{backgroundColor:props.index%2==0?Themes.Light.OnewindowRed(0.6):Themes.Light.OnewindowYellow(0.6)}]}><Text style={[styles[Device].ongoing,{color:'white',fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.data.Ongoing?"Ongoing":"Completed"}</Text></View>
            //         </View>
            //     </View>
            //     <View style={[GeneralStyles.timeline_wrapper]}>
            //         <Image source={clock_icon} style={[styles[Device].clock_icon]}></Image>
            //         <Text style={[styles[Device].timeline,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{formatDate(props.data.startDate)+" - "+formatDate(props.data.endDate)}</Text>
            //     </View>
            // </View>
            :
            null
        }
        </View>
    )

}

export default Workexperiencecard