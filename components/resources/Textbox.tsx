import { TextInput, View } from "react-native"
import { Event } from "../../types";

const Textbox=(props:{placeholder:string,eventHandler:(event:Event)=>void,value:string|undefined})=>{

    return(
        <View style={{flex:1}}>
            <TextInput onChangeText={(value)=>props.eventHandler({name:"onTextInputl",data:value,triggerBy:"textinput"})} onFocus={()=>props.eventHandler({name:"onFocus",triggerBy:"textinput"})} placeholder={props.placeholder} value={props.value}></TextInput>
        </View>
    )
}

export default Textbox;