import { Pressable, StyleSheet, Text, View } from "react-native"
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
            id:"community",
            component:Community,
        },
        {
            id:"chats",
            component:Chats,
        }
    ]).current

    console.log("base props",props)

    return(
        <View style={{width:"100%",height:"100%"}}>
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
        flex:1
    }
})

export default Base