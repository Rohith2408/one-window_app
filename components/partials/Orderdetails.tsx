import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useRef, useState } from "react"
import { PackageProductsValidator, Word2Sentence, compareProducts, formatDate, getDevice, getThemeColor } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import location_icon from '../../assets/images/misc/location.png'
import products_icon from '../../assets/images/misc/products.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:20,
        backgroundColor:'white',
        gap:20
    },
    info_wrapper:{
        alignSelf:"stretch",
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        gap:10,
        padding:10
    },
    uni_icon_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
    },
    uni_info_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        alignItems:"flex-start",
        gap:10
    },
    location_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5
    },
    about_wrapper:{
        display:"flex",
        flexDirection:"column",
        gap:7,
        alignItems:'flex-start'
    },
    actions_wrapper:{
        flexDirection:'row',
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    location_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    uni_icon:{
        width:30,
        height:30,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:28,
        height:28,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:15
    },
    program_name:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({

    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:22,
        height:22,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:22,
        height:22,
        borderRadius:100,
        left:-5,
        top:5
    },
    uni_location:{
        fontSize:10
    },
    program_name:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:26,
        height:26,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:24,
        height:24,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:12
    },
    program_name:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({

    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:26,
        height:26,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:24,
        height:24,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:12
    },
    program_name:{
        fontSize:16
    },
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Orderdetails=(props:{orderId:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const order=useAppSelector((state)=>state.orders.data).find((item)=>item._id==props.orderId)
    const [path,navigate]=useNavigation()
    const [dimensions,setDimensions]=useState<LayoutRectangle>()

    // const openUniversity=()=>{
    //     navigate?navigate({type:"AddScreen",payload:{screen:"University",params:{universityid:product?.course.university?._id}}}):null
    // }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            order
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:44}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.uni_icon_wrapper,{position:"relative"}]}>
                        <Image source={products_icon} style={[styles[Device].uni_icon]}/>
                        <View style={[styles[Device].uni_icon_bg,{position:"absolute",zIndex:-1,backgroundColor:getThemeColor(0)}]}></View>
                    </View>
                    <View style={[GeneralStyles.uni_info_wrapper]}>
                        <Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{"Order Placed on "+formatDate(order.paymentDetails.created_at)}</Text>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <Pressable  style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([order.Package?"Order Placed with "+order.Package.name:"Order placed without a package","Amount-"+(order.paymentDetails.currency.toUpperCase()+" "+order.paymentDetails.amount/100),"Payment Status "+order.paymentDetails.paymentStatus],"","|")}</Text></Pressable>
                        </View>
                        <View style={[GeneralStyles.actions_wrapper]}>
                            <Pressable style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1.2,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                                {/* <Image source={cart_icon} style={[styles[Device].cart_icon]}/> */}
                                {/* <Text style={[styles[Device].add_to_cart,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Show Order Details</Text> */}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
            :
            null
        }
        </View>
    )

}

export default Orderdetails