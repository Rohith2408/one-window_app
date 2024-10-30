import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { ListItem, Recommendation, ServerResponse } from "../../types"
import Loadingview from "../resources/Loadingview"
import Recommendationcard from "../cards/Recommendationcard"
import { useEffect, useRef, useState } from "react"
import { getDevice } from "../../utils"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import useNavigation from "../../hooks/useNavigation"
import { store } from "../../store"
import { requests } from "../../constants/requests"
import Loader from "../resources/Loader"
import { Fonts, Themes } from "../../constants"
import Listselection from "../resources/Listselection"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import emptylist from '../../assets/images/illustrations/happy.png'
import { Image } from "expo-image"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:20,
        backgroundColor:'white',
        gap:20
    }
})

const TabStyles=StyleSheet.create({
    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    no_workexperience:{
        fontSize:18
    },
    click_message:{
        fontSize:14
    },
    emptylist_image:{
        width:120,
        height:120,
        resizeMode:"contain"
    },
})

const MobileSStyles=StyleSheet.create({
    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    no_workexperience:{
        fontSize:14
    },
    click_message:{
        fontSize:10,
        lineHeight:16
    },
    emptylist_image:{
        width:90,
        height:90,
        resizeMode:"contain"
    },
})

const MobileMStyles=StyleSheet.create({
    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:110,
        height:110,
        resizeMode:"contain"
    },
})

const MobileLStyles=StyleSheet.create({

    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:110,
        height:110,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Recommendations=()=>{

    const recommendations=useAppSelector((state)=>state.recommendations)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()
    const allowGenerate=false;
    const generationStatus=!(recommendations.data?.criteria==undefined || Object.keys(recommendations.data.criteria).length==0)
    const profileCompletionStatus=Object.keys(store.getState().educationhistory.data.underGraduation).length!=0 && store.getState().testscores.data.find((test)=>test.name=="Graduate Record Examination")!=undefined && store.getState().preferences.data?.courses?.length>0
    const profileChangeStatus=true
    const [loadPage,setLoadPage]=useState(false)
    const [isLoading,setIsloading]=useState(false);
    const ref=useRef<any>()
    const tabs=useRef([{label:"Safe",value:"safe"},{label:"Moderate",value:"moderate"},{label:"Ambitious",value:"ambitious"}]).current
    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:0,height:0,x:0,y:0})

    const generateRecommendations=async ()=>{
        setIsloading(true)
        let requestInfo=requests.find((request)=>request.id=="generate-recommendations");
        let res=await requestInfo?.serverCommunicator();
        requestInfo?.responseHandler(res);
        console.log(res?.message)
        setIsloading(false)
        return res?.success
    }

    useEffect(()=>{
       setTimeout(()=>{
        setLoadPage(true)
       },200)
    },[])

    const tabSelected=(selected:ListItem[])=>{
        ref.current.scrollTo({x:dimensions.width*(tabs.findIndex((tab)=>tab.label==selected[0].label)),animated:true})
    }

    //console.log(recommendations.data?.data.length)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}}>
            {
                loadPage
                ?
                <View style={{flex:1,gap:20}}>
                    {
                        recommendations.responseStatus!="recieved"
                        ?
                        <Loadinglistscreen cardStyles={{width:"100%",height:Device=="MobileS"?100:(Device=="MobileM"?130:170)}} cardGap={30} count={3} direction="vertical"/>
                        :
                        null
                    }
                    {
                        profileCompletionStatus
                        ?
                        generationStatus 
                        ?
                        <View style={{flex:1,gap:15}}>
                            {
                                profileChangeStatus
                                ?
                                <View style={{alignSelf:"stretch",justifyContent:"center",alignItems:"center"}}><View style={{width:'50%'}}><Asynchronousbutton idleText={"Regenerate"} successText={"Success!"} failureText={"Failed"} callback={generateRecommendations}/></View></View>
                                :
                                null
                            }
                            <View style={{flex:1,gap:15}}>
                                <Listselection
                                    direction="horizontal"
                                    selectionStyle="background"
                                    initialSelection={[{label:"Safe",value:"safe"}]}
                                    blurUnSelected={true}
                                    styles={{contentcontainer:{gap:10}}}
                                    onselection={tabSelected}
                                    options={{
                                        list:tabs,
                                        idExtractor:(data:ListItem)=>data.label,
                                        labelExtractor:(data:any)=>data.label,
                                        selectionMode:"single"
                                    }}
                                />
                                <ScrollView horizontal scrollEnabled={false} ref={ref} style={{flex:1}} contentContainerStyle={{paddingTop:0,paddingBottom:30}}>
                                    <View style={{width:dimensions.width}}>
                                        <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:60,paddingTop:30,paddingBottom:30}}>
                                        {
                                            recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Safe").map((item,i)=>
                                            <Recommendationcard {...item} index={i}/>
                                            )
                                        }
                                        </ScrollView>
                                    </View>
                                    <View style={{width:dimensions.width}}>
                                        <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:60,paddingTop:30,paddingBottom:30}}>
                                        {
                                            recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Moderate").map((item,i)=>
                                            <Recommendationcard {...item} index={i}/>
                                            )
                                        }
                                        </ScrollView>
                                    </View>
                                    <View style={{width:dimensions.width}}>
                                        <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:60,paddingTop:30,paddingBottom:30}}>
                                        {
                                            recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Ambitious").map((item,i)=>
                                            <Recommendationcard {...item} index={i}/>
                                            )
                                        }
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        :
                        <View style={{flex:1}}>
                            <View style={{alignSelf:"stretch",justifyContent:"center",alignItems:"center"}}><View style={{width:'50%'}}><Asynchronousbutton idleText={"Generate"} successText={"Success!"} failureText={"Failed"} callback={generateRecommendations}/></View></View>
                            <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                                <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                                <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Woaah</Text>
                                <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Your just one click away, click on the above generate button to get the AI powered recommendations!</Text>
                            </View>
                        </View>
                        :
                        <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                            <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                            <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Oops...!</Text>
                            <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Please add your undergraduate information , GRE Test Score and Course Preferences to start generating!</Text>
                        </View>
                    }
                </View>
                :
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Loader loaderStyles={styles[Device].loader} isLoading={!loadPage}/>
                </View>
            }
            
        </View>
    )

}

export default Recommendations