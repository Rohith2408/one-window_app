import { Image } from "expo-image"
import React, { useEffect, useRef, useState } from "react"
import { Animated, LayoutRectangle, Pressable, ScrollView, Text, View } from "react-native"
import tick_icon from '../../assets/images/misc/tick.png'
import { Fonts, Themes } from "../../constants"


const Listselection=(props:{direction:"horizontal"|"vertical",selectionStyle:"border"|"tick",initialSelection?:any[],styles?:{contentcontainer:any},onselection:(data:any)=>void,options:{list:any[],card?:React.FC<any>,idExtractor:(data:any)=>any,labelExtractor?:(data:any)=>any,selectionMode:"single"|"multi"}})=>{

    const [selected,setSelected]=useState(props.initialSelection?props.initialSelection:[])

    const selection=(data:any)=>{
        let updated=[]
        if(selected.find((item)=>props.options.idExtractor(item)==props.options.idExtractor(data))){
            updated=(selected.filter((item)=>props.options.idExtractor(item)!=props.options.idExtractor(data)))
        }
        else
        {
            updated=(props.options.selectionMode=="single"?[data]:[...selected,data])
        }
        setSelected(updated);
        props.onselection?props.onselection(updated):null
    }

    return(
        <View>

            <ScrollView horizontal={props.direction=="horizontal"?true:false} contentContainerStyle={[props.styles?.contentcontainer?props.styles.contentcontainer:{}]}>
            {
                props.options.list.map((item,i)=>
                <Pressable onPress={()=>selection(item)}><Listitem data={{selected:selected,selectionStyle:props.selectionStyle,index:i,card:props.options.card,idExtractor:props.options.idExtractor,labelExtractor:props.options.labelExtractor,item:item}}/></Pressable>
                )
            }
            </ScrollView>
        </View>
    )

}

const Listitem=(props:{data:{selected:any[],selectionStyle:"border"|"tick",index:number,card?:any,idExtractor:any,labelExtractor:any,item:any}})=>{

    const scale=useRef(new Animated.Value(1)).current;
    const Card=props.data.card
    const [dimensions,setDimensions]=useState<LayoutRectangle>()

    useEffect(()=>{
        Animated.spring(scale,{
            toValue:props.data.selected.find((item)=>props.data.idExtractor(item)==props.data.idExtractor(props.data.item))?1:0,
            useNativeDriver:true
        }).start()
    },[props.data.selected])


    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{position:"relative",flexDirection:'row'}}>
        {
            props.data.card
            ?
            <View style={{flex:1}}><Card {...props.data.item} index={props.data.index}/></View>
            :
            <View style={{flex:1}}><Text style={[{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1),padding:10}]}>{props.data.labelExtractor(props.data.item)}</Text></View>
        }
        {
            props.data.selectionStyle=="tick"
            ?
            <Animated.Image source={tick_icon} style={{width:14,height:14,resizeMode:"contain",transform:[{scale:scale}]}}/>
            :
            <Animated.View style={{position:"absolute",width:dimensions?dimensions.width:0,height:dimensions?dimensions.height:0,borderWidth:1,top:0,left:0,borderRadius:10,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),transform:[{scale:scale}]}}/>
        }
        </View>
    )
}

export default Listselection