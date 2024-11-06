import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { EducationHistory as  EducationHistoryType , EducationHistory_Plus2, EducationHistory_PostGraduation, EducationHistory_School, EducationHistory_UnderGraduation, Request, ServerResponse} from "../../types"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import Nestedview from "../resources/Nestedview"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import add_icon from '../../assets/images/misc/add.png'
import date_icon from '../../assets/images/misc/calendar.png'
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import school_icon from '../../assets/images/education/school.png'
import inter_icon from '../../assets/images/education/intermediate.png'
import ug_icon from '../../assets/images/education/ug.png'
import pg_icon from '../../assets/images/education/pg.png'
import info_icon from '../../assets/images/misc/info.png'
import location_icon from '../../assets/images/misc/location.png'

import useNavigation from "../../hooks/useNavigation"
import { Word2Sentence, formatDate, getDevice, profileUpdator } from "../../utils"
import { store } from "../../store"
import { setEducationHistory } from "../../store/slices/educationHistorySlice"
import { useRef, useState } from "react"
import { Fonts, Themes, setComponentInfo } from "../../constants"
import { addToBasket } from "../../constants/basket"

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
    title:{
        position:'absolute',
        top:0,
        left:0,
    },
    nodetails_wrapper:{
        display:"flex",
        flex:1,
        gap:10,
        alignSelf:"stretch",
        flexDirection:"column",
        justifyContent:'center',
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:100
    },
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:30,
        height:30,
        resizeMode:'contain'
    },
    edit_icon:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    delete_icon:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    location_icon:{
        width:12,
        height:12,
        resizeMode:'contain'
    },
    info_icon:{
        width:12,
        height:12,
        resizeMode:'contain'
    },
    text1:{
        fontSize:18,
        lineHeight:20
    },
    text2:{
        fontSize:16
    },
    text3:{
        fontSize:16
    },
    title:{
        fontSize:14
    },
    nodetails_icon:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    nodetails:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:65
    },
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:25,
        height:25,
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
        fontSize:14,
        lineHeight:16
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
    nodetails_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    nodetails:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:90
    },
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:25,
        height:25,
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
        fontSize:16,
        lineHeight:18
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14,
        lineHeight:18
    },
    title:{
        fontSize:12
    },
    nodetails_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    nodetails:{
        fontSize:12
    }
})

const MobileLStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:100
    },
    info_wrapper:{
        gap:10
    },
    card_icon:{
        width:25,
        height:25,
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
        width:12,
        height:12,
        resizeMode:'contain'
    },
    info_icon:{
        width:12,
        height:12,
        resizeMode:'contain'
    },
    text1:{
        fontSize:16,
        lineHeight:20
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
    nodetails_icon:{
        width:15,
        height:15,
        resizeMode:'contain'
    },
    nodetails:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Educationhistory=()=>{

    const education=useAppSelector((state)=>state.educationhistory)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    

    return(
        <View style={{flex:1}}>
        {
            education.responseStatus=="recieved"
            ?
            <View style={{flex:1,display:"flex",padding:5,flexDirection:'column',gap:50,paddingTop:30}}>
                <View><School data={education.data.school}/></View>
                <View><Intermediate data={education.data.plus2}/></View>
                <View><Undergraduation data={education.data.underGraduation}/></View>
                <View><Postgraduation data={education.data.postGraduation}/></View>
            </View>
            :
            <Loadinglistscreen cardStyles={{width:"100%",height:150}} cardGap={30} count={3} direction="vertical"/>
        }
        </View>
    )

}

const School=(props:{data:EducationHistory_School|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const add=()=>{
        setComponentInfo("Form","title","School")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"School"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,school:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        setComponentInfo("Form","title","School")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"School"}}}):null
    }

    return(
        <View>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={school_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),transform:[{translateY:titleTranslate}]}]}>School</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.data.instituteName}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon,{opacity:0.5}]} source={location_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={info_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.board,props.data.gradingSystem,props.data.totalScore],"","|")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={school_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>School</Text>
                    {/* <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={add}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View> */}
                </View>
                <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={add}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
            </View>
        }
        </View>
    )

}

