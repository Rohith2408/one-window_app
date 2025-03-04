import { StyleProp, StyleSheet, TextInput, TextStyle, View } from "react-native"
import { Event } from "../../types";
import { Fonts, Themes } from "../../constants";
import { useEffect, useRef } from "react";
import { addToBasket } from "../../constants/basket";
import { getDevice } from "../../utils";

const GeneralStyles=StyleSheet.create({
    wrapper:{
        borderWidth:1,
        borderColor:"#E3E3E3",
        padding:10,
        borderRadius:5
    },
})

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


const Textbox=(props:{styles?:StyleProp<TextStyle>[],readonly?:boolean,placeholder:string,eventHandler:(event:Event)=>void,value:string|undefined,id:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    useEffect(()=>{
        addToBasket(props.id,props.value);
    },[props.value])

    return(
        <View style={[GeneralStyles.wrapper]}>
            <TextInput readOnly={props.readonly?props.readonly:false} autoCapitalize="none" style={[styles[Device].text,props.styles?props.styles:{},{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]} onChangeText={(value)=>props.eventHandler({name:"onTextInput",data:value,triggerBy:"textinput"})} placeholder={props.placeholder} value={props.value}></TextInput>
        </View>
    )
}

export default Textbox;