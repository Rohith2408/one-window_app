import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Course, Event, Package, Product, ServerResponse } from "../../types"
import { PackageProductsValidator, Word2Sentence, compareProducts, getDevice, getLightThemeColor, getMonth, getServerRequestURL, getThemeColor, serverRequest, setWordCase } from "../../utils";
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
import cart_icon from '../../assets/images/misc/cart.png'
import start_icon from '../../assets/images/misc/rocket.png'
import deadline_icon from '../../assets/images/misc/deadline.png'
import arrow_icon from '../../assets/images/misc/arrow.png'
import { Fonts, Themes } from "../../constants";
import { useAppSelector } from "../../hooks/useAppSelector";
import wishlist_icon from '../../assets/images/misc/wishlist.png'
import wishlisted_icon from '../../assets/images/misc/wishlisted.png'
import applicarion_details_template from '../../assets/images/misc/application-details-template.png'
import Loader from "../resources/Loader";
import Styledtext from "../resources/Styledtext";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
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
        gap:7
    },
    location_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
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
        gap:10,
        alignItems:'flex-start'
    },
    keyinfo_wrapper:{
        display:"flex",
        flexDirection:"column",
        gap:15,
        alignItems:'flex-start'
    },
    actions_wrapper:{
        flexDirection:'row',
        gap:10
    },
    application_wrapper:{
        position:"relative"
    }
})

const TabStyles=StyleSheet.create({
    location_icon:{
        width:0,
        height:14,
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
        fontSize:16,
        lineHeight:24
    },
    program_name:{
        fontSize:18,
        lineHeight:24
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
        fontSize:18
    },
    about:{
        fontSize:16,
        lineHeight:30
    },
    add_to_cart:{
        fontSize:16
    },
    cart_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    keyinfo_type:{
        fontSize:15
    },
    keyinfo_value:{
        fontSize:18,
        lineHeight:24
    },
    application_wrapper:{
        height:120,
        borderRadius:120
    },
    application_title:{
        fontSize:20
    },
    application_fee:{
        fontSize:18
    },
    deadline_icon:{
        width:22,
        height:22,
        resizeMode:'contain'
    }
})

const MobileSStyles=StyleSheet.create({
    location_icon:{
        width:0,
        height:14,
        resizeMode:"contain"
    },
    uni_icon:{
        width:24,
        height:24,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:22,
        height:22,
        borderRadius:100,
        left:-7,
        top:7
    },
    uni_location:{
        fontSize:12,
        lineHeight:20
    },
    program_name:{
        fontSize:14,
        lineHeight:20
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
        gap:16
    },
    dashboard_wrapper:{
        gap:16
    },
    dashboard_value:{
        fontSize:12
    },
    dashboard_label:{
        fontSize:10
    },
    about_heading:{
        fontSize:14
    },
    about:{
        fontSize:14,
        lineHeight:26
    },
    add_to_cart:{
        fontSize:13
    },
    cart_icon:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    keyinfo_type:{
        fontSize:11
    },
    keyinfo_value:{
        fontSize:14,
        lineHeight:20
    },
    application_wrapper:{
        height:80,
        borderRadius:80
    },
    application_title:{
        fontSize:16
    },
    application_fee:{
        fontSize:14
    },
    deadline_icon:{
        width:16,
        height:16,
        resizeMode:'contain'
    }
})

const MobileMStyles=StyleSheet.create({
    location_icon:{
        width:0,
        height:14,
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
        fontSize:14,
        lineHeight:24
    },
    program_name:{
        fontSize:16,
        lineHeight:24
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
        fontSize:15,
        lineHeight:30
    },
    add_to_cart:{
        fontSize:15
    },
    cart_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    keyinfo_type:{
        fontSize:13
    },
    keyinfo_value:{
        fontSize:16,
        lineHeight:22
    },
    application_wrapper:{
        height:100,
        borderRadius:100
    },
    application_title:{
        fontSize:18
    },
    application_fee:{
        fontSize:16
    },
    deadline_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    }
})