const Intermediate=(props:{data:EducationHistory_Plus2|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    // const add=(data:boolean)=>{
    //     console.log(data);
    //     navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:data?"Intermediate_completed":"Intermediate_not-completed"}}}):null
    // }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,plus2:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const openForm=(data:boolean)=>{
        setComponentInfo("Form","title","Intermediate")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:data?"Intermediate_completed":"Intermediate_not-completed"}}}):null
    }

    const openCompletedFlyer=()=>{
        addToBasket("intermediatecompleted",{callback:openForm,institute:props.data?.instituteName,initialStatus:props.data?.isCompleted==undefined?true:props.data .isCompleted})
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intermediatecompleted",flyerdata:{intermediateCompletedBasketid:"intermediatecompleted"}}}}):null
    }

    //console.log("in",props.data?.backlogs)

    return(
        <View>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),transform:[{translateY:titleTranslate}]}]}>Intermediate</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.data.instituteName,props.data.stream],"","|")}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.7}]} source={info_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>{props.data?.stream+" | "+props.data?.totalScore+" "+props.data?.gradingSystem+ (props.data.backlogs!=0?" | "+props.data.backlogs+" Backlogs":"")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon,{opacity:0.5}]} source={location_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={date_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{formatDate(props.data.startDate)+ (props.data.isCompleted?(" - "+formatDate(props.data.endDate)):"")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Intermediate</Text>
                    {/* <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View> */}
                </View>
                <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
            </View>
        }
        </View>
    )

}

const Undergraduation=(props:{data:EducationHistory_UnderGraduation|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const showInstitutes=()=>{
        addToBasket("institutions-flyer",{
            callback:add
        });
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Institutes",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,underGraduation:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    // const add=(data:boolean)=>{
    //     console.log(data);
    //     navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:data?"Undergraduation_completed":"Undergraduation_not-completed"}}}):null
    // }

    const openForm=(data:boolean)=>{
        setComponentInfo("Form","title","Undergraduation")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:data?"Undergraduation_completed":"Undergraduation_not-completed"}}}):null
    }

    const openCompletedFlyer=()=>{
        addToBasket("intermediatecompleted",{callback:openForm,institute:props.data?.instituteName,initialStatus:props.data?.isCompleted==undefined?true:props.data.isCompleted})
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intermediatecompleted",flyerdata:{intermediateCompletedBasketid:"intermediatecompleted"}}}}):null
    }

    const checkIfEmpty=(data:EducationHistory_UnderGraduation|undefined)=>{
        return (!data || Object.keys(data).length==0 || Object.keys(data).length==1 && data.custom!=undefined)?true:false
    }
    
    return(
        <View>
        {
            !checkIfEmpty(props.data)
            ?
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={ug_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.25)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1),transform:[{translateY:titleTranslate}]}]}>Undergraduation</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.data.instituteName,props.data.degreeProgram],"","|")}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={info_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data?.programMajor+" | "+props.data?.totalScore+" "+props.data?.gradingSystem}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon,{opacity:0.5}]} source={location_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={date_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{formatDate(props.data.startDate)+ (props.data.isCompleted?(" - "+formatDate(props.data.endDate)):"")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={ug_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Undergraduate</Text>
                    {/* <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View> */}
                </View>
                <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
            </View>
        }
        </View>
    )

}

const Postgraduation=(props:{data:EducationHistory_PostGraduation|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,postGraduation:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const checkIfEmpty=(data:EducationHistory_UnderGraduation|undefined)=>{
        return (!data || Object.keys(data).length==0 || Object.keys(data).length==1 && data.custom!=undefined)?true:false
    }

    // const add=(data:boolean)=>{
    //     console.log(data);
    //     navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:data?"Postgraduation_completed":"Postgraduation_not-completed"}}}):null
    // }

    const openForm=(data:boolean)=>{
        setComponentInfo("Form","title","Postgraduation")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:data?"Postgraduation_completed":"Postgraduation_not-completed"}}}):null
    }

    const openCompletedFlyer=()=>{
        addToBasket("intermediatecompleted",{callback:openForm,institute:props.data?.instituteName,initialStatus:props.data?.isCompleted==undefined?true:props.data.isCompleted})
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intermediatecompleted",flyerdata:{intermediateCompletedBasketid:"intermediatecompleted"}}}}):null
    }

    return(
        <View>
        {
            !checkIfEmpty(props.data)
            ?
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={pg_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.25)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),transform:[{translateY:titleTranslate}]}]}>Postgraduation</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.data?.instituteName,props.data?.degreeProgram],"","|")}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={info_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data?.specialization+" | "+props.data?.totalScore+" "+props.data?.gradingSystem}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon,{opacity:0.5}]} source={location_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={date_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{formatDate(props.data.startDate)+ (props.data.isCompleted?(" - "+formatDate(props.data.endDate)):"")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={pg_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Postgraduate</Text>
                    {/* <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View> */}
                </View>
                <Pressable hitSlop={{left:10,right:10,top:10,bottom:10}} onPress={openCompletedFlyer}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
            </View>
        }
        </View>
    )

}



export default Educationhistory