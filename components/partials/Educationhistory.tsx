import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { EducationHistory as  EducationHistoryType , EducationHistory_Plus2, EducationHistory_PostGraduation, EducationHistory_School, EducationHistory_UnderGraduation, Request, ServerResponse} from "../../types"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import Nestedview from "../resources/Nestedview"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import add_icon from '../../assets/images/misc/add.png'
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import school_icon from '../../assets/images/education/school.png'
import inter_icon from '../../assets/images/education/intermediate.png'
import ug_icon from '../../assets/images/education/ug.png'
import pg_icon from '../../assets/images/education/pg.png'
import info_icon from '../../assets/images/misc/info.png'
import location_icon from '../../assets/images/misc/location.png'

import useNavigation from "../../hooks/useNavigation"
import { Word2Sentence, getDevice, profileUpdator } from "../../utils"
import { store } from "../../store"
import { setEducationHistory } from "../../store/slices/educationHistorySlice"
import { useRef, useState } from "react"
import { Fonts, Themes } from "../../constants"

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
                <View style={[styles[Device].card_wrapper]}><School data={education.data.school}/></View>
                <View style={[styles[Device].card_wrapper]}><Intermediate data={education.data.plus2}/></View>
                <View style={[styles[Device].card_wrapper]}><Undergraduation data={education.data.underGraduation}/></View>
                <View style={[styles[Device].card_wrapper]}><Postgraduation data={education.data.postGraduation}/></View>
            </View>
            :
            <Loadinglistscreen cardGap={30} cardHeight={150}></Loadinglistscreen>
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
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"School"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,school:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"School"}}}):null
    }

    return(
        <View style={{flex:1}}>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
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
                    <Pressable onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>School</Text>
                    <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable onPress={add}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View>
                </View>
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

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Intermediate"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,plus2:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Intermediate"}}}):null
    }

    return(
        <View style={{flex:1}}>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),transform:[{translateY:titleTranslate}]}]}>Intermediate</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.data.instituteName,props.data.stream],"","|")}</Text>
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
                    <Pressable onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Intermediate</Text>
                    <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable onPress={add}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View>
                </View>
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

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Undergraduation"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,underGraduation:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Undergraduation"}}}):null
    }

    const checkIfEmpty=(data:EducationHistory_UnderGraduation|undefined)=>{
        return (!data || Object.keys(data).length==0 || Object.keys(data).length==1 && data.custom!=undefined)?true:false
    }
    
    return(
        <View style={{flex:1}}>
        {
            !checkIfEmpty(props.data)
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={ug_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.25)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1),transform:[{translateY:titleTranslate}]}]}>Undergraduation</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.data.instituteName,props.data.degreeProgram],"","|")}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon,{opacity:0.5}]} source={location_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={info_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.programMajor,props.data.gradingSystem,props.data.totalScore?.toString()],"","|")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Undergraduate</Text>
                    <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable onPress={add}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View>
                </View>
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

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Postgraduation"}}}):null
    }

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

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Postgraduation"}}}):null
    }

    return(
        <View style={{flex:1}}>
        {
            !checkIfEmpty(props.data)
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={ug_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.Text onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.25)} style={[styles[Device].title,GeneralStyles.title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5),transform:[{translateY:titleTranslate}]}]}>Postgraduation</Animated.Text>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.data.instituteName,props.data.degreeProgram],"","|")}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon,{opacity:0.5}]} source={location_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.city,props.data.state,props.data.country],"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon,{opacity:0.5}]} source={info_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.data.programMajor,props.data.gradingSystem,props.data.totalScore?.toString()],"","|")}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable onPress={edit} style={{flex:1}}><Image source={edit_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={inter_icon} style={[styles[Device].card_icon]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Postgraduate</Text>
                    <View style={[GeneralStyles.nodetails_wrapper]}>
                        <Pressable onPress={add}><Image style={[styles[Device].nodetails_icon]} source={add_icon}/></Pressable>
                        <Text style={[styles[Device].nodetails,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Details not added</Text>
                    </View>
                </View>
            </View>
        }
        </View>
    )

}



export default Educationhistory