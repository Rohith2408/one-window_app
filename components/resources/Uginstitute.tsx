import { Text, View } from "react-native"

const Uginstitute=(props:{instituteName:string,city:string,state:string,country:string,affiliatedUniversity:string[]})=>{

    return(
        <View style={{flex:1}}>
            <Text>{props.instituteName}</Text>
            <Text>{props.city}</Text>
            <Text>{props.country}</Text>
            <Text>{props.state}</Text>
            <Text>{props.affiliatedUniversity}</Text>
        </View>
    )
}

export default Uginstitute