import { StyleSheet, Text, View } from "react-native"
import { Advisor } from "../../types"
import { Word2Sentence, camelCaseToString, getDevice, getLightThemeColor, getThemeColor, setWordCase } from "../../utils"
import { Image } from "expo-image"
import { useRef } from "react"
import expert_icon from '../../assets/images/misc/expert.png'
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:5,
        borderRadius:30,
        display:"flex",
        flexDirection:"column",
        gap:20,
        position:"relative"
    },
    bg_wrapper:{
        position:"absolute",
        width:"100%",
        height:"100%",
        zIndex:-1,
        transform:[{rotate:"1deg"}]
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"column",
        flex:1,
        alignSelf:"stretch",
        padding:15
    },
    superset_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"flex-end",
        gap:10
    },
    info_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    },
    info_subwrapper:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        flex:1,
        gap:10
    },
    footer_wrapper:{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-end",
        gap:5
    }
})

const TabStyles=StyleSheet.create({
    superset_text:{
        fontSize:12
    },
    sub_wrapper:{
        gap:25,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:10,
        top:10,
    },
    icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:16
    },
    uni_name:{
        fontSize:14
    },
    footer:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
    main_wrapper:{

    },
    sub_wrapper:{
        gap:15,
        borderRadius:25
    },
    bg_wrapper:{
        borderRadius:25,
        left:8,
        top:8,
    },
    superset_text:{
        fontSize:9
    },
    icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:14
    },
    uni_name:{
        fontSize:12
    },
    footer:{
        fontSize:12
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    superset_text:{
        fontSize:10
    },
    sub_wrapper:{
        gap:20,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:10,
        top:10,
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:14
    },
    uni_name:{
        fontSize:13
    },
    footer:{
        fontSize:13
    }
})

const MobileLStyles=StyleSheet.create({
    superset_text:{
        fontSize:11
    },
    sub_wrapper:{
        gap:10,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:10,
        top:10,
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:15
    },
    uni_name:{
        fontSize:13
    },
    footer:{
        fontSize:13
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Expertcard=(props:Advisor & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    console.log(props.assignedCountries,props.info.firstName,props.info.role)
    
    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.bg_wrapper,styles[Device].bg_wrapper,{backgroundColor:getThemeColor(props.index%4)}]}></View>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper,{backgroundColor:getLightThemeColor(props.index%4)}]}>
                <View style={[GeneralStyles.superset_wrapper]}>
                    <View style={{borderRadius:100,backgroundColor:getThemeColor(props.index%4)}}>
                        <Text style={[GeneralStyles.superset_text,styles[Device].superset_text,{color:"rgba(0,0,0,0.3)",fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>{Word2Sentence(camelCaseToString(props.info.role),"","",true)}</Text>
                    </View>
                    {/* <Pressable onPress={!isLoading?deleteItem:null}>
                        <Image style={{width:14,height:14,resizeMode:'contain'}} source={isLoading?loader:delete_icon}/>
                    </Pressable> */}
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.info_subwrapper]}>
                        <Text style={[styles[Device].course_name,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{setWordCase(props.info.firstName)+" "+setWordCase(props.info.lastName)}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
                            {/* <Image style={[styles[Device].icon,{borderRadius:100}]} source={props.course.university.logoSrc}/> */}
                            <Text style={[styles[Device].uni_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.info.email}</Text>
                        </View>
                    </View>
                    {/* <View style={{display:"flex",flexDirection:"row",alignItems:'center',transform:[{scaleX:-1}]}}><Image source={go_icon} style={[styles[Device].go_icon]}/></View> */}
                </View>
                {
                    props.assignedCountries.length>0
                    ?
                    <View style={[GeneralStyles.footer_wrapper]}>
                        <Text style={[styles[Device].footer,{fontFamily:Fonts.NeutrifStudio.Regular,color:"grey"}]}>Assigned for:</Text>
                        <Text style={[styles[Device].footer,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{Word2Sentence(props.assignedCountries,"",",",true)}</Text>
                    </View>
                    :
                    null
                }
            </View>
        </View>
    )
    
}

export default Expertcard