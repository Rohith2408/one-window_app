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

const Order=(props:{orderinfoid:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    let orderInfo:{package:Package|undefined,products:Product[]}=getBasket(props.orderinfoid)
    const [path,navigate]=useNavigation()
    const [Package,setPackage]=useState(orderInfo.package)
    const [Products,setProducts]=useState<Product[]>(orderInfo.products)
    const [categoryError,setCategoryError]=useState<{category:string,error:string}[]|undefined>(undefined)
    const [productErrors,setProductErrors]=useState<{product:Product,error:string}[]|undefined>(undefined);
    const [generalErrors,setGeneralErrors]=useState<undefined|string[]>(undefined);
    const suggestedPackages=useAppSelector((state)=>state.suggestedpackages.data);

    useEffect(()=>{
        let errors=PackageProductsValidator(Package,Products)
        setCategoryError(errors.categoryErrors);
        setProductErrors(errors.productsErrors);
        setGeneralErrors(errors.generalErrors)
        console.log("errors",JSON.stringify(errors,null,2))
    },[Package,Products])

    const packageSelected=(item:Package[])=>{
        setPackage(item[0]);
    }

    const deleteProduct=(item:Product)=>{
        console.log("data")
        setProducts(Products.filter((product)=>!compareProducts(item,product)))
    }

    const showOrderSummary=()=>{
        addToBasket("ordersummary",{
            package:Package,
            products:Products
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Ordersummary",params:{ordersummaryid:"ordersummary"}}}):null
    }

    // const redirectToExplore=()=>{

    // }
    
    console.log(Package)
    
    return(
        <View style={{flex:1}}>
            <View style={{padding:10,gap:15}}>
                <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Suggested Packages</Text>
                <View>
                    <ScrollView horizontal>
                    {
                        suggestedPackages.map((item,i)=>
                        <Pressable onPress={()=>setPackage(Package?._id==item._id?undefined:item)} style={{position:"relative"}}>
                            <Image source={tick} style={[styles[Device].icon,{transform:[{scale:item._id==Package?._id?1:0}]},{zIndex:1,position:"absolute",left:"80%",top:"10%"}]}/>
                            <Packagecard {...item} index={i}/>
                        </Pressable>
                        )
                    }
                    </ScrollView>
                </View>
                    <View>{
                        categoryError?.map((error)=>
                        <Text>{error.error}</Text>
                        )    
                    }</View>
                <View>
                </View>
            </View>
            <View style={{flex:1,gap:15,padding:10}}>
            <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products</Text>
                <ScrollView contentContainerStyle={{gap:30,padding:5,paddingTop:20,paddingBottom:20}}>
                {
                    Products.map((product,i)=>
                    <View style={{gap:5}}>
                        <Unpurchasedproductscard data={product} deleteHandler={deleteProduct} index={i}/>
                        <Text style={[{alignSelf:"flex-end",fontFamily:Fonts.NeutrifStudio.Regular,color:"red"},styles[Device].error]}>{productErrors?.find((item)=>compareProducts(item.product,product))?.error}</Text>
                    </View>
                    )
                }
                </ScrollView>
            </View>
            {
                (categoryError!=undefined && productErrors!=undefined && categoryError.length==0 && productErrors.length==0 && generalErrors!=undefined && generalErrors.length==0)
                ?
                <Pressable style={{alignSelf:'center',borderRadius:100,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(1),padding:5,paddingLeft:20,paddingRight:20,marginBottom:20}} onPress={showOrderSummary}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Continue</Text></Pressable>
                :
                null
            }
        </View>
    )

}

export default Order