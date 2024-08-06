import React from "react"
import { View } from "react-native"
import ComponentsInfo from "../info"
import { Layout as LayoutType} from "../../types"

const Layout=(props:LayoutType)=>{

    const Container=ComponentsInfo.find((item)=>item.id==props.component.id)?.component
    const Invalidpathscreen=props.invalidPathScreen

    return(
        <View>
            {
                Container
                ?
                <Container {...props.component.props}></Container>
                :
                <Invalidpathscreen></Invalidpathscreen>
            }
        </View>
    )
}

export default Layout