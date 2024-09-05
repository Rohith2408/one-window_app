import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Package, Product } from "../../types"
import { addToBasket, getBasket } from "../../constants/basket"
import { formatDate, getDevice } from "../../utils"
import { requests } from "../../constants/requests"
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addOrders } from "../../store/slices/ordersSlice"
import { Image } from "expo-image"
import Packagecard from "../cards/Packagecard"
import Unpurchasedproductscard from "../cards/Unpurchasedproductcard"
import { Fonts, Themes } from "../../constants"
import { useRef } from "react"

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
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Ordersummary=(props:{ordersummaryid:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    let orderInfo:{package:Package|undefined,products:Product[]}=getBasket(props.ordersummaryid)
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()

    const placeOrder=async ()=>{
        let requestInfo=requests.find((item)=>item.id=="placeorder");
        let inputvalidation=requestInfo?.inputValidator({packageId:orderInfo.package?._id,products:orderInfo.products.map((item)=>({
            category: item.category,
            courseId:item.course.id,
            intake: item.intake
        }))})
        if(inputvalidation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(inputvalidation.data);
            if(serverRes?.success)
            {
                dispatch(addOrders(serverRes.data));
                console.log("order res",JSON.stringify(serverRes.data,null,2));
                await requestInfo?.responseHandler(serverRes.data.order);
                addToBasket("payment_options",serverRes.data.order.paymentDetails);
                navigate?navigate({type:"AddScreen",payload:{screen:"Payment"}}):null
            }
        }
    }

    // "order": {
    //     "student": "66d842496fc02725b73b5386",
    //     "Package": "66b8414fcfe5abb913e9b1bd",
    //     "products": [
    //       "66d87ec6537413cd6d46596e"
    //     ],
    //     "paymentDetails": {
    //       "amount": 0,
    //       "amount_due": 0,
    //       "created_at": "2024-09-04T15:37:42.474Z",
    //       "currency": "INR",
    //       "paymentStatus": "paid"
    //     },
    //     "status": "pending",
    //     "_id": "66d87ec6537413cd6d465970",
    //     "logs": [],
    //     "createdAt": "2024-09-04T15:37:42.475Z",
    //     "updatedAt": "2024-09-04T15:37:42.475Z",
    //     "__v": 0
    //   },
    //   "razorPay": null

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
                <ScrollView contentContainerStyle={{gap:25,padding:5,paddingTop:20,paddingBottom:20}}>
                {
                    orderInfo.products.map((product,i)=>
                    <Unpurchasedproductscard hideDelete={true} data={product} index={i}/>
                    )
                }
                </ScrollView>
            </View>
            <Pressable style={{alignSelf:'center',borderRadius:100,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(1),paddingLeft:20,paddingRight:20,marginBottom:20}} onPress={placeOrder}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Place Order</Text></Pressable>
        </View>
    )

}

export default Ordersummary