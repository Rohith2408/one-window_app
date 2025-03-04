import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import Tabnavigator from "../../navigation/tabNavigator"
import { TabScreen } from "../../types"
import { useRef } from "react"
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import Invalidpath from "./Invalidpath"
import Navbar from "../resources/Navbar"
import Community from "../screens/Community"
import Chats from "../screens/Chats"
import { appStandardStyles } from "../../constants"

const Base=(props:{tab:string})=>{

    const Nav=useNavigation()
    const Screens:TabScreen[]=useRef([
    {
        id:"home",
        component:Home,
    },
    {
        id:"profile",
        component:Profile,
    },
    {
        id:"feed",
        component:Community,
    },
    {
        id:"chats",
        component:Chats,
    }
    ]).current

    //console.log("base props",props)

    return(
        <View style={[{flex:1,alignSelf:"stretch",marginBottom:Platform.OS=="android"?10:0},appStandardStyles.screenMarginSmall]}>
            <View style={[styles.screenWrapper]}><Tabnavigator screens={Screens} currentTab={{id:props.tab,props:undefined}} invalidPathScreen={Invalidpath}></Tabnavigator></View>
            <View style={[styles.navWrapper]}><Navbar tab={props.tab}></Navbar></View>
        </View>
    )
}

const styles=StyleSheet.create({
    screenWrapper:{
        flex:14
    },
    navWrapper:{
        flex:1.1
    }
})

export default Base