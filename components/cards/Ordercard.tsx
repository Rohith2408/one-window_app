import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Order } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket, removeFromBasket } from "../../constants/basket"
import { useEffect, useRef } from "react"
import { Image } from "expo-image"
import upload_icon from '../../assets/images/misc/upload.png'
import clock_icon from '../../assets/images/misc/clock.png'
import products_icon from '../../assets/images/misc/order.png'
import { Word2Sentence, formatDate, getDevice, getThemeColor, setWordCase } from "../../utils"
import { Fonts, Themes } from "../../constants"
import go_icon from '../../assets/images/misc/back.png'

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
        gap:9,
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
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:12,
        height:12,
        resizeMode:"contain",
    }
})

const MobileSStyles=StyleSheet.create({
    name:{
        fontSize:13
    },
    category:{
        fontSize:11
    },
    intake:{
        fontSize:11
    },
    icon:{
        width:14,
        height:14,
        resizeMode:"contain",
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    paynow:{
        fontSize:12
    },
    go_icon:{
        width:8,
        height:8,
        resizeMode:"contain",
    }
})

const MobileMStyles=StyleSheet.create({
    name:{
        fontSize:16
    },
    category:{
        fontSize:14
    },
    intake:{
        fontSize:14
    },
    icon:{
        width:24,
        height:24,
        resizeMode:"contain",
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    }
})

const MobileLStyles=StyleSheet.create({
    name:{
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
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    go_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Ordercard=(props:Order & {index:number})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translate=useRef(new Animated.Value(0)).current

    const redirectToPayment=async ()=>{
        console.log("Payment data",props.paymentDetails)
        navigate?navigate({type:"AddScreen",payload:{screen:"Payment",params:{paymentOrderId:props._id}}}):null
    }

    const animate=(y:number)=>{
        Animated.spring(translate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const showOrderDetails=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Orderdetails"}}):null
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"Orderdetails",params:{orderdetailsid:props._id}}}):null
        },100)
    }
    
    useEffect(()=>{
        
    },[])

    //console.log("Payment",props.paymentDetails.created_at);

    return(
    <Pressable onPress={showOrderDetails} style={[GeneralStyles.sub_wrapper]}>
        <View style={[GeneralStyles.icon_wrapper]}>
            <Image source={products_icon} style={[styles[Device].icon]}/>
        </View>
        <View style={[GeneralStyles.info_wrapper]}>
            <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height-5)} style={[GeneralStyles.status,styles[Device].status,{transform:[{translateY:translate}]}]}>
                <View style={{width:5,height:5,borderRadius:10,backgroundColor:"orange"}}></View>
                <Text style={[styles[Device].category,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.products.length+(props.products.length==1?" product":" products")}</Text>
            </Animated.View>
            <Text style={[styles[Device].name,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{props.Package?props.Package.name:"Direct Purchase"}</Text>
            <View style={{alignSelf:"flex-start",borderRadius:10,display:"flex",alignItems:"center",flexDirection:"row",gap:5}}>
                <Image style={[styles[Device].clock_icon]} source={clock_icon} />
                <Text style={[styles[Device].intake,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>{"Order placed on "+formatDate(props.paymentDetails.created_at)}</Text>
            </View>
            <View style={{alignSelf:"flex-start",borderRadius:10,display:"flex",alignItems:"center",flexDirection:"row",gap:5}}>
                <Image style={[styles[Device].clock_icon]} source={upload_icon} />
                <Text style={[styles[Device].category,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{"Amount"+(props.paymentDetails.paymentStatus=="pending"?+" to be ":"")+" paid "+ (props.paymentDetails.currency+" "+props.paymentDetails.amount/100)}</Text>
            </View>
        </View>
        {
            props.paymentDetails.paymentStatus=="pending"
            ?
            <Pressable onPress={redirectToPayment} style={{alignSelf:"center"}}>
                <Text style={[styles[Device].paynow,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Pay Now</Text>
            </Pressable>
            :
            <View style={{alignSelf:"center"}}><Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]} /></View>
        }
    </Pressable>
)}

export default Ordercard