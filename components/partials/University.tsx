import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Course, Event, Product, ProgramIntake, ServerResponse, University as UniversityType } from "../../types"
import { PackageProductsValidator, Word2Sentence, getAccessTokenFromStore, getDevice, getLightThemeColor, getServerRequestURL, getThemeColor, serverRequest } from "../../utils";
import { cartRequest } from "../../utils/serverrequests";
import useNavigation from "../../hooks/useNavigation";
import { addToBasket } from "../../constants/basket";
import Intakecard from "../cards/Intakecard";
import { removeCart, setCart, updateCart } from "../../store/slices/cartSlice";
import { store } from "../../store";
import { requests } from "../../constants/requests";
import { Image } from "expo-image";
import location_icon from '../../assets/images/misc/location.png'
import fee_icon from '../../assets/images/misc/fee.png'
import uni_ranking_image from '../../assets/images/misc/uni-ranking-template.png'
import sample_icon from '../../assets/images/profile/personal.png'
import { Fonts, Themes, appStandardStyles } from "../../constants";    
import Heading from "../resources/Heading";
import Loadinglistscreen from "../resources/Loadinglistscreen";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        backgroundColor:'white',
        gap:20
    },
    info_wrapper:{
        alignSelf:"stretch",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        gap:5,
        padding:10
    },
    uni_icon_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
    },
    uni_info_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        alignItems:"flex-start",
        gap:10
    },
    location_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5
    },
    dashboard_item_wrapper:{
        display:'flex',
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        gap:7,
        padding:10
    },
    dashboards_wrapper:{
        display:"flex",
        flexDirection:"column",
        gap:10,
        alignSelf:'stretch'
    },
    dashboard_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        gap:10
    },
    about_wrapper:{
        display:"flex",
        flexDirection:"column",
        gap:7,
        alignItems:'flex-start'
    },
    keyinfo_wrapper:{
        display:"flex",
        flexDirection:"column",
        gap:15,
        alignItems:'flex-start'
    },
})

const TabStyles=StyleSheet.create({
    location_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    uni_icon:{
        width:50,
        height:50,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:34,
        height:34,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:18,
        lineHeight:20
    },
    program_name:{
        fontSize:20
    },
    dashboard_icon:{
        height:22,
        width:22,
        resizeMode:"contain"
    },
    dashboard_item_wrapper:{
        borderRadius:20,
        flex:1
    },
    dashboards_wrapper:{
        height:260,
        gap:20
    },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:18
    },
    dashboard_label:{
        fontSize:14
    },
    about_heading:{
        fontSize:19
    },
    about:{
        fontSize:18,
        lineHeight:24
    },
    heading:{
        fontSize:18
    },
    rating:{
        fontSize:18
    },
    ranking_label:{
        fontSize:17,
        lineHeight:22
    },
    ranking_value:{
        fontSize:18
    },
    keyinfo_type:{
        fontSize:15
    },
    keyinfo_value:{
        fontSize:18,
        lineHeight:22
    },
    loader_mid_wrapper:{
        width:"100%",
        height:275
    },
    loader_bottom_wrapper:{
        width:"100%",
        height:230
    },
    loader_top_wrapper:{
        width:"100%",
        height:180
    }
})

const MobileSStyles=StyleSheet.create({

    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:34,
        height:34,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:22,
        height:22,
        borderRadius:100,
        left:-5,
        top:5
    },
    uni_location:{
        fontSize:12,
        lineHeight:18
    },
    program_name:{
        fontSize:14
    },
    dashboard_icon:{
        height:16,
        width:16,
        resizeMode:"contain"
    },
    dashboard_item_wrapper:{
        borderRadius:20,
        flex:1
    },
    dashboards_wrapper:{
        height:220,
        gap:20
    },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:12
    },
    dashboard_label:{
        fontSize:11
    },
    about:{
        fontSize:12,
        lineHeight:20
    },
    about_heading:{
        fontSize:14,
    },
    heading:{
        fontSize:14
    },
    rating:{
        fontSize:14
    },
    ranking_label:{
        fontSize:13,
        lineHeight:22
    },
    ranking_value:{
        fontSize:14
    },
    keyinfo_type:{
        fontSize:11
    },
    keyinfo_value:{
        fontSize:14,
        lineHeight:22
    },
    loader_mid_wrapper:{
        width:"100%",
        height:225
    },
    loader_bottom_wrapper:{
        width:"100%",
        height:180
    },
    loader_top_wrapper:{
        width:"100%",
        height:120
    }
})

