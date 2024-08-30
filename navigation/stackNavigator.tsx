import { Animated, Dimensions, Easing, PanResponder, Pressable, StyleSheet, Text, View } from "react-native"
import { StackNavigator, StackScreen as StackScreenType } from "../types"
import { useEffect, useRef } from "react"
import useNavigation from "../hooks/useNavigation"
import { getComponent } from "../utils"
import React from "react"
import { Fonts, Themes, components } from "../constants"
import back_icon from '../assets/images/misc/back.png'
import { Image } from "expo-image"

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
                <StackScreen key={screen.id} {...screen} index={i}/>
                )
            }
            </View>
            :
            <Invalidscreen></Invalidscreen>
        }
        </View>
    )
}

const StackScreen=React.memo((props:StackScreenType & {index:number})=>{

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
        //console.log('QQQ',screenInfo.id,screenInfo?.animationStyle,Presets[screenInfo?.animationStyle])
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
  const width=useRef(new Animated.Value(initialState?initialState.width:0)).current;
  const height=useRef(new Animated.Value(initialState?initialState.height:0)).current
  const swipeThreshold = 100;
  const [path,navigate]=useNavigation();

  const getCurrentPosition=()=>(currentState.current)
  const setCurrentPosition=(val:{x:number,y:number,opacity:number,scale:number})=>{currentState.current=val}

  const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {},
        onPanResponderMove: (e,state)=>{
          //console.log("aaaa",getCurrentPosition().x+(state.dx/Dimensions.get("screen").width))
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
          //console.log("v",state.vx,state.vy)
          if(screenInfo?.swipeDirection=="X")
          {
            if((swipeLengthX+initialState.x)>removeThreshold || state.vx>2)
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
            if((swipeLengthY+initialState.y)>removeThreshold || state.vy>1.5)
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
    animate([
      {property:translateX,value:finalState?finalState.x:0,duration:200},
      {property:translateY,value:finalState?finalState.y:0,duration:200},
      {property:scale,value:finalState?finalState.scale:0,duration:200},
      {property:opacity,value:finalState?finalState.opacity:0,duration:200},
      {property:width,value:finalState?finalState.width:0,duration:200},
      {property:height,value:finalState?finalState.height:0,duration:200},
    ])
  },[])

  const animate=(animData:{property:Animated.Value,style?:"timing"|"spring",value:number,duration:number,native?:boolean}[],callBack?:any)=>{
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
    ],()=>{navigate?navigate({type:"RemoveScreen"}):null})
  }

  const Container=getComponent(props.component)?.component

  //console.log(screenInfo)

  return(
      <Animated.View key={props.id} style={[styles.screenWrapper,!screenInfo?.occupyFullScreen?{paddingLeft:0.06*Dimensions.get("screen").width,paddingRight:0.06*Dimensions.get("screen").width,}:{},screenInfo?.shiftOriginToCenter?{top:"-50%",left:"-50%"}:null,screenInfo?.type=="Flyer"?{borderRadius:20,shadowOffset:{width:0,height:-10},shadowOpacity:0.06,shadowRadius:5}:{},!screenInfo?.isTransparent?{backgroundColor:"white"}:{},{width:width.interpolate({inputRange:[0,1],outputRange:["0%","100%"]}),height:height.interpolate({inputRange:[0,1],outputRange:["0%","100%"]}),transform:[{translateY:translateY.interpolate({inputRange:[0,1],outputRange:[0,Dimensions.get("screen").height]})},{translateX:translateX.interpolate({inputRange:[0,1],outputRange:[0,Dimensions.get("screen").width]})}],opacity:opacity}]}>
        {
          props.index!=0 && screenInfo?.swipeDirection=="X" || screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripL]}></View>
          :
          null
        }
        {
          props.index!=0 && screenInfo?.swipeDirection=="Y" || screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripT]}></View>
          :
          null
        } 
        {
          props.index!=0 && screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripR]}></View>
          :
          null
        }
        {
          props.index!=0 && screenInfo?.swipeDirection=="XY"
          ?
          <View {...panResponder.panHandlers} style={[styles.swipeStripB]}></View>
          :
          null
        }
        <View style={[styles.screen,screenInfo?.type=="Flyer"?{shadowOffset:{width:0,height:-10},shadowOpacity:0.1,shadowRadius:5}:{}]}> 
          {
            screenInfo?.title
            ?
            <View style={[{flexDirection:"row",justifyContent:'center',alignItems:'center',position:"relative"},(screenInfo?.type=="Partial")?{paddingBottom:20,paddingTop:30}:{}]}>
              <Text style={[{fontSize:13,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{screenInfo.title}</Text>
            </View>
            :
            null
          }
          {
            screenInfo?.type=="Partial" && props.index!=0
            ?
            <Pressable style={[styles.back,screenInfo.occupyFullScreen?{left:20,top:30}:{left:-10,top:30}]} onPress={()=>{back(200)}}><Image source={back_icon} style={[styles.back_icon]}></Image></Pressable>
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
          {/* <View style={{position:"absolute"}}>
            <Image source={}></Image>
          </View> */}
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
          y:1/2,
          scale:1,
          height:1/2,
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
    CenterPopIn:{
      start:{
        x:0.5,
        y:1,
        scale:0,
        height:1,
        width:1,
        opacity:1
      },
      end:{
        x:0.5,
        y:0.5,
        scale:1,
        height:1,
        width:1,
        opacity:1
      },
    },
    CenterFadeIn:{
      start:{
        x:0.5,
        y:0.5,
        scale:1,
        height:1,
        width:1,
        opacity:0
      },
      end:{
        x:0.5,
        y:0.5,
        scale:1,
        height:1,
        width:1,
        opacity:1
      }
    },
    FadeIn:{
      start:{
        x:0,
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
    }
}

const styles=StyleSheet.create({
    wrapper:{
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
      position:"relative"
    },
    back:{
      position:"absolute"
      //paddingTop:0.04*Dimensions.get("screen").width
    },
    swipeStripL:{
      height:"100%",
      left:0,
      top:0,
      width:0.04*Dimensions.get("screen").width,
      position:"absolute",
      //backgroundColor:'black',
      zIndex:1
    },
    swipeStripR:{
      height:"100%",
      right:0,
      top:0,
      width:0.04*Dimensions.get("screen").width,
      position:"absolute",
      // backgroundColor:'black',
      zIndex:1
    },
    swipeStripT:{
      height:0.04*Dimensions.get("screen").width,
      left:0,
      top:0,
      width:"100%",
      position:"absolute",
      // backgroundColor:'black',
      zIndex:1
    },
    swipeStripB:{
      height:0.04*Dimensions.get("screen").width,
      left:0,
      bottom:0,
      width:"100%",
      position:"absolute",
      // backgroundColor:'black',
      zIndex:1
    },
    back_icon:{
      width:10,
      height:10,
      objectFit:'contain'
    }
})

export default Stacknavigator