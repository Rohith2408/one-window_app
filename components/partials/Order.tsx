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
import Heading from "../resources/Heading"
import sad_face from '../../assets/images/illustrations/sad.png'
import { getTask } from "../../constants/tasks"
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    title:{
        fontSize:17
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
    },
    no_package_subtitle:{
        fontSize:15
    }
})

const MobileSStyles=StyleSheet.create({
    title:{
        fontSize:13
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
    },
    no_package_subtitle:{
        fontSize:11
    }
})

const MobileMStyles=StyleSheet.create({
    title:{
        fontSize:15
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
    },
    no_package_subtitle:{
        fontSize:13
    }
})

const MobileLStyles=StyleSheet.create({
    title:{
        fontSize:15
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
    },
    no_package_subtitle:{
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
    const orders=useAppSelector((state)=>state.orders);
    //const suggestedPackages=useAppSelector((state)=>state.suggestedpackages).data
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

    const scheduleMeet=()=>{
        let counsellor=store.getState().advisors.data?.find((expert)=>expert.info.role=="counsellor");
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"AddMeeting",forminitialdataid:counsellor?.info._id}}}):null
    }
    

    return(
        <View style={[{flex:1,gap:50},appStandardStyles.screenMarginSmall]}>
            <View>
                <Heading heading="SUGGESTED PACKAGES"/>
                <View>
                    {
                        suggestedPackages.length!=0
                        ?
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                        <View style={{flexDirection:'row',alignItems:"center",gap:15,paddingTop:10}}>
                            <View style={{flex:1,flexDirection:"column",alignItems:"flex-start",gap:10}}>
                                <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.85)}]}>No suggestions available</Text>
                                <Text style={[styles[Device].no_package_subtitle,{lineHeight:22,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>Don’t worry! Connect with our experts to find the perfect package for you.</Text>
                                <Pressable onPress={scheduleMeet} style={[appStandardStyles.buttonWrapper]}><Text style={[appStandardStyles.buttonText]}>Schedule a Meet</Text></Pressable>
                            </View>
                            <Image source={sad_face} style={[{width:90,height:90,resizeMode:'contain'}]}/>
                        </View>
                        // <Text  style={[styles[Device].title,{padding:15,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>No Packages available</Text>
                    }
                    
                </View>
            </View>
            <View style={{flex:1,gap:7}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Heading heading="SELECTED PRODUCTS"/>
                    {
                        errors.current.products?.length>0
                        ?
                        <Transitionview effect="fade"><Pressable onPress={removeNonEligeble} style={{borderRadius:100,borderWidth:1.3,borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}}><Text style={[styles[Device].remove_button,appStandardStyles.screenMarginSmall,{padding:7,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Remove Non-Eligeble</Text></Pressable></Transitionview>
                        :
                        null
                    }
                </View>
                <ScrollView contentContainerStyle={{gap:25,padding:0}}>
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