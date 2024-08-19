
import Stacknavigator from "../../navigation/stackNavigator"
import { propsMapper } from "../../utils"
import ComponentsInfo from "../../constants/components"
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
                animationStyle:ComponentsInfo.find((component)=>component.id==screen.id)?.animationStyle
        }))}
        />
    )
}

export default Login

