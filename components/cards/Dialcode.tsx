import { Text, View } from "react-native"
import { Countrycode } from "../../types"
import { Word2Sentence } from "../../utils"
import { Fonts, Themes } from "../../constants"


const Dialcode=(props:Countrycode)=>{

    return(
        <View style={{flex:1}}><Text style={[{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([props.dial_code,props.code,props.name],"","-")}</Text></View>
    )

}

export default Dialcode