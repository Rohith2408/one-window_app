import { Image } from "expo-image"
import { Text, View } from "react-native"
import icon from '../../assets/images/preferences/bachelors.png'
import { ListItem } from "../../types"

const Degreepreferencecard=(props:ListItem)=>{

    console.log("deg",props)

    return(
        <View style={{padding:10,gap:5,flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
            <Image style={{width:16,height:16,resizeMode:"contain"}} source={icon}/>
            <View style={{flex:1}}><Text>{props.label}</Text></View>
        </View>
    )

}

export default Degreepreferencecard