import { useEffect, useRef, useState } from "react"
import { Dropdown as DropdownType} from "../../types"
import { Animated, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

const Dropdown=(props:DropdownType)=>{

    const [showOptions,setShowOptions]=useState(false);
    const [selectDimensions,setSelectDimensions]=useState<undefined|LayoutRectangle>(undefined);
    const scaleY=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        !props.isFocussed?setShowOptions(false):null
    },[props.isFocussed])

    useEffect(()=>{
        Animated.timing(scaleY,{
            toValue:showOptions?1:0,
            duration:200,
            useNativeDriver:false
        }).start()
    },[showOptions])

    const toggle=()=>{
        setShowOptions(showOptions?false:true);
        props.eventHandler({name:"onToggle",triggerBy:"dropdown"})
    }

    const selection=(option:{label:string,value:string})=>{
        props.eventHandler({name:"onSelect",data:option,triggerBy:"dropdown"})
        setShowOptions(false);
    }

    return(
        <View style={[styles.mainWrapper]}>
            <Pressable onPress={toggle} onLayout={(e)=>setSelectDimensions(e.nativeEvent.layout)}><Text>{props.value?props.value.label:"Select"}</Text></Pressable>
            {
                selectDimensions
                ?
                <Animated.View style={[styles.optionsWrapper,{height:Animated.multiply(100,scaleY),transform:[{translateY:selectDimensions.height}]}]}>
                    <ScrollView style={{flex:1}}>
                    {
                        props.options.map((option)=>
                        <Pressable onPress={()=>selection(option)} key={option.label}><Text>{option.label}</Text></Pressable>
                        )
                    }
                    </ScrollView>
                </Animated.View>
                :
                null
            }
        </View>
    )

}

const styles=StyleSheet.create({
    mainWrapper:{
        flex:1,
        position:"relative",
        backgroundColor:"green"
    },
    optionsWrapper:{
        position:"absolute",
        height:100,
        width:"100%",
        backgroundColor:'white',
        top:0
    }
})

export default Dropdown