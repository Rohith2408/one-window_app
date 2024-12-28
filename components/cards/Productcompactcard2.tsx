import { useRef, useState } from "react"
import { Product as ProductType, PurchasedProduct} from "../../types"
import { Animated, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import { Word2Sentence, formatDate, getDevice, getLightThemeColor, getThemeColor, setWordCase, truncateString } from "../../utils"
import { Image } from "expo-image"
import processing_icon from '../../assets/images/products/processing.png'
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import clock_icon from '../../assets/images/misc/clock.png'
import go_icon from '../../assets/images/misc/back.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        display:"flex",
        flexDirection:"row",
        gap:10,
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    dp:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    name:{
        fontSize:20,
        lineHeight:24
    },
    role:{
        fontSize:16
    },
    go:{
        width:12,
        height:12,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    dp:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    name:{
        fontSize:14,
        lineHeight:18
    },
    role:{
        fontSize:11
    },
    go:{
        width:8,
        height:8,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    name:{
        fontSize:15,
        lineHeight:20
    },
    role:{
        fontSize:13
    },
    go:{
        width:8,
        height:8,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    name:{
        fontSize:15,
        lineHeight:20
    },
    role:{
        fontSize:13
    },
    go:{
        width:10,
        height:10,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Productcompact2card=(props:PurchasedProduct & {index:number})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useAppDispatch()
    const [path,navigate]=useNavigation()
    const titleTranslate=useRef(new Animated.Value(0)).current
    const titleHeight=useRef().current

    // const showProduct=()=>{
    //     navigate({type:"RemoveSpecificScreen",payload:{id:"Product"}})
    //     setTimeout(()=>{
    //         navigate({type:"AddScreen",payload:{screen:"Product",params:{productId:props._id}}})
    //     },100)
    // }

    const animate=(y:number)=>{
        Animated.spring(titleTranslate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={{flex:1,flexDirection:"row",alignItems:'center',gap:5}}>
                <Text style={[styles[Device].name,{maxWidth:"85%",lineHeight:28,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{setWordCase(props.course.name)}</Text>
                <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"flex-end",gap:5}}>
                    <Image style={[styles[Device].dp,{borderRadius:100}]} source={props.course.university.logoSrc}/>
                    <Text style={[styles[Device].role,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>{formatDate(props.intake)}</Text>
                </View>
            </View>
            <View><Image style={[styles[Device].go,{transform:[{scaleX:-1}]}]} source={go_icon}/></View>
        </View> 
        // <Pressable onPress={showProduct} onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
        // {
        //     dimensions
        //     ?
        //     <View style={{flexDirection:'row',gap:10}}>
        //         <View style={[GeneralStyles.icon_wrapper]}><Image source={props.course.university.logoSrc} style={[styles[Device].card_icon,{borderRadius:100}]} /></View>
        //         <View style={[GeneralStyles.info_wrapper,styles[Device].info_wrapper]}>
        //             <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height*1.35)} style={[GeneralStyles.title_wrapper,{transform:[{translateY:titleTranslate}]}]}>
        //                 <View style={{width:5,height:5,borderRadius:100,backgroundColor:"orange"}}></View>
        //                 <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.3)}]}>{setWordCase(props.category)}</Text>
        //             </Animated.View>
        //             <Text style={[styles[Device].text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.course.name}</Text>
        //             <View style={{flexDirection:"row",gap:5}}>
        //                 {/* <Image style={[styles[Device].info_icon]} source={clock_icon}/> */}
        //                 <Text style={[styles[Device].text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>{props.course.university.name+", "+formatDate(props.intake)}</Text>
        //             </View>
        //         </View>
        //         <View style={[GeneralStyles.actions_wrapper]}>
        //             <View style={{alignSelf:"center"}}><Image source={go_icon} style={[styles[Device].edit_icon,{transform:[{scaleX:-1}]}]} /></View>
        //         </View>
        //     </View>
        //     :
        //     null
        // }
        // </Pressable>
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

export default Productcompact2card

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