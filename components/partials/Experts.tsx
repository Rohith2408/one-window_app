import { useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { useAppSelector } from "../../hooks/useAppSelector"
import { getDevice } from "../../utils"
import Expertcard from "../cards/Expertcard"
import { Fonts, Themes } from "../../constants"
import { Advisor } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { store } from "../../store"
import Requestcounsellorcard from "../cards/Requestcounsellorcard"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        alignItems:'center',
        padding:10
    },
    verify_wrapper:{
        borderWidth:1,
        borderRadius:20
    }
})

const TabStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:210,
        borderRadius:25
    },
    briefing:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:150,
        borderRadius:25
    },
    briefing:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:150,
        borderRadius:25
    },
    briefing:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:190,
        borderRadius:25
    },
    briefing:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Experts=()=>{

    const [path,navigate]=useNavigation()
    const experts=useAppSelector((state)=>state.advisors);
    const [pageLoad,setPageload]=useState()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const showDetails=(expert:Advisor)=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Expert",params:{expertid:expert.info._id}}}):null
    }

    const showExperts=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Expertintro"}}):null
    }

    return(
        <View style={{flex:1,padding:5}}>
        {
            experts.responseStatus=="not_recieved"
            ?
            <Loadinglistscreen cardStyles={{width:"100%",height:Device=="MobileS"?100:(Device=="MobileM"?130:170)}} cardGap={30} count={3} direction="vertical"/>
            :
            <View style={{flex:1,gap:10}}>
                <Pressable onPress={showExperts} style={[{alignSelf:'center',borderRadius:100,backgroundColor:Themes.Light.OnewindowLightBlue}]}>
                    <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)},styles[Device].briefing]}>Confused? Click here for a brief introduction</Text>
                </Pressable>
                <ScrollView style={{flex:1}} contentContainerStyle={{gap:15,paddingBottom:20}}>
                {
                    store.getState().preferences.data?.country?.map((country)=>
                    !alreadyAssigned(experts.data,country)
                    ?
                    <Requestcounsellorcard country={country}/>
                    :
                    null
                    )
                }
                {
                    experts.data?.map((expert,i)=>
                    <Pressable onPress={()=>showDetails(expert)} key={expert.info._id} style={[styles[Device].card_wrapper]}><Expertcard index={i} {...expert}/></Pressable>
                    )
                }
                </ScrollView>
            </View>
        }
        </View>
    )

}

const alreadyAssigned=(experts:Advisor[],country:string)=>{
   //console.log(country,experts);
    let assignedCountries=experts.reduce((acc,curr)=>[...acc,...curr.assignedCountries],[])
    return assignedCountries?.find((item)=>item==country)?true:false
}

export default Experts