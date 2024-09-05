import { LinearGradient } from "expo-linear-gradient"
import React, { useEffect, useRef } from "react"
import { Animated, Text, View, ViewStyle } from "react-native"


const Loadingview=(props:{isLoading:boolean,style:ViewStyle[],children:React.ReactNode,transitionEffect?:"opacity"|"scale"})=>{

    const loadingScale=useRef(new Animated.Value(0)).current
    const contentScale=useRef(new Animated.Value(0)).current
    const gradientProgress=useRef(new Animated.Value(0)).current
    const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

    useEffect(()=>{
        if(props.isLoading)
        {
            Animated.loop(
                Animated.sequence([
                  Animated.timing(gradientProgress, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                  }),
                  Animated.timing(gradientProgress, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                  }),
                ])
              ).start();
        }
        Animated.parallel([
            Animated.spring(loadingScale,{
                toValue:props.isLoading?1:0,
                useNativeDriver:true
            }),
            Animated.spring(contentScale,{
                toValue:props.isLoading?0:1,
                useNativeDriver:true
            })
        ]).start()
    },[props.isLoading])

    console.log("loading",props.isLoading);

    return(
        <View style={{position:"relative",display:"flex"}}>
            <Animated.View style={[{position:"absolute"},props.transitionEffect=="scale"?{transform:[{scale:loadingScale}]}:{opacity:loadingScale}]}>
                <AnimatedGradient style={[{borderRadius:30},...props.style]}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0,gradientProgress.interpolate({inputRange:[0,1],outputRange:[0.2,0.8]}),gradientProgress.interpolate({inputRange:[0,1],outputRange:[0.4,1]}),0]} colors={['#F7F6FB','#E1DAFF',"#F1EDFF","#F1EDFF"]}><Text></Text></AnimatedGradient>
            </Animated.View>
            <Animated.View style={[{zIndex:1},props.transitionEffect=="scale"?{transform:[{scale:contentScale}]}:{opacity:contentScale}]}>
            {props.children}
            </Animated.View>
        </View>
    )
}

export default Loadingview