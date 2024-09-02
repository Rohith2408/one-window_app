import { Pressable, StyleSheet, Text, View } from "react-native"
import { CourseListObj } from "../../types"
import { useRef } from "react"
import { Word2Sentence, getDevice } from "../../utils"
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
        padding:10
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
    
})

const MobileSStyles=StyleSheet.create({
    sub_wrapper:{
        gap:5,
        borderRadius:20
    },
    name:{
        fontSize:12,
        lineHeight:18
    },
    icon:{
        width:22,
        height:22,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_name:{
        fontSize:11
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
    name:{
        fontSize:14,
        lineHeight:20
    },
    icon:{
        width:24,
        height:24,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_name:{
        fontSize:12
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
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Programcard=(props:CourseListObj & {index:number})=>{

    const Device=useRef(getDevice()).current
    const [path,navigate]=useNavigation()

    const openProgram=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Program",params:{programid:props._id}}}):null
    }

    return(
        <Pressable onPress={openProgram} style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper,{elevation:4,shadowColor:"black",shadowOpacity:0.15,shadowRadius:5,shadowOffset:{width:5,height:5}},{backgroundColor:props.index%4==0?Themes.Light.OnewindowRed(0.7):props.index%4==1?Themes.Light.OnewindowPurple(0.7):props.index%4==2?Themes.Light.OnewindowTeal(0.7):props.index%4==3?Themes.Light.OnewindowYellow(0.7):""}]}>
                <View style={[GeneralStyles.important_wrapper]}>
                {

                }
                {/* {
                    props.stemDetails?.stem
                    ?
                    <Banner color="#FF9900" text="STEM"/>
                    :
                    null
                } */}
                </View> 
                <View style={{flexDirection:'row',gap:5}}>
                    <View style={[GeneralStyles.info_wrapper]}>
                        <Image source={props.university.logoSrc} style={[styles[Device].icon]}/>
                        <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.name}</Text>
                        <Text style={[styles[Device].uni_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.university.name}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:'center'}}><Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/></View>
                </View>
                <View style={[GeneralStyles.misc_wrapper]}>
                    <Text style={[styles[Device].misc,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{Word2Sentence([props.duration?props.duration.toString()+" Months":"",props.studyLevel,props.studyMode?Word2Sentence(props.studyMode):""],"","|")}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const Banner=(props:{text:string,color:string})=>{

    const Device=useRef(getDevice()).current

    return(
        <View style={[{backgroundColor:"#FFDAA1",borderRadius:100}]}><Text style={[{color:props.color,fontFamily:Fonts.NeutrifStudio.Bold,padding:3,paddingLeft:15,paddingRight:15},styles[Device].stem_banner_text]}>{props.text}</Text></View>
    )
}


export default Programcard