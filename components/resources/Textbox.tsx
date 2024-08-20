import { StyleSheet, TextInput, View } from "react-native"
import { Event } from "../../types";
import { Fonts, Themes } from "../../constants";

const Textbox=(props:{placeholder:string,eventHandler:(event:Event)=>void,value:string|undefined})=>{

    return(
        <View style={[GeneralStyles.wrapper]}>
            <TextInput style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold,fontWeight:"700"}]} onChangeText={(value)=>props.eventHandler({name:"onTextInput",data:value,triggerBy:"textinput"})} onFocus={()=>props.eventHandler({name:"onFocus",triggerBy:"textinput"})} placeholder={props.placeholder} value={props.value}></TextInput>
        </View>
    )
}

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        borderWidth:1,
        borderColor:"#E3E3E3",
        padding:10,
        borderRadius:5
    },
})

export default Textbox;