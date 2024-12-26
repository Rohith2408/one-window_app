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
import happy_face from '../../assets/images/illustrations/happy.png'

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
        flexDirection:"column",
        alignItems:"flex-start",
        gap:5,
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
        gap:10,
        alignItems:"flex-end",
        alignSelf:"flex-end"
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
        width:42,
        height:42,
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
        fontSize:15,
        lineHeight:24
    },
    program_name:{
        fontSize:19
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:18
    },
    show_order_details:{
        fontSize:15
    },
    status:{
        fontSize:16
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
        fontSize:15,
        lineHeight:20
    },
    add_text:{
        fontSize:18
    },
    add_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    location_icon:{
        width:8,
        height:8,
        resizeMode:"contain"
    },
    uni_icon:{
        width:32,
        height:32,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:16,
        height:16,
        borderRadius:100,
        left:5,
        top:5
    },
    uni_location:{
        fontSize:11,
        lineHeight:24
    },
    program_name:{
        fontSize:15
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:14
    },
    show_order_details:{
        fontSize:11
    },
    status:{
        fontSize:12
    },
    delete_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    upload_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    checked_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    doc_name:{
        fontSize:14
    },
    doc_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    emptychecklist_msg:{
        fontSize:13,
        lineHeight:20
    },
    add_text:{
        fontSize:14
    },
    add_icon:{
        width:18,
        height:18,
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
        width:38,
        height:38,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:20,
        height:20,
        borderRadius:100,
        left:5,
        top:5
    },
    uni_location:{
        fontSize:13,
        lineHeight:24
    },
    program_name:{
        fontSize:17
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:16
    },
    show_order_details:{
        fontSize:13
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
        fontSize:15,
        lineHeight:20
    },
    add_text:{
        fontSize:16
    },
    add_icon:{
        width:22,
        height:22,
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
        width:38,
        height:38,
        borderRadius:100,
        resizeMode:"contain"
    },
    uni_icon_bg:{
        width:20,
        height:20,
        borderRadius:100,
        left:5,
        top:5
    },
    uni_location:{
        fontSize:13,
        lineHeight:24
    },
    program_name:{
        fontSize:17
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:16
    },
    show_order_details:{
        fontSize:13
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
        fontSize:15,
        lineHeight:20
    },
    add_text:{
        fontSize:16
    },
    add_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    }
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
        addToBasket("warning",{
            warningTitle:"Are you sure??",
            warningMessage:"Think twice before you cancel,this might be just what you need. Once cancelled the action can't be undone, talk to our experts and let them help you make the right decision!",
            redirect:{title:"Click here to see the Refund Policy",url:"https://campusroot.com/refundPolicy"},
            proceedCallback:cancelProduct,
            yesLabel:"Proceed",
            noLabel:"Don't Cancel"
        });
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
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.75)},styles[Device].uni_location]}>{product.cancellationRequest?"You called it quits!":"Call it quits?"}</Text>
                    <Image style={[styles[Device].add_icon]} source={add_icon}></Image>
                </Pressable>
            </Transitionview>
            
            :
            null
        }  
        {
            product
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:50}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={{display:'flex',flexDirection:"row",alignItems:"flex-end",gap:10}}>
                        <View style={{flex:1,display:'flex',flexDirection:'row',alignItems:'flex-end'}}><Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.SemiBold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{setWordCase(product.course.name)}</Text></View>
                        <Image source={product.course.university.logoSrc} style={[styles[Device].uni_icon,{marginRight:10}]}/>
                    </View>
                    <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence(["Applied for "+formatDate(product.intake),setWordCase(product.category),product.course.university.name],"","|",true)}</Text>
                    <View style={[GeneralStyles.actions_wrapper,styles[Device].actions_wrapper]}>
                        <Pressable onPress={showOrderDetails} style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1.2,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,backgroundColor:Themes.Light.OnewindowPrimaryBlue(1)}}>
                            <Text style={[styles[Device].show_order_details,{color:"white",fontFamily:Fonts.NeutrifStudio.Medium}]}>Show Order Details</Text>
                        </Pressable>
                    </View>
                </View>
                {/* <View style={[{alignSelf:'center',borderRadius:100,backgroundColor:getThemeColor(0)}]}>
                    <Text style={[{padding:10},{color:'black',fontFamily:Fonts.NeutrifStudio.Regular},styles[Device].status]}>{Word2Sentence([product.status,product.stage],"","-",true)}</Text>
                </View> */}
                <View style={{gap:15}}>
                    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                        <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>EXPERTS ASSIGNED</Text>
                        <View style={{width:100,height:1.5,backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.1)}}/>
                    </View>
                    {/* <Styledtext styles={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Experts Assigned:" focusWord="Assigned"/> */}
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
                    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                        <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>REQUIRED DOCUMENTS</Text>
                        <View style={{width:100,height:1,backgroundColor:Themes.Light.OnewindowPrimaryBlue(0.1)}}/>
                    </View>
                    {/* <Styledtext styles={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Required Documents:" focusWord="Documents"/> */}
                    <View style={{gap:10}}>
                    {
                        product.docChecklist.length==0
                        ?
                        <View style={{flexDirection:'row',alignItems:"flex-start",gap:15}}>
                            <View style={{flex:1,flexDirection:"column",alignItems:"flex-start"}}>
                                <Text style={[styles[Device].emptychecklist_msg,{lineHeight:24,fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.85)}]}>No documents required at the moment.</Text>
                                <Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.4)}]}>Your expert will update this checklist if any documents are needed.</Text>
                            </View>
                            <Image source={happy_face} style={[{width:90,height:90,resizeMode:'contain'}]}/>
                        </View>
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

export default Product