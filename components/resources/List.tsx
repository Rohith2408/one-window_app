import React, { useState } from "react"
import { LayoutRectangle, ScrollView, StyleSheet, View } from "react-native"
import { List as ListType} from "../../types"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    }
})

const List=(props:ListType<any>)=>{

    const getDimension=()=>{
        let dim={width:0,height:0}
        if(props.mode=="Scroll")
        {
            if(props.cardDimensions)
            {
                dim=props.cardDimensions
            }
            else
            {
                dim.width=dimensions?dimensions.width*0.8:0;
                dim.height=dimensions?dimensions.height:0;
            }
        }
        if(props.mode=="Swipe")
        {
            dim.width=dimensions?props.direction=="Horizontal"?dimensions.width*0.8:dimensions.width:0;
            dim.height=dimensions?props.direction=="Horizontal"?dimensions.height:dimensions.height*0.8:0;
        }
        return dim
    }
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Component:React.FC<any>=props.card
    let cardDimensions=getDimension()

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={[GeneralStyles.main_wrapper]}>
            <ScrollView style={{flex:1}} pagingEnabled={props.mode=="Swipe"} horizontal={props.direction=="Horizontal"} contentContainerStyle={{gap:30}}>
            {
                props.list.map((item,i)=>
                <View key={item.id?item.id:i} style={[{width:cardDimensions.width,height:cardDimensions.height}]}><Component {...item} index={i}/></View>
                )
            }
            </ScrollView>
        </View>
    )

}

export default List