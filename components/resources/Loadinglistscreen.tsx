import { useState } from "react"
import { LayoutRectangle, ScrollView, Text, View, ViewStyle } from "react-native"
import Loadingview from "./Loadingview"

const Loadinglistscreen=(props:{cardStyles:ViewStyle,direction:"vertical"|"horizontal",count:number,cardGap:number})=>{

    const [dimensions,setDimesnions]=useState<LayoutRectangle>()
    console.log("card",props.cardStyles,dimensions)

    return(
        <View style={{display:'flex'}} onLayout={(e)=>setDimesnions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <ScrollView horizontal={props.direction=="horizontal"?true:false} style={{display:'flex'}} contentContainerStyle={{gap:props.cardGap}}>
            {
                new Array(props.count).fill(" ").map((item)=>
                <View style={[props.cardStyles]}><Loadingview isLoading style={[props.cardStyles]}><Text></Text></Loadingview></View>
                )
            }
                {/* <View style={[props.cardStyles]}><Loadingview isLoading style={[{width:dimensions.width,height:props.cardHeight}]}><Text></Text></Loadingview></View>
                <View style={[props.cardStyles]}><Loadingview isLoading style={[{width:dimensions.width,height:props.cardHeight}]}><Text></Text></Loadingview></View> */}
            </ScrollView>
            :
            null
        }
        </View>
    )

}

export default Loadinglistscreen