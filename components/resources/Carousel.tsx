import React, { useRef, useState } from "react"
import { LayoutRectangle, ScrollView, StyleSheet, View } from "react-native"
import { getDevice } from "../../utils"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    card_wrapper:{
        height:170
    }
})

const MobileSStyles=StyleSheet.create({
    card_wrapper:{
        height:130
    }
})

const MobileMStyles=StyleSheet.create({
    card_wrapper:{
        height:150
    }
})

const MobileLStyles=StyleSheet.create({
    card_wrapper:{
        height:150
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Carousel=(props:{card:React.FC,data:any[],preventAutoScroll?:boolean})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const ref=useRef()
    const currentCard=useRef(0)
    const Card=props.card;
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const gap=useRef(10).current


    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <ScrollView contentContainerStyle={{gap:gap}} decelerationRate="fast" snapToInterval={(dimensions.width*0.95)+gap} snapToAlignment="start" pagingEnabled horizontal>
            {
                props.data.map((item,i)=>
                <View key={i} style={[{width:dimensions.width*(Device=="Tab"?0.6:0.95)}]}>
                    <Card index={i} {...item}/>
                </View>
                // <View key={i} style={[{width:dimensions.width*(Device=="Tab"?0.6:0.95),backgroundColor:"#E8E9FF"}]}>
                //     <Card index={i} {...item}/>
                // </View>
                )
            }
            </ScrollView>
            :
            null
        }
        </View>
    )
}

export default Carousel