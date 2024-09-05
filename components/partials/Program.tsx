import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Course, Event, Product, ProgramIntake, ServerResponse } from "../../types"
import { PackageProductsValidator, Word2Sentence, getDevice, getServerRequestURL, getThemeColor, serverRequest } from "../../utils";
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
import { Fonts, Themes } from "../../constants";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:20,
        backgroundColor:'white',
        gap:20
    },
    info_wrapper:{
        alignSelf:"stretch",
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        gap:10,
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
    actions_wrapper:{
        flexDirection:'row',
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({

    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:22,
        height:22,
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
        fontSize:10
    },
    program_name:{
        fontSize:12
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
    add_to_cart:{
        fontSize:10
    }
})

const MobileMStyles=StyleSheet.create({
    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    uni_icon:{
        width:26,
        height:26,
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
        fontSize:12
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
        fontSize:13
    },
    dashboard_label:{
        fontSize:12
    },
    about_heading:{
        fontSize:16
    },
    about:{
        fontSize:14,
        lineHeight:24
    },
    add_to_cart:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({

    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}


const Program=(props:{programid:string})=>{

    let [programInfo,setProgramInfo]=useState<Course|undefined>();
    const [path,navigate]=useNavigation();
    const freePackageInfo=useRef(store.getState().suggestedpackages.data.find((item)=>item.priceDetails.totalPrice==0)).current;
    const feePackagePurchased=useRef(store.getState().orders.data.find((order)=>order.Package.priceDetails.totalPrice==0)?true:false).current
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dashboardInfo=[
        {icon:fee_icon,label:"Duration",value:programInfo?.duration},
        {icon:fee_icon,label:"Credits",value:programInfo?.totalCredits},
        {icon:fee_icon,label:"Fees",value:programInfo?.tuitionFee?.tuitionFee+(programInfo?.tuitionFee?.tuitionFeeType=="year"?"/p.a":"")},
        {icon:fee_icon,label:"Study Level",value:programInfo?.studyLevel},
        {icon:fee_icon,label:"Study Mode",value:programInfo?.studyMode},
        {icon:fee_icon,label:"Currency",value:programInfo?.currency?.symbol}
    ]
    const [dimensions,setDimensions]=useState<LayoutRectangle>()

    const order=(event:Event)=>{
        console.log(event);
        addToBasket(props.programid,{
            package:freePackageInfo,
            products:[{
                intake:new Date(event.data.year,parseInt(event.data.month)-1,10).toISOString(),
                category:programInfo?.elite?"elite application":"premium application",
                course:{name:programInfo?.name,id:programInfo?._id}
            }]
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:props.programid}}}):null
    }

    const fetchProgram=async ()=>{
        console.log("id",props.programid)
        const res:ServerResponse=await serverRequest({
            url:getServerRequestURL("program","GET",{id:props.programid,currency:"INR"}),
            reqType:"GET"
        });
        res.success?setProgramInfo(res.data):null
    }

    const showIntakes=(callback:any)=>{
        let dropdowndata={
            list:programInfo?.startDate,
            onselection:callback
        }
        addToBasket("intakes-dropdownoptions",dropdowndata);
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intake",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
    }

    const addToCart=async (event:Event)=>{
        console.log("res",event);
        let data={
            action:"add",
            category:programInfo?.elite?"elite application":"premium application",
            courseId:programInfo?._id,
            intake:(event.data.month).padStart(2, '0')+"/"+"10"+"/"+event.data.year
        }
        let requestInfo=requests.find((item)=>item.id=="addToCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
    }

    const removeFromCart=async (event:Event)=>{
        let res:ServerResponse=await cartRequest({
            action: "remove",
            category:programInfo?.elite?"elite application":"premium application",
            course:programInfo?._id,
            intake:"10"+event.data.month.padStart(2, '0')+"/"+"/"+event.data.year
        })
        //res.success?removeCart():null
    }

    useEffect(()=>{
        fetchProgram();
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            programInfo
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:40}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.uni_icon_wrapper,{position:"relative"}]}>
                        <Image source={programInfo.university?.logoSrc} style={[styles[Device].uni_icon]}/>
                        <View style={[styles[Device].uni_icon_bg,{position:"absolute",zIndex:-1,backgroundColor:getThemeColor(0)}]}></View>
                    </View>
                    <View style={[GeneralStyles.uni_info_wrapper]}>
                        <Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{programInfo.name}</Text>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <View style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([programInfo.university?.name,programInfo.university?.location?.country],"")}</Text></View>
                        </View>
                        <View style={[GeneralStyles.actions_wrapper]}>
                            <Pressable onPress={()=>showIntakes(addToCart)} style={{borderWidth:1,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.3)}}><Text style={[styles[Device].add_to_cart,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium,padding:7,paddingLeft:15,paddingRight:15}]}>Add to Cart</Text></Pressable>
                        </View>
                    </View>
                </View>
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
                <View style={[GeneralStyles.about_wrapper]}>
                    <Text style={[styles[Device].about_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>About</Text>
                    <Text style={[styles[Device].about,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{programInfo.about}</Text>
                </View>
                {/* <Text>{programInfo.name}</Text>
                <Text>{programInfo.university?.name}</Text>
                <Pressable onPress={()=>showIntakes(addToCart)}><Text>Add to cart</Text></Pressable>
                <Pressable onPress={()=>showIntakes(order)}><Text>Apply</Text></Pressable> */}
            </ScrollView>
            :
            <Text>Loading</Text>
        }
        </View>
    )

}

const Dashboarditem=(data:{label:string,value:string,icon:string,index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.dashboard_item_wrapper,styles[Device].dashboard_item_wrapper,{backgroundColor:getThemeColor(data.index)}]}>
            <Image style={[styles[Device].dashboard_icon]} source={data.icon}/>
            <Text style={[styles[Device].dashboard_value,{color:"black",fontFamily:Fonts.NeutrifStudio.Bold}]}>{data.value}</Text>
            <Text style={[styles[Device].dashboard_label,{color:"black",fontFamily:Fonts.NeutrifStudio.Regular}]}>{data.label}</Text>
        </View>
    )

}

export default Program