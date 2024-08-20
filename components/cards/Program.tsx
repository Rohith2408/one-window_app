import { Text, View } from "react-native"
import { CourseListObj } from "../../types"

const Program=(props:CourseListObj)=>{
    return(
        <View ><Text>{props.name}</Text></View>
    )
}

export default Program