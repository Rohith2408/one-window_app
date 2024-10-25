import { useRef } from "react"
import { StyleProp,Text, TextStyle, View } from "react-native"
import { Fonts, Themes } from "../../constants";

const Styledtext=(props:{text:string,focusWord:string,styles:StyleProp<TextStyle>[]})=>{

    let index=useRef(props.text.indexOf(props.focusWord)).current;

    return(
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)},props.styles]}>{props.text.substring(0,index)}<Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(0.7)},props.styles]}>{props.focusWord}</Text>{props.text.substring(index+(props.focusWord.length))}</Text>
            {/* <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(0.7)},props.styles]}>{props.focusWord}</Text>
            <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)},props.styles]}>{props.text.substring(index+(props.focusWord.length))}</Text> */}
        </View>
    )

}

export default Styledtext