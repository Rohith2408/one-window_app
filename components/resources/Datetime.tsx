import DateTimePicker from '@react-native-community/datetimepicker'
import { useRef, useState } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from '../../hooks/useNavigation'
import { getDevice } from '../../utils'

const TabStyles=StyleSheet.create({
    text:{
        fontSize:20
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Datetime=(props:{value:string,id:string,mode?:string})=>{

    return(
        <View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {
                Platform.OS=="android"
                ?
                <AndroidPicker mode={props.mode?props.mode:"date"} date={props.value} id={props.id}></AndroidPicker>
                :
                <IosPicker mode={props.mode?props.mode:"date"} date={props.value} id={props.id}></IosPicker>
            }
            </View>
        </View>
    )

}

const AndroidPicker=(props:{date:string,id:string,mode:string})=>{

    //const [state,setState]=useState(props.nonState.initialValue?props.nonState.initialValue:new Date().toISOString());
    const [showPicker, setShowPicker] = useState(false);
    const [path,navigate]=useNavigation()

    // const eventHandler=(event:Event)=>{
    //     setState(event.data)
    //     setShowPicker(false);
    //     props.nonState.eventHandler
    //     ?
    //     props.nonState.eventHandler({...event,triggerBy:{componentName:'dateinput',id:props.nonState.id}})
    //     :
    //     null
    // }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Pressable style={{backgroundColor:"lightgrey",borderRadius:10}} onPress={()=>setShowPicker(true)}><Text style={{fontSize:13,padding:10}}>{new Date(props.date).toDateString().substring(4)}</Text></Pressable>
            {
                showPicker
                ?
                <DateTimePicker
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={props.date?new Date(props.date):new Date()}
                mode={props.mode}
                is24Hour={true}
                //accentColor={THEME.COLOR.SECONDARY.SUNSHINE(1)}
                style={{transform:[{scale:0.8}]}}
                onChange={(e,date)=>{
                    setShowPicker(false)
                    navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:date?.toISOString()}}}):null
                }
                }
                />
                :
                null
            }
        </View>
    )

}

const IosPicker=(props:{date:string,id:string,mode:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef(getDevice()).current
    //const [state,setState]=useState(props.nonState.initialValue?props.nonState.initialValue:new Date().toISOString());
    // const eventHandler=(event:Event)=>{
    //     setState(event.data)
    //     props.nonState.eventHandler
    //     ?
    //     props.nonState.eventHandler({...event,triggerBy:{componentName:'dateinput',id:props.nonState.id}})
    //     :
    //     null
    // }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <DateTimePicker
            maximumDate={new Date()}
            testID="dateTimePicker"
            value={props.date?new Date(props.date):new Date()}
            mode={props.mode}
            is24Hour={true}
            //accentColor={THEME.COLOR.SECONDARY.SUNSHINE(1)}
            style={styles[Device].text}
            onChange={(e,date)=>navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:date?.toISOString()}}}):null}
            />
        </View>
    )

}

export default Datetime