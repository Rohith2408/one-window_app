import { Pressable, StyleSheet, Text, View } from "react-native"
import { CourseListObj, UniversityListObj } from "../../types"
import { useRef } from "react"
import { Word2Sentence, getDevice, getLightThemeColor, getThemeColor } from "../../utils"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import go_icon from '../../assets/images/misc/back.png'
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:10,
        position:"relative"
    },
    bg_wrapper:{
        position:"absolute",
        width:"100%",
        height:"100%",
        zIndex:-1,
        transform:[{rotate:"0.75deg"}]
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"column",
        flex:1,
        alignSelf:"stretch",
        padding:10
    },
    info_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        padding:5,
        paddingBottom:25,
        gap:7
    },
    important_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    misc_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    sub_wrapper:{
        gap:25,
        borderRadius:40
    },
    bg_wrapper:{
        borderRadius:40,
        left:15,
        top:15,
    },
    name:{
        fontSize:18,
        lineHeight:26
    },
    icon:{
        width:20,
        height:20,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_name:{
        fontSize:16,
        lineHeight:22
    },
    misc:{
        fontSize:16
    },
    important:{
        fontSize:16
    },
    stem_banner_text:{
        fontSize:12
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    sub_wrapper:{
        gap:5,
        borderRadius:20
    },
    bg_wrapper:{
        borderRadius:20,
        left:15,
        top:15,
    },
    name:{
        fontSize:14,
        lineHeight:18
    },
    icon:{
        width:16,
        height:16,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_name:{
        fontSize:12,
        lineHeight:18
    },
    misc:{
        fontSize:12
    },
    important:{
        fontSize:10
    },
    stem_banner_text:{
        fontSize:9
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    sub_wrapper:{
        gap:7,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:15,
        top:15,
    },
    name:{
        fontSize:16,
        lineHeight:24
    },
    icon:{
        width:18,
        height:18,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_name:{
        fontSize:14,
        lineHeight:20
    },
    misc:{
        fontSize:14
    },
    important:{
        fontSize:10
    },
    stem_banner_text:{
        fontSize:10
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    sub_wrapper:{
        gap:7,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:15,
        top:15,
    },
    name:{
        fontSize:16,
        lineHeight:24
    },
    icon:{
        width:18,
        height:18,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_name:{
        fontSize:14,
        lineHeight:20
    },
    misc:{
        fontSize:14
    },
    important:{
        fontSize:10
    },
    stem_banner_text:{
        fontSize:10
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Universitycard=(props:UniversityListObj & {index:number})=>{

    const Device=useRef(getDevice()).current
    const [path,navigate]=useNavigation()

    const openUniversity=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"University"}}):null;
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"University",params:{universityid:props._id,replaceIfExists:true}}}):null
        },100)
    }

    return(
        <Pressable onPress={openUniversity} style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.bg_wrapper,styles[Device].bg_wrapper,{backgroundColor:getThemeColor(props.index%4)}]}></View>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper,{backgroundColor:getLightThemeColor(props.index%4)}]}>
                <View style={[GeneralStyles.important_wrapper]}>
                {

                }
                {
                    props.stemDetails?.stem
                    ?
                    <Banner color="#FF9900" text="STEM"/>
                    :
                    null
                }
                </View> 
                <View style={{flexDirection:'row',gap:5}}>
                    <View style={[GeneralStyles.info_wrapper]}>
                        <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.name}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
                            <Image source={props.logoSrc} style={[styles[Device].icon]}/>
                            <Text style={[styles[Device].uni_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([props.location.city,props.location.state,props.location.country])}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",alignItems:'center'}}><Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/></View>
                </View>
                <View style={[GeneralStyles.misc_wrapper]}>
                    <Text style={[styles[Device].misc,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{Word2Sentence([props.acceptanceRate?(props.acceptanceRate+" Acceptence"):undefined,props.graduationRate?(props.graduationRate+" Graduation Rate"):"No Info",props.courses?(props.courses+" Courses"):"No Info"],"","|")}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const Banner=(props:{text:string,color:string})=>{

    const Device=useRef(getDevice()).current

    return(
        <View style={[{backgroundColor:"#FFDAA1",borderRadius:100}]}><Text style={[{color:props.color,fontFamily:Fonts.NeutrifStudio.Regular,padding:3,paddingLeft:15,paddingRight:15},styles[Device].stem_banner_text]}>{props.text}</Text></View>
    )
}


export default Universitycard