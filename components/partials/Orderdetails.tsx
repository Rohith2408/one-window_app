import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useRef, useState } from "react"
import { PackageProductsValidator, Word2Sentence, compareProducts, formatCurrency, formatDate, getDevice, getThemeColor } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import location_icon from '../../assets/images/misc/location.png'
import products_icon from '../../assets/images/misc/order.png'
import Productcard from "../cards/Productcard"
import Productcompactcard from "../cards/Productcompactcard"
import Styledtext from "../resources/Styledtext"
import Productcompact2card from "../cards/Productcompactcard2"
import Orderlogscard from "../cards/Orderlogscard"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
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
    products_heading:{
        fontSize:18
    },
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
        fontSize:16,
        lineHeight:18
    },
    program_name:{
        fontSize:20
    },
    product_card:{
        height:200
    },
    paynow:{
        fontSize:18
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
    },
    paynow:{
        fontSize:14
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
    },
    paynow:{
        fontSize:16
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
    },
    paynow:{
        fontSize:16
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

    //console.log(JSON.stringify("logs",order?.logs,null,2));

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginSmall]}>
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
                                    <Text style={[styles[Device].paynow,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Pay Now</Text>
                                </Pressable>
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
                <View style={{gap:0}}>
                    <Styledtext styles={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Products Purchased" focusWord="Purchased"/>
                    <View style={{maxHeight:300}}>
                        <ScrollView contentContainerStyle={{gap:10,paddingTop:10}}>
                        {
                            order.products.map((product,i)=>
                            <Pressable onPress={()=>showProduct(product._id)} style={[{padding:10}]}><Productcompact2card {...product} index={i}/></Pressable>
                            )
                        }
                        </ScrollView>
                    </View>
                </View>
                <View style={{gap:10}}> 
                    <Styledtext styles={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Payment Details:" focusWord="Details"/>
                    <View style={{gap:15,padding:7.5}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Total</Text></View>
                            <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{(formatCurrency(order.paymentDetails.amount/100,order.paymentDetails.currency))}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Amount Due</Text></View>
                            <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{(formatCurrency(order.paymentDetails.amount_due/100,order.paymentDetails.currency))}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Amount Paid</Text></View>
                            <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{(formatCurrency(((order.paymentDetails.amount/100)-(order.paymentDetails.amount_due/100)),order.paymentDetails.currency))}</Text>
                        </View>
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Logs</Text>
                    <ScrollView horizontal contentContainerStyle={{gap:10}}>
                    {
                        order.logs.map((log,i)=>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Orderlogscard {...log} index={i}/>
                            {
                                i<order.logs.length-1
                                ?
                                <Transitionview effect="pan"><View style={{height:2,width:70,backgroundColor:Themes.Light.OnewindowPrimaryBlue(1),borderRadius:5}}/></Transitionview>
                                :
                                null
                            }
                        </View>
                        )
                    }
                    </ScrollView>
                </View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Orderdetails