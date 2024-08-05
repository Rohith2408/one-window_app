import { Text, View } from "react-native"

const Home=(props:undefined|{name:string})=>{

    return(
        <View>
            <Text>Home</Text>
            <Text>{props?.name}</Text>
        </View>
    )
}

export default Home