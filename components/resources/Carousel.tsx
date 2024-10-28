import React, { useRef, useState } from "react"
import { LayoutRectangle, ScrollView, View } from "react-native"

const Carousel=(props:{card:React.FC,data:any[],preventAutoScroll?:boolean})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const ref=useRef()
    const currentCard=useRef(0)
    const Card=props.card;



    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} >
        {
            dimensions
            ?
            <ScrollView decelerationRate="fast" snapToInterval={dimensions.width*0.95} snapToAlignment="start" pagingEnabled horizontal>
            {
                props.data.map((item,i)=>
                <View key={i} style={{width:dimensions.width*0.95}}><Card index={i} {...item}/></View>
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