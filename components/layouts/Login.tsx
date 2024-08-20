
import { components } from "../../constants"
import Stacknavigator from "../../navigation/stackNavigator"
import { propsMapper } from "../../utils"

import Invalidpath from "../partials/Invalidpath"

const Login=(props:{screens:string[],params:any})=>{
    
    return(
        <Stacknavigator 
            invalidPathScreen={Invalidpath}
            screens={propsMapper(props.screens,props.params).map((screen)=>({
                id:screen.id,
                component:screen.id,
                props:screen.props,
                swipable:true,
                animationStyle:components.find((component)=>component.id==screen.id)?.animationStyle
            }))}
        />
    )
}

export default Login

