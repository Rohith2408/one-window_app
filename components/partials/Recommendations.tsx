import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Recommendation, ServerResponse } from "../../types"
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
    }
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
    }
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
    }
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
    const profileCompletionStatus=Object.keys(store.getState().educationhistory.data.underGraduation).length!=0 && store.getState().testscores.data.find((test)=>test.name=="Graduate Record Examination")!=undefined
    const profileChangeStatus=true
    const [loadPage,setLoadPage]=useState(false)
    const [isLoading,setIsloading]=useState(false);

    const generateRecommendations=async ()=>{
        setIsloading(true)
        let requestInfo=requests.find((request)=>request.id=="generate-recommendations");
        let res=await requestInfo?.serverCommunicator();
        requestInfo?.responseHandler(res);
        setIsloading(false)
    }

    useEffect(()=>{
       setTimeout(()=>{
        setLoadPage(true)
       },200)
    },[])


    return(
        <View style={{flex:1}}>
            {
                loadPage
                ?
                <View style={{flex:1}}>
                    {
                        recommendations.responseStatus!="recieved"
                        ?
                        <Loadinglistscreen cardStyles={{width:"100%",height:Device=="MobileS"?100:(Device=="MobileM"?130:170)}} cardGap={30} count={3} direction="vertical"/>
                        :
                        null
                    }
                    {
                        generationStatus && profileChangeStatus && profileCompletionStatus
                        ?
                        <Pressable style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}} onPress={generateRecommendations}>
                            <Text style={{alignSelf:"center",fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}}>Regenerate</Text>
                            <Loader loaderStyles={styles[Device].loader} isLoading={isLoading}/>
                        </Pressable>
                        :
                        !generationStatus && profileCompletionStatus
                        ?
                        <Pressable onPress={generateRecommendations}><Text>Generate</Text></Pressable>
                        :
                        <Text>Please add your GRE test details and Undergraduation details to start generating recommendations</Text>
                    }
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:60,paddingTop:30,paddingBottom:30}}>
                    {
                        recommendations.data?.data.map((item,i)=>
                        <Recommendationcard {...item} index={i}/>
                        )
                    }
                    </ScrollView>
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