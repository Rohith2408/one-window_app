import { Animated, Dimensions, Easing, PanResponder, Pressable, StyleSheet, Text, View } from "react-native"
import { StackNavigator, StackScreen as StackScreenType } from "../types"
import { useEffect, useRef } from "react"
import { GestureHandlerRootView, HandlerStateChangeEvent, PanGestureChangeEventPayload, PanGestureHandler, PanGestureHandlerEventPayload } from "react-native-gesture-handler"
import useNavigation from "../hooks/useNavigation"
import { getComponent } from "../utils"
import React from "react"

const Stacknavigator=(props:StackNavigator)=>{

    const Invalidscreen=props.invalidPathScreen
    console.log("stack keys",props.screens.map((item)=>item.id))

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

const StackScreen=React.memo((props:StackScreenType)=>{

  const translateY=useRef(new Animated.Value(props.animationStyle!="Custom"?Presets[props.animationStyle?props.animationStyle:"HorizontalSlideToLeft"].start.translateY:(props.initialPosition?.top?props.initialPosition.top:0))).current;
  const translateX=useRef(new Animated.Value(props.animationStyle!="Custom"?Presets[props.animationStyle?props.animationStyle:"HorizontalSlideToLeft"].start.translateX:(props.initialPosition?.left?props.initialPosition.left:0))).current;
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

  useEffect(()=>{
      animate(Presets[props.animationStyle?props.animationStyle:"HorizontalSlideToLeft"].end.translateX,Presets[props.animationStyle?props.animationStyle:"HorizontalSlideToLeft"].end.translateY,1)
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

  const Container=getComponent(props.component)?.component

  return(
      <Animated.View key={props.id} style={[styles.screenWrapper,{transform:[{translateY:translateY},{translateX:translateX}],opacity:opacity}]}>
        {
          props.swipable
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStrip,{width:"4%"}]}></View>
          :
          null
        }
        <Pressable style={{paddingLeft:"4%",paddingRight:"4%"}} onPress={back}><Text>Back</Text></Pressable>
        <View style={[styles.screen]}>
        {
          Container
          ?
          <Container {...props.props}></Container>
          :
          null
        }
        </View>
      </Animated.View>
      // <GestureHandlerRootView>
      //     <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
              
      //     </PanGestureHandler>
      // </GestureHandlerRootView>
  )
})

const Presets={
    HorizontalSlideToLeft:{
        start:{
          translateX:Dimensions.get("screen").width,
          translateY:0
        },
        end:{
          translateX:0,
          translateY:0
        }
    },
    HorizontalSlideToRight:{
        start:{
          translateX:-Dimensions.get("screen").width,
          translateY:0
        },
        end:{
          translateX:0,
          translateY:0
        }
    },
    VerticalSlideToTopPartial:{ 
        start:{
          translateX:0,
          translateY:Dimensions.get("screen").height
        },
        end:{
          translateX:0,
          translateY:Dimensions.get("screen").height/2
        }
    },
    VerticalSlideToTop:{
        start:{
          translateX:0,
          translateY:Dimensions.get("screen").height
        },
        end:{
          translateX:0,
          translateY:Dimensions.get("screen").height
        }
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
      width:"100%",
      height:"100%",
      paddingLeft:"4%",
      paddingRight:"4%"
    },
    swipeStrip:{
        height:"100%",
        position:"absolute",
        //  backgroundColor:'black',
        zIndex:1
    }
})

export default Stacknavigator