import React, { useRef } from "react"
import { StyleSheet, View } from "react-native"
import { Layout as LayoutType} from "../../types"
import {components} from "../../constants/components"
import { getDevice } from "../../utils"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const MobileSStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const MobileMStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const MobileLStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Layout=(props:LayoutType)=>{

    const Container=components.find((item)=>item.id==props.component)?.component
    const Invalidpathscreen=props.invalidPathScreen
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[styles[Device].wrapper]}>
            {
                Container
                ?
                <Container screens={props.screens} params={props.props}></Container>
                :
                <Invalidpathscreen></Invalidpathscreen>
            }
        </View>
    )
}

export default Layout