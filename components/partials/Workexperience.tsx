import { useEffect } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useAppSelector } from "../../hooks/useAppSelector"

const Workexperience=(props:any)=>{

    const workExperiences=useAppSelector((state)=>state.workexperience)
    const [path,navigate]=useNavigation()
    useEffect(()=>{

    },[])

    const openForm=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Workexperience"}}}):null
    }

    const openFlyer=()=>{
        //Navigation?.navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Error",flyerdata:{message:"scasc"}}}})
    }

    return(
        <View style={[styles.mainWrapper]}>
        
        </View>
    )
}

export default Workexperience