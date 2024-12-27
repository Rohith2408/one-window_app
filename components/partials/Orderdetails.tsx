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
import { PurchasedProduct } from "../../types"

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
        flexDirection:"column",
        alignItems:"flex-start",
        gap:7,
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
        gap:10,
        alignSelf:"flex-end"
    }
})

const TabStyles=StyleSheet.create({
    products_heading:{
        fontSize:17
    },
    location_icon:{
        width:14,
        height:14,
        marginTop:4,
        resizeMode:"contain"
    },
    uni_icon:{
        width:32,
        height:32,
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
        fontSize:17
    }
})

const MobileSStyles=StyleSheet.create({

    products_heading:{
        fontSize:13
    },
    location_icon:{
        width:8,
        height:8,
        marginTop:1,
        resizeMode:"contain"
    },
    uni_icon:{
        width:24,
        height:24,
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
        fontSize:13
    }
})

const MobileMStyles=StyleSheet.create({
    products_heading:{
        fontSize:15
    },
    location_icon:{
        width:10,
        height:10,
        marginTop:2,
        resizeMode:"contain"
    },
    uni_icon:{
        width:28,
        height:28,
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
        fontSize:13,
        lineHeight:20
    },
    program_name:{
        fontSize:16
    },
    product_card:{
        height:135
    },
    paynow:{
        fontSize:13
    }
})

const MobileLStyles=StyleSheet.create({

    products_heading:{
        fontSize:15
    },
    location_icon:{
        width:12,
        height:12,
        marginTop:2,
        resizeMode:"contain"
    },
    uni_icon:{
        width:28,
        height:28,
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
        fontSize:15
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

    const redirectToPayment=async ()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Payment",params:{paymentOrderId:order?._id}}}):null
    }

    const showProduct=(product:PurchasedProduct)=>{
        if(product.stage && product.status)
        {
            navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Product"}}):null
            setTimeout(()=>{
                navigate({type:"AddScreen",payload:{screen:"Product",params:{productId:product._id}}})
            },100)
        }
        else
        {
            addToBasket("warning",{warningTitle:"Oops!",warningMessage:"Seems like the payment is pending",proceedCallback:redirectToPayment,yesLabel:"Pay Now",noLabel:"Back"});
            navigate?navigate({type:"AddScreen",payload:{screen:"Warning"}}):null;
        }
    }

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginSmall]}>
        {
            order
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:40}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={{display:'flex',flexDirection:"row",alignItems:"flex-end",gap:10}}>
                        <View style={{flex:1,display:'flex',flexDirection:'row',alignItems:'flex-end'}}><Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.SemiBold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{"Order Placed on "+formatDate(order.paymentDetails.created_at)}</Text></View>
                        <Image source={products_icon} style={[styles[Device].uni_icon,{marginRight:10}]}/>
                    </View>
                    <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{(order.Package?("Package purchased- "+order.Package.name):"Order placed without a package ")+" | "+("Amount"+(order.paymentDetails.paymentStatus=="pending"?+" to be ":"")+" paid "+ (order.paymentDetails.currency+" "+order.paymentDetails.amount/100)+" | "+order.products.length+(order.products.length==1?" product":" products"))}</Text>
                    {
                        order.paymentDetails.paymentStatus!="pending"
                        ?
                        <View style={[GeneralStyles.actions_wrapper]}>
                            <Pressable onPress={makePayment} style={{flexDirection:'row',alignItems:'center',gap:5,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}}>
                                <Text style={[styles[Device].paynow,{color:"white",fontFamily:Fonts.NeutrifStudio.SemiBold}]}>Pay Now</Text>
                            </Pressable>
                        </View>
                        :
                        null
                    }
                </View>
                <View style={{gap:0}}>
                    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                        <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>PRODUCTS PURCHASED</Text>
                        <View style={{width:100,height:1,backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.1)}}/>
                    </View>
                    {/* <Styledtext styles={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Products Purchased" focusWord="Purchased"/> */}
                    <View style={{maxHeight:300}}>
                        <ScrollView contentContainerStyle={{gap:25,paddingTop:10}}>
                        {
                            order.products.map((product,i)=>
                            <Pressable onPress={()=>showProduct(product)} style={[{padding:0}]}><Productcompact2card {...product} index={i}/></Pressable>
                            )
                        }
                        </ScrollView>
                    </View>
                </View>
                <View style={{gap:10}}> 
                    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                        <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>PAYMENT DETAILS</Text>
                        <View style={{width:100,height:1,backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.1)}}/>
                    </View>
                    {/* <Styledtext styles={[styles[Device].products_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Payment Details:" focusWord="Details"/> */}
                    <View style={{gap:15,padding:7.5}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Total</Text></View>
                            <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>{(formatCurrency(order.paymentDetails.amount/100,order.paymentDetails.currency))}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Amount Due</Text></View>
                            <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>{(formatCurrency(order.paymentDetails.amount_due/100,order.paymentDetails.currency))}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flex:1}}><Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Amount Paid</Text></View>
                            <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>{(formatCurrency(((order.paymentDetails.amount/100)-(order.paymentDetails.amount_due/100)),order.paymentDetails.currency))}</Text>
                        </View>
                    </View>
                </View>
                <View style={{gap:10}}>
                    {/* <Text style={[styles[Device].products_heading,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Logs</Text> */}
                    {/* <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                        <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>LOGS</Text>
                        <View style={{width:100,height:1,backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.1)}}/>
                    </View>
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
                    </ScrollView> */}
                </View>
            </ScrollView>
            :
            null
        }
        </View>
    )

}

export default Orderdetails