import { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getDevice } from "../../utils"
import { addToBasket } from "../../constants/basket"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        borderWidth:1,
        borderColor:"#E3E3E3",
        padding:10,
        borderRadius:5
    },
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:14
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

const Textitem=(props:{eventHandler:(event:Event)=>void,value:{label:string,value:string}|undefined,id:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    useEffect(()=>{
        addToBasket(props.id,props.value);
    },[props.value])


    return(
        <View style={[GeneralStyles.wrapper]}>
            <Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.value?.label}</Text>
        </View>
    )
}

export default Textitem