import { Text, View } from "react-native"
import { UniversityListObj } from "../../types"


const University=(props:UniversityListObj)=>{
    return(
        <View ><Text>{props.name}</Text></View>
    )
}

export default University