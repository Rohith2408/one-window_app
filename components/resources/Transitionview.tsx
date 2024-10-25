import { useEffect, useRef } from "react"
import { Animated, Easing, StyleProp, TextStyle } from "react-native"

const Transitionview=(props:{style?:StyleProp<TextStyle>[],effect:"fade"|"zoom"|"pan",delay?:number,children:React.ReactNode})=>{

    const index=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        setTimeout(()=>{
            Animated.spring(index,{
                toValue:1,
                useNativeDriver:true
            }).start()
        },props.delay?props.delay:0)
    },[])

    return(
        <Animated.View style={[props.style,{opacity:(props.effect=="fade" || props.effect=="pan")?index:1,transform:[{scale:props.effect=="zoom"?index:1},{translateY:props.effect=="pan"?index.interpolate({inputRange:[0,1],outputRange:[50,0]}):0}]}]}>{props.children}</Animated.View>
    )
}

export default Transitionview