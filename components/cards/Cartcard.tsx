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
import { Fonts, Themes } from "../../constants"
import delete_icon from '../../assets/images/misc/delete-black.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        // width:"100%",
        // height:"100%",
        padding:10,
        backgroundColor:'white',
        borderRadius:30,
        display:"flex",
        flexDirection:"column",
        gap:25,
        position:"relative",
        zIndex:1
    },
    bg_wrapper:{
        position:"absolute",
        width:"110%",
        height:"110%",
        borderRadius:30,
        top:10,
        zIndex:-1
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
        justifyContent:"center",
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    main_wrapper:{

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
        fontSize:11
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
        fontSize:11
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
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="removeFromCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
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

    console.log(props.category)

    return(
        <View style={[GeneralStyles.main_wrapper,{backgroundColor:getThemeColor(props.index)},{elevation:4,shadowColor:"black",shadowOpacity:0.1,shadowRadius:5,shadowOffset:{width:3,height:5}}]}>
            {/* <View style={[GeneralStyles.bg_wrapper,{backgroundColor:getLightThemeColor(props.index)}]}></View> */}
            <View style={[GeneralStyles.superset_wrapper]}>
                <View style={{borderRadius:100,borderWidth:1,borderColor:"white"}}>
                    <Text style={[GeneralStyles.superset_text,styles[Device].superset_text,{color:"white",padding:5}]}>{setWordCase(props.category)}</Text>
                </View>
                <Pressable onPress={deleteItem}>
                    <Image style={{width:14,height:14,resizeMode:'contain'}} source={delete_icon}/>
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
            <View style={[GeneralStyles.footer_wrapper]}><Text style={[styles[Device].footer,{fontFamily:Fonts.NeutrifStudio.Regular}]}>{"Intake - "+formatDate(props.intake)}</Text></View>
        </View>
    )

}

export default Cartcard