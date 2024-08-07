import { Pressable, StyleSheet, Text, View } from "react-native"
import Gradienttext from "../resources/Gradienttext"
import useNavigation from "../../hooks/useNavigation";


const Profile=(props:any)=>{

    console.log("Profile",props);
    const Navigation=useNavigation()

    return(
        <View style={{width:"100%",height:"100%",backgroundColor:'yellow'}}>
            {/* <Pressable style={{margin:50}} onPress={()=>Navigation?.navigate({type:"set",payload:{path:"Home",params:{}}})}><Text style={{color:"black"}}>Back</Text></Pressable> */}
            <View style={[Section1Styles.wrapper]}>
                <Gradienttext text="Rohith Kumar" fontSize={20} gradient={["#6067C4","#3C4077"]}></Gradienttext>
                <Text style={[Section1Styles.email]}>Kumarrohith24081999@gmail.com</Text>
            </View>
        </View>
    )
}

const Section1Styles=StyleSheet.create({
    wrapper:{
        width:"100%",
    },
    email:{
        fontSize:14,
        color:"#3C4077"
    }
})

export default Profile