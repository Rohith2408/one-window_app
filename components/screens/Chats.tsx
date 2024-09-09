import { useEffect, useState } from "react"
import { Text, View } from "react-native"

const Chats=()=>{

    let [a,setA]=useState({val:"Rohith"})

    useEffect(()=>{
        setTimeout(()=>{
            let b
            setA(a)
        },2000)
    },[])

    useEffect(()=>{
        console.log("Rendered");
    },[a])

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
            <Text>Chats</Text>
        </View>
    )
}

export default Chats