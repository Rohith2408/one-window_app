import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { ListItem, Recommendation, ServerResponse } from "../../types"
import Recommendationcard from "../cards/Recommendationcard"
import { useEffect, useRef, useState } from "react"
import { getDevice } from "../../utils"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import useNavigation from "../../hooks/useNavigation"
import { store } from "../../store"
import { requests } from "../../constants/requests"
import Loader from "../resources/Loader"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import Listselection from "../resources/Listselection"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import emptylist from '../../assets/images/illustrations/thinking.png'
import { Image } from "expo-image"
import Transitionview from "../resources/Transitionview"

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
        fontSize:20
    },
    click_message:{
        fontSize:16
    },
    emptylist_image:{
        width:200,
        height:200,
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
        width:120,
        height:120,
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
        fontSize:18
    },
    click_message:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:140,
        height:140,
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
        fontSize:18
    },
    click_message:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    },
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
        ref.current?.scrollTo({x:dimensions.width*(tabs.findIndex((tab)=>tab.label==selected[0].label)),animated:true})
    }

    const redirecToExperts=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Experts"}}):null
    }

    //console.log(recommendations.data?.data.length)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1}}>
            {
                loadPage
                ?
                    recommendations.responseStatus!="recieved"
                    ?
                    <View style={{flex:1}}><Loadinglistscreen cardGap={30} count={6} visibilityCount={5} direction="vertical"/></View>
                    :
                    <View style={{flex:1,gap:20}}>
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
                                    <View style={[appStandardStyles.screenMarginMini]}>
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
                                    </View>
                                    <ScrollView horizontal scrollEnabled={false} ref={ref} style={{flex:1}} contentContainerStyle={{paddingTop:0}}>
                                        <View style={{width:dimensions.width}}>
                                            {
                                                recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Safe").length==0
                                                ?
                                                <View style={{flex:1,justifyContent:'center',alignItems:'center',gap:10}}>
                                                    <Transitionview effect="panY"><Image source={emptylist} style={[styles[Device].emptylist_image]}/></Transitionview>
                                                    <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Oh no..!</Text>
                                                    <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular,lineHeight:26}]}>Couldn't find any safe programs that match your preferences, don’t worry! Our experts are here to help you find the right match.!!</Text>
                                                    <Pressable style={{borderRadius:100,borderWidth:1.3,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={redirecToExperts}><Text style={{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}}>Talk to expert</Text></Pressable>
                                                </View>
                                                :
                                                <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:40,padding:15}}>
                                                {
                                                    recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Safe").map((item,i)=>
                                                    <Recommendationcard {...item} index={i}/>
                                                    )
                                                }
                                                </ScrollView>
                                            }
                                        </View>
                                        <View style={{width:dimensions.width}}>
                                        {
                                            recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Moderate").length==0
                                            ?
                                            <View style={{flex:1,justifyContent:'center',alignItems:'center',gap:10}}>
                                                <Transitionview effect="panY"><Image source={emptylist} style={[styles[Device].emptylist_image]}/></Transitionview>
                                                <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Oh no..!</Text>
                                                <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular,lineHeight:26}]}>Couldn't find any moderate programs that match your preferences, don’t worry! Our experts are here to help you find the right match.!!</Text>
                                                <Pressable style={{borderRadius:100,borderWidth:1.3,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={redirecToExperts}><Text style={{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}}>Talk to expert</Text></Pressable>
                                            </View>
                                            :
                                            <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:40,padding:15}}>
                                            {
                                                recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Moderate").map((item,i)=>
                                                <Recommendationcard {...item} index={i}/>
                                                )
                                            }
                                            </ScrollView>
                                        }
                                        </View>
                                        <View style={{width:dimensions.width}}>
                                        {
                                            recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Ambitious").length==0
                                            ?
                                            <View style={{flex:1,justifyContent:'center',alignItems:'center',gap:10}}>
                                                <Transitionview effect="panY"><Image source={emptylist} style={[styles[Device].emptylist_image]}/></Transitionview>
                                                <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Oh no..!</Text>
                                                <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular,lineHeight:26}]}>Couldn't find any ambitious programs that match your preferences, don’t worry! Our experts are here to help you find the right match.!!</Text>
                                                <Pressable style={{borderRadius:100,borderWidth:1.3,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={redirecToExperts}><Text style={{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}}>Talk to expert</Text></Pressable>
                                            </View>
                                            :
                                            <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:40,padding:15}}>
                                            {
                                                recommendations.data?.data.filter((item)=>item.possibilityOfAdmit=="Ambitious").map((item,i)=>
                                                <Recommendationcard {...item} index={i}/>
                                                )
                                            }
                                            </ScrollView>
                                        }
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