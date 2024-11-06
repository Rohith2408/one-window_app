import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { Event, Order, WorkExperience, wishlistItem } from "../../types"
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
import products_icon from '../../assets/images/misc/products.png'

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
        fontSize:15
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
        fontSize:12
    },
    text2:{
        fontSize:10
    },
    text3:{
        fontSize:10
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
        fontSize:14
    },
    text2:{
        fontSize:12
    },
    text3:{
        fontSize:12
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
        fontSize:14
    },
    text2:{
        fontSize:12
    },
    text3:{
        fontSize:12
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

const Ordercompactcard=(props:Order & {index:number})=>{

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

    console.log("ordercompact",props)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,padding:5}}>
        {
            dimensions
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={products_icon} style={[styles[Device].card_icon,{borderRadius:100}]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
                        <View style={{width:5,height:5,borderRadius:100,backgroundColor:"lightgreen"}}></View>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.Package?props.Package.name:"Direct Purchase"}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{"Order placed on "+formatDate(props.paymentDetails.created_at)}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].info_icon]} source={clock_icon}/>
                        <Text style={[styles[Device].text3,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{"Products- "+props.products.length+" | "+"Paid- "+props.paymentDetails.currency.toUpperCase()+" "+props.paymentDetails.amount}</Text>
                    </View>
                    {/* <View style={{flexDirection:"row",gap:5}}>
                        <Image style={[styles[Device].location_icon]} source={apply_icon}/>
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.data.startDate?("Start Dates: "+Word2Sentence(props.data.startDate?.map((item)=>getMonth(item.courseStartingMonth+1,true)),"",",")):null}</Text>
                    </View> */}
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Ordercompactcard