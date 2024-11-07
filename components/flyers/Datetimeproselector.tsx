import { Animated, Dimensions, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { AvailableSlot } from "../../types"
import { useEffect, useRef, useState } from "react"
import { getBasket } from "../../constants/basket"
import { Fonts, Themes } from "../../constants"
import { formatDate, formatTime, getDevice } from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import loading_gif from '../../assets/images/misc/loader.gif'
import { Image } from "expo-image"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        display:'flex',
        flexDirection:"column",
        paddingTop:10
    },
    date_wrapper:{

    },
    time_wrapper:{

    }
})

const TabStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:24
    },
    book:{
        fontSize:18
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})

const MobileSStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    book:{
        fontSize:14
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})
const MobileMStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    book:{
        fontSize:16
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})
const MobileLStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    book:{
        fontSize:16
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Datetimeproselector=(props:{id:string})=>{

    let info=useRef(getBasket(props.id)).current
    let availableSlots:AvailableSlot[]=info.availableSlots;
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const Device=useRef(getDevice()).current
    const x=useRef(new Animated.Value(0)).current
    const [selected,setSelected]=useState({date:info.currentSlot,time:info.currentSlot});
    const [timeSlots,setTimeSlots]=useState<any>([]);
    const [path,navigate]=useNavigation()
    const [isLoading,setIsloading]=useState(false);

    const book=()=>{
        navigate?navigate({type:"RemoveScreen"}):null
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:info.fieldid,newvalue:getdate(selected)}}}):null
    }

    console.log()

    useEffect(()=>{
        let available=selected.date?availableSlots.find((item)=>formatDate(item.date)==formatDate(selected.date))?.availableSlots:[]
        setTimeSlots(available?available:[])
    },[selected])

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={[GeneralStyles.wrapper]}>
            {
                dimensions
                ?
                <View style={{flex:1,gap:30}}>
                    <View style={[GeneralStyles.date_wrapper]}>
                        <Text style={{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}}>Date</Text>
                        <ScrollView 
                            snapToInterval={(dimensions.width/3)+20} 
                            horizontal 
                            contentContainerStyle={{gap:0}} 
                            pagingEnabled>
                        {
                            availableSlots.map((availableSlot:AvailableSlot)=>
                                <Pressable onPress={()=>setSelected({time:undefined,date:availableSlot.date})} style={{width:(dimensions.width/3)+20,padding:10}}>
                                    <Dateitem currentSlot={selected.date} x={x} dimensions={dimensions} date={availableSlot.date}/>
                                </Pressable>
                            )
                        }
                        </ScrollView>
                    </View>
                    <View style={[GeneralStyles.time_wrapper]}>
                        <Text style={{padding:10,color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}}>Time</Text>
                        <ScrollView 
                            snapToInterval={(dimensions.width/3)+20} 
                            horizontal 
                            contentContainerStyle={{gap:0}} 
                            pagingEnabled>
                        {
                            timeSlots?.map((timeslot)=>
                                <Pressable key={timeslot.startTime} onPress={()=>setSelected({...selected,time:timeslot.startTime})} style={{width:(dimensions.width/3)+20,padding:10}}>
                                    <Timeitem currentSlot={selected.time} slot={timeslot.startTime}/>
                                </Pressable>
                            )
                        }
                        </ScrollView>
                    </View>
                    {
                        selected.date && selected.time
                        ?
                        <Pressable onPress={()=>!isLoading?book():null} style={[{alignSelf:"center",borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),borderRadius:100}]}>
                            {
                                !isLoading
                                ?
                                <Text style={[{padding:10,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)},styles[Device].book]}>Book Slot</Text>
                                :
                                <Image style={[styles[Device].loading]} source={loading_gif}/>
                            }
                        </Pressable>
                        :
                        null
                    }
                </View>
                :
                null
            }
        </View>
    )
}

const Dateitem=(props:{dimensions:LayoutRectangle,date:string,currentSlot:string,x:Animated.Value})=>{

    const Device=useRef(getDevice()).current
    const scale=useRef(new Animated.Value(0)).current
    const startRange = (Dimensions.get("screen").width / 2) - (props.dimensions.width / 2);
    const middleRange = Dimensions.get("screen").width / 2;
    const endRange = (Dimensions.get("screen").width / 2) + (props.dimensions.width / 2);
    const [dimensions,setDimensions]=useState<LayoutRectangle>()

    useEffect(()=>{
       
        Animated.spring(scale,{
            toValue:formatDate(props.currentSlot)==formatDate(props.date)?1:0,
            useNativeDriver:true
        }).start()

    },[props.currentSlot])

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{position:'relative',padding:10}}>
            <Text style={[styles[Device].date,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{new Date(props.date).getDate()}</Text>
            <Text style={{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}}>{formatDate(props.date).slice(0,3)}</Text>
            <Animated.View style={{position:"absolute",width:dimensions?dimensions.width:0,height:dimensions?dimensions.height:0,borderWidth:1,top:0,left:0,borderRadius:10,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),transform:[{scale:scale}]}}/>
        </View>
    )

}

const Timeitem=(props:{slot:string,currentSlot:string})=>{

    const Device=useRef(getDevice()).current
    const [dimensions,setDimensions]=useState<LayoutRectangle>()
    const scale=useRef(new Animated.Value(0)).current

    useEffect(()=>{
       
        Animated.spring(scale,{
            toValue:formatTime(props.currentSlot)==formatTime(props.slot)?1:0,
            useNativeDriver:true
        }).start()

    },[props.currentSlot])

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{position:'relative',padding:10}}>
            <Text style={[styles[Device].time,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{formatTime(props.slot)}</Text>
            <Animated.View style={{position:"absolute",width:dimensions?dimensions.width:0,height:dimensions?dimensions.height:0,borderWidth:1,top:0,left:0,borderRadius:10,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),transform:[{scale:scale}]}}/>
        </View>
    )

}

const getdate=(selected:any)=>{
    return selected.date.substring(0,selected.date.indexOf("T"))+"T"+selected.time.substring(selected.date.indexOf("T")+1)
}

export default Datetimeproselector