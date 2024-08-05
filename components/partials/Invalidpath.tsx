import { Text, View } from "react-native"

const Invalidpath=()=>{
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Requested path/screen doesnt exist</Text>
            <Text>Please check the path</Text>
        </View>
    )
}

export default Invalidpath