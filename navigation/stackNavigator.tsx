import { Animated, Dimensions, Easing, PanResponder, Pressable, StyleSheet, Text, View } from "react-native"
import { StackNavigator, StackScreen as StackScreenType } from "../types"
import { useEffect, useRef } from "react"
import useNavigation from "../hooks/useNavigation"
import { getComponent } from "../utils"
import React from "react"
import { components } from "../constants"

const Stacknavigator=(props:StackNavigator)=>{

    const Invalidscreen=props.invalidPathScreen

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

  const screenInfo=useRef(components.find((component)=>component.id==props.id)).current
  const getState=(type:"initial"|"final")=>{
    if(screenInfo?.animationStyle=="Custom")
    {
      if(screenInfo.customPlacement)
      {
        return {x:screenInfo.customPlacement[type].x,y:screenInfo.customPlacement[type].y,scale:screenInfo.customPlacement[type].scale,opacity:screenInfo.customPlacement[type].opacity,height:screenInfo.customPlacement[type].height,width:screenInfo.customPlacement[type].width}
      }
    }
    else
    {
      if(screenInfo?.animationStyle)
      {
        let presetData=type=="initial"?Presets[screenInfo?.animationStyle].start:Presets[screenInfo?.animationStyle].end
        return presetData
      }
    }
  }
  let initialState=useRef(getState("initial")).current
  let finalState=useRef(getState("final")).current
  const currentState=useRef(finalState);
  const translateY=useRef(new Animated.Value(initialState?initialState.y:0)).current;
  const translateX=useRef(new Animated.Value(initialState?initialState.x:0)).current;
  const opacity=useRef(new Animated.Value(initialState?initialState.opacity:0)).current;
  const scale=useRef(new Animated.Value(initialState?initialState.scale:0)).current
  const width=useRef(new Animated.Value(initialState?initialState.opacity:0)).current;
  const height=useRef(new Animated.Value(initialState?initialState.scale:0)).current
  const swipeThreshold = 100;
  const Navigation=useNavigation();
  console.log(screenInfo,getState("initial"),getState("final"));

  const getCurrentPosition=()=>(currentState.current)
  const setCurrentPosition=(val:{x:number,y:number,opacity:number,scale:number})=>{currentState.current=val}

  const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {},
        onPanResponderMove: (e,state)=>{
          console.log("aaaa",getCurrentPosition().x+(state.dx/Dimensions.get("screen").width))
          if(screenInfo?.swipeDirection=="X")
          {
            animate([{property:translateX,value:getCurrentPosition().x+(state.dx/Dimensions.get("screen").width),duration:10}])
          }
          if(screenInfo?.swipeDirection=="Y")
          {
            animate([{property:translateY,value:getCurrentPosition().y+(state.dy/Dimensions.get("screen").height),duration:10}])
          }
          if(screenInfo?.swipeDirection=="XY")
          {
            animate([{property:translateX,value:getCurrentPosition().x+(state.dx/Dimensions.get("screen").width),duration:10},{property:translateY,value:getCurrentPosition().y+(state.dy/Dimensions.get("screen").height),duration:10}])
          }
        },
        onPanResponderRelease: (e,state) => {
          let initialState=getCurrentPosition()
          let exceededThreshold=false;
          let removeThreshold=screenInfo?.removalThreshold?screenInfo.removalThreshold:0.5
          let swipeLengthX=state.dx/Dimensions.get("screen").width;
          let swipeLengthY=state.dy/Dimensions.get("screen").height
          console.log("vx",state.vx)
          if(screenInfo?.swipeDirection=="X")
          {
            if((swipeLengthX+initialState.x)>removeThreshold)
            {
              back(200-(state.vx/2)*50);
              //animate([{property:translateX,value:initialState?initialState.x:0,style:"spring",duration:100}],back)
              setCurrentPosition(initialState)
            }
            else
            {
              animate([{property:translateX,value:finalState?finalState.x:0,style:"spring",duration:100}])
              setCurrentPosition(finalState)
            }
          }
          if(screenInfo?.swipeDirection=="Y")
          {
            if((swipeLengthY+initialState.y)>removeThreshold)
            {
              back(200-(state.vy/2)*50)
              //animate([{property:translateY,value:initialState?initialState.y:0,style:"spring",duration:100}],back)
              setCurrentPosition(initialState)
            }
            else
            {
              animate([{property:translateY,value:finalState?finalState.y:0,style:"spring",duration:100}])
              setCurrentPosition(finalState)
            }
          }
          if(screenInfo?.swipeDirection=="XY")
          {
            if((swipeLengthX+initialState.x)>removeThreshold || (swipeLengthY+initialState.y)>removeThreshold)
            {
              back(200-(Math.max(state.vx,state.vy)/2)*50)
              // animate([{property:translateX,value:initialState?initialState.x:0,style:"spring",duration:100},{property:translateY,value:initialState?initialState.y:0,style:"spring",duration:100}],back)
              setCurrentPosition(initialState)
            }
            else
            {
              animate([{property:translateX,value:finalState?finalState.x:0,style:"spring",duration:50},{property:translateY,value:finalState?finalState.y:0,style:"spring",duration:50}])
              setCurrentPosition(finalState)
            }
          }
        },
      })
    ).current;

  useEffect(()=>{
    console.log(finalState)
    animate([
      {property:translateX,value:finalState?finalState.x:0,duration:300},
      {property:translateY,value:finalState?finalState.y:0,duration:300},
      {property:scale,value:finalState?finalState.scale:0,duration:300},
      {property:opacity,value:finalState?finalState.opacity:0,duration:300},
      {property:width,value:finalState?finalState.width:0,duration:300,native:false},
      {property:height,value:finalState?finalState.height:0,duration:300,native:false},
    ])
  },[])

  const animate=(animData:{property:Animated.Value,style?:"timing"|"spring",value:number,duration:number,native?:boolean}[],callBack?:any)=>{
    console.log("anim",animData);
    let animations=animData.map((data)=>Animated[data.style?data.style:"timing"](data.property,{toValue:data.value,duration:data.duration,easing:Easing.ease,useNativeDriver:false}));
    Animated.parallel(animations).start(callBack)
  }

  const back=(duration:number)=>{
    animate([
      {property:translateX,value:initialState?initialState.x:0,duration:duration},
      {property:translateY,value:initialState?initialState.y:0,duration:duration},
      {property:scale,value:initialState?initialState.scale:0,duration:duration},
      {property:opacity,value:initialState?initialState.opacity:0,duration:duration},
      {property:width,value:initialState?initialState.width:0,native:false,duration:duration},
      {property:height,value:initialState?initialState.height:0,native:false,duration:duration},
    ],()=>{Navigation?.navigate({type:"RemoveScreen"})})
  }

  const Container=getComponent(props.component)?.component

  return(
      <Animated.View key={props.id} style={[styles.screenWrapper,{width:width.interpolate({inputRange:[0,1],outputRange:["0%","100%"]}),height:height.interpolate({inputRange:[0,1],outputRange:["0%","100%"]}),transform:[{translateY:translateY.interpolate({inputRange:[0,1],outputRange:[0,Dimensions.get("screen").height]})},{translateX:translateX.interpolate({inputRange:[0,1],outputRange:[0,Dimensions.get("screen").width]})}],opacity:opacity}]}>
        {
          props.swipable && screenInfo?.swipeDirection=="X" || screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripL]}></View>
          :
          null
        }
        {
          props.swipable && screenInfo?.swipeDirection=="Y" || screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripT]}></View>
          :
          null
        } 
        {
          props.swipable && screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripR]}></View>
          :
          null
        }
        {
          props.swipable && screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripB]}></View>
          :
          null
        }
        <View style={[styles.screen]}>
          {
            screenInfo?.type=="Partial"
            ?
            <Pressable style={[styles.back]} onPress={()=>{back(200)}}><Text>Back</Text></Pressable>
            :
            null
          }
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
          x:1,
          y:0,
          scale:1,
          height:1,
          width:1,
          opacity:0
        },
        end:{
          x:0,
          y:0,
          scale:1,
          height:1,
          width:1,
          opacity:1
        }
    },
    HorizontalSlideToRight:{
        start:{
          x:-1,
          y:0,
          scale:1,
          height:1,
          width:1,
          opacity:0
        },
        end:{
          x:0,
          y:0,
          scale:1,
          height:1,
          width:1,
          opacity:1
        }
    },
    VerticalSlideToTopPartial:{ 
        start:{
          x:0,
          y:1,
          scale:1,
          height:1,
          width:1,
          opacity:1
        },
        end:{
          x:0,
          y:2/3,
          scale:1,
          height:1,
          width:1,
          opacity:1
        }
    },
    VerticalSlideToTop:{
        start:{
          x:0,
          y:1,
          scale:1,
          height:1,
          width:1,
          opacity:1
        },
        end:{
          x:0,
          y:1,
          scale:1,
          height:1,
          width:1,
          opacity:1
        }
    },
    // VerticalSlideToBottom:{

    //     x:0,
    //     y:-Dimensions.get("screen").height,
    //     scale:1
    // }
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
      paddingLeft:0.04*Dimensions.get("screen").width,
      paddingRight:0.04*Dimensions.get("screen").width,
      paddingTop:0.04*Dimensions.get("screen").width
    },
    back:{
      // paddingTop:0.04*Dimensions.get("screen").width
    },
    swipeStripL:{
      height:"100%",
      left:0,
      top:0,
      width:0.04*Dimensions.get("screen").width,
      position:"absolute",
      backgroundColor:'black',
      zIndex:1
    },
    swipeStripR:{
      height:"100%",
      right:0,
      top:0,
      width:0.04*Dimensions.get("screen").width,
      position:"absolute",
      backgroundColor:'black',
      zIndex:1
    },
    swipeStripT:{
      height:0.04*Dimensions.get("screen").width,
      left:0,
      top:0,
      width:"100%",
      position:"absolute",
      backgroundColor:'black',
      zIndex:1
    },
    swipeStripB:{
      height:0.04*Dimensions.get("screen").width,
      left:0,
      bottom:0,
      width:"100%",
      position:"absolute",
      backgroundColor:'black',
      zIndex:1
    }
})

export default Stacknavigator