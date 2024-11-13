import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { useRef } from "react"
import useTheme from "../../hooks/useTheme"
import {Fonts, Themes } from "../../constants"
import { Image } from "expo-image";
import destinations_icon from "../../assets/images/explore/destinations.png"
import universities_icon from '../../assets/images/explore/universities.png'
import programs_icon from '../../assets/images/explore/programs.png'
import university_icon from '../../assets/images/misc/mallareddylogo.png'
import { Banner, Device } from "../../types"
import { useAppSelector } from "../../hooks/useAppSelector"
import List from "../resources/List"
import Product from "../cards/Productcard"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { store } from "../../store"
import emptylist from '../../assets/images/illustrations/sad.png'
import Dynamicplaceholder from "../resources/Dynamicplaceholder"
import Carousel from "../resources/Carousel"
import Bannercard from "../cards/Bannercard"
import sample_banner from '../../assets/images/banners/sample.png'
import banner_1 from '../../assets/images/banners/1.png'
import banner_2 from '../../assets/images/banners/2.png'
import banner_3 from '../../assets/images/banners/3.png'
import Productcompactcard from "../cards/Productcompactcard"
import Transitionview from "../resources/Transitionview"

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
    prop:{
        top:10,
        left:-10,
        width:24,
        height:24,
        resizeMode:"contain"
    },
    sub_wrapper:{
        // maxWidth:500,
        gap:38
    },
    welcome_message:{
        fontSize:36,
        fontWeight:"700"
    },
    search_text:{
        fontSize:22
    },
    explore_icon:{
        width:40,
        height:40
    },
    explore_text:{
        fontSize:20
    },
    products_wrapper:{
        gap:10
    },
    products_title:{
        fontSize:24
    },
    card:{
        width:385,
        height:250
    },
    loader_card:{
        width:325,
        height:250
    },
    no_products_title:{
        fontSize:22
    },
    no_products:{
        fontSize:18
    },
    no_products_image:{
        width:160,
        height:160,
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
        // maxWidth:500,
        gap:26
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
    no_products_title:{
        fontSize:14
    },
    no_products:{
        fontSize:12
    },
    no_products_image:{
        width:74,
        height:74,
        resizeMode:"contain"
    },
    banner_wrapper:{
        height:250
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
        // maxWidth:500,
        gap:30
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
        height:160
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products_title:{
        fontSize:15
    },
    no_products:{
        fontSize:12
    },
    no_products_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    banner_wrapper:{
        height:150
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
        // maxWidth:500,
        gap:34
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
    no_products_title:{
        fontSize:16
    },
    no_products:{
        fontSize:14
    },
    no_products_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    banner_wrapper:{
        height:300
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
        {text:"Destinations",icon:destinations_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Error",params:{error:"We are working on it, feature will be available soon!",preventAutoHide:true}}}):null},//navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Destinations",destinationsadditionalfilters:[],destinationsquickfilters:[],search:"",destinationspage:1}}}):null
        {text:"Universities",icon:universities_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Universities",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null},
        {text:"Programs",icon:programs_icon,handler:()=>navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null}
    ]).current
    const banners=useRef<Banner[]>([
        {title:"Choosing the right university",subTitle:"",image:banner_1,url:"https://onewindow.co/steps-to-select-university/"},
        // {title:"Scholorship vs Student Loan",subTitle:"",image:sample_banner,url:"https://onewindow.co/scholarship-vs-student-loan-understanding-the-pros-and-cons/"},
        {title:"Making friends abroad",subTitle:"",image:banner_2,url:"https://onewindow.co/07-tips-to-make-friends-while-you-study-abroad/"},
        {title:"Academic success strategies",subTitle:"",image:banner_3,url:"https://onewindow.co/top-5-academic-success-strategies-for-study-abroad/"},
        // {title:"Summer Programs",subTitle:"",image:sample_banner,url:"https://onewindow.co/summer-programs-short-term-opportunities/"}
    ]).current


    const openSearch=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Search",params:{initialSearch:""}}}):null
    }

    const openExplore=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1},universitieslistquery:{search:"",additionalFilters:[],quickFilters:[],page:1}}}}):null
    }

    //console.log("ver",store.getState().products);

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.sub_wrapper,styles[Device].sub_wrapper]}>
                <View style={{position:"relative",gap:10}}>
                    <View style={[styles[Device].prop,{position:"absolute",borderRadius:100,backgroundColor:Themes.Light.OnewindowPurple(1)}]}></View>
                    <Transitionview effect="pan"><Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:theme=="light"?Themes.Light.OnewindowPrimaryBlue(1):'white'},Device?styles[Device].welcome_message:{}]}>Hello , {(personalinfo.data?.firstName?(personalinfo.data.firstName):"User")}!</Text></Transitionview>
                    {/* <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                        <Image source={university_icon} style={[GeneralStyles.explore_icon,{width:24,height:24,resizeMode:"contain"}]}></Image>
                        <Text style={{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(0.5)}}>Malla Reddy University</Text>
                    </View> */}
                </View>
                <Text style={[GeneralStyles.products_title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Update No.-3.3</Text>
                <Transitionview effect="pan">
                    <Pressable onPress={openSearch} style={[GeneralStyles.search,{borderColor:theme=="light"?Themes.Light.OnewindowPrimaryBlue(0.25):'white'}]}>
                        <Dynamicplaceholder/>                     
                    </Pressable>
                </Transitionview>
                <View style={[GeneralStyles.explore_wrapper]}>
                {
                    exploreTabs.map((item,i)=>
                    <Exploreitem key={item.text} {...item} device={Device} theme={theme}></Exploreitem>
                    // <Transitionview style={[{flex:1,alignSelf:"stretch"}]} effect="pan" delay={i==1?0:100}>
                    //     <Exploreitem key={item.text} {...item} device={Device} theme={theme}></Exploreitem>
                    // </Transitionview>
                    )
                }
                </View>
                <View style={[{width:"100%"}]}>
                    <Carousel data={banners} card={Bannercard}/>
                </View>
                {/* <View style={[{width:"100%"}]}>
                    <Carousel data={banners} card={Bannercard}/>
                </View> */}
                <View style={[GeneralStyles.products_wrapper,styles[Device].products_wrapper]}>
                    <Text style={[GeneralStyles.products_title,styles[Device].products_title,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Products</Text>
                    {
                        products.responseStatus=="not_recieved"
                        ?
                        <Loadinglistscreen cardStyles={styles[Device].loader_card} cardGap={30} count={3} direction="horizontal"/>
                        :
                            products.data.length==0
                            ?
                            <View style={{flexDirection:"row",justifyContent:"center",alignItems:'center',gap:10}}>
                                <View style={{flex:1,flexDirection:"column",alignItems:"flex-start",justifyContent:"center",gap:10}}>
                                    <View><Text style={[styles[Device].no_products_title,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>Not purchased any products yet</Text></View>
                                    <Pressable onPress={openExplore}><Text style={[styles[Device].no_products,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>Explore now!</Text></Pressable>
                                </View>
                                <Image source={emptylist} style={[styles[Device].no_products_image]}/>
                            </View>
                            :
                            <List cardStyles={styles[Device].card} list={products.data} card={Productcompactcard} direction="Horizontal" mode="Scroll"></List>
                    }
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
        <Pressable onPress={()=>props.handler()} style={[GeneralStyles.explore_item,{gap:5}]}>
            <Image source={props.icon} style={[GeneralStyles.explore_icon,styles[props.device].explore_icon]}></Image>
            <Text style={[GeneralStyles.explore_text, {color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold} ,styles[props.device].explore_text]}>{props.text}</Text>
        </Pressable>
    )
}

export default Home