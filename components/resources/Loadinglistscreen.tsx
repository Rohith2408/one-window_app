import { useState } from "react"
import { LayoutRectangle, Text, View } from "react-native"
import Loadingview from "./Loadingview"

const Loadinglistscreen=(props:{cardHeight:number,cardGap:number})=>{

    const [dimensions,setDimesnions]=useState<LayoutRectangle>()

    return(
        <View style={{flex:1,display:'flex'}} onLayout={(e)=>setDimesnions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <View style={{display:'flex',flex:1,gap:props.cardGap,flexDirection:'column'}}>
                <View style={{width:"100%",height:props.cardHeight}}><Loadingview isLoading style={[{width:dimensions.width,height:props.cardHeight}]}><Text></Text></Loadingview></View>
                <View style={{width:"100%",height:props.cardHeight}}><Loadingview isLoading style={[{width:dimensions.width,height:props.cardHeight}]}><Text></Text></Loadingview></View>
                <View style={{width:"100%",height:props.cardHeight}}><Loadingview isLoading style={[{width:dimensions.width,height:props.cardHeight}]}><Text></Text></Loadingview></View>
            </View>
            :
            null
        }
        </View>
    )

}

export default Loadinglistscreen