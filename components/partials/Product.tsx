import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useRef, useState } from "react"
import { PackageProductsValidator, Word2Sentence, compareProducts, formatDate, getDevice, getLightThemeColor, getThemeColor, setWordCase } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import location_icon from '../../assets/images/misc/location.png'
import { store } from "../../store"
import Expertcard from "../cards/Expertcard"
import fee_icon from '../../assets/images/misc/fee.png'
import Expertcompactcard from "../cards/Expertcompactcard"
import Styledtext from "../resources/Styledtext"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:10,
        backgroundColor:'white',
        gap:20
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
        fontSize:15,
        lineHeight:18
    },
    program_name:{
        fontSize:18
    },
    advisor_card:{
        height:175
    },
    advisor_heading:{
        fontSize:16
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
        fontSize:16
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

    const openUniversity=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"University",params:{universityid:product?.course.university?._id}}}):null
    }

    const showOrderDetails=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Orderdetails",params:{orderdetailsid:product?.order}}}):null
    }

    const showExpert=(id:string)=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Expert",params:{expertid:id}}}):null
    }

    //console.log("order",JSON.stringify(store.getState().orders.data[0].products[0],null,2))
    console.log("products",JSON.stringify(product,null,2));

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            product
            ?
            <ScrollView onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}} contentContainerStyle={{gap:30}}>
                <View style={[GeneralStyles.info_wrapper]}>
                    <View style={[GeneralStyles.uni_icon_wrapper,{position:"relative"}]}>
                        <Image source={product.course.university.logoSrc} style={[styles[Device].uni_icon]}/>
                        <View style={[styles[Device].uni_icon_bg,{position:"absolute",zIndex:-1,backgroundColor:getThemeColor(0)}]}></View>
                    </View>
                    <View style={[GeneralStyles.uni_info_wrapper]}>
                        <Text style={[styles[Device].program_name,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{setWordCase(product.category)}</Text>
                        <View style={[GeneralStyles.location_wrapper]}>
                            <Image source={location_icon} style={[styles[Device].location_icon]}/>
                            <View style={{flex:1}}><Text style={[styles[Device].uni_location,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([product.course.name,product.course.university.name],"","|",true)}</Text></View>
                        </View>
                        <View style={[GeneralStyles.actions_wrapper]}>
                            <Pressable onPress={showOrderDetails} style={{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1.2,padding:10,paddingLeft:15,paddingRight:15,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                                <Text style={[styles[Device].show_order_details,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Show Order Details</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[{alignSelf:'center',borderRadius:100,backgroundColor:Themes.Light.OnewindowLightBlue}]}>
                    <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].status]}>{Word2Sentence([product.status,product.stage],"","-",true)}</Text>
                </View>
                <View style={{gap:15}}>
                    <Styledtext styles={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Experts Assigned" focusWord="Assigned"/>
                    <View style={{gap:20}}>
                    {
                        product.advisors.map((advisor,i)=>
                        <Pressable onPress={()=>showExpert(advisor._id)}>
                            <Expertcompactcard index={i} {...advisors?.find((item)=>item.info._id==advisor._id)}/>
                            {/* <Expertcard index={i} {...advisors?.find((item)=>item.info._id==advisor._id)}/> */}
                        </Pressable>
                        )
                    }
                    </View>
                </View>
                <View>
                    <Text style={[styles[Device].advisor_heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Documents</Text>
                    <View>
                    {
                        product.docChecklist.map((item)=>
                        <Text>{item.name}</Text>
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