import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Package, Product } from "../../types"
import { addToBasket, getBasket } from "../../constants/basket"
import { compareProducts, formatDate, getDevice, getServerRequestURL, serverRequest } from "../../utils"
import { requests } from "../../constants/requests"
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addOrders } from "../../store/slices/ordersSlice"
import { Image } from "expo-image"
import Packagecard from "../cards/Packagecard"
import Unpurchasedproductscard from "../cards/Unpurchasedproductcard"
import { Fonts, Themes } from "../../constants"
import { useEffect, useRef, useState } from "react"
import loader from '../../assets/images/misc/loader.gif'
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    title:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({
    title:{
        fontSize:12
    },
    icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    continue:{
        fontSize:14
    },
    products_wrapper:{
        gap:25
    },
    loader:{
        width:18,
        height:18,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    title:{
        fontSize:14
    },
    icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    continue:{
        fontSize:15
    },
    products_wrapper:{
        gap:45
    },
    loader:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    title:{
        fontSize:12
    },
    icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    continue:{
        fontSize:14
    },
    products_wrapper:{
        gap:25
    },
    loader:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Ordersummary=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    let orderInfo:{package:Package|undefined,products:Product[]}=getBasket("ordersummary")
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false);

    const placeOrder=async ()=>{
        setIsloading(true);
        let requestInfo=requests.find((item)=>item.id=="placeorder");
        let inputvalidation=requestInfo?.inputValidator({packageId:orderInfo.package?._id,products:orderInfo.products.map((item)=>({
            category: item.category,
            courseId:item.course._id,
            intake: item.intake
        }))})
        if(inputvalidation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(inputvalidation.data);
            //console.log("server res",JSON.stringify(serverRes,null,2));
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
                await removeCartItems(orderInfo.products);
                setIsloading(false);
                //addToBasket("payment_options",serverRes.data.order.paymentDetails);
                navigate?navigate({type:"AddScreen",payload:{screen:"Payment",params:{paymentOrderId:serverRes.data.order._id}}}):null
            }
        }
    }

    const removeCartItems=async (products:Product[])=>{
        let data={
            action:"remove",
            itemIds:store.getState().cart.data.filter((cartitem)=>products.find((orderitem)=>compareProducts(cartitem,orderitem))).map((item)=>item._id)
        }
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="removeFromCart");
        let validation=requestInfo?.inputValidator(data);
        console.log("Res",serverRes,requestInfo);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            //console.log("Server res",JSON.stringify(serverRes,null,2))
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
    }

    const getPaymentDetails=async ()=>{
        let details={
            packageId:orderInfo.package?._id,
            products:orderInfo.products.map((item)=>({
                category: item.category,
                courseId:item.course._id,
                intake: item.intake
            }))}
        let res=await serverRequest({
            url:getServerRequestURL("payment-summary","POST"),
            reqType:"POST",
            body:details
        })
        console.log("response",JSON.stringify(res,null,2));
    }

    useEffect(()=>{
        getPaymentDetails()
    },[])

    return(
        <View style={{flex:1,gap:30}}>
            <View style={{padding:10,gap:15}}>
                <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Selected Package</Text>
                {
                    orderInfo.package
                    ?
                    <Packagecard {...orderInfo.package} index={0}/>
                    :
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>No package selected</Text>
                }
            </View>
            <View style={{flex:1,gap:15,padding:10}}>
            <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products</Text>
                <ScrollView contentContainerStyle={[styles[Device].products_wrapper,{padding:5,paddingTop:0,paddingBottom:20}]}>
                {
                    orderInfo.products.map((product,i)=>
                    <Unpurchasedproductscard hideDelete={true} data={product} index={i}/>
                    )
                }
                </ScrollView>
            </View>
            <Pressable style={{alignSelf:'center',borderRadius:100,borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),padding:5,paddingLeft:20,paddingRight:20,marginBottom:20}} onPress={!isLoading?placeOrder:null}>
            {
                !isLoading
                ?
                <Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Place Order</Text>
                :
                <Image style={[styles[Device].loader]} source={loader}/>
            }
            </Pressable>
        </View>
    )

}

export default Ordersummary


// {
//     "success":true,
//     "message":"order placed",
//     "data":
//     {
//         "razorPay":{"amount":1490000,"amount_due":1490000,"amount_paid":0,"attempts":0,"created_at":1726586923,"currency":"INR","entity":"order","id":"order_OyHcF0fD5FuzJS","notes":{"item_ids":{"package":null,"products":["66e9a02a672766fe0243c935"]},"note_key":"purchase initiated by rohith test2"},"offer_id":null,"receipt":null,"status":"created"},
//         "order":{
//             "student":"66e0138c2354567185f7005d",
//             "Package":null,
//             "products":["66e9a02a672766fe0243c935"],
//             "paymentDetails":{"razorpay_order_id":"order_OyHcF0fD5FuzJS","amount":1490000,"amount_due":1490000,"created_at":"1970-01-20T23:36:26.923Z","currency":"INR","paymentStatus":"pending","misc":{"amount":1490000,"amount_due":1490000,"amount_paid":0,"attempts":0,"created_at":1726586923,"currency":"INR","entity":"order","id":"order_OyHcF0fD5FuzJS","notes":{"item_ids":{"package":null,"products":["66e9a02a672766fe0243c935"]},"note_key":"purchase initiated by rohith test2"},"offer_id":null,"receipt":null,"status":"created"}},"status":"pending","logs":[{"action":"new Order Created","time":"2024-09-17T14:46:34.258Z","details":"{\"note_key\":\"purchase initiated by rohith test2\",\"item_ids\":{\"package\":null,\"products\":[\"66e9a02a672766fe0243c935\"]}}","_id":"66e9a02b672766fe0243c938"}],"_id":"66e9a02b672766fe0243c937","createdAt":"2024-09-17T15:28:43.074Z","updatedAt":"2024-09-17T15:28:43.074Z","__v":0}}}


            