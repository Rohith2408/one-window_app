import React, { useEffect, useRef, useState } from "react"
import { Animated, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from "react-native"
import { getDevice } from "../../utils"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    
})

const MobileMStyles=StyleSheet.create({
    
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Carousel2=(props:{children:React.ReactNode,cardsCount:number,preventAutoScroll?:boolean,autoScrollInterval?:number})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:undefined,height:0})
    const ref=useRef()
    const currentCard=useRef(0)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const scrollRef=useRef<any>()
    const autoScrollDefined=useRef(false)
    let swiperWatch=useRef<any>();
    const offset=useRef(new Animated.Value(0)).current

    const getCurrentCard=()=>currentCard.current;
    const setCurrentCard=(index:number)=>currentCard.current=index;

    useEffect(()=>{
        if(!autoScrollDefined.current && !props.preventAutoScroll && scrollRef.current && dimensions.width)
        {
            autoScrollDefined.current=true;
            swiperWatch.current=setInterval(()=>{
                console.log(getCurrentCard(),dimensions);
                setCurrentCard((getCurrentCard()>=props.cardsCount)?0:(getCurrentCard()+1));
                scrollRef.current.scrollTo({x:getCurrentCard()*dimensions.width,animated:true})
            },props.autoScrollInterval?props.autoScrollInterval:2000)
        }
    },[dimensions.width])

    const onscroll=(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        Animated.spring(offset,{
            toValue:e.nativeEvent.contentOffset.x/e.nativeEvent.contentSize.width,
            useNativeDriver:false
        }).start()
    }

    useEffect(()=>{
        return ()=>clearInterval(swiperWatch.current);
    },[])

    return(
        <View style={{width:"100%",gap:20}} onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
            <ScrollView scrollEnabled={false} scrollEventThrottle={50} onScroll={onscroll} style={{width:"100%"}} ref={scrollRef} decelerationRate="fast" snapToInterval={dimensions.width?dimensions.width*0.95:0} snapToAlignment="start" pagingEnabled horizontal>
            {
                React.Children.map(props.children,(child)=>
                <View style={{width:dimensions.width}}>{child}</View>
                )
            }
            </ScrollView>
            {/* <View style={{alignSelf:"center",flexDirection:'row',alignItems:'center',position:"relative",width:props.cardsCount*30}}>
                <Animated.View style={{zIndex:1,position:"absolute",width:7,height:7,borderRadius:100,alignSelf:"center",backgroundColor:"black",left:offset.interpolate({inputRange:[0,1],outputRange:[15,(props.cardsCount*30)+15]}),transform:[{translateX:"-50%"}]}}/>
                {
                    React.Children.map(props.children,(child)=>
                    <View style={{display:"flex",alignItems:"center",justifyContent:'center',width:30,height:30,borderRadius:100,alignSelf:"center"}}>
                        <View style={{width:7,height:7,borderRadius:100,alignSelf:"center",backgroundColor:"#E9E9E9"}}/>
                    </View>
                    )
                }
            </View> */}
        </View>
    )
}

export default Carousel2