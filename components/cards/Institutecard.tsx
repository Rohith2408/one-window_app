import { Pressable, Text, View } from "react-native"
import { Institute } from "../../types"

const Institutecard=(props:Institute & {index:number})=>{

    //console.log(props)

    return(
        <View>
            <Text>{props.InstitutionName}</Text>
        </View>
    )
}

export default Institutecard