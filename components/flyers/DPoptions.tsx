import { useRef } from "react"
import { Pressable, Text, View } from "react-native"
import { Fonts, Themes } from "../../constants"
import useNavigation from "../../hooks/useNavigation"
import sample_pic from '../../assets/images/misc/sampledp.png'

const DPoptions=()=>{

    const options=useRef([
        {title:"View",screen:""},
        {title:"Add/Update",icon:"",screen:"Personalinfo"},
        {title:"Remove"}
    ]).current
    const [path,navigate]=useNavigation()

    const show=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Dp",params:{image:sample_pic}}}):null
    }


    return(
        <View style={{flex:1,paddingTop:20}}>
            <Pressable onPress={show} style={[{padding:10}]}><Text  style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>View</Text></Pressable>
            <Pressable style={[{padding:10}]}><Text  style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Add/Update</Text></Pressable>
            <Pressable style={[{padding:10}]}><Text  style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>Remove</Text></Pressable>
        </View>
    )

}

export default DPoptions