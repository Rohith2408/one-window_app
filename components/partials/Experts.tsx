import { useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { useAppSelector } from "../../hooks/useAppSelector"
import { getDevice } from "../../utils"
import Expertcard from "../cards/Expertcard"
import { Themes } from "../../constants"
import { Advisor } from "../../types"
import useNavigation from "../../hooks/useNavigation"

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
    
})

const MobileLStyles=StyleSheet.create({
    
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
                <ScrollView style={{flex:1}} contentContainerStyle={{gap:30,paddingBottom:20}}>
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

export default Experts