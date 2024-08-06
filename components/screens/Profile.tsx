import { StyleSheet, Text, View } from "react-native"
import Gradienttext from "../resources/Gradienttext"


const Profile=()=>{

    return(
        <View style={{flex:1}}>
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