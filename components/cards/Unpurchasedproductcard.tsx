import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Meeting, Product, ServerResponse } from "../../types"
import meeting_icon from '../../assets/images/misc/meeting.png'
import { Image } from "expo-image"
import { useRef, useState } from "react"
import { Word2Sentence, formatDate, formatTime, getDevice, getServerRequestURL, getThemeColor, serverRequest, setWordCase } from "../../utils"
import delete_icon from '../../assets/images/misc/delete.png'
import loader from '../../assets/images/misc/loader.gif'
import edit_icon from '../../assets/images/misc/edit.png'
import { Fonts, Themes } from "../../constants"
import clock_icon from '../../assets/images/misc/date.png'
import products_icon from '../../assets/images/misc/products.png'
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { updateMeeting } from "../../store/slices/meetingsSlice"
import loading_gif from '../../assets/images/misc/loader.gif'

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        // padding:5
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
        gap:0,
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
    },
    icon_bg:{
        position:"absolute"
    }
})

const TabStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:17
    },
    category:{
        fontSize:16
    },
    intake:{
        fontSize:15
    },
    icon:{
        width:36,
        height:36,
        resizeMode:"contain",
        borderRadius:100
    },
    icon_bg:{
        width:24,
        height:24,
        left:-5,
        top:5,
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    loader:{
        width:20,
        height:20,
        resizeMode:"contain",
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
        fontSize:10
    },
    icon:{
        width:28,
        height:28,
        resizeMode:"contain",
        borderRadius:100
    },
    icon_bg:{
        width:20,
        height:20,
        left:-3,
        top:3,
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    loader:{
        width:16,
        height:16,
        resizeMode:"contain",
    }
})

const MobileMStyles=StyleSheet.create({
    name:{
        lineHeight:22,
        fontSize:15
    },
    category:{
        fontSize:14
    },
    intake:{
        fontSize:13
    },
    icon:{
        width:32,
        height:32,
        resizeMode:"contain",
        borderRadius:100
    },
    icon_bg:{
        width:28,
        height:28,
        left:-5,
        top:5,
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    loader:{
        width:16,
        height:16,
        resizeMode:"contain",
    }
})

const MobileLStyles=StyleSheet.create({
    name:{
        lineHeight:22,
        fontSize:15
    },
    category:{
        fontSize:14
    },
    intake:{
        fontSize:13
    },
    icon:{
        width:32,
        height:32,
        resizeMode:"contain",
        borderRadius:100
    },
    icon_bg:{
        width:28,
        height:28,
        left:-5,
        top:5,
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    loader:{
        width:18,
        height:18,
        resizeMode:"contain",
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Unpurchasedproductscard=(props:{data:Product,index:number,hideDelete?:boolean,deleteHandler?:any})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translate=useRef(new Animated.Value(0)).current
    const supersetHeight=useRef().current
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false)

    const animate=(y:number)=>{
        Animated.spring(translate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }
    //console.log(props.data)

    const deleteItem=()=>{
        setIsloading(true);
        props.deleteHandler(props.data)

    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={{flex:1}}><Text style={[styles[Device].name,{color:Themes.Light.OnewindowPrimaryBlue(0.9),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.data.course.name}</Text></View>
                        <Image source={props.data.course.university.logoSrc} style={[styles[Device].icon]}/>
                    </View>
                    <Text style={[styles[Device].intake,{color:Themes.Light.OnewindowPrimaryBlue(0.5),lineHeight:22,fontFamily:Fonts.NeutrifStudio.Regular}]}>{Word2Sentence([props.data.course.name,setWordCase(props.data.category)],""," | ")}</Text>
                    <View style={{flexDirection:"row",gap:10,alignItems:"center",justifyContent:"flex-end"}}>
                        <Text style={[styles[Device].intake,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{formatDate(props.data.intake)}</Text>
                        {
                            !props.hideDelete
                            ?
                            <Pressable onPress={!isLoading?deleteItem:null} style={{display:"flex",flexDirection:"row",alignItems:"flex-end"}}>
                                <Image style={[styles[Device].loader,{resizeMode:"contain"}]} source={isLoading?loader:delete_icon}/>
                            </Pressable>
                            :
                            null
                    }
                    </View>
                </View>
                {/* <View style={[GeneralStyles.icon_wrapper]}>
                    <View style={[GeneralStyles.icon_bg,styles[Device].icon_bg,{backgroundColor:getThemeColor(props.index)}]}></View>
                    <Image source={props.data.course.university.logoSrc} style={[styles[Device].icon]}/>
                </View> */}
            </View>
        </View>
    )

}


export default Unpurchasedproductscard