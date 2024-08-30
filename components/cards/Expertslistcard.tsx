import { Text, View } from "react-native"

const Expertslistcard=(props:{name:string,id:string})=>{
    return(
        <View style={{flex:1}}>
            <Text>{props.name}</Text>
        </View>
    )
}

export default Expertslistcard