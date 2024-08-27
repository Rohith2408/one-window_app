import { Text, View } from "react-native"
import { UniversityListObj } from "../../types"


const Universitycard=(props:UniversityListObj)=>{
    return(
        <View ><Text>{props.name}</Text></View>
    )
}

export default Universitycard