const MobileMStyles=StyleSheet.create({
    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:40,
        height:40,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:24,
        height:24,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:15,
        lineHeight:20
    },
    program_name:{
        fontSize:16
    },
    dashboard_icon:{
        height:18,
        width:18,
        resizeMode:"contain"
    },
    dashboard_item_wrapper:{
        borderRadius:20,
        flex:1
    },
    dashboards_wrapper:{
        height:240,
        gap:20
    },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:14
    },
    dashboard_label:{
        fontSize:12
    },
    about_heading:{
        fontSize:17
    },
    about:{
        fontSize:16,
        lineHeight:24
    },
    heading:{
        fontSize:16
    },
    rating:{
        fontSize:16
    },
    ranking_label:{
        fontSize:15,
        lineHeight:22
    },
    ranking_value:{
        fontSize:16
    },
    keyinfo_type:{
        fontSize:13
    },
    keyinfo_value:{
        fontSize:16,
        lineHeight:22
    },
    loader_mid_wrapper:{
        width:"100%",
        height:250
    },
    loader_bottom_wrapper:{
        width:"100%",
        height:200
    },
    loader_top_wrapper:{
        width:"100%",
        height:150
    }
})

const MobileLStyles=StyleSheet.create({
    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:40,
        height:40,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:24,
        height:24,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:15,
        lineHeight:20
    },
    program_name:{
        fontSize:16
    },
    dashboard_icon:{
        height:18,
        width:18,
        resizeMode:"contain"
    },
    dashboard_item_wrapper:{
        borderRadius:20,
        flex:1
    },
    dashboards_wrapper:{
        height:240,
        gap:20
    },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:14
    },
    dashboard_label:{
        fontSize:12
    },
    about_heading:{
        fontSize:17
    },
    about:{
        fontSize:16,
        lineHeight:24
    },
    heading:{
        fontSize:16
    },
    rating:{
        fontSize:16
    },
    ranking_label:{
        fontSize:15,
        lineHeight:22
    },
    ranking_value:{
        fontSize:16
    },
    keyinfo_type:{
        fontSize:13
    },
    keyinfo_value:{
        fontSize:16,
        lineHeight:22
    },
    loader_mid_wrapper:{
        width:"100%",
        height:250
    },
    loader_bottom_wrapper:{
        width:"100%",
        height:200
    },
    loader_top_wrapper:{
        width:"100%",
        height:150
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}


