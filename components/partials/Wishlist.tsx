import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import Loadingview from "../resources/Loadingview"
import Workexperiencecard from "../cards/Workexperiencecard"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import add_icon from '../../assets/images/misc/add.png'
import { Image } from "expo-image"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import emptylist from '../../assets/images/illustrations/thinking.png'
import { addToBasket } from "../../constants/basket"
import { store } from "../../store"
import Wishlistcard from "../cards/Wishlistcard"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    add_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        position:'absolute',
        gap:7.5,
        bottom:20,
        right:10,
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
    add_icon:{
        width:40,
        height:40,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:18
    },
    click_message:{
        fontSize:14
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    card:{
        width:'100%',
        height:75
    },
    add_text:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    add_icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:14
    },
    click_message:{
        fontSize:10,
        lineHeight:16
    },
    emptylist_image:{
        width:130,
        height:130,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:50
    },
    add_text:{
        fontSize:12
    }
})
const MobileMStyles=StyleSheet.create({
    add_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:18
    },
    click_message:{
        fontSize:14,
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
    },
    add_text:{
        fontSize:14
    }
})
const MobileLStyles=StyleSheet.create({
    add_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
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
    },
    add_text:{
        fontSize:14
    }

})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Wishlist=(props:any)=>{

    const wishlist=useAppSelector((state)=>state.wishlist)

    const [path,navigate]=useNavigation()
    const [dimensions,setDimesnions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const openExplore=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}}):null;
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    return(
        <View style={{flex:1,paddingTop:30}}>
        {
            wishlist.responseStatus=="not_recieved"
            ?
            <View style={{flex:1}}><Loadinglistscreen cardGap={30} count={6} visibilityCount={5} direction="vertical"/></View>
            :
            <View style={{flex:1,gap:30}}>
                <Pressable onPress={openExplore} style={[GeneralStyles.add_wrapper]}>
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.75)},styles[Device].add_text]}>Add More Items?</Text>
                    <Image style={[styles[Device].add_icon]} source={add_icon}></Image>
                </Pressable>
                <View style={{flex:1}}>
                {
                    wishlist.data.length==0
                    ?
                    <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                        <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                        <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Your wishlist is currently empty!</Text>
                        <Pressable onPress={openExplore}><Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Start Exploreing now!</Text></Pressable>
                    </View>
                    :
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:50,padding:15}}>
                    {
                        wishlist.data.map((item,i)=>
                        <Transitionview effect="panY" delay={100*i}>
                            <View key={item._id} style={[styles[Device].card]}>
                                <Wishlistcard data={item} index={i}/>
                            </View>
                        </Transitionview>
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

export default Wishlist