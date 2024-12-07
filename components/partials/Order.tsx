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
import { Fonts, Themes, appStandardStyles } from "../../constants"
import Unpurchasedproductscard from "../cards/Unpurchasedproductcard"
import tick from "../../assets/images/misc/tick_black.png"
import { Image } from "expo-image"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    title:{
        fontSize:18
    },
    icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    continue:{
        fontSize:18
    },
    error:{
        fontSize:16
    },
    remove_button:{
        fontSize:16
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
    },
    remove_button:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    title:{
        fontSize:16
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
    },
    remove_button:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    title:{
        fontSize:16
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
    },
    remove_button:{
        fontSize:14
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
    const orders=useAppSelector((state)=>state.orders);
    const suggestedPackages=useAppSelector((state)=>state.suggestedpackages).data.filter((Package)=>(Package.priceDetails.totalPrice!=0 || (Package.priceDetails.totalPrice==0 && !orders.data.find((order)=>(order.Package?.priceDetails?.totalPrice==0)))));

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
        navigate?navigate({type:"AddScreen",payload:{screen:"Ordersummary"}}):null
    }

    const removeNonEligeble=()=>{
        setProducts(Products.filter((product)=>!errors.current.products?.find((item)=>compareProducts(item.product,product))))
    }

    const showWarning=()=>{
        addToBasket("warning",{warningTitle:"Hold on a sec!",warningMessage:"Do you want to proceed without a package?",proceedCallback:showOrderSummary,yesLabel:"Proceed",noLabel:"No"});
        navigate?navigate({type:"AddScreen",payload:{screen:"Warning"}}):null;
    }

    const proceed=()=>{
        if(suggestedPackages.length>0 && Package==undefined){
            showWarning()
        }
        else
        {
            showOrderSummary()
        }
    }
    
    let validation=PackageProductsValidator(Package,Products)
    errors.current={category:validation.categoryErrors,products:validation.productsErrors,general:validation.generalErrors}
    

    return(
        <View style={{flex:1,gap:30}}>
            <View>
                <Text style={[styles[Device].title,appStandardStyles.screenMarginSmall,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Suggested Packages</Text>
                <View>
                    {
                        suggestedPackages.length!=0
                        ?
                        <ScrollView horizontal contentContainerStyle={{padding:15}}>
                        {
                            suggestedPackages.map((item,i)=>
                            <Pressable onPress={()=>setPackage(Package?._id==item._id?undefined:item)} style={{position:"relative"}}>
                                <Image source={tick} style={[styles[Device].icon,{transform:[{scale:item._id==Package?._id?1:0}]},{zIndex:1,position:"absolute",left:"80%",top:"10%"}]}/>
                                <Packagecard {...item} index={i}/>
                            </Pressable>
                            )
                        }
                        </ScrollView>
                        :
                        <Text  style={[styles[Device].title,{padding:15,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>No Packages available</Text>
                    }
                    
                </View>
                <View>
                </View>
            </View>
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{flex:1}}><Text style={[styles[Device].title,appStandardStyles.screenMarginSmall,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products</Text></View>
                    {
                        errors.current.products?.length>0
                        ?
                        <Transitionview effect="fade"><Pressable onPress={removeNonEligeble} style={{borderRadius:100,borderWidth:1.3,borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}}><Text style={[styles[Device].remove_button,appStandardStyles.screenMarginSmall,{padding:7,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Remove Non-Eligeble</Text></Pressable></Transitionview>
                        :
                        null
                    }
                </View>
                <ScrollView contentContainerStyle={{gap:25,padding:15}}>
                {
                    Products.map((product,i)=>
                    <View key={product.course._id+product.intake} style={{gap:7.5}}>
                        <View style={{opacity:errors.current.products?.find((item)=>compareProducts(item.product,product))?0.5:1}}><Unpurchasedproductscard data={product} deleteHandler={deleteProduct} index={i}/></View>
                        <Text style={[{alignSelf:"flex-end",textAlign:"right",maxWidth:"50%",lineHeight:20,fontFamily:Fonts.NeutrifStudio.Regular,color:"red"},styles[Device].error]}>{errors.current.products?.find((item)=>compareProducts(item.product,product))?.error}</Text>
                    </View>
                    )
                }
                </ScrollView>
            </View>
            <View style={[{alignSelf:"center"}]}>
            {
                errors.current.category?.map((error)=>
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Regular,color:"red"},styles[Device].error]}>{error.error}</Text>
                )    
            }
            </View>
            {
                (errors.current.category!=undefined && errors.current.products!=undefined && errors.current.category.length==0 && errors.current.products.length==0 && errors.current.general!=undefined && errors.current.general.length==0)
                ?
                <Pressable style={{alignSelf:'center',borderRadius:100,borderWidth:1.2,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),padding:5,paddingLeft:20,paddingRight:20,marginBottom:20}} onPress={proceed}><Text style={[styles[Device].continue,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:5}]}>Continue</Text></Pressable>
                :
                null
            }
        </View>
    )

}

export default Order