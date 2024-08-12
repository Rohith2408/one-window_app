import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import Tabnavigator from "../../navigation/tabNavigator"
import { TabScreen } from "../../types"
import { useRef } from "react"
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import Invalidpath from "./Invalidpath"

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
        }
    ]).current

    console.log("base props",props)

    return(
        <View style={{width:"100%",height:"100%",backgroundColor:'green'}}>
            <View style={[styles.screenWrapper]}><Tabnavigator screens={Screens} initialTab={{id:props.tab,props:undefined}} invalidPathScreen={Invalidpath}></Tabnavigator></View>
            <View style={[styles.navWrapper]}></View>
        </View>
    )
}

const styles=StyleSheet.create({
    screenWrapper:{
        flex:9
    },
    navWrapper:{
        flex:1
    }
})

export default Base