import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Package, Product } from "../../types"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useRef, useState } from "react"
import { PackageProductsValidator, compareProducts, formatDate, getDevice } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import Listselection from "../resources/Listselection"
import useNavigation from "../../hooks/useNavigation"
import { requests } from "../../constants/requests"
import Packagecard from "../cards/Packagecard"
import { Fonts, Themes } from "../../constants"
import Unpurchasedproductscard from "../cards/Unpurchasedproductcard"
import tick from "../../assets/images/misc/tick_black.png"
import { Image } from "expo-image"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
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
    error:{
        fontSize:14
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
    error:{
        fontSize:12
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
    error:{
        fontSize:13
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
    error:{
        fontSize:13
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

type error={
    category:{category:string,error:string}[]|undefined,
    products:{product:Product,error:string}[]|undefined,
    general:undefined|string[]
}

const Addtoorder=(props:{orderinfoid:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    let orderInfo:{orderId:string,package:Package,products:Product[]}=getBasket(props.orderinfoid)
    const [path,navigate]=useNavigation()
    const [Products,setProducts]=useState<Product[]>(orderInfo.products)
    const errors=useRef<error>({category:undefined,products:undefined,general:undefined});

    const addToOrder=async ()=>{
        let data={
            orderId:orderInfo.orderId,
            products:Products.map((item)=>({
                category: item.category,
                courseId:item.course._id,
                intake: item.intake
            }))
        }
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="addproducts");
        let validation=requestInfo?.inputValidator(data);
        console.log("Res",requestInfo);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            console.log("Server res",JSON.stringify(serverRes,null,2))
            if(serverRes?.success)
            {
                //setIsloading(false);
                requestInfo?.responseHandler(serverRes);
                await removeCartItems(Products);
                navigate({type:"RemovePages",payload:[{id:"Addtoorder"},{id:"Cart"}]})
            }
        }
        return serverRes?.success
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
            console.log("Server res",JSON.stringify(serverRes,null,2))
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
    }

    const deleteProduct=(item:Product)=>{
        console.log("data")
        setProducts(Products.filter((product)=>!compareProducts(item,product)))
    }
    
    let validation=PackageProductsValidator(orderInfo.package,Products)
    errors.current={category:validation.categoryErrors,products:validation.productsErrors,general:validation.generalErrors}
    console.log("infff",orderInfo);

    return(
        <View style={{flex:1,paddingBottom:20}}>
            <View style={{padding:5,gap:15}}>
                <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Suggested Packages</Text>
                <View>
                    <Packagecard {...orderInfo.package} index={0}/>
                </View>
                    <View>{
                        errors.current.category?.map((error)=>
                        <Text style={[styles[Device].error]}>{error.error}</Text>
                        )    
                    }</View>
                <View>
                </View>
            </View>
            <View style={{flex:1,gap:15,padding:5}}>
                <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products</Text>
                <ScrollView contentContainerStyle={{gap:30,paddingBottom:20}}>
                {
                    Products.map((product,i)=>
                    <View key={product.course._id+product.intake} style={{gap:7.5}}>
                        <Unpurchasedproductscard data={product} deleteHandler={deleteProduct} index={i}/>
                        <Text style={[{alignSelf:"flex-end",fontFamily:Fonts.NeutrifStudio.Regular,color:"red"},styles[Device].error]}>{errors.current.products?.find((item)=>compareProducts(item.product,product))?.error}</Text>
                    </View>
                    )
                }
                </ScrollView>
            </View>
            {
                (errors.current.category!=undefined && errors.current.products!=undefined && errors.current.category.length==0 && errors.current.products.length==0 && errors.current.general!=undefined && errors.current.general.length==0)
                ?
                <View style={{alignSelf:"stretch"}}><Asynchronousbutton successText="Added Succesfully" idleText="Add Products" failureText="Something went wront" callback={addToOrder}/></View>
                // <Pressable onPress={addToOrder} style={{alignSelf:'center',borderRadius:100,borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),padding:5,paddingLeft:20,paddingRight:20,marginBottom:20}}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:5}]}>Add to Order</Text></Pressable>
                :
                null
            }
        </View>
    )

}

export default Addtoorder


// {
//     "_id": "66e9804dcd6de5d86ae36017",
//     "student": "66dfe2f72354567185f6cd3d",
//     "Package": {
//       "priceDetails": {
//         "currency": {
//           "symbol": "₹",
//           "code": "INR"
//         },
//         "totalPrice": 0,
//         "availableCoupons": []
//       },
//       "duration": {
//         "start": "2024-09-17T13:31:01.117Z"
//       },
//       "_id": "66b8414fcfe5abb913e9b1bd",
//       "variety": "Standard",
//       "name": "Premium One - All",
//       "description": "All-inclusive package for master's applications for all countries with expert guidance.",
//       "country": [
//         "New Zealand",
//         "United States of America",
//         "United Kingdom",
//         "Canada",
//         "Australia",
//         "Ireland"
//       ],
//       "requirements": [
//         "Valid Passport"
//       ],
//       "benefits": [
//         "Total Number of Institutions: 5",
//         "Admissions Counselling",
//         "University Shortlist & Selection",
//         "Application Submission",
//         "Application Documentation",
//         "Admission Status Follow - up",
//         "Visa Application",
//         "Documentation for Visa",
//         "Mock Interview Sessions",
//         "SOP, LOR & Other Content Check and Tips",
//         "Advance Assistance in SOP, LOR and Other Content",
//         "Scholarship Search and Application",
//         "Education Loan Assistance (Gyan Dhan)",
//         "Accommodation Assistance",
//         "Forex Arrangement"
//       ],
//       "features": [],
//       "termsAndConditions": "Terms and conditions apply. Services are subject to change based on availability.",
//       "active": true,
//       "assigned": [],
//       "__v": 0,
//       "createdAt": "2024-07-08T11:27:03.012Z",
//       "updatedAt": "2024-07-08T11:27:03.012Z",
//       "products": [
//         {
//           "_id": "66e992a441dbf2a7e2c4befc",
//           "category": "premium application",
//           "quantity": 5
//         }
//       ],
//       "MutuallyExclusivePackages": [
//         "668bcd074176e9d89db73b34",
//         "668bcd064176e9d89db73b2f",
//         "668bcd074176e9d89db73b30",
//         "668bcd074176e9d89db73b31",
//         "668bcd074176e9d89db73b32",
//         "668bcd074176e9d89db73b33"
//       ],
//       "logs": []
//     },
//     "products": [
//       {
//         "info": {
//           "notes": [],
//           "questionnaire": []
//         },
//         "_id": "66e9804dcd6de5d86ae36015",
//         "course": "659988a002575ec68bf1386e",
//         "intake": "2025-05-10T00:00:00.000Z",
//         "deadline": "2024-03-01T00:00:00.000Z",
//         "user": "66dfe2f72354567185f6cd3d",
//         "category": "premium application",
//         "cancellationRequest": false,
//         "advisors": [],
//         "docChecklist": [],
//         "log": [],
//         "__v": 0,
//         "createdAt": "2024-09-17T13:12:45.018Z",
//         "updatedAt": "2024-09-17T13:12:45.099Z",
//         "order": "66e9804dcd6de5d86ae36017"
//       },
//       {
//         "info": {
//           "notes": [],
//           "questionnaire": []
//         },
//         "_id": "66e9900241dbf2a7e2c4abd7",
//         "course": "659988a002575ec68bf13816",
//         "intake": "2025-08-10T00:00:00.000Z",
//         "user": "66dfe2f72354567185f6cd3d",
//         "order": "66e9804dcd6de5d86ae36017",
//         "category": "premium application",
//         "cancellationRequest": false,
//         "advisors": [
//           "66e00102e3f059acf2fe673a",
//           "66d873c85af1b72bb3d854cb"
//         ],
//         "docChecklist": [],
//         "log": [
//           {
//             "status": "Processing",
//             "stages": [
//               {
//                 "name": "Waiting For Counsellor's Approval",
//                 "updatedAt": "2024-09-17T13:30:59.484Z",
//                 "_id": "66e9900241dbf2a7e2c4abdd"
//               }
//             ],
//             "_id": "66e9900241dbf2a7e2c4abdc"
//           }
//         ],
//         "createdAt": "2024-09-17T14:19:46.737Z",
//         "updatedAt": "2024-09-17T14:19:46.858Z",
//         "__v": 1,
//         "deadline": "2024-06-01T00:00:00.000Z",
//         "stage": "Waiting For Counsellor's Approval",
//         "status": "Processing"
//       },
//       {
//         "info": {
//           "notes": [],
//           "questionnaire": []
//         },
//         "_id": "66e99135f979d15f1972720d",
//         "course": "659988a002575ec68bf1381f",
//         "intake": "2025-08-10T00:00:00.000Z",
//         "user": "66dfe2f72354567185f6cd3d",
//         "order": "66e9804dcd6de5d86ae36017",
//         "category": "premium application",
//         "cancellationRequest": false,
//         "advisors": [
//           "66e00102e3f059acf2fe673a",
//           "66d873c85af1b72bb3d854cb"
//         ],
//         "docChecklist": [],
//         "log": [
//           {
//             "status": "Processing",
//             "stages": [
//               {
//                 "name": "Waiting For Counsellor's Approval",
//                 "updatedAt": "2024-09-17T13:30:59.488Z",
//                 "_id": "66e99135f979d15f19727214"
//               }
//             ],
//             "_id": "66e99135f979d15f19727213"
//           }
//         ],
//         "createdAt": "2024-09-17T14:24:53.556Z",
//         "updatedAt": "2024-09-17T14:24:53.646Z",
//         "__v": 1,
//         "deadline": "2024-01-01T00:00:00.000Z",
//         "stage": "Waiting For Counsellor's Approval",
//         "status": "Processing"
//       },
//       {
//         "info": {
//           "notes": [],
//           "questionnaire": []
//         },
//         "_id": "66e992a441dbf2a7e2c4beeb",
//         "course": "659988a002575ec68bf13825",
//         "intake": "2026-08-10T00:00:00.000Z",
//         "user": "66dfe2f72354567185f6cd3d",
//         "order": "66e9804dcd6de5d86ae36017",
//         "category": "premium application",
//         "cancellationRequest": false,
//         "advisors": [
//           "66e00102e3f059acf2fe673a",
//           "66d873c85af1b72bb3d854cb"
//         ],
//         "docChecklist": [],
//         "log": [
//           {
//             "status": "Processing",
//             "stages": [
//               {
//                 "name": "Waiting For Counsellor's Approval",
//                 "updatedAt": "2024-09-17T13:30:59.484Z",
//                 "_id": "66e992a441dbf2a7e2c4bef1"
//               }
//             ],
//             "_id": "66e992a441dbf2a7e2c4bef0"
//           }
//         ],
//         "createdAt": "2024-09-17T14:31:00.260Z",
//         "updatedAt": "2024-09-17T14:31:00.360Z",
//         "__v": 1,
//         "deadline": "2024-07-01T00:00:00.000Z",
//         "stage": "Waiting For Counsellor's Approval",
//         "status": "Processing"
//       }
//     ],
//     "status": "pending",
//     "logs": [],
//     "createdAt": "2024-09-17T13:12:45.067Z",
//     "updatedAt": "2024-09-17T14:31:00.390Z",
//     "__v": 3
//   }