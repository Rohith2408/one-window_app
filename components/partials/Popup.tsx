import { View } from "react-native"
import { ComponentInfo } from "../../types"
import { getComponent } from "../../utils"

const Popup=(props:{popup:string,popupdata:any})=>{

    console.log("popup",props);
    const Container:React.FC<any>|undefined=getComponent(props.popup)?.component

    return(
        <View style={{flex:1,backgroundColor:"red"}}>
        {
            Container
            ?
            <Container data={props.popupdata}/>
            :
            null
        }
        </View>
    )

}

export default Popup