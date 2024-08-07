import { Text, View } from "react-native"
import Stacknavigator from "../../navigation/stackNavigator"
import { ComponentInfo } from "../../types"
import { getComponent } from "../../utils"
import Invalidpath from "../partials/Invalidpath"

const Student=(props:ComponentInfo[])=>{

    console.log("props stu",props)

    return(
        <View style={{width:"100%",height:"100%",backgroundColor:'red'}}>
            <Stacknavigator 
                invalidPathScreen={Invalidpath}
                screens={
                    Object.values(props).map((info)=>{
                    let data=getComponent(info.id)
                    return {
                        id:info.id,
                        component:data?.component?data.component:()=><View></View>,
                        props:info.props,
                        animationStyle:data?.animationStyle?data.animationStyle:"HorizontalSlideToLeft"
                }})}
            />
        </View>
    )
}

export default Student