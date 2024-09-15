import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { CartItem, Event, ProgramIntake } from "../../types";
import { requests } from "../../constants/requests";
import { useRef, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import { store } from "../../store";
import { ISOtoIntakeformat, formatDate, getDevice } from "../../utils";
import { addToBasket } from "../../constants/basket";
import Cartcard from "../cards/Cartcard";
import { Fonts, Themes } from "../../constants";

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    checkout:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({
    checkout:{
        fontSize:12
    },
    not_found:{
        fontSize:16
    },
    not_found_sub:{
        fontSize:12
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
    }
})

const MobileLStyles=StyleSheet.create({
    checkout:{
        fontSize:12
    },
    not_found:{
        fontSize:20
    },
    not_found_sub:{
        fontSize:16
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

    const order=()=>{
        addToBasket("orderinfo",{
            package:undefined,
            products:cart.data.map((item)=>({
                intake:item?.intake,
                category:item?.course.elite?"elite application":"premium application",
                course:{name:item?.course?.name,id:item.course._id,icon:item.course.university.logoSrc}
            }))
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:"orderinfo"}}}):null
    }

    const openExplore=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}}):null;
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    return(
        <View style={{flex:1,paddingTop:20}}>
        {
            cart.responseStatus=="not_recieved"
            ?
            <Text>Loading</Text>
            :
            <View style={{flex:1,gap:20}}>
                <View style={{flex:1}}>
                {
                    cart.data.length==0
                    ?
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:15}}>
                        <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{"It's awfully quiet in here...!"}</Text>
                        <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Explore over 80,000 programs and 8,000 universities and get into your dream university!</Text>
                        <Pressable onPress={openExplore} style={{borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}}><Text style={{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}}>Explore</Text></Pressable>
                    </View>
                    :
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:20,padding:5}}>
                    {
                        cart.data.map((item,i)=>
                        <Cartcard key={item._id} {...item} index={i}/>
                        )
                    }
                    </ScrollView>
                }
                </View>
                {
                    cart.data.length>0
                    ?
                    <Pressable style={{alignSelf:"center",padding:5,paddingLeft:20,paddingRight:20,borderRadius:100,borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={order}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Checkout</Text></Pressable>
                    :
                    null
                }
            </View>
        }
        </View>
    )
}

export default Cart