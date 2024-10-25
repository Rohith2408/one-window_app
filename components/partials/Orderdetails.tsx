import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useRef, useState } from "react"
import { PackageProductsValidator, Word2Sentence, compareProducts, formatDate, getDevice, getThemeColor } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import location_icon from '../../assets/images/misc/location.png'
import products_icon from '../../assets/images/misc/order.png'
import Productcard from "../cards/Productcard"
import Productcompactcard from "../cards/Productcompactcard"
import Styledtext from "../resources/Styledtext"
import Productcompact2card from "../cards/Productcompactcard2"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:5,
        backgroundColor:'white',
        gap:20
    },
    info_wrapper:{
        alignSelf:"stretch",
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        gap:10,
        paddingTop:10
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
        gap:7
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
        height:200
    }
})

const MobileSStyles=StyleSheet.create({

    products_heading:{
        fontSize:14
    },
    location_icon:{
        width:8,
        height:8,
        marginTop:1,
        resizeMode:"contain"
    },
    uni_icon:{
        width:20,
        height:20,
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
    products_heading:{
        fontSize:16
    },
    location_icon:{
        width:10,
        height:10,
        marginTop:2,
        resizeMode:"contain"
    },
    uni_icon:{
        width:22,
        height:22,
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
        fontSize:14,
        lineHeight:16
    },
    program_name:{
        fontSize:16
    },
    product_card:{
        height:135
    }
})

const MobileLStyles=StyleSheet.create({

    products_heading:{
        fontSize:16
    },
    location_icon:{
        width:12,
        height:12,
        marginTop:2,
        resizeMode:"contain"
    },
    uni_icon:{
        width:26,
        height:26,
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
        height:160
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
            <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,gap:40}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.uni_icon_wrapper,{position:"relative"}]}>
                        <Image source={products_icon} style={[styles[Device].uni_icon]}/>
                        {/* <View style={[styles[Device].uni_icon_bg,{position:"absolute",zIndex:-1,backgroundColor:getThemeColor(0)}]}></View> */}
                    </View>
                    <View style={[GeneralStyles.uni_info_wrapper]}>
                        <Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{"Order Placed on "+formatDate(order.paymentDetails.created_at)}</Text>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <View  style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{(order.Package?("Package purchased- "+order.Package.name):"Order placed without a package ")+(order.paymentDetails.paymentStatus=="pending"?+" to be ":"")}</Text></View>
                        </View>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <View  style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{"Amount"+(order.paymentDetails.paymentStatus=="pending"?+" to be ":"")+" paid "+ (order.paymentDetails.currency+" "+order.paymentDetails.amount/100)+" | "+order.products.length+" products"}</Text></View>
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
                <View style={{gap:0}}>
                    <Styledtext styles={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Products Purchased" focusWord="Purchased"/>
                    <View style={{height:300}}>
                        <ScrollView style={{flex:1}} contentContainerStyle={{gap:10,paddingTop:10}}>
                        {
                            order.products.map((product,i)=>
                            <Pressable onPress={()=>showProduct(product._id)} style={[{padding:10}]}><Productcompact2card {...product} index={i}/></Pressable>
                            )
                        }
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <Styledtext styles={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Payment Details" focusWord="Details"/>
                    <View>
                    {/* {
                        product.docChecklist.map((item)=>
                        <Text>{item.name}</Text>
                        )
                    } */}
                    </View>
                </View>
                <View>
                    <Text style={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]}>Logs</Text>
                    <View>
                    {/* {
                        product.docChecklist.map((item)=>
                        <Text>{item.name}</Text>
                        )
                    } */}
                    </View>
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Orderdetails