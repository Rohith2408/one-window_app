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

type error={
    category:{category:string,error:string}[]|undefined,
    products:{product:Product,error:string}[]|undefined,
    general:undefined|string[]
}

const Order=(props:{orderinfoid:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    let orderInfo:{package:Package|undefined,products:Product[]}=getBasket(props.orderinfoid)
    const [path,navigate]=useNavigation()
    const [Package,setPackage]=useState(orderInfo.package)
    const [Products,setProducts]=useState<Product[]>(orderInfo.products)
    const errors=useRef<error>({category:undefined,products:undefined,general:undefined});
    const suggestedPackages=useAppSelector((state)=>state.suggestedpackages.data);

    const packageSelected=(item:Package[])=>{
        setPackage(item[0]);
    }

    const deleteProduct=(item:Product)=>{
        setProducts(Products.filter((product)=>!compareProducts(item,product)))
    }

    const showOrderSummary=()=>{
        addToBasket("ordersummary",{
            package:Package,
            products:Products
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Ordersummary",params:{ordersummaryid:"ordersummary"}}}):null
    }
    
    let validation=PackageProductsValidator(Package,Products)
    errors.current={category:validation.categoryErrors,products:validation.productsErrors,general:validation.generalErrors}

    return(
        <View style={{flex:1}}>
            <View style={{padding:5,gap:15}}>
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
                <Pressable style={{alignSelf:'center',borderRadius:100,borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),padding:5,paddingLeft:20,paddingRight:20,marginBottom:20}} onPress={showOrderSummary}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:5}]}>Continue</Text></Pressable>
                :
                null
            }
        </View>
    )

}

export default Order