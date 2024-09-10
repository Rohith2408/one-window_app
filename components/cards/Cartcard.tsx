import { Pressable, StyleSheet, Text, View } from "react-native"
import { CartItem, Event, ServerResponse } from "../../types"
import { useEffect, useRef, useState } from "react"
import { requests } from "../../constants/requests"
import { formatDate, getDevice, getLightThemeColor, getThemeColor, setWordCase } from "../../utils"
import { addToBasket, removeFromBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import Loader from "../resources/Loader"
import { Image } from "expo-image"
import go_icon from '../../assets/images/misc/back.png'
import loader from '../../assets/images/misc/loader.gif'
import { Fonts, Themes } from "../../constants"
import delete_icon from '../../assets/images/misc/delete-black.png'

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
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"column",
        flex:1,
        alignSelf:"stretch",
        padding:10
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
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    main_wrapper:{

    },
    sub_wrapper:{
        gap:20,
        borderRadius:25
    },
    bg_wrapper:{
        borderRadius:25,
        left:15,
        top:15,
    },
    superset_text:{
        fontSize:10
    },
    icon:{
        width:24,
        height:24,
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
        fontSize:13
    },
    sub_wrapper:{
        gap:20,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:12,
        top:12,
    },
    icon:{
        width:24,
        height:24,
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

const MobileLStyles=StyleSheet.create({
    superset_text:{
        fontSize:12
    },
    icon:{
        width:20,
        height:20,
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

    const showIntakes=()=>{
        let dropdowndata={
            list:props?.course.startDate,
            onselection:updateItem,
            selected:props.intake
        }
        addToBasket("intakes-dropdownoptions",dropdowndata);
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intake",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
    }

    const deleteItem=async ()=>{
        let data={
            action:"remove",
            itemId:props._id
        }
        setIsloading(true);
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="removeFromCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                setIsloading(false);
                requestInfo?.responseHandler(serverRes);
            }
        }
        return serverRes?.success
    }

    const updateItem=async (event:Event)=>{
        let data={
            action:"update",
            itemId:props._id,
            courseId:props.course._id,
            intake:(event.data.month).padStart(2, '0')+"/"+"10"+"/"+event.data.year
        }
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="updateCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        return serverRes
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
                        <Image style={{width:14,height:14,resizeMode:'contain'}} source={isLoading?loader:delete_icon}/>
                    </Pressable>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.info_subwrapper]}>
                        <Image style={[styles[Device].icon,{borderRadius:100}]} source={props.course.university.logoSrc}/>
                        <Text style={[styles[Device].course_name,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.course.name}</Text>
                        <Text style={[styles[Device].uni_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.course.university.name}</Text>
                    </View>
                    <View style={{display:"flex",flexDirection:"row",alignItems:'center',transform:[{scaleX:-1}]}}><Image source={go_icon} style={[styles[Device].go_icon]}/></View>
                </View>
                <View style={[GeneralStyles.footer_wrapper]}><Text style={[styles[Device].footer,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{"Intake - "+formatDate(props.intake)}</Text></View>
            </View>
        </View>
    )

}

export default Cartcard