import { Image } from "expo-image"
import { Pressable, StyleSheet, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.8)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    dp:{
        position:"absolute"
    }
})

const Dp=(props:{image:string})=>{

    const [path,navigate]=useNavigation()

    const close=()=>{
        navigate?navigate({type:"RemoveScreen"}):null
    }

    return(
        <Pressable onPress={close} style={[GeneralStyles.wrapper]}>
            <Image source={props.image} style={[GeneralStyles.dp,{width:150,height:150,objectFit:"contain"}]}></Image>
        </Pressable>
    )
}

export default Dp