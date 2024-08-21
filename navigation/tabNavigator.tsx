import React from "react"
import { TabNavigator } from "../types"
import { StyleSheet, View } from "react-native"

const Tabnavigator=(props:TabNavigator)=>{

    const Screen:React.FC<any>|undefined=props.screens.find((screen)=>screen.id==props.currentTab.id)?.component

    return(
        <View style={[styles.mainWrapper]}>
            {
                Screen
                ?
                <Screen {...props.currentTab.props}/>
                :
                null
            }
        </View>
    )
}

const styles=StyleSheet.create({
    mainWrapper:{
        flex:1
    }
})

export default Tabnavigator