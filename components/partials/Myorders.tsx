import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation";
import Order from "./Order";
import Ordercard from "../cards/Ordercard";
import { Image } from "expo-image";
import Loadinglistscreen from "../resources/Loadinglistscreen";
import { Fonts, Themes } from "../../constants";
import emptylist from '../../assets/images/illustrations/sad_male.png'
import { useRef } from "react";
import { getDevice } from "../../utils";
import Transitionview from "../resources/Transitionview";

const GeneralStyles=StyleSheet.create({
    add_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        position:'absolute',
        gap:7.5,
        bottom:20,
        right:0,
        zIndex:1,
        backgroundColor:"white",
        borderRadius:100,
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:2,
        padding:7
    }
})

const TabStyles=StyleSheet.create({
    no_workexperience:{
        fontSize:20
    },
    click_message:{
        fontSize:16
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    card:{
        width:'100%',
        height:75
    }
})

const MobileSStyles=StyleSheet.create({
    no_workexperience:{
        fontSize:14
    },
    click_message:{
        fontSize:10,
        lineHeight:16
    },
    emptylist_image:{
        width:120,
        height:120,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:50
    }
})
const MobileMStyles=StyleSheet.create({
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:75
    }
})
const MobileLStyles=StyleSheet.create({
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12
    },
    emptylist_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    },
    card:{
        width:'100%',
        height:75
    }

})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Myorders=()=>{

    const orders=useAppSelector((state)=>state.orders);
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    //console.log("Orders",JSON.stringify(orders.data[1],null,2))

    const openExplore=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}}):null;
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    return(
        <View style={{flex:1,paddingTop:10}}>
        {
            orders.responseStatus=="not_recieved"
            ?
            <View style={{flex:1}}><Loadinglistscreen cardGap={30} count={7} visibilityCount={6} direction="vertical"/></View>
            :
            <View style={{flex:1}}>
            {
                orders.data.length==0
                ?
                <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                    <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                    <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Not orders to show...!</Text>
                    <Pressable onPress={openExplore}><Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Start exploring now</Text></Pressable>
                </View>
                :
                <ScrollView style={{flex:1}} contentContainerStyle={{gap:50,padding:15,paddingTop:25}}>
                {
                    orders.data.map((order,i)=>
                    <Transitionview effect="panY" delay={100*i}>
                        <View key={order._id}><Ordercard index={i} {...order}/></View>
                    </Transitionview>
                    
                )}
                </ScrollView>
            }
            </View>
        }
        </View>
    )
}

export default Myorders