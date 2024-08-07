import React from "react"
import { View } from "react-native"
import ComponentsInfo from "../info"
import { Layout as LayoutType} from "../../types"

const Layout=(props:LayoutType)=>{

    const Container=ComponentsInfo.find((item)=>item.id==props.component.id)?.component
    const Invalidpathscreen=props.invalidPathScreen
    console.log("layout",props.component)

    return(
        <View style={{width:"100%",height:"100%"}}>
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