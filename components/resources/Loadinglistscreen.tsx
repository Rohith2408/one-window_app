import { useRef, useState } from "react"
import { LayoutRectangle, ScrollView, Text, View, ViewStyle } from "react-native"
import Loadingview from "./Loadingview"

// const Loadinglistscreen=(props:{wrapperStyles?:ViewStyle,cardStyles:ViewStyle,direction:"vertical"|"horizontal",count:number,cardGap:number})=>{

//     return(
//         <ScrollView horizontal={props.direction=="horizontal"?true:false} style={[props.wrapperStyles,{backgroundColor:'red'}]} contentContainerStyle={{gap:props.cardGap}}>
//         {
//             new Array(props.count).fill(" ").map((item)=>
//             <View style={[props.cardStyles]}><Loadingview isLoading/></View>
//             )
//         }
//         </ScrollView>
//     )

// }


const Loadinglistscreen=(props:{wrapperStyles?:ViewStyle,direction:"vertical"|"horizontal",count:number,visibilityCount:number,cardGap:number})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const visibilityFraction=useRef(0.5).current

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,alignSelf:"stretch"}}>
        {
            dimensions
            ?
            <ScrollView horizontal={props.direction=="horizontal"?true:false} style={[{flex:1}]} contentContainerStyle={{gap:props.cardGap}}>
            {
                new Array(props.count).fill(" ").map((item)=>
                <View style={[props.direction=="horizontal"?{height:dimensions.height,width:(dimensions.width-((props.visibilityCount-1)*props.cardGap))/(props.visibilityCount+(props.visibilityCount==props.count?0:visibilityFraction))}:{height:(dimensions.height-((props.visibilityCount-1)*props.cardGap))/(props.visibilityCount+(props.visibilityCount==props.count?0:visibilityFraction)),width:dimensions.width}]}>
                    <Loadingview isLoading/>
                </View>
                )
            }
            </ScrollView>
            :
            null
        }
        </View>
    )

}

export default Loadinglistscreen