const University=(props:{universityid:string})=>{

    let [universityInfo,setUniversityInfo]=useState<UniversityType|undefined>();
    const [path,navigate]=useNavigation();
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dashboardInfo=[
        {icon:fee_icon,label:"Acceptance",value:universityInfo?.acceptanceRate},
        {icon:fee_icon,label:"Graduation",value:universityInfo?.graduationRate},
        {icon:fee_icon,label:"Median Earning",value:universityInfo?.medianEarning?(Object.values(universityInfo.medianEarning)[0]+"/"+Object.keys(universityInfo.medianEarning)[0]):null},
        {icon:fee_icon,label:"Type",value:universityInfo?.type},
        {icon:fee_icon,label:"Code",value:universityInfo?.code},
        {icon:fee_icon,label:"Courses",value:universityInfo?.courses}
    ]
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const ratings=universityInfo?.rating?{keys:Object.keys(universityInfo.rating),values:Object.values(universityInfo.rating)}:undefined
    const additionalInfo=[
        {type:"Living Cost",value:(universityInfo?.cost && universityInfo.cost.length>0)?(universityInfo.currency.symbol+universityInfo?.cost[0].lowerLimit)+" - "+(universityInfo.currency.symbol+universityInfo?.cost[0].lowerLimit):undefined},
        {type:"Summer",value:(universityInfo?.average_temperatures.summer.min+" °C ")+"-"+universityInfo?.average_temperatures.summer.max+" °C "},
        {type:"Winter",value:universityInfo?.average_temperatures.winter.min+" °C "+"-"+universityInfo?.average_temperatures.winter.max+" °C "},
        {type:"Autumn",value:universityInfo?.average_temperatures.autumn.min+" °C "+"-"+universityInfo?.average_temperatures.autumn.max+" °C "},
        {type:"Spring",value:universityInfo?.average_temperatures.spring.min+" °C "+"-"+universityInfo?.average_temperatures.spring.max+" °C "},
    ]
    const [AT,setAT]=useState<undefined|string|null>();

    const fetchUniversity=async ()=>{
        console.log("id",props.universityid)
        const res:ServerResponse=await serverRequest({
            url:getServerRequestURL("university","GET",{id:props.universityid,currency:"INR"}),
            routeType:"public",
            reqType:"GET"
        });
        console.log("res-uni",res);
        res.success?setUniversityInfo(res.data):null
    }

    useEffect(()=>{
        getAccessTokenFromStore().then((Token)=>setAT(Token))
        fetchUniversity();
    },[])

    const showCourses=()=>{
        let programslistquery={search:"",additionalFilters:[{type:"universityId",data:[{label:universityInfo.name,value:universityInfo._id}]}],quickFilters:[],page:1}
        let universitieslistquery={search:"",additionalFilters:[],quickFilters:[],page:1}
        navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}})
        setTimeout(()=>{
            navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:programslistquery,universitieslistquery:universitieslistquery}}})
        },100)
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            universityInfo
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:34,padding:20}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={{flexDirection:'row',alignItems:"flex-start",justifyContent:"flex-start",gap:5}}>
                        <View style={{flex:1,flexDirection:"column",alignItems:"flex-start",gap:5}}>
                            <Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.SemiBold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{universityInfo.name}</Text>
                            <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([universityInfo.location.city,universityInfo.location.state,universityInfo.location.country],"",",",true)}</Text> 
                        </View>
                        <Image source={universityInfo.logoSrc} style={[styles[Device].uni_icon]}/>
                    </View>
                    {
                        AT
                        ?
                        <Pressable onPress={showCourses} style={{flexDirection:'row',alignSelf:"flex-end",alignItems:'center',gap:5,borderWidth:1.2,padding:7.5,paddingLeft:15,paddingRight:15,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                            <Text style={[styles[Device].uni_location,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Show Courses</Text>
                        </Pressable>
                        :
                        null
                    }
                </View>
                <View style={{gap:15}}>
                    <Heading heading="Information at a Glance"/>
                    <View style={[GeneralStyles.dashboards_wrapper,styles[Device].dashboards_wrapper]}>
                        <View style={[GeneralStyles.dashboard_wrapper,styles[Device].dashboard_wrapper]}>
                            <Dashboarditem {...dashboardInfo[0]} index={0}/>
                            <Dashboarditem {...dashboardInfo[1]} index={1}/>
                            <Dashboarditem {...dashboardInfo[2]} index={2}/>
                        </View>
                        <View style={[GeneralStyles.dashboard_wrapper,styles[Device].dashboard_wrapper]}>
                            <Dashboarditem {...dashboardInfo[3]} index={3}/>
                            <Dashboarditem {...dashboardInfo[4]} index={0}/>
                            <Dashboarditem {...dashboardInfo[5]} index={1}/>
                        </View>
                    </View>
                </View>
                <View style={[GeneralStyles.keyinfo_wrapper]}>
                    <Heading heading="Additional Information"/>
                    {/* <Text style={[styles[Device].about_heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Additional Information:</Text> */}
                    <View style={[{flexDirection:"column",gap:20}]}>
                    {
                        additionalInfo.map((item,i)=>
                        <View style={{flexDirection:"row",alignItems:"flex-start",gap:5}}>
                            <View style={[{flexDirection:"row",alignItems:"center",justifyContent:"center",gap:5}]}>
                                <View style={{borderWidth:0.25,borderColor:Themes.Light.OnewindowPrimaryBlue(1),width:5,height:5,borderRadius:100}}/>
                                <View style={{flex:1,flexDirection:'row',alignItems:"center",gap:3}}>
                                    <Text style={[styles[Device].keyinfo_value,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{item.type}</Text>
                                </View>
                                <Text style={[styles[Device].keyinfo_value,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{item.value}</Text>
                            </View>
                        </View>
                        )
                    }
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Heading heading="Rating"/>
                    {/* <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Rating</Text> */}
                    <View>
                    {
                        ratings==undefined || ratings.keys.length==0
                        ?
                        // <Text>Ratings not available</Text>
                        null
                        :
                        <View style={{gap:15}}>
                        {
                            ratings.keys.map((item,i)=>
                            <View style={{flexDirection:"row",gap:5,alignItems:"center",borderRadius:100}}>
                                <Image source={sample_icon} style={[{width:26,height:26}]}/>
                                <View style={{flex:1}}><Text style={[styles[Device].rating,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:10}]}>{item}</Text></View>
                                <Text style={[styles[Device].rating,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{(ratings.values[i]+"   ").substring(0,2)}</Text>
                            </View>
                            )
                        }
                        </View>
                    }
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Heading heading="Ranking"/>
                    <View>
                    {
                        !universityInfo.rank
                        ?
                        null
                        :
                        <View style={{gap:20}}>
                        {
                            Object.keys(universityInfo.rank).map((item,i)=>
                            <View style={{flexDirection:"column",gap:7,paddingLeft:15,paddingTop:15,paddingBottom:15,alignItems:"flex-start",backgroundColor:getLightThemeColor(i%4),borderRadius:20,position:"relative"}}>
                                <Image source={uni_ranking_image} style={[{width:"100%",height:"auto",aspectRatio:4.166,position:"absolute"}]}/>
                                <Text style={[styles[Device].ranking_value,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{Object.values(universityInfo?.rank)[i]}</Text>
                                <Text style={[styles[Device].ranking_label,{maxWidth:"85%"},{fontFamily:Fonts.NeutrifStudio.Regular}]}>{item}</Text>
                            </View>
                            )
                        }
                        </View>
                    }
                    </View>
                </View>
            </ScrollView>
            :
            <View style={[{flex:1,gap:50,overflow:"hidden"},appStandardStyles.screenMarginSmall]}>
                <View style={[styles[Device].loader_top_wrapper]}><Loadinglistscreen visibilityCount={2} cardGap={10} count={2} direction="vertical"/></View>
                <View style={[styles[Device].loader_mid_wrapper,{gap:10,alignSelf:'center'}]}>
                    <View style={{flex:1}}><Loadinglistscreen cardGap={10} visibilityCount={3} count={3} direction="horizontal" /></View>
                    <View style={{flex:1}}><Loadinglistscreen cardGap={10} visibilityCount={3} count={3} direction="horizontal" /></View>
                </View>
                <View style={[styles[Device].loader_bottom_wrapper]}><Loadinglistscreen visibilityCount={1} cardGap={10} count={1} direction="vertical"/></View>
            </View>
        }
        </View>
    )

}

const Dashboarditem=(data:{label:string,value:string,icon:string,index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.dashboard_item_wrapper,styles[Device].dashboard_item_wrapper,{backgroundColor:getLightThemeColor(data.index)}]}>
            <Image style={[styles[Device].dashboard_icon]} source={data.icon}/>
            <Text style={[styles[Device].dashboard_value,{color:"black",fontFamily:Fonts.NeutrifStudio.Bold}]}>{data.value?data.value:"No Info"}</Text>
            <Text style={[styles[Device].dashboard_label,{color:"black",fontFamily:Fonts.NeutrifStudio.Regular}]}>{data.label}</Text>
        </View>
    )

}

export default University