import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useAppSelector } from "../../hooks/useAppSelector"
import Loadingview from "../resources/Loadingview"
import Workexperiencecard from "../cards/Workexperiencecard"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import add_icon from '../../assets/images/misc/add.png'
import { Image } from "expo-image"
import { getDevice } from "../../utils"
import { Fonts, Themes, setComponentInfo } from "../../constants"
import emptylist from '../../assets/images/illustrations/angry.png'
import { addToBasket } from "../../constants/basket"
import Familydetailscard from "../cards/Familydetailscard"
import Expertintrocard from "../cards/Expertintrocard"

const GeneralStyles=StyleSheet.create({
    
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

const Expertsintro=(props:any)=>{

    const [path,navigate]=useNavigation()
    const [dimensions,setDimesnions]=useState<LayoutRectangle>()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const data=useRef([
        {
            role:"Remote Student Advisor",
            description:"I’m your first point of contact, here to help you with any general questions you have and guide you throughout the process."
        },
        {
            role:"Counsellor",
            description:"I’ll guide you in choosing the right abroad program that fits your goals and preferences, ensuring you choose the best path forward."
        },
        {
            role:"Process Coordinator",
            description:"I’m here to make sure your application process runs smoothly, guiding you through each step from start to finish."
        },
        {
            role:"Visa Expert",
            description:"I’ll assist you with the visa application process, providing guidance to help you secure your visa for studying abroad"
        }
    ]).current

    useEffect(()=>{

    },[])

    return(
        <View style={{flex:1,padding:10}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{gap:24}}>
            {
                data.map((expert,i)=>
                <Expertintrocard index={i} {...expert}/>
                )
            }
            </ScrollView>
        </View>
    )
}

export default Expertsintro