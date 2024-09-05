import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { useRef } from "react"
import useTheme from "../../hooks/useTheme"
import {Themes } from "../../constants"
import { Image } from "expo-image";
import destinations_icon from "../../assets/images/explore/destinations.png"
import universities_icon from '../../assets/images/explore/universities.png'
import programs_icon from '../../assets/images/explore/programs.png'
import { Device } from "../../types"
import { useAppSelector } from "../../hooks/useAppSelector"
import List from "../resources/List"
import Product from "../cards/Product"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
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
        borderWidth:1,
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
        display:'flex',
        gap:5
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
    }
})

const MobileSStyles=StyleSheet.create({

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
        width:40,
        height:40
    },
    explore_text:{
        fontSize:10
    },
    products_wrapper:{
        gap:20
    },
    products_title:{
        fontSize:14
    },
    card:{
        width:230,
        height:160
    }
})

const MobileMStyles=StyleSheet.create({

    sub_wrapper:{
        maxWidth:500,
        gap:34
    },
    welcome_message:{
        fontSize:22,
        fontWeight:"700"
    },
    search_text:{
        fontSize:14
    },
    explore_icon:{
        width:44,
        height:44
    },
    explore_text:{
        fontSize:12
    },
    products_title:{
        fontSize:15
    },
    card:{
        width:230,
        height:180
    }
})

const MobileLStyles=StyleSheet.create({

    sub_wrapper:{
        maxWidth:500
    },
    welcome_message:{
        fontSize:20,
        fontWeight:"700"
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:50,
        height:50
    },
    explore_text:{
        fontSize:12
    },
    products_wrapper:{
        height:200
    },
    products_title:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Home=(props:undefined|{name:string})=>{

    const products=useAppSelector((state)=>state.products)
    const personalinfo=useAppSelector((state)=>state.sharedinfo)
    const [theme,setTheme]=useTheme();
    const [path,navigate]=useNavigation();
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const exploreTabs=useRef([
        {text:"Destinations",icon:destinations_icon,handler:()=>{}},//navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Destinations",destinationsadditionalfilters:[],destinationsquickfilters:[],search:"",destinationspage:1}}}):null
        //{text:"Universities",icon:universities_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",Programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},Universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null},
        {text:"Universities",icon:universities_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{courselistid:"Programs",courseadditionalFilters:[],coursequickFilters:[],coursesearch:"",coursepage:1}}}):null},
        {text:"Programs",icon:universities_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{courselistid:"Programs",courseadditionalFilters:[],coursequickFilters:[],coursesearch:"",coursepage:1}}}):null},
        //{text:"Programs",icon:programs_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",Programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},Universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null}
    ]).current

    const openSearch=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Search"}}):null
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper]}>
                <View>
                    <Text style={[{color:theme=="light"?Themes.Light.OnewindowPrimaryBlue(1):'white'},Device?styles[Device].welcome_message:{}]}>Hello , {personalinfo.data?.firstName}!</Text>
                </View>
                <Pressable onPress={openSearch} style={[GeneralStyles.search,{borderColor:theme=="light"?Themes.Light.OnewindowPrimaryBlue(1):'white'}]}>
                    <Text style={[GeneralStyles.search_text,styles[Device].search_text]}>Search for "Harvard University"</Text>
                </Pressable>
                <View style={[GeneralStyles.explore_wrapper]}>
                {
                    exploreTabs.map((item)=>
                    <Exploreitem key={item.text} {...item} device={Device} theme={theme}></Exploreitem>
                    )
                }
                </View>
                <View style={[GeneralStyles.products_wrapper,styles[Device].products_wrapper]}>
                    <Text style={[GeneralStyles.products_title,styles[Device].products_title,{color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products</Text>
                    <List cardStyles={styles[Device].card} list={products.data} card={Product} direction="Horizontal" mode="Scroll"></List>
                </View>
            </View>
            {/* <Text>Home</Text>
            <Text>{props?.name}</Text>
            <Pressable onPress={()=>Nav?.navigate({type:"Logout"})}><Text>Logout</Text></Pressable> */}
        </View>
    )
}

const Exploreitem=(props:{icon:string,text:string,theme:"light"|"dark",device:Device,handler:any})=>{

    return(
        <Pressable onPress={()=>props.handler()} style={[GeneralStyles.explore_item]}>
            <Image source={props.icon} style={[GeneralStyles.explore_icon,styles[props.device].explore_icon]}></Image>
            <Text style={[GeneralStyles.explore_text, {color:Themes.Light.OnewindowPrimaryBlue(1)} ,styles[props.device].explore_text]}>{props.text}</Text>
        </Pressable>
    )
}

export default Home