import { Text, View } from "react-native"

const Error=(props:any)=>{

    console.log('error',props);

    return(
        <View><Text>{props.message}</Text></View>
    )
}

export default Error