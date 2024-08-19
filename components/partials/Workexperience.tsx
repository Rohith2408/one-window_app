import { useEffect } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"

const Workexperience=(props:any)=>{

    const Navigation=useNavigation()
    useEffect(()=>{

    },[])

    const openForm=()=>{
        Navigation?.navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Workexperience"}}})
    }

    const openFlyer=()=>{
        Navigation?.navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Error",flyerdata:{message:"scasc"}}}})
    }

    return(
        <View style={[styles.mainWrapper]}>
            <Text>Work Experience</Text>
            <Pressable onPress={openForm}><Text>Open Form</Text></Pressable>
            <Pressable onPress={openFlyer}><Text>Open Flyer</Text></Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    mainWrapper:{
        flex:1,
        backgroundColor:'white'
    }
})

export default Workexperience