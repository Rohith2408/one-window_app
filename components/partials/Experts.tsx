import { useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { useAppSelector } from "../../hooks/useAppSelector"
import { getDevice } from "../../utils"
import Expertcard from "../cards/Expertcard"
import { Themes } from "../../constants"
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
    
})

const MobileSStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:140,
        borderRadius:25
    }
})

const MobileMStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:150,
        borderRadius:25
    }
})

const MobileLStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:150,
        borderRadius:25
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

    return(
        <View style={{flex:1,padding:5}}>
        {
            experts.responseStatus=="not_recieved"
            ?
            <Loadinglistscreen cardGap={30} cardHeight={Device=="MobileS"?100:(Device=="MobileM"?130:170)}></Loadinglistscreen>
            :
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}} contentContainerStyle={{gap:40,paddingBottom:20}}>
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