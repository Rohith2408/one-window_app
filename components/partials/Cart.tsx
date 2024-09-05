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
    }
})

const MobileMStyles=StyleSheet.create({
    checkout:{
        fontSize:12
    }
})

const MobileLStyles=StyleSheet.create({
    checkout:{
        fontSize:12
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
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",Programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},Universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    return(
        <View style={{flex:1}}>
        {
            cart.responseStatus=="not_recieved"
            ?
            <Text>Loading</Text>
            :
            <View style={{flex:1,gap:20}}>
                {
                    cart.data.length>0
                    ?
                    <Pressable style={{alignSelf:'flex-end',borderRadius:100,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(1)}} onPress={order}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Checkout</Text></Pressable>
                    :
                    null
                }
                <View style={{flex:1}}>
                {
                    cart.data.length==0
                    ?
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>No items added to cart</Text>
                        <Pressable onPress={openExplore}><Text>Explore</Text></Pressable>
                    </View>
                    :
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:20,padding:10}}>
                    {
                        cart.data.map((item,i)=>
                        <Cartcard key={item._id} {...item} index={i}/>
                        )
                    }
                    </ScrollView>
                }
                </View>
            </View>
        }
        </View>
    )
}

export default Cart