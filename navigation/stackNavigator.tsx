import { Animated, Dimensions, Easing, Keyboard, KeyboardEvent, LayoutRectangle, PanResponder, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { StackNavigator, StackScreen as StackScreenType } from "../types"
import { useEffect, useRef, useState } from "react"
import useNavigation from "../hooks/useNavigation"
import { getComponent, getKeyboardHeight } from "../utils"
import React from "react"
import { Fonts, Themes, components } from "../constants"
import back_icon from '../assets/images/misc/back.png'
import { Image } from "expo-image"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { resetRemoveScreen, setRemoveScreen } from "../store/slices/removeScreenSlice"
import Transitionview from "../components/resources/Transitionview"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Stacknavigator=(props:StackNavigator)=>{

    const Invalidscreen=props.invalidPathScreen
    const [keyboardInfo,setkeyboardInfo]=useState<KeyboardEvent>()

    useEffect(()=>{
      let keyboardWillShow = Keyboard.addListener(Platform.OS=="android"?'keyboardDidShow':'keyboardWillShow', (event) => {
        setkeyboardInfo(event)
      });

      let keyboardWillHide = Keyboard.addListener(Platform.OS=="android"?'keyboardDidHide':'keyboardWillHide', (event) => {
        setkeyboardInfo(event)
      });

      return () => {
        keyboardWillShow?.remove();
        keyboardWillHide?.remove();
      };

    },[])

    return(
        <View style={[styles.wrapper]}>
        {
            props.screens.filter((screen)=>screen.component==undefined).length==0
            ?
            <View style={{width:'100%',height:"100%"}}>
            {
                props.screens.map((screen:StackScreenType,i)=>
                <StackScreen keyboardInfo={keyboardInfo} key={screen.id} {...screen} index={i}/>
                )
            }
            </View>
            :
            <Invalidscreen></Invalidscreen>
        }
        </View>
    )
}

const StackScreen=React.memo((props:StackScreenType & {index:number,keyboardInfo:KeyboardEvent|undefined})=>{

  const screenInfo=useRef(components.find((component)=>component.id==props.id)).current
  const getState=(type:"initial"|"final")=>{
    //console.log("screen info",screenInfo)
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
  const translateY=useRef(new Animated.Value(initialState?(initialState.y):0)).current;
  const translateX=useRef(new Animated.Value(initialState?initialState.x:0)).current;
  const opacity=useRef(new Animated.Value(initialState?initialState.opacity:0)).current;
  const scale=useRef(new Animated.Value(initialState?initialState.scale:0)).current
  const width=useRef(new Animated.Value(initialState?initialState.width:0)).current;
  const height=useRef(new Animated.Value(initialState?initialState.height:0)).current
  const swipeThreshold = 100;
  const [screenDimensions,setScreenDimensions]=useState<LayoutRectangle>()
  const [path,navigate]=useNavigation();
  const removeScreen=useAppSelector((state)=>state.removescreen)
  const dispatch=useAppDispatch()
  // const tutorials=useAppSelector((state)=>state.tutorials);
  const insets = useSafeAreaInsets();
  const getCurrentPosition=()=>(currentState.current)
  const setCurrentPosition=(val:{x:number,y:number,opacity:number,scale:number})=>{currentState.current=val}
  const [loadScreen,setLoadScreen]=useState(screenInfo?.delay?false:true)

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
    
    if(screenInfo?.delay)
    {
      setTimeout(()=>{
        setLoadScreen(true);
      },screenInfo.delay)
    }

  },[])

  useEffect(()=>{
    if(screenInfo?.type=="Flyer" && props.keyboardInfo && finalState)
    {
      //console.log(props.id,props.keyboardInfo,finalState.y,Dimensions.get("screen").height,props.keyboardInfo.endCoordinates.screenY);
      Animated.timing(translateY, {
        duration: props.keyboardInfo.duration,
        toValue:finalState.y-getKeyboardHeight(props.keyboardInfo),
        //toValue: finalState.y-((Dimensions.get("screen").height-props.keyboardInfo.endCoordinates.screenY)/Dimensions.get("screen").height),
        //easing:props.keyboardInfo.easing,
        useNativeDriver: false,
      }).start();
    }
  },[props.keyboardInfo])

  useEffect(()=>{
    if(removeScreen.id==props.id)
    {
      back(200);
    }
  },[JSON.stringify(removeScreen)])

  //console.log("screen",initialState,finalState);

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
    ],()=>{
      dispatch(resetRemoveScreen());
      navigate?navigate({type:"RemoveSpecificScreen",payload:{id:props.id}}):null
    })
  }

  //console.log("tutorials",tutorials)

  const Container=getComponent(props.component)?.component
  console.log("insets",insets);

  return(
      <Animated.View onLayout={(e)=>setScreenDimensions(e.nativeEvent.layout)} key={props.id} style={[styles.screenWrapper,screenInfo?.type=="Flyer"?{elevation:3,shadowOffset:{width:0,height:-10},shadowOpacity:0.1,shadowRadius:5}:{},screenInfo?.shiftOriginToCenter?{top:"-50%",left:"-50%"}:null,{width:width.interpolate({inputRange:[0,1],outputRange:["0%","100%"]}),height:height.interpolate({inputRange:[0,1],outputRange:[0,Dimensions.get("screen").height-insets.bottom-insets.top]}),transform:[{translateY:translateY.interpolate({inputRange:[0,1],outputRange:[insets.top,Dimensions.get("screen").height-insets.bottom]})},{translateX:translateX.interpolate({inputRange:[0,1],outputRange:[insets.left,Dimensions.get("screen").width-insets.right]})}],opacity:opacity}]}>
        {
          props.index!=0 && (screenInfo?.swipeDirection=="X" || screenInfo?.swipeDirection=="XY") && !screenInfo.nonClosable
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
        {
          screenInfo?.type=="Flyer" || screenInfo?.type=="Popup"
          ?
          <Animated.View style={[{opacity:height.interpolate({inputRange:[0,1],outputRange:[0,1]})},{position:"absolute",backgroundColor:'rgba(0,0,0,0.075)',zIndex:-2,bottom:"90%",left:0,width:Dimensions.get("screen").width,height:Dimensions.get("screen").height}]}><Pressable onPress={()=>!screenInfo?.nonClosable?back(200):null} style={{flex:1}}></Pressable></Animated.View>
          :
          null
        }
        {
          screenInfo?.type=="Partial" && props.index!=0 && !screenInfo.nonClosable
          ?
          <Pressable hitSlop={{left:15,right:15,top:15,bottom:15}} style={[styles.back,{left:10,top:30}]} onPress={()=>{back(200)}}><Image source={back_icon} style={[styles.back_icon]}></Image></Pressable>
          :
          null
        }
        <View style={[styles.screen,screenInfo?.type=="Flyer"?{borderRadius:30,elevation:10,shadowOffset:{width:0,height:-10},shadowOpacity:0.06,shadowRadius:5}:{},!screenInfo?.isTransparent?{backgroundColor:"white"}:{}]}> 
          {/* {
            tutorials.length>0
            ?
            <View style={{width:"100%",height:"100%",position:"absolute",backgroundColor:'rgba(0,0,0,0.1)',zIndex:10}}><Tutorial id={screenInfo.tutorialId}/></View>
            :
            null
          } */}
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
            Container && loadScreen
            ?
            <Transitionview style={[{flex:1}]} effect="fade"><Container {...props.props}></Container></Transitionview>
            :
            null
          }
        </View>
      </Animated.View>
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
          height:0.5,
          width:1,
          opacity:1
        },
        end:{
          x:0,
          y:0.5,
          scale:1,
          height:0.5,
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
      position:"relative",
      zIndex:1,
    },
    back:{
      position:"absolute",
      zIndex:3,
      //paddingTop:0.04*Dimensions.get("screen").width
    },
    swipeStripL:{
      height:"100%",
      left:0,
      top:0,
      width:0.04*Dimensions.get("screen").width,
      position:"absolute",
      zIndex:2
    },
    swipeStripR:{
      height:"100%",
      right:0,
      top:0,
      width:0.04*Dimensions.get("screen").width,
      position:"absolute",
      // backgroundColor:'black',
      zIndex:2
    },
    swipeStripT:{
      height:0.04*Dimensions.get("screen").width,
      left:0,
      top:0,
      width:"100%",
      position:"absolute",
      // backgroundColor:'black',
      zIndex:2
    },
    swipeStripB:{
      height:0.04*Dimensions.get("screen").width,
      left:0,
      bottom:0,
      width:"100%",
      position:"absolute",
      // backgroundColor:'black',
      zIndex:2
    },
    back_icon:{
      width:10,
      height:10,
      objectFit:'contain'
    }
})

export default Stacknavigator