const MobileLStyles=StyleSheet.create({

    location_icon:{
        width:0,
        height:14,
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
        fontSize:14,
        lineHeight:24
    },
    program_name:{
        fontSize:16,
        lineHeight:24
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
        fontSize:15
    },
    dashboard_label:{
        fontSize:13
    },
    about_heading:{
        fontSize:17
    },
    about:{
        fontSize:15,
        lineHeight:30
    },
    add_to_cart:{
        fontSize:15
    },
    cart_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    },
    keyinfo_type:{
        fontSize:14
    },
    keyinfo_value:{
        fontSize:16,
        lineHeight:22
    },
    application_title:{
        fontSize:18
    },
    application_fee:{
        fontSize:16
    },
    deadline_icon:{
        width:18,
        height:18,
        resizeMode:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}


const Program=(props:{programid:string})=>{

    let [programInfo,setProgramInfo]=useState<Course|undefined>();
    let wishlist=useAppSelector((state)=>state.wishlist);
    const [path,navigate]=useNavigation();
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dashboardInfo=[
        {icon:fee_icon,label:"Duration",value:programInfo?.duration},
        {icon:fee_icon,label:"Credits",value:programInfo?.totalCredits},
        {icon:fee_icon,label:"Fees",value:(programInfo?.currency?.symbol+" "+programInfo?.tuitionFee?.tuitionFee)+(programInfo?.tuitionFee?.tuitionFeeType=="year"?"/p.a":"")},
        {icon:fee_icon,label:"Study Level",value:programInfo?.studyLevel},
        {icon:fee_icon,label:"Study Mode",value:programInfo?.studyMode},
        {icon:fee_icon,label:"Course Type",value:programInfo?.stemDetails?(programInfo.stemDetails.stem?"STEM":"NON-STEM"):"No Info"}
    ]
    const additionalInfo=[
        {type:"University Type",value:programInfo?.type?setWordCase(programInfo.type):""},
        {type:"Discipline",value:programInfo?.discipline?Word2Sentence(programInfo.discipline,"",",",true):""},
        {type:"Sub Discipline",value:programInfo?.subDiscipline?Word2Sentence(programInfo.subDiscipline,"",",",true):""},
    ]
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const [isLoading,setLoading]=useState(false);

    const fetchProgram=async ()=>{
        console.log("id",props.programid)
        const res:ServerResponse=await serverRequest({
            url:getServerRequestURL("program","GET",{id:props.programid,currency:"INR"}),
            reqType:"GET"
        });
        res.success?setProgramInfo(res.data):null
    }

    const showIntakes=(callback:any,type:string)=>{
        let product={
            category:programInfo?.elite?"elite application":"premium application",
            intake:undefined,
            course:programInfo
        }
        let dropdowndata={
            list:programInfo?.startDate,
            onselection:callback,
            validation:{
                validator:(intake)=>type=="order"?!store.getState().products.data.find((existingProduct)=>compareProducts(existingProduct,{...product,intake:new Date(intake.year,parseInt(intake.month)-1,1).toISOString()})):!store.getState().cart.data.find((cartItem)=>compareProducts(cartItem,{...product,intake:new Date(intake.year,parseInt(intake.month)-1,1).toISOString()})),
                errorMessage:type=="order"?"Already applied for the program with the selected intake":"Program with the selected intake already exists in the cart"
            },            
        }
        addToBasket("intakes-dropdownoptions",dropdowndata);
        navigate?navigate({type:"AddScreen",payload:{screen:"Intake",params:{basketid:"intakes-dropdownoptions"}}}):null
        //navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intake",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
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
                navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
                setTimeout(()=>{
                    navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Successfull",flyerdata:{message:"Item added to cart successfully!"}}}}):null;
                },100)
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

    const placeFreeOrder=async (products:Product[],Package:Package)=>{
        let requestInfo=requests.find((item)=>item.id=="placeorder");
        let inputvalidation=requestInfo?.inputValidator({packageId:Package,products:products.map((item)=>({
            category:item.category,
            courseId:item.course?._id,
            intake:item.intake
        }))})
        if(inputvalidation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(inputvalidation.data);
            //console.log("server res",JSON.stringify(serverRes,null,2));
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
                await removeCartItems(products);
            }
            return serverRes
        }
    }

    const addToFreeOrder=async (orderId:string,products:Product[])=>{
        let data={
            orderId:orderId,
            products:products.map((item)=>({
                category: item.category,
                courseId:item.course._id,
                intake: item.intake
            }))
        }
        //console.log("input",data);
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="addproducts");
        let validation=requestInfo?.inputValidator(data);
        //console.log("validation",validation);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            console.log("Server res",JSON.stringify(serverRes,null,2))
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
                await removeCartItems(products);
                
            }
        }
        return serverRes
    }

    const applyForFree=async (event:Event)=>{
        let products=[{
            category:programInfo?.elite?"elite application":"premium application",
            intake:(event.data.month).padStart(2, '0')+"/"+"10"+"/"+event.data.year,
            course:programInfo
        }];
        let Package=store.getState().suggestedpackages.data.find((pkg)=>pkg.priceDetails.totalPrice==0)
        let freeOrder=store.getState().orders.data.find((order)=>order.paymentDetails.amount==0)
        let res:ServerResponse={success:false,data:undefined,message:""};
        console.log("Free apply res",res);
        if(freeOrder && freeOrder?.products.length==Package?.products.find((item)=>item.category=="premium application")?.quantity)
        {
            navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
            setTimeout(()=>{
                navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Error",flyerdata:{error:"Seems like you have exhausted all your free applications",preventAutoHide:true}}}}):null;
            },100)
        }
        else
        {
            res=freeOrder==undefined?await placeFreeOrder(products,Package?._id):await addToFreeOrder(freeOrder._id,products)
            console.log("server res",res);
            if(res.success)
            {
                navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
                setTimeout(()=>{
                    navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Successfull",flyerdata:{message:"You can check the application progress in the products section",hideInterval:4000}}}}):null;
                },100)
            }
        }
        return res.success;
    }

    const removeCartItems=async (products:Product[])=>{
        let data={
            action:"remove",
            itemIds:store.getState().cart.data.filter((cartitem)=>products.find((orderitem)=>compareProducts(cartitem,orderitem))).map((item)=>item._id)
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
    }

    const modilfyWishlist=async ()=>{
        setLoading(true);
        let data={
            action:wishlist.data.find((item)=>item._id==programInfo?._id)?"pull":"push",
            courseId:programInfo?._id
        }
        let requestInfo=requests.find((item)=>item.id=="modify-wishlist");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        setLoading(false);
    }

    const openUniversity=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"University",params:{universityid:programInfo?.university?._id}}}):null
    }


    useEffect(()=>{
        fetchProgram();
    },[])

    console.log(programInfo?.startDate)

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            programInfo
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} contentContainerStyle={{gap:38}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.uni_icon_wrapper,{position:"relative"}]}>
                        <Image source={programInfo.university?.logoSrc} style={[styles[Device].uni_icon]}/>
                        <View style={[styles[Device].uni_icon_bg,{position:"absolute",zIndex:-1,backgroundColor:getThemeColor(0)}]}></View>
                    </View>
                    <View style={[GeneralStyles.uni_info_wrapper]}>
                        <View><Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{programInfo.name}</Text></View>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <Pressable onPress={openUniversity} style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([programInfo.university?.name,programInfo.university?.location?.country],"",",",true)}</Text></Pressable>
                        </View>
                        <View style={[GeneralStyles.actions_wrapper]}>
                            {
                                !programInfo.elite
                                ?
                                <Pressable onPress={()=>showIntakes(applyForFree,"order")} style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1.2,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                                    {/* <Image source={cart_icon} style={[styles[Device].cart_icon]}/> */}
                                    <Text style={[styles[Device].add_to_cart,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Apply for Free</Text>
                                </Pressable>
                                :
                                null
                            }
                            <Pressable  onPress={()=>showIntakes(addToCart,"cart")} style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:programInfo.elite?1.2:0,padding:10,paddingLeft:programInfo.elite?15:5,paddingRight:programInfo.elite?15:5,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                                <Image source={cart_icon} style={[styles[Device].cart_icon]}/>
                                {
                                    programInfo.elite
                                    ?
                                    <Text style={[styles[Device].add_to_cart,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>Add to Cart</Text>
                                    :
                                    null
                                }
                                {/*  */}
                            </Pressable>
                        </View>
                    </View>
                    <View>
                    {
                        isLoading
                        ?
                        <Loader  isLoading={isLoading} loaderStyles={[styles[Device].cart_icon]}/>
                        :
                        <Pressable onPress={!isLoading?modilfyWishlist:null}><Image style={[styles[Device].cart_icon]} source={wishlist.data.find((item)=>item._id==programInfo?._id)?wishlisted_icon:wishlist_icon}/></Pressable>
                    }
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
                    <Text style={[styles[Device].about_heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>About:</Text>
                    <Text style={[styles[Device].about,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{programInfo.about}</Text>
                </View>
                <View style={[GeneralStyles.keyinfo_wrapper]}>
                    {/* <Styledtext styles={[styles[Device].about_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Additional Information :" focusWord="Information"/> */}
                    <Text style={[styles[Device].about_heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Additional Information:</Text>
                    <View style={[{flexDirection:"column",gap:20}]}>
                    {
                        additionalInfo.map((item,i)=>
                        <View style={{flexDirection:"row",alignItems:"flex-start",gap:5}}>
                            <View style={[{flexDirection:"column",alignItems:"flex-start",justifyContent:"center",gap:5}]}>
                                <View style={{flexDirection:'row',alignItems:"center",gap:3}}>
                                    {/* <View style={{width:4,height:4,borderRadius:100,backgroundColor:getThemeColor(i%4)}}></View> */}
                                    <Text style={[styles[Device].keyinfo_type,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.35)}]}>{item.type}</Text>
                                </View>
                                <Text style={[styles[Device].keyinfo_value,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{item.value}</Text>
                            </View>
                        </View>
                        )
                    }
                    </View>
                </View>
                <View style={[GeneralStyles.application_wrapper]}>
                    <Image style={{width:"100%",aspectRatio:2.2,objectFit:"contain"}} source={applicarion_details_template}/>
                    <View style={[{position:"absolute",top:"15%",left:"5%",gap:10}]}>
                        <Text style={[styles[Device].application_title,{fontFamily:Fonts.NeutrifStudio.Medium}]}>Application Details</Text>
                        <Text style={[styles[Device].application_fee,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{"Fee: "+programInfo.currency?.symbol+" "+programInfo.applicationDetails.applicationFee}</Text>
                    </View>
                </View>
                <View style={[GeneralStyles.about_wrapper]}>
                    <Text style={[styles[Device].about_heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Course Start:</Text>
                    <View style={{flexDirection:'column',alignSelf:"stretch",gap:40}}>
                    {
                        programInfo?.startDate?.map((date)=>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:"center",gap:5}}>
                                    <Image source={deadline_icon} style={[styles[Device].deadline_icon]}/>
                                    <Text style={[styles[Device].keyinfo_value,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{getMonth(date.deadlineMonth+1,true)}</Text>
                                    <Text style={[styles[Device].keyinfo_type,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.35)}]}>Deadline</Text>
                                </View>
                                <Image source={arrow_icon} style={{width:40,height:40,objectFit:"contain"}}/>
                                <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:"center",gap:5}}>
                                    <Image source={start_icon} style={[styles[Device].deadline_icon]}/>
                                    <Text style={[styles[Device].keyinfo_value,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{getMonth(date.courseStartingMonth+1,true)}</Text>
                                    <Text style={[styles[Device].keyinfo_type,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.35)}]}>Start</Text>
                                </View>
                            </View>
                        )
                    }
                    </View>
                </View>
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
        <View style={[GeneralStyles.dashboard_item_wrapper,styles[Device].dashboard_item_wrapper,{backgroundColor:getLightThemeColor(data.index)}]}>
            <Image style={[styles[Device].dashboard_icon]} source={data.icon}/>
            <Text style={[styles[Device].dashboard_value,{color:"black",fontFamily:Fonts.NeutrifStudio.Bold}]}>{data.value}</Text>
            <Text style={[styles[Device].dashboard_label,{color:"black",fontFamily:Fonts.NeutrifStudio.Regular}]}>{data.label}</Text>
        </View>
    )

}

export default Program