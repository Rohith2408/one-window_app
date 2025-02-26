import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, Easing, PanResponder, PanResponderGestureState, Pressable, StyleSheet, Text, View } from "react-native"
import { ServerResponse } from "../../types"
import { getDevice } from "../../utils"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    mainwrapper:{
        display:"flex",
        position:"absolute",
        borderRadius:1000,
        zIndex:10,
        backgroundColor:'red'
    }
})

const TabStyles=StyleSheet.create({
    mainwrapper:{
        width:100,
        height:100
    }
})

const MobileSStyles=StyleSheet.create({
    mainwrapper:{
        width:60,
        height:60
    }
})
const MobileMStyles=StyleSheet.create({
    mainwrapper:{
        width:75,
        height:75
    }
})

const MobileLStyles=StyleSheet.create({
    mainwrapper:{
        width:75,
        height:75
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

type Gesture={
    action:"on-move"|"on-release",
    data:PanResponderGestureState
}

const AIAssist=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const x=useRef(new Animated.Value(0)).current;
    const y=useRef(new Animated.Value(0)).current;
    const currentPosition=useRef({x:0,y:0});
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {},
          onPanResponderMove: (e,state)=>handleGesture({action:"on-move",data:state}),
          onPanResponderRelease: (e,state) =>handleGesture({action:"on-release",data:state}),
        })
      ).current;

    useEffect(()=>{
        
    },[])

    const handleGesture=(gestureData:Gesture)=>{
        console.log("gesture",gestureData,currentPosition.current);
        if(gestureData.action=="on-move")
        {
            Animated.parallel([
                Animated.timing(x,{
                    toValue:currentPosition.current.x+gestureData.data.dx,
                    duration:20,
                    easing:Easing.ease,
                    useNativeDriver:false
                }),
                Animated.timing(y,{
                    toValue:currentPosition.current.y+gestureData.data.dy,
                    duration:20,
                    easing:Easing.ease,
                    useNativeDriver:false
                })
            ]).start()
        }
        if(gestureData.action=="on-release")
        {
            if(currentPosition.current.x+gestureData.data.dx<=Dimensions.get("screen").width/2)
            {
                currentPosition.current.x=0;
            }
            if(currentPosition.current.x+gestureData.data.dx>Dimensions.get("screen").width/2)
            {
                currentPosition.current.x=Dimensions.get("screen").width-styles[Device].mainwrapper.width;
            }
            if(currentPosition.current.y+gestureData.data.dy<0)
            {
                currentPosition.current.y=0;
            }
            if(currentPosition.current.y+gestureData.data.dy>Dimensions.get("screen").height)
            {
                currentPosition.current.y=Dimensions.get("screen").height-styles[Device].mainwrapper.height;
            }
            if(currentPosition.current.y+gestureData.data.dy>=0 && currentPosition.current.y+gestureData.data.dy<=Dimensions.get("screen").height)
            {
                currentPosition.current.y=currentPosition.current.y+gestureData.data.dy;
            }
            console.log(currentPosition);
            Animated.parallel([
                Animated.spring(x,{
                    toValue:currentPosition.current.x,
                    useNativeDriver:false
                }),
                Animated.spring(y,{
                    toValue:currentPosition.current.y,
                    useNativeDriver:false
                })
            ]).start()
        }
    }

    return(
        <Animated.View {...panResponder.panHandlers} style={[GeneralStyles.mainwrapper,styles[Device].mainwrapper,{transform:[{translateX:x},{translateY:y}]}]}>

        </Animated.View>
    )

}

export default AIAssist
