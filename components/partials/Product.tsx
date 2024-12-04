import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useRef, useState } from "react"
import { PackageProductsValidator, Word2Sentence, compareProducts, formatDate, getDevice, getLightThemeColor, getServerRequestURL, getThemeColor, pickDocument, serverRequest, setWordCase, truncateString } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import location_icon from '../../assets/images/misc/location.png'
import { store } from "../../store"
import Expertcard from "../cards/Expertcard"
import fee_icon from '../../assets/images/misc/fee.png'
import Expertcompactcard from "../cards/Expertcompactcard"
import Styledtext from "../resources/Styledtext"
import verified_icon from '../../assets/images/misc/verified.png'
import loading_gif from '../../assets/images/misc/loader.gif'
import Transitionview from "../resources/Transitionview"
import delete_icon from '../../assets/images/misc/delete.png'
import { ServerResponse } from "../../types"
import { requests } from "../../constants/requests"
import upload_icon from '../../assets/images/misc/upload.png'
import document_icon from '../../assets/images/misc/document.png'
import add_icon from '../../assets/images/misc/info.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:10,
        backgroundColor:'white',
        gap:20,
        position:"relative"
    },
    info_wrapper:{
        alignSelf:"stretch",
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        gap:10,
        padding:0
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
        alignItems:"flex-start",
        gap:5
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
    },
    dashboard_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        gap:10,
        padding:10
    },
    dashboard_item_wrapper:{
        display:'flex',
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        gap:7,
        padding:10
    },
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
    location_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    uni_icon:{
        width:30,
        height:30,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:28,
        height:28,
        borderRadius:100,
        left:7,
        top:7
    },
    uni_location:{
        fontSize:16,
        lineHeight:18
    },
    program_name:{
        fontSize:20
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:18
    },
    show_order_details:{
        fontSize:18
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
    // dashboards_wrapper:{
    //     height:240,
    //     gap:20
    // },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:13
    },
    dashboard_label:{
        fontSize:12
    },
    status:{
        fontSize:18
    },
    delete_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    upload_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    checked_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    doc_name:{
        fontSize:18
    },
    doc_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    emptychecklist_msg:{
        fontSize:18,
        lineHeight:22
    },
    add_text:{
        fontSize:18
    },
    add_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    }
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
        left:5,
        top:5
    },
    uni_location:{
        fontSize:10,
        lineHeight:14
    },
    program_name:{
        fontSize:12
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:14
    },
    show_order_details:{
        fontSize:12
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
    // dashboards_wrapper:{
    //     height:240,
    //     gap:20
    // },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:13
    },
    dashboard_label:{
        fontSize:12
    },
    status:{
        fontSize:12
    },
    delete_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    upload_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    checked_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    doc_name:{
        fontSize:14
    },
    doc_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    emptychecklist_msg:{
        fontSize:14,
        lineHeight:18
    },
    add_text:{
        fontSize:14
    },
    add_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
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
        left:5,
        top:5
    },
    uni_location:{
        fontSize:14,
        lineHeight:20
    },
    program_name:{
        fontSize:16
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:16
    },
    show_order_details:{
        fontSize:14
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
    // dashboards_wrapper:{
    //     height:240,
    //     gap:20
    // },
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:13
    },
    dashboard_label:{
        fontSize:12
    },
    status:{
        fontSize:14
    },
    delete_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    upload_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    checked_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    doc_name:{
        fontSize:16
    },
    doc_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    emptychecklist_msg:{
        fontSize:16,
        lineHeight:20
    },
    add_text:{
        fontSize:16
    },
    add_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    }
    
})

