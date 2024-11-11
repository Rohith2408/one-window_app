import { Image } from "expo-image"
import { Pressable, StyleSheet, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { store } from "../../store"
import { useRef } from "react"
import defaultDP from '../../assets/images/misc/defaultDP.png'
import { getBasket } from "../../constants/basket"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.8)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    dp:{
        position:"absolute",
        zIndex:1
    }
})

const Dp=()=>{
        
    const [path,navigate]=useNavigation()
    const image:any=useRef(getBasket("viewimage")).current;
   

    const close=()=>{
        navigate?navigate({type:"RemoveScreen"}):null
    }

    return(
        <Pressable onPress={close} style={[GeneralStyles.wrapper]}>
            <Image source={image} style={[GeneralStyles.dp,{width:200,height:200,objectFit:"contain"}]}></Image>
        </Pressable>
    )
}

export default Dp