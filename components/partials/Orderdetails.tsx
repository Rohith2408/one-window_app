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
import Productcard from "../cards/Productcard"

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
        alignItems:"flex-start",
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
        width:14,
        height:14,
        marginTop:4,
        resizeMode:"contain"
    },
    uni_icon:{
        width:28,
        height:28,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:28,
        height:28,
        borderRadius:100,
        left:-10,
        top:10
    },
    uni_location:{
        fontSize:14,
        lineHeight:18
    },
    program_name:{
        fontSize:18
    },
    product_card:{
        height:250
    }
})

const MobileSStyles=StyleSheet.create({

    location_icon:{
        width:8,
        height:8,
        marginTop:1,
        resizeMode:"contain"
    },
    uni_icon:{
        width:20,
        height:20,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:20,
        height:20,
        borderRadius:100,
        left:-5,
        top:5
    },
    uni_location:{
        fontSize:10,
        lineHeight:14
    },
    program_name:{
        fontSize:13
    },
    product_card:{
        height:170
    }
})

const MobileMStyles=StyleSheet.create({
    location_icon:{
        width:10,
        height:10,
        marginTop:2,
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
        fontSize:11,
        lineHeight:16
    },
    program_name:{
        fontSize:15
    },
    product_card:{
        height:190
    }
})

const MobileLStyles=StyleSheet.create({

    location_icon:{
        width:12,
        height:12,
        marginTop:2,
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
        fontSize:12,
        lineHeight:16
    },
    program_name:{
        fontSize:16
    },
    product_card:{
        height:210
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Orderdetails=(props:{orderdetailsid:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const order=useAppSelector((state)=>state.orders.data).find((item)=>item._id==props.orderdetailsid)
    const [path,navigate]=useNavigation()
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    // const openUniversity=()=>{
    //     navigate?navigate({type:"AddScreen",payload:{screen:"University",params:{universityid:product?.course.university?._id}}}):null
    // }

    const makePayment=()=>{
        //addToBasket("payment_options",order?.paymentDetails);
        navigate?navigate({type:"AddScreen",payload:{screen:"Payment",params:{paymentOrderId:order?._id}}}):null
    }

    const showProduct=()=>{
        
    }

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
                            <View  style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([order.Package?"Order Placed with "+order.Package.name:"Order placed without a package","Amount-"+(order.paymentDetails.currency.toUpperCase()+" "+order.paymentDetails.amount/100),"Payment Status "+order.paymentDetails.paymentStatus],"","|")}</Text></View>
                        </View>
                        {
                            order.paymentDetails.paymentStatus=="pending"
                            ?
                            <View style={[GeneralStyles.actions_wrapper]}>
                                <Pressable onPress={makePayment} style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1.2,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                                    {/* <Image source={cart_icon} style={[styles[Device].cart_icon]}/> */}
                                    <Text style={[styles[Device].add_to_cart,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Pay Now</Text>
                                </Pressable>
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Text style={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products Purchased</Text>
                    <View style={{gap:10}}>
                    {
                        order.products.map((product,i)=>
                        <Pressable onPress={()=>showProduct(product._id)} style={[{padding:10},styles[Device].product_card]}><Productcard {...product} index={i}/></Pressable>
                        )
                    }
                    </View>
                </View>
                <View>
                    <Text style={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Payment Details</Text>
                    <View>
                    {/* {
                        product.docChecklist.map((item)=>
                        <Text>{item.name}</Text>
                        )
                    } */}
                    </View>
                </View>
                <View>
                    <Text style={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Logs</Text>
                    <View>
                    {/* {
                        product.docChecklist.map((item)=>
                        <Text>{item.name}</Text>
                        )
                    } */}
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