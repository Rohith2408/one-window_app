import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Recommendation } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import React, { useRef, useState } from "react"
import { getDevice, setWordCase } from "../../utils"
import upload_icon from '../../assets/images/misc/upload.png'
import go_icon from '../../assets/images/misc/back.png'
import loading_gif from '../../assets/images/misc/loader.gif'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        padding:10
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"row",
        flex:1,
        gap:7
    },
    icon_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:'center'
    },
    info_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        gap:10,
    },
    actions_wrapper:{
        display:'flex',
        flexDirection:"column"
    },
    status:{
        position:"absolute",
        display:'flex',
        flexDirection:"row",
        gap:5,
        alignItems:'center'
    }
})
const TabStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:13
    },
    category:{
        fontSize:12
    },
    intake:{
        fontSize:11
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:13
    },
    category:{
        fontSize:12
    },
    intake:{
        fontSize:11
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:6,
        height:6,
        resizeMode:"contain"
    },
    loading_gif:{
        width:16,
        height:16,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    name:{
        lineHeight:22,
        fontSize:14
    },
    category:{
        fontSize:12
    },
    intake:{
        fontSize:13
    },
    icon:{
        width:18,
        height:18,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    },
    loading_gif:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:14
    },
    category:{
        fontSize:12
    },
    intake:{
        fontSize:11
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:8,
        height:8,
        resizeMode:"contain"
    },
    loading_gif:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Recommendationcard=React.memo((props:Recommendation & {index:number})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translate=useRef(new Animated.Value(0)).current
    const [isLoading,setIsloading]=useState(false);

    const showProgram=()=>{
        //setIsloading(true);
        navigate?navigate({type:"AddScreen",payload:{screen:"Program",params:{programid:props.course._id}}}):null
        //setIsloading(false);
    }

    const animate=(y:number)=>{
        Animated.spring(translate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    //console.log("rec",JSON.stringify(props,null,2))

    return(
        <Pressable onPress={!isLoading?showProgram:null}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={[GeneralStyles.icon_wrapper]}>
                    <Image source={props.course.university.logoSrc} style={[styles[Device].icon]}/>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height-5)} style={[GeneralStyles.status,styles[Device].status,{transform:[{translateY:translate}]}]}>
                        <View style={{width:5,height:5,borderRadius:10,backgroundColor:"#69FF6F"}}></View>
                        <Text style={[styles[Device].category,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{setWordCase(props.course.studyLevel)}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].name,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.course.name}</Text>
                    <View style={{alignSelf:"flex-start",borderRadius:10,padding:5,display:"flex",alignItems:"center",flexDirection:"row",gap:5,backgroundColor:props.possibilityOfAdmit=="Safe"?Themes.Light.OnewindowPurple(1):props.possibilityOfAdmit=="Moderate"?Themes.Light.OnewindowYellow(1):Themes.Light.OnewindowRed(1)}}>
                        <Image style={[styles[Device].clock_icon]} source={upload_icon} />
                        <Text style={[styles[Device].intake,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.course.university.name}</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                {
                    isLoading
                    ?
                    <Image source={loading_gif} style={[styles[Device].loading_gif]}/>
                    :
                    <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
                }
                </View>
            </View>
        </Pressable>
    )
})

export default Recommendationcard