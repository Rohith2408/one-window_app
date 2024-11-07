import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { CartItem, Event, Order, ProgramIntake } from "../../types";
import { requests } from "../../constants/requests";
import { useRef, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import { store } from "../../store";
import { ISOtoIntakeformat, formatDate, getDevice } from "../../utils";
import { addToBasket } from "../../constants/basket";
import Cartcard from "../cards/Cartcard";
import { Fonts, Themes, appStandardStyles } from "../../constants";
import empty_image from "../../assets/images/illustrations/sad.png"
import { Image } from "expo-image";
import Asynchronousbutton from "../resources/Asynchronousbutton";
import products_icon from '../../assets/images/misc/products.png'
import delete_icon from '../../assets/images/misc/delete.png'
import Transitionview from "../resources/Transitionview";

const GeneralStyles=StyleSheet.create({
    addmore_wrapper:{
        flexDirection:'row',
        alignSelf:'stretch',
        alignItems:"center",
        justifyContent:"center",
        gap:5,
        borderRadius:100
    }
})

const TabStyles=StyleSheet.create({
    checkout:{
        fontSize:20
    },
    not_found:{
        fontSize:20
    },
    not_found_sub:{
        fontSize:18
    },
    items_count:{
        fontSize:16
    },
    empty_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    products_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    addmore:{
        fontSize:18,
    },
    addmore_wrapper:{
        padding:16
    }
})

const MobileSStyles=StyleSheet.create({
    checkout:{
        fontSize:12
    },
    not_found:{
        fontSize:14
    },
    not_found_sub:{
        fontSize:11
    },
    items_count:{
        fontSize:12
    },
    empty_image:{
        width:130,
        height:130,
        resizeMode:"contain"
    },
    products_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    addmore:{
        fontSize:12,
    },
    addmore_wrapper:{
        padding:7.5
    }
})

const MobileMStyles=StyleSheet.create({
    checkout:{
        fontSize:14
    },
    not_found:{
        fontSize:18
    },
    not_found_sub:{
        fontSize:14
    },
    items_count:{
        fontSize:14
    },
    empty_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    },
    products_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    addmore:{
        fontSize:14
    },
    addmore_wrapper:{
        padding:10
    }
})

const MobileLStyles=StyleSheet.create({
    checkout:{
        fontSize:12
    },
    not_found:{
        fontSize:18
    },
    not_found_sub:{
        fontSize:14
    },
    items_count:{
        fontSize:14
    },
    empty_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    },
    products_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    addmore:{
        fontSize:14,
    },
    addmore_wrapper:{
        padding:10
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Cart=()=>{

    const [path,navigate]=useNavigation()
    const cart=useAppSelector((state)=>state.cart);
    const currentSelection=useRef<CartItem|undefined>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [loading,setLoading]=useState(false);

    const order=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:"orderinfo"}}}):null
    }

    const addProducts=(order:Order)=>{
        addToBasket("orderinfo",{
            package:order.Package,
            products:cart.data
            // cart.data.map((item)=>({
            //     intake:item?.intake,
            //     category:item?.course.elite?"elite application":"premium application",
            //     course:{name:item?.course?.name,id:item.course._id,icon:item.course.university.logoSrc}
            // })
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Addproducts",params:{orderinfoid:"orderinfo"}}}):null
    }

    const checkout=()=>{
        let existingOrders:Order[]|undefined=store.getState().orders.data.filter((item)=>item.Package!=undefined && (item.products.length!=item.Package.products.reduce((acc,curr)=>(acc+curr.quantity),0)));
        addToBasket("orderinfo",{
            package:undefined,
            products:cart.data
        }) 
        if(existingOrders?.length>0)
        {
            navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Existingorders",flyerdata:{existingordersbasketid:"orderinfo"}}}}):null
        }
        else
        {
            addToBasket("orderinfo",{
                package:undefined,
                products:cart.data
            }) 
            navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:"orderinfo"}}}):null
        }
    }

    const clearCart=async ()=>{
        let data={
            action:"remove",
            itemIds:cart.data.map((item)=>item._id)
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
        return serverRes.success
    }

    const openExplore=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}}):null;
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    return(
        <View style={{flex:1,paddingTop:20,paddingBottom:20}}>
        {
            cart.responseStatus=="not_recieved"
            ?
            <Text>Loading</Text>
            :
            <View style={{flex:1,gap:20}}>
                <View style={[{flexDirection:"row",alignItems:"center",padding:5},appStandardStyles.screenMarginSmall]}>
                    <View style={{flex:2,flexDirection:"row",alignItems:'center',gap:5}}>
                        <Image source={products_icon} style={[styles[Device].products_icon]}/>
                        <View style={{flexDirection:"row",alignItems:'center'}}>
                            <Text style={[styles[Device].items_count,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{cart.data.length}</Text>
                            <Text style={[styles[Device].items_count,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{(cart.data.length==1?" Item has":" Items have")+" been added"}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,alignSelf:"stretch"}}>
                        {/* <Image source={delete_icon}  style={[styles[Device].delete_icon]}/> */}
                        <Asynchronousbutton idleText="Clear" successText="Cleared" failureText="Failed" callback={clearCart}/>
                    </View>   
                </View>
                <View style={{flex:1}}>
                {
                    cart.data.length==0
                    ?
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:15}}>
                        <Image source={empty_image} style={[styles[Device].empty_image]}/>
                        <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{"It's awfully quiet in here...!"}</Text>
                        <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Explore over 80,000 programs and 8,000 universities and get into your dream university!</Text>
                        <Pressable onPress={openExplore} style={{borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),paddingLeft:15,paddingRight:15,padding:10}]}>Explore</Text></Pressable>
                    </View>
                    :
                    <View style={{flex:1,gap:15}}>
                        <View style={[GeneralStyles.addmore_wrapper,styles[Device].addmore_wrapper,appStandardStyles.screenMarginSmall,{backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.05)}]}>
                            <Text style={[styles[Device].addmore,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Something is missing?</Text>
                            <Pressable onPress={openExplore}><Text style={[styles[Device].addmore,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Add more</Text></Pressable>
                        </View>
                        <ScrollView style={{flex:1}} contentContainerStyle={{gap:20,padding:15}}>
                        {
                            cart.data.map((item,i)=>
                            <Transitionview effect="pan" delay={100*i}>
                                <Cartcard key={item._id} {...item} index={i}/>
                            </Transitionview>
                            )
                        }
                        </ScrollView>
                    </View>
                }
                </View>
                {
                    cart.data.length>0
                    ?
                    <Pressable style={{alignSelf:"center",padding:5,paddingLeft:20,paddingRight:20,borderRadius:100,borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={checkout}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Checkout</Text></Pressable>
                    :
                    null
                }
            </View>
        }
        </View>
    )
}

export default Cart