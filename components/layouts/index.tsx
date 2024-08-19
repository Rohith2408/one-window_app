import React from "react"
import { View } from "react-native"
import { Layout as LayoutType} from "../../types"
import {components} from "../../constants/components"

const Layout=(props:LayoutType)=>{

    const Container=components.find((item)=>item.id==props.component)?.component
    const Invalidpathscreen=props.invalidPathScreen
    //console.log("layout",props)

    return(
        <View style={{width:"100%",height:"100%"}}>
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