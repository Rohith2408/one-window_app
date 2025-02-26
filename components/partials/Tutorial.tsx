import { useRef, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { getDevice } from "../../utils"
import { Themes, appStandardStyles } from "../../constants"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Text } from "react-native"
import Transitionview from "../resources/Transitionview"
import { store } from "../../store"
import { resetTutorial } from "../../store/slices/tutorialSlice"
import { tutorials } from "../../constants/tutorials"
import { useAppDispatch } from "../../hooks/useAppDispatch"


const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:'column',
        gap:25,
        position:"relative"
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    
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

const Tutorial=(props:{id:string})=>{

    const Device=useRef(getDevice()).current
    const [index,setIndex]=useState(0);
    const dispatch=useAppDispatch()
    const info=useAppSelector((state)=>state.tutorials)

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginMini]}>
        <Pressable onPress={()=>dispatch(resetTutorial())}><Text>Skip Tutorial</Text></Pressable>
        {
            info?.map((item,i)=>
            i==index
            ?
            <Transitionview effect="panY">
                <View style={{width:150,height:50,backgroundColor:'red',position:'absolute',left:20,top:item.y}}>
                    <Text>{tutorials.find((item2)=>item2.id==props.id)?.tutorials[i].title}</Text>
                    <Text>{tutorials.find((item2)=>item2.id==props.id)?.tutorials[i].info}</Text>
                    <Pressable onPress={()=>i==info.length-1?dispatch(resetTutorial()):setIndex(index+1)}><Text>Next</Text></Pressable>
                </View>
            </Transitionview>
            :
            null
            )
        }
        </View>
    )

}

export default Tutorial

