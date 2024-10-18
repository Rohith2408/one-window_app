import { useEffect, useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import * as SecureStore from 'expo-secure-store';
import { Fonts, Themes, components, secureStoreKeys } from "../../constants";
import useNavigation from "../../hooks/useNavigation";
import useTheme from "../../hooks/useTheme";
import { getDevice, propsMapper } from "../../utils";
import destinations_icon from "../../assets/images/explore/destinations.png"
import universities_icon from '../../assets/images/explore/universities.png'
import programs_icon from '../../assets/images/explore/programs.png'
import university_icon from '../../assets/images/misc/mallareddylogo.png'
import { Image } from "expo-image";
import { Device } from "../../types";
import Stacknavigator from "../../navigation/stackNavigator";
import Invalidpath from "../partials/Invalidpath";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:5,
        paddingTop:20,
        backgroundColor:'white'
    },
    sub_wrapper:{
        width:"100%",
        height:"100%"
    },
    welcome_message:{
   
    },
    search:{
        borderRadius:100,
        borderWidth:1.5,
        padding:10
    },
    search_text:{
        color:"#C3C3C3",
        fontWeight:"600"
    },
    explore_wrapper:{
        display:"flex",
        flexDirection:"row"
    },
    explore_item:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    explore_icon:{
        resizeMode:"contain",
    },
    explore_text:{
        fontWeight:"700"
    },
    products_wrapper:{
        width:"100%",
        display:'flex'
    },
    products_title:{
        fontWeight:"700"
    }
})

const TabStyles=StyleSheet.create({
    sub_wrapper:{
        maxWidth:500
    },
    welcome_message:{
        fontSize:20
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:60,
        height:60
    },
    explore_text:{
        fontSize:12
    },
    products_wrapper:{
        height:200
    },
    products_title:{
        fontSize:16
    },
    no_products:{
        fontSize:15
    },
    no_products_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    prop:{
        top:7,
        left:-7,
        width:22,
        height:22,
        resizeMode:"contain"
    },
    sub_wrapper:{
        maxWidth:500,
        gap:30
    },
    welcome_message:{
        fontSize:20,
        fontWeight:"700"
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:32,
        height:32
    },
    explore_text:{
        fontSize:11
    },
    products_wrapper:{
        gap:5
    },
    products_title:{
        fontSize:14
    },
    card:{
        width:230,
        height:160
    },
    loader_card:{
        width:230,
        height:160
    },
    no_products:{
        fontSize:12
    },
    no_products_image:{
        width:64,
        height:64,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({

    prop:{
        top:10,
        left:-10,
        width:24,
        height:24,
        resizeMode:"contain"
    },
    sub_wrapper:{
        maxWidth:500,
        gap:40
    },
    welcome_message:{
        fontSize:26,
        fontWeight:"700"
    },
    search_text:{
        fontSize:14
    },
    explore_icon:{
        width:34,
        height:34
    },
    explore_text:{
        fontSize:12
    },
    products_wrapper:{
        gap:10
    },
    products_title:{
        fontSize:18
    },
    card:{
        width:250,
        height:205
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products:{
        fontSize:12
    },
    no_products_image:{
        width:70,
        height:70,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({

    prop:{
        top:10,
        left:-10,
        width:24,
        height:24,
        resizeMode:"contain"
    },
    sub_wrapper:{
        maxWidth:500,
        gap:40
    },
    welcome_message:{
        fontSize:26,
        fontWeight:"700"
    },
    search_text:{
        fontSize:14
    },
    explore_icon:{
        width:34,
        height:34
    },
    explore_text:{
        fontSize:12
    },
    products_wrapper:{
        gap:10
    },
    products_title:{
        fontSize:18
    },
    card:{
        width:250,
        height:205
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products:{
        fontSize:14
    },
    no_products_image:{
        width:80,
        height:80,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Guest=(props:{screens:string[],params:any})=>{

    const [path,navigate]=useNavigation()

    useEffect(()=>{
        SecureStore.getItemAsync(secureStoreKeys.ACCESS_TOKEN).then((AT)=>{
            AT?navigate({type:"SetLayout",payload:{layoutScreen:"Student",screens:["Base"],params:{tab:"home"}}}):null
        })
    },[])

    return(
        <View style={{width:"100%",height:"100%"}}>
            <Stacknavigator
                invalidPathScreen={Invalidpath}
                screens={propsMapper(props.screens,props.params).map((screen)=>({
                    id:screen.id,
                    component:screen.id,
                    props:screen.props,
                    swipable:true,
                    animationStyle:components.find((component)=>component.id==screen.id)?.animationStyle
            }))}
            />
        </View>
    )
}

const Exploreitem=(props:{icon:string,text:string,theme:"light"|"dark",handler:any})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <Pressable onPress={()=>props.handler()} style={[GeneralStyles.explore_item,{gap:5}]}>
            <Image source={props.icon} style={[GeneralStyles.explore_icon,styles[Device].explore_icon]}></Image>
            <Text style={[GeneralStyles.explore_text, {color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold} ,styles[Device].explore_text]}>{props.text}</Text>
        </Pressable>
    )
}

export default Guest