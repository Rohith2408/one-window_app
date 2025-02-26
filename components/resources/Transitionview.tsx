import { useEffect, useRef } from "react"
import { Animated, Easing, StyleProp, TextStyle } from "react-native"

const Transitionview=(props:{style?:StyleProp<TextStyle>[],effect:"fade"|"zoom"|"panY"|"panX",delay?:number,children:React.ReactNode})=>{

    const index=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        setTimeout(()=>{
            Animated.spring(index,{
                toValue:1,
                useNativeDriver:true,
                friction:6.5,
                tension:50
            }).start()
        },props.delay?props.delay:0)
    },[])

    return(
        <Animated.View style={[props.style,{opacity:(props.effect=="fade" || props.effect=="panY" || props.effect=="panX")?index:1,transform:[{scale:props.effect=="zoom"?index:1},{translateX:props.effect=="panX"?index.interpolate({inputRange:[0,1],outputRange:[-10,0]}):0},{translateY:props.effect=="panY"?index.interpolate({inputRange:[0,1],outputRange:[7,0]}):0}]}]}>{props.children}</Animated.View>
    )
}

export default Transitionview