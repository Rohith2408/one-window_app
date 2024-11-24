import { useRef, useState } from "react"
import { Product as ProductType, PurchasedProduct} from "../../types"
import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import { Word2Sentence, compareProducts, formatDate, getDevice, getLightThemeColor, getThemeColor, setWordCase, truncateString } from "../../utils"
import { Image } from "expo-image"
import processing_icon from '../../assets/images/products/processing.png'
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import clock_icon from '../../assets/images/misc/clock.png'
import go_icon from '../../assets/images/misc/back.png'
import { addToBasket } from "../../constants/basket"
import { store } from "../../store"

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
        fontSize:20,
        lineHeight:28
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
        width:8,
        height:8,
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
        fontSize:14,
        lineHeight:20
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
        width:10,
        height:10,
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
        fontSize:16,
        lineHeight:22
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14,
        lineHeight:20
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
        width:10,
        height:10,
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
        fontSize:16,
        lineHeight:22
    },
    text2:{
        fontSize:14
    },
    text3:{
        fontSize:14,
        lineHeight:20
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

const Productcard=(props:PurchasedProduct & {index:number})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useAppDispatch()
    const [path,navigate]=useNavigation()
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    const redirectToPayment=async ()=>{
        console.log("pay,ent",props.order);
        if(props.order)
        {
            navigate?navigate({type:"AddScreen",payload:{screen:"Payment",params:{paymentOrderId:props.order}}}):null
        }   
    }

    const showProduct=()=>{
        if(props.stage && props.status)
        {
            navigate({type:"RemoveSpecificScreen",payload:{id:"Product"}})
            setTimeout(()=>{
                navigate({type:"AddScreen",payload:{screen:"Product",params:{productId:props._id}}})
            },100)
        }
        else
        {
            addToBasket("warning",{warningTitle:"Oops!",warningMessage:"Seems like the payment is pending",proceedCallback:redirectToPayment,yesLabel:"Pay Now",noLabel:"Back"});
            navigate?navigate({type:"AddScreen",payload:{screen:"Warning"}}):null;
        }
    }

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    //console.log("card",props.stage,props.status);

    return(
        <Pressable onPress={showProduct} onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,padding:5}}>
        {
            dimensions
            ?
            <View style={{flex:1,flexDirection:'row',gap:10}}>
                <View style={[GeneralStyles.icon_wrapper]}><Image source={props.course.university.logoSrc} style={[styles[Device].card_icon,{borderRadius:100}]} /></View>
                <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
                    <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
                        <View style={{width:5,height:5,borderRadius:100,backgroundColor:"orange"}}></View>
                        <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{setWordCase(props.category)}</Text>
                    </Animated.View>
                    <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.course.name}</Text>
                    <View style={{flexDirection:"row",gap:5}}>
                        {/* <Image style={[styles[Device].info_icon]} source={clock_icon}/> */}
                        <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.course.university.name}</Text>
                    </View>
                    <View style={{flexDirection:"row",gap:5,backgroundColor:Themes.ExtraLight.OnewindowPurple,borderRadius:100}}>
                        {/* <Image style={[styles[Device].location_icon]} source={processing_icon}/> */}
                        <Text style={[styles[Device].text3,{padding:7.5,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.stage}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.actions_wrapper]}>
                    <View style={{alignSelf:"center"}}><Image source={go_icon} style={[styles[Device].edit_icon,{transform:[{scaleX:-1}]}]} /></View>
                </View>
            </View>
            :
            null
        }
        </Pressable>
        // <Pressable onPress={showProduct} style={[GeneralStyles.main_wrapper,styles[Device].main_wrapper]}>
        //     <View style={[GeneralStyles.bg_wrapper,styles[Device].bg_wrapper,{backgroundColor:getThemeColor(props.index%4)}]}></View>
        //     <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper,{backgroundColor:getLightThemeColor(props.index%4)}]}>
        //         <View style={[GeneralStyles.category_wrapper]}>
        //             <View style={[GeneralStyles.category]}><Text style={[styles[Device].category_text,{color:getThemeColor(props.index%4),fontFamily:Fonts.NeutrifStudio.Bold}]}>{setWordCase(props.category)}</Text></View>
        //         </View>
        //         <View style={[GeneralStyles.info_wrapper]}>
        //             <Text style={[styles[Device].product_name,{color:"black",fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.course.name}</Text>
        //             <View style={[GeneralStyles.misc_wrapper]}>
        //                 <View style={[GeneralStyles.uni_wrapper]}>
        //                     <Image source={props.course.university.logoSrc} style={[styles[Device].uni_icon,GeneralStyles.uni_icon]}/>
        //                     <View style={{flex:1}}><Text style={[styles[Device].uni_name,{color:"black",fontFamily:Fonts.NeutrifStudio.Regular}]}>{truncateString(props.course.university.name,30,true)}</Text></View>
        //                 </View>
        //             </View> 
        //         </View>
        //         <View style={[GeneralStyles.status_wrapper]}>
        //             <View style={[GeneralStyles.status]}>
        //                 <Image source={processing_icon} style={[styles[Device].status_icon]} />
        //                 <Text style={[styles[Device].status_text,{textAlign:"right",color:"grey",fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.stage}</Text>
        //             </View>
        //         </View>
        //     </View>
        // </Pressable>
    )   

}

export default Productcard

// export interface Product{
//     info: {
//         notes: string[],
//         questionnaire: string[]
//     },
//     _id: string,
//     course:CourseListObj,
//     intake: string, //ex. 2024-11-30T18:30:00.000Z
//     deadline: string, //ex. 2024-11-30T18:30:00.000Z
//     user: string,
//     category: string,
//     cancellationRequest: boolean,
//     advisors: string[],//ex. ids
//     docChecklist:  {
//         name: string,
//         isChecked: false,
//         doc: Document,
//         _id: string
//     }[],
//     log: {
//         status: string,
//         stages: {
//             name: string,
//             updatedAt: string,
//             _id: string
//         }[],
//         _id: string
//     }[],
//     __v: 10,
//     createdAt:string, //ex. "2024-08-03T08:05:42.665Z"
//     updatedAt: string, //ex. "2024-08-03T08:05:42.665Z"
//     order: string,
//     stage: string,
//     status:string
// }