import { useRef } from "react"
import { Product as ProductType, PurchasedProduct} from "../../types"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import { formatDate, getDevice, getLightThemeColor, getThemeColor, setWordCase, truncateString } from "../../utils"
import { Image } from "expo-image"
import clock from '../../assets/images/misc/clock-black.png'
import processing_icon from '../../assets/images/products/processing.png'
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        borderRadius:20,
        //padding:20
    },
    bg_wrapper:{
        position:"absolute",
        width:"100%",
        height:"100%",
        zIndex:-1,
        transform:[{rotate:"1.5deg"}]
    },
    sub_wrapper:{
        display:'flex',
        flex:1,
        flexDirection:"column",
        padding:15,
        alignSelf:"stretch",
        justifyContent:'center',
    },
    category_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
    },
    category:{
        borderRadius:100,
        backgroundColor:"rgba(255,255,255,0.2)",
        padding:5
    },
    info_wrapper:{
        display:'flex',
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        gap:10
    },
    misc_wrapper:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
        gap:7.5
    },
    uni_wrapper:{
        // flex:2,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    },
    intake_wrapper:{
        // flex:1,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    },
    status_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
    },
    status:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        gap:5
    },
    uni_icon:{
        borderRadius:100
    }
})

const TabStyles=StyleSheet.create({
    sub_wrapper:{
        gap:20
    },
    category_text:{
        fontSize:11
    },
    product_name:{
        fontSize:12
    },
    uni_name:{
        fontSize:9,
        lineHeight:13
    },
    intake:{
        fontSize:9
    },
    status_text:{
        fontSize:8
    },
    uni_icon:{
        width:14,
        height:14,
        objectFit:"contain",
        alignSelf:"flex-start"
    },
    intake_icon:{
        width:14,
        height:14,
        objectFit:"contain"
    },
    status_icon:{
        width:10,
        height:10,
        objectFit:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    main_wrapper:{
        paddingBottom:6
    },
    sub_wrapper:{
        gap:20,
        borderRadius:25
    },
    bg_wrapper:{
        borderRadius:30,
        left:6,
        top:6,
    },
    category_text:{
        fontSize:11
    },
    product_name:{
        fontSize:12
    },
    uni_name:{
        fontSize:9,
        lineHeight:13
    },
    intake:{
        fontSize:9
    },
    status_text:{
        fontSize:8
    },
    uni_icon:{
        width:11,
        height:11,
        objectFit:"contain",
        alignSelf:"flex-start"
    },
    intake_icon:{
        width:11,
        height:11,
        objectFit:"contain"
    },
    status_icon:{
        width:10,
        height:10,
        objectFit:"contain"
    },
    seperator:{
        width:2,
        height:13
    }
})

const MobileMStyles=StyleSheet.create({
    main_wrapper:{
        paddingBottom:10
    },
    sub_wrapper:{
        gap:27,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:6,
        top:6,
    },
    category_text:{
        fontSize:12
    },
    product_name:{
        fontSize:14
    },
    uni_name:{
        fontSize:12,
        lineHeight:13
    },
    intake:{
        fontSize:11
    },
    status_text:{
        fontSize:10
    },
    uni_icon:{
        width:13,
        height:13,
        objectFit:"contain",
        alignSelf:"flex-start"
    },
    intake_icon:{
        width:13,
        height:13,
        objectFit:"contain"
    },
    status_icon:{
        width:10,
        height:10,
        objectFit:"contain"
    },
    seperator:{
        width:2,
        height:13
    }
})

const MobileLStyles=StyleSheet.create({
    main_wrapper:{
        paddingBottom:10
    },
    sub_wrapper:{
        gap:30,
        borderRadius:30
    },
    bg_wrapper:{
        borderRadius:30,
        left:6,
        top:6,
    },
    category_text:{
        fontSize:12
    },
    product_name:{
        fontSize:14
    },
    uni_name:{
        fontSize:12,
        lineHeight:13
    },
    intake:{
        fontSize:11
    },
    status_text:{
        fontSize:10
    },
    uni_icon:{
        width:13,
        height:13,
        objectFit:"contain",
        alignSelf:"flex-start"
    },
    intake_icon:{
        width:13,
        height:13,
        objectFit:"contain"
    },
    status_icon:{
        width:10,
        height:10,
        objectFit:"contain"
    },
    seperator:{
        width:2,
        height:13
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Productcard=(props:PurchasedProduct & {index:number})=>{

    const bgColors=useRef([
        Themes.Light.OnewindowRed(1),
        Themes.Light.OnewindowPurple(1),
        Themes.Light.OnewindowTeal(1),
        Themes.Light.OnewindowYellow(1)
    ]).current
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation();

    const showProduct=()=>{
        navigate({type:"AddScreen",payload:{screen:"Product",params:{productId:props._id}}})
    }

    return(
        <Pressable onPress={showProduct} style={[GeneralStyles.main_wrapper,styles[Device].main_wrapper]}>
            <View style={[GeneralStyles.bg_wrapper,styles[Device].bg_wrapper,{backgroundColor:getThemeColor(props.index%4)}]}></View>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper,{backgroundColor:getLightThemeColor(props.index%4)}]}>
                <View style={[GeneralStyles.category_wrapper]}>
                    <View style={[GeneralStyles.category]}><Text style={[styles[Device].category_text,{color:getThemeColor(props.index%4),fontFamily:Fonts.NeutrifStudio.Bold}]}>{setWordCase(props.category)}</Text></View>
                </View>
                <View style={[GeneralStyles.info_wrapper]}>
                    <Text style={[styles[Device].product_name,{color:"black",fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.course.name}</Text>
                    <View style={[GeneralStyles.misc_wrapper]}>
                        <View style={[GeneralStyles.uni_wrapper]}>
                            <Image source={props.course.university.logoSrc} style={[styles[Device].uni_icon,GeneralStyles.uni_icon]}/>
                            <View style={{flex:1}}><Text style={[styles[Device].uni_name,{color:"black",fontFamily:Fonts.NeutrifStudio.Regular}]}>{truncateString(props.course.university.name,30,true)}</Text></View>
                        </View>
                        <View style={[GeneralStyles.intake_wrapper,{alignSelf:"flex-start"}]}>
                            <Image source={clock} style={[styles[Device].intake_icon]}/>
                            <Text style={[styles[Device].intake,{color:"black",fontFamily:Fonts.NeutrifStudio.Regular}]}>{"Course Start: "+formatDate(props.intake)}</Text>
                        </View>
                    </View> 
                </View>
                <View style={[GeneralStyles.status_wrapper]}>
                    <View style={[GeneralStyles.status]}>
                        <Image source={processing_icon} style={[styles[Device].status_icon]} />
                        <Text style={[styles[Device].status_text,{color:"white",fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.stage}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
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