const MobileLStyles=StyleSheet.create({

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
        left:5,
        top:5
    },
    uni_location:{
        fontSize:12,
        lineHeight:16
    },
    program_name:{
        fontSize:16
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:14
    },
    show_order_details:{
        fontSize:14
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
    dashboard_wrapper:{
        gap:20
    },
    dashboard_value:{
        fontSize:13
    },
    dashboard_label:{
        fontSize:12
    },
    status:{
        fontSize:14
    },
    delete_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    upload_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    checked_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    doc_name:{
        fontSize:16
    },
    doc_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    emptychecklist_msg:{
        fontSize:16,
        lineHeight:20
    },
    add_text:{
        fontSize:16
    },
    add_icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Product=(props:{productId:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const product=useAppSelector((state)=>state.products.data).find((item)=>item._id==props.productId)
    const advisors=useAppSelector((state)=>state.advisors.data)
    const [path,navigate]=useNavigation()
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const [loading,setLoading]=useState(false)
    const currentSelection=useRef(-1);
    const docMaxSize=useRef(25).current;

    const openUniversity=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"University",params:{universityid:product?.course.university?._id}}}):null
    }

    const showOrderDetails=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Orderdetails"}}):null
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"Orderdetails",params:{orderdetailsid:product?.order}}}):null
        },100)
    }

    const showExpert=(id:string)=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Expert",params:{expertid:id}}}):null
    }

    const uploadDoc=async (index:number,checkListId:string)=>{
        currentSelection.current=index;
        setLoading(true);
        let data={
            applicationId:props.productId,
            checklistItemId:checkListId,
            docMaxSize:docMaxSize
        }
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="upload-doc-application");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        currentSelection.current=-1;
        setLoading(false);
    }

    const deleteDoc=async (index:number,checkListId:string,docId:string)=>{
        currentSelection.current=index;
        setLoading(true)
        let data={
            applicationId: props.productId,
            checklistItemId: checkListId,
            documentId: docId
        }
        let serverRes={success:false,message:"",data:undefined};
        let requestInfo=requests.find((item)=>item.id=="delete-doc-application");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        currentSelection.current=-1;
        setLoading(false)
    }

    const viewDoc=(doc:any)=>{
        if(doc?.data.preview_url.length>0)
        {
            navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Documentview",flyerdata:{docpreviewurl:doc.data.preview_url}}}}):null
        }
    }

    const cancelProduct=async ()=>{
        let data={
            applicationId:props.productId
        }
        let requestInfo=requests.find((item)=>item.id=="cancel-product");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
                setTimeout(()=>{
                    navigate?navigate({type:"AddScreen",payload:{screen:"Successfull",params:{message:"Request for cancellation successfull"}}}):null;
                },100)
            }
        }
    }

    const showWarning=()=>{
        addToBasket("warning",{warningTitle:"Are you sure??",warningMessage:"Think twice before you cancel,this might be just what you need. Once cancelled the action can't be undone, talk to our experts and let them help you make the right decision!",proceedCallback:cancelProduct,yesLabel:"Proceed",noLabel:"Don't Cancel"});
        navigate?navigate({type:"AddScreen",payload:{screen:"Warning"}}):null;
    }

    const showMessage=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Error",params:{error:"The product has been cancelled!",preventAutoHide:true}}}):null;
    }

    const quits=()=>{
        if(product?.cancellationRequest)
        {
            showMessage();
        }
        else
        {
            showWarning();
        }
    }

    useEffect(()=>{
        product?.cancellationRequest?showMessage():null
    },[])

    console.log(product?.cancellationRequest,product?.stage,product?.stage);
    
    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginMini]}>
        {
            product
            ?
            <Transitionview effect="pan" style={[GeneralStyles.add_wrapper]}>
                <Pressable onPress={quits} style={{flexDirection:"row",alignItems:'center',gap:5}}>
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.75)},styles[Device].add_text]}>{product.cancellationRequest?"You called it quits!":"Call it quits?"}</Text>
                    <Image style={[styles[Device].add_icon]} source={add_icon}></Image>
                </Pressable>
            </Transitionview>
            
            :
            null
        }  
        {
            product
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:40}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.uni_icon_wrapper,{position:"relative"}]}>
                        <Image source={product.course.university.logoSrc} style={[styles[Device].uni_icon]}/>
                        <View style={[styles[Device].uni_icon_bg,{position:"absolute",zIndex:-1,backgroundColor:getThemeColor(0)}]}></View>
                    </View>
                    <View style={[GeneralStyles.uni_info_wrapper]}>
                        <Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{setWordCase(product.course.name)}</Text>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <View style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>{formatDate(product.intake)}</Text></View>
                        </View>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <View style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>{Word2Sentence([setWordCase(product.category),product.course.university.name],"","|",true)}</Text></View>
                        </View>
                        <View style={[GeneralStyles.actions_wrapper]}>
                            <Pressable onPress={showOrderDetails} style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1.2,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                                <Text style={[styles[Device].show_order_details,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Show Order Details</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[{alignSelf:'center',borderRadius:100,backgroundColor:Themes.Light.OnewindowLightBlue}]}>
                    <Text style={[{padding:10},{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].status]}>{Word2Sentence([product.status,product.stage],"","-",true)}</Text>
                </View>
                <View style={{gap:15}}>
                    <Styledtext styles={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Experts Assigned:" focusWord="Assigned"/>
                    <View style={{gap:20}}>
                    {
                        product.advisors.map((advisor,i)=>
                        <Pressable onPress={()=>showExpert(advisor._id)}>
                            <Expertcompactcard index={i} {...advisor}/>
                            {/* <Expertcard index={i} {...advisors?.find((item)=>item.info._id==advisor._id)}/> */}
                        </Pressable>
                        )
                    }
                    </View>
                </View>
                <View style={{gap:10}}>
                    <Styledtext styles={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Required Documents:" focusWord="Documents"/>
                    <View style={{gap:10}}>
                    {
                        product.docChecklist.length==0
                        ?
                        <Text style={[styles[Device].emptychecklist_msg,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>No documents required at the moment. Your expert will update this checklist if any documents are needed.</Text>
                        :
                        product.docChecklist.map((item,i)=>
                        <Pressable onPress={()=>{viewDoc(item.doc)}} style={[{flexDirection:"row",alignItems:"center",gap:5}]}>
                            <Image source={document_icon} style={[styles[Device].doc_icon]}/>
                            <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                                <View style={{flex:1}}><Text style={[styles[Device].doc_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{item.name}</Text></View>
                                {/* <Text>{truncateString(item.doc.data.FileName,10,true)}</Text> */}
                            </View>
                            {
                                item.doc
                                ?
                                    item.isChecked
                                    ?
                                    <Transitionview effect="zoom"><Image source={verified_icon} style={[styles[Device].checked_icon]}/></Transitionview>
                                    :
                                    <Pressable onPress={()=>(loading && currentSelection.current==i)?null:deleteDoc(i,item._id,item.doc._id)}><Image source={(loading && currentSelection.current==i)?loading_gif:delete_icon} style={[styles[Device].delete_icon]}/></Pressable>
                                :
                                <Pressable onPress={()=>(loading && currentSelection.current==i)?null:uploadDoc(i,item._id)}><Image source={(loading && currentSelection.current==i)?loading_gif:upload_icon} style={[styles[Device].upload_icon]}/></Pressable>
                            }
                        </Pressable>
                        )
                    }
                    </View>
                </View>
            </ScrollView>
            :
            null
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

export default Product