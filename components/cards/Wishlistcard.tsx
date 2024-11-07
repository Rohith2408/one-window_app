import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { Event, WorkExperience, wishlistItem } from "../../types"
import { useRef, useState } from "react"
import Loadingview from "../resources/Loadingview"
import clock_icon from '../../assets/images/misc/clock.png'
import suitcase_icon from '../../assets/images/misc/workexperience.png'
import { Image } from "expo-image"
import { Word2Sentence, compareProducts, formatDate, getDevice, getMonth, profileUpdator } from "../../utils"
import { Fonts, Themes } from "../../constants"
import delete_icon from '../../assets/images/misc/delete-black.png'
import apply_icon from '../../assets/images/misc/apply.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import { store } from "../../store"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setWorkExperience } from "../../store/slices/workexperienceSlice"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import { requests } from "../../constants/requests"

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
    title_wrapper:{
        position:'absolute',
        top:0,
        left:0,
        display:"flex",
        flexDirection:"row",
        gap:5,
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    info_wrapper:{
        gap:12
    },
    card_icon:{
        width:28,
        height:28,
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
        width:14,
        height:14,
        resizeMode:'contain'
    },
    info_icon:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    text1:{
        fontSize:20
    },
    text2:{
        fontSize:16
    },
    text3:{
        fontSize:16
    },
    title:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
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
})
const MobileMStyles=StyleSheet.create({
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
        fontSize:16
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
})
const MobileLStyles=StyleSheet.create({
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
        fontSize:16
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14
    },
    title:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Wishlistcard=(props:{data:wishlistItem,index:number})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useAppDispatch()
    const [path,navigate]=useNavigation()
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const remove=async ()=>{
        setIsLoading(true);
        let data={
            action:"pull",
            courseId:props.data._id
        }
        let requestInfo=requests.find((item)=>item.id=="modify-wishlist");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        setIsLoading(false)
    }

    const addToCart=async (event:Event)=>{
        console.log("res",event);
        let data={
            action:"add",
            category:props.data?.elite?"elite application":"premium application",
            courseId:props.data._id,
            intake:(event.data.month).padStart(2, '0')+"/"+"10"+"/"+event.data.year
        }
        let requestInfo=requests.find((item)=>item.id=="addToCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
                navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
                setTimeout(()=>{
                    navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Successfull",flyerdata:{message:"Item added to cart successfully!"}}}}):null;
                },100)
            }
        }
    }

    const showIntakes=(callback:any)=>{
        let product={
            category:props.data?.elite?"elite application":"premium application",
            intake:undefined,
            course:props.data
        }
        let dropdowndata={
            list:props.data.startDate,
            onselection:callback,
            validation:{
                validator:(intake)=>!store.getState().cart.data.find((cartItem)=>compareProducts(cartItem,{...product,intake:new Date(intake.year,parseInt(intake.month)-1,1).toISOString()})),
                errorMessage:"Program with the selected intake already exists in the cart"
            }
        }
        addToBasket("intakes-dropdownoptions",dropdowndata);
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intake",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
    }

    //console.log("wishlist",props.data.discipline)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,padding:5}}>
        {
            dimensions
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={props.data.university?.logoSrc} style={[styles[Device].card_icon,{borderRadius:100}]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
                        <View style={{width:5,height:5,borderRadius:100,backgroundColor:"lightgreen"}}></View>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data.studyLevel}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.data.name}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon]} source={clock_icon}/>
                        <Text style={[styles[Device].text3,{maxWidth:"95%"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence(props.data.subDiscipline,"",",")}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon]} source={apply_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data.startDate?("Start Dates: "+Word2Sentence(props.data.startDate?.map((item)=>getMonth(item.courseStartingMonth+1,true)),"",",")):null}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <Pressable onPress={()=>showIntakes(addToCart)} style={{flex:1}}><Image source={apply_icon} style={[styles[Device].edit_icon]} /></Pressable>
                    <Pressable onPress={!isLoading?remove:undefined} style={{flex:1,display:"flex",justifyContent:"flex-end"}}><Image source={isLoading?loading_gif:delete_icon} style={[styles[Device].delete_icon]} /></Pressable>
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Wishlistcard