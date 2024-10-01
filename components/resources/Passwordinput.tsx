import { Image } from "expo-image"
import { useRef, useState } from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import seen_icon from '../../assets/images/misc/password-seen.png'
import hidden_icon from '../../assets/images/misc/password-hidden.png'
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    input:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    input:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    input:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    input:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}


const Passwordinput=(props:{eventHandler:any,value:string,id:string,placeholder:string})=>{

    const [visibility,setVisibility]=useState("seen")
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const onInput=(txt:string)=>{
        props.eventHandler({name:"onTextInput",data:txt,triggerBy:"textinput"})
    }

    //console.log(visibility)

    return(
        <View style={{flexDirection:"row",padding:10,borderWidth:1,borderColor:"#E3E3E3",borderRadius:5}}>
            <View style={{flex:1}}><TextInput style={[styles[Device].input,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]} autoCapitalize="none" placeholder={props.placeholder} onChangeText={(txt)=>onInput(txt)} value={props.value} secureTextEntry={visibility=="seen"?false:true}></TextInput></View>
            <Pressable onPress={()=>setVisibility(visibility=="seen"?"hidden":"seen")}><Image source={visibility=="seen"?hidden_icon:seen_icon} style={{width:15,height:15,resizeMode:"contain"}}/></Pressable>
        </View>
    )
}



export default Passwordinput