import { Text, View } from "react-native"
import { CourseListObj } from "../../types"

const Programcard=(props:CourseListObj)=>{
    return(
        <View>
            <Text>{props.name}</Text>
            <Text>{props.studyLevel}</Text>
        </View>
    )
}

export default Programcard