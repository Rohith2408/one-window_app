import { Pressable, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"

const Home=(props:undefined|{name:string})=>{

    const Nav=useNavigation()

    return(
        <View style={{width:"100%",height:"100%",backgroundColor:'green'}}>
            <Text>Home</Text>
            <Text>{props?.name}</Text>
            <Pressable onPress={()=>Nav?.navigate({type:"add",payload:{path:"Profile",params:{name:"Rohith"}}})}><Text>Hey</Text></Pressable>
        </View>
    )
}

export default Home