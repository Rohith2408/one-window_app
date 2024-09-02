import { Image } from "expo-image"
import { useEffect, useRef } from "react"
import { Animated } from "react-native"
import loading_gif from '../../assets/images/misc/loader.gif'

const Loader=(props:{loaderStyles:any,isLoading:boolean})=>{

    const scale=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        Animated.spring(scale,{
            toValue:props.isLoading?1:0,
            useNativeDriver:false
        }).start()
    },[props.isLoading])

    return(
        <Animated.View style={[{transform:[{scale:scale}]}]}>
            <Image style={props.loaderStyles} source={loading_gif}></Image>
        </Animated.View>
    )
}

export default Loader