import { Pressable, StyleSheet, Text, View } from "react-native"
import { CartItem, Event, ServerResponse } from "../../types"
import { useEffect, useRef, useState } from "react"
import { requests } from "../../constants/requests"
import { compareProducts, formatDate, getDevice, getLightThemeColor, getThemeColor, setWordCase } from "../../utils"
import { addToBasket, removeFromBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import Loader from "../resources/Loader"
import { Image } from "expo-image"
import go_icon from '../../assets/images/misc/back.png'
import loader from '../../assets/images/misc/loader.gif'
import { Fonts, Themes } from "../../constants"
import delete_icon from '../../assets/images/misc/delete-black.png'
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
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
        gap:2
    },
    footer_wrapper:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    superset_text:{
        fontSize:16
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
        width:36,
        height:36,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:17
    },
    uni_name:{
        fontSize:14
    },
    footer:{
        fontSize:14
    },
    delete:{
        width:20,
        height:20,
        resizeMode:"contain"
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
        fontSize:10
    },
    icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:13
    },
    uni_name:{
        fontSize:11
    },
    footer:{
        fontSize:11
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    delete:{
        width:14,
        height:14,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    superset_text:{
        fontSize:13
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
        width:32,
        height:32,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:15,
        lineHeight:22
    },
    uni_name:{
        fontSize:12,
        lineHeight:20
    },
    footer:{
        fontSize:12
    },
    delete:{
        width:16,
        height:16,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    superset_text:{
        fontSize:13
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
        width:32,
        height:32,
        resizeMode:"contain"
    },
    course_name:{
        fontSize:15,
        lineHeight:22
    },
    uni_name:{
        fontSize:14
    },
    footer:{
        fontSize:13
    },
    delete:{
        width:16,
        height:16,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Cartcard=(props:CartItem & {index:number})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsloading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const deleteItem=async ()=>{
        let data={
            action:"remove",
            itemIds:[props._id]
        }
        setIsloading(true);
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="removeFromCart");
        let validation=requestInfo?.inputValidator(data);
        console.log("Res",serverRes,requestInfo);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            console.log("Server res",JSON.stringify(serverRes,null,2))
            if(serverRes?.success)
            {
                setIsloading(false);
                requestInfo?.responseHandler(serverRes);
            }
        }
        return serverRes?.success
    }

    useEffect(()=>{
        return ()=>{
            removeFromBasket("intakes-dropdownoptions")
        }
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.bg_wrapper,styles[Device].bg_wrapper,{backgroundColor:getThemeColor(props.index%4)}]}></View>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper,{backgroundColor:getLightThemeColor(props.index%4)}]}>
                <View style={[GeneralStyles.superset_wrapper]}>
                    <View style={{borderRadius:100,backgroundColor:getThemeColor(props.index%4)}}>
                        <Text style={[GeneralStyles.superset_text,styles[Device].superset_text,{color:"white",fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>{setWordCase(props.category)}</Text>
                    </View>
                    <Pressable onPress={!isLoading?deleteItem:null}>
                        <Image style={[styles[Device].delete]} source={isLoading?loader:delete_icon}/>
                    </Pressable>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.info_subwrapper]}>
                        <View style={{flexDirection:"row",alignItems:"flex-end"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].course_name,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.course.name}</Text></View>
                            <Image style={[styles[Device].icon,{borderRadius:100}]} source={props.course.university.logoSrc}/>
                        </View>
                        <Text style={[styles[Device].uni_name,{lineHeight:20,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.course.university.name}</Text>
                    </View>
                    <View style={{display:"flex",flexDirection:"row",alignItems:'center',transform:[{scaleX:-1}]}}><Image source={go_icon} style={[styles[Device].go_icon]}/></View>
                </View>
                <View style={[GeneralStyles.footer_wrapper]}><Text style={[styles[Device].footer,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{"Course Starting - "+formatDate(props.intake)}</Text></View>
            </View>
        </View>
    )

}

export default Cartcard