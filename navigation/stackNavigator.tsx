import { Animated, Dimensions, Easing, PanResponder, Pressable, StyleSheet, Text, View } from "react-native"
import { StackNavigator, StackScreen as StackScreenType } from "../types"
import { useEffect, useRef } from "react"
import { GestureHandlerRootView, HandlerStateChangeEvent, PanGestureChangeEventPayload, PanGestureHandler, PanGestureHandlerEventPayload } from "react-native-gesture-handler"
import useNavigation from "../hooks/useNavigation"

const Stacknavigator=(props:StackNavigator)=>{

    const Invalidscreen=props.invalidPathScreen
    console.log("stack",props)

    return(
        <View style={[styles.wrapper]}>
        {
            props.screens.filter((screen)=>screen.component==undefined).length==0
            ?
            <View style={{width:'100%',height:"100%"}}>
            {
                props.screens.map((screen:StackScreenType,i)=>
                <StackScreen key={screen.id} {...screen} swipable={i==0?false:true}/>
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
    const Navigation=useNavigation();

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
            if((state.dx+initialPos)>Dimensions.get("screen").width/4)
            {
                Animated.spring(translateX,{
                    toValue:Dimensions.get("screen").width,
                    useNativeDriver:false
                }).start(back)
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
        animate(0,0,1)
    },[])

    const animate=(x:number,y:number,opacityVal:number,callBack?:any)=>{
      Animated.parallel([
        Animated.timing(translateY,{
            toValue:y,
            useNativeDriver:false,
            duration:300,
            easing:Easing.ease
        }),
        Animated.timing(translateX,{
            toValue:x,
            duration:300,
            useNativeDriver:false,
            easing:Easing.ease,
            
        }),
        Animated.timing(opacity,{
            toValue:opacityVal,
            useNativeDriver:false,
            duration:300,
            easing:Easing.ease
        })
    ]).start(callBack)
    }

    const back=()=>{
      animate(Dimensions.get("screen").width,0,1,()=>{Navigation?.navigate({type:"remove",payload:null})})
    }

    const Container=props.component

    return(
        <Animated.View style={[styles.screenWrapper,{transform:[{translateY:translateY},{translateX:translateX}],opacity:opacity}]}>
          {
            props.swipable
            ?
            <View {...panResponder.panHandlers} style={[styles.swipeStrip,{width:"4%"}]}></View>
            :
            null
          }
          <Pressable onPress={back}><Text>Back</Text></Pressable>
          <View style={[styles.screen]}><Container {...props.props}></Container></View>
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
    screenWrapper:{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
    },
    screen:{
      marginLeft:"4%",
      width:"96%",
      height:"100%"
    },
    swipeStrip:{
        height:"100%",
        position:"absolute",
        backgroundColor:'white',
        zIndex:1
    }
})

export default Stacknavigator