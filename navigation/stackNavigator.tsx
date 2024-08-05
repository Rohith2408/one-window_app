import { Animated, Dimensions, Easing, PanResponder, StyleSheet, View } from "react-native"
import { StackNavigator, StackScreen as StackScreenType } from "../types"
import { useEffect, useRef } from "react"
import { GestureHandlerRootView, HandlerStateChangeEvent, PanGestureChangeEventPayload, PanGestureHandler, PanGestureHandlerEventPayload } from "react-native-gesture-handler"

const Stacknavigator=(props:StackNavigator)=>{

    const Invalidscreen=props.invalidPathScreen

    return(
        <View style={[styles.wrapper]}>
        {
            props.screens.filter((screen)=>screen.component==undefined).length==0
            ?
            <View style={{width:'100%',height:"100%"}}>
            {
                props.screens.map((screen:StackScreenType)=>
                <StackScreen {...screen}/>
                )
            }
            </View>
            :
            <Invalidscreen></Invalidscreen>
        }
        </View>
    )
}

const StackScreen=(props:StackScreenType)=>{

    const translateY=useRef(new Animated.Value(props.animationStyle!="Custom"?Presets[props.animationStyle].translateY:(props.initialPosition?.top?props.initialPosition.top:0))).current;
    const translateX=useRef(new Animated.Value(props.animationStyle!="Custom"?Presets[props.animationStyle].translateX:(props.initialPosition?.left?props.initialPosition.left:0))).current;
    const opacity=useRef(new Animated.Value(0)).current;
    const swipeThreshold = 100;
    const currentPos=useRef(0);

    const getCurrentPosition=()=>(currentPos.current)
    const setCurrentPosition=(val:number)=>{currentPos.current=val}

    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {},
          onPanResponderMove: (e,state)=>{
            Animated.timing(translateX,{
                toValue:getCurrentPosition()+state.dx,
                duration:10,
                useNativeDriver:false
            }).start()
          },
          onPanResponderRelease: (e,state) => {
            let initialPos=getCurrentPosition()
            if((state.dx+initialPos)>Dimensions.get("screen").width/2)
            {
                Animated.spring(translateX,{
                    toValue:Dimensions.get("screen").width,
                    useNativeDriver:false
                }).start()
                setCurrentPosition(Dimensions.get("screen").width)
            }
            else
            {
                Animated.spring(translateX,{
                    toValue:0,
                    useNativeDriver:false
                }).start()
                setCurrentPosition(0)
            }
          },
        })
      ).current;
    
    const onGestureEvent = Animated.event(
        [
          {
            nativeEvent: {
              translationX: translateX,
              translationY: translateY,
            },
          },
        ],
        { useNativeDriver: false}
    );

    const onHandlerStateChange = (event:HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === 5) {
          const { translationX, translationY } = event.nativeEvent;
          if (Math.abs(translationX) > swipeThreshold) {
            if (translationX > 0) {
              console.log('Swiped Right');
            } else {
              console.log('Swiped Left');
            }
          } else if (Math.abs(translationY) > swipeThreshold) {
            if (translationY > 0) {
              console.log('Swiped Down');
            } else {
              console.log('Swiped Up');
            }
          }
    
          // Reset the position
          Animated.spring(translateX, { toValue: 0, useNativeDriver: false }).start();
          Animated.spring(translateY, { toValue: 0, useNativeDriver: false}).start();
        }
      };

    useEffect(()=>{
        Animated.parallel([
            Animated.timing(translateY,{
                toValue:0,
                useNativeDriver:false,
                easing:Easing.ease
            }),
            Animated.timing(translateX,{
                toValue:0,
                useNativeDriver:false,
                easing:Easing.ease
            }),
            Animated.timing(opacity,{
                toValue:1,
                useNativeDriver:false,
                easing:Easing.ease
            })
        ]).start()
    },[])

    const Container=props.component

    return(
        <Animated.View style={[styles.screen,{transform:[{translateY:translateY},{translateX:translateX}],opacity:opacity}]}>
            <View {...panResponder.panHandlers} style={[styles.swipeStrip,{width:"4%"}]}></View>
            <Container {...props.props}></Container>
        </Animated.View>
        // <GestureHandlerRootView>
        //     <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
                
        //     </PanGestureHandler>
        // </GestureHandlerRootView>
    )
}

const Presets={
    HorizontalSlideToLeft:{
        translateX:Dimensions.get("screen").width,
        translateY:0
    },
    HorizontalSlideToRight:{
        translateX:-Dimensions.get("screen").width,
        translateY:0
    },
    VerticalSlideToTop:{
        translateX:0,
        translateY:Dimensions.get("screen").height
    },
    VerticalSlideToBottom:{
        translateX:0,
        translateY:-Dimensions.get("screen").height
    }
}

const styles=StyleSheet.create({
    wrapper:{
        position:"relative",
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:'center'
    },
    screen:{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%"
    },
    swipeStrip:{
        height:"100%",
        position:"absolute",
        backgroundColor:'red'
    }
})

export default Stacknavigator