import { Text, View } from "react-native"
import { Countrycode } from "../../types"
import { Word2Sentence } from "../../utils"
import { Fonts, Themes } from "../../constants"


const Dialcode=(props:Countrycode)=>{

    return(
        <View style={{flex:1}}>
            <Text style={[{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{(props.dial_code+"     ").substring(0,4)+" - "+props.name}</Text>
        </View>
    )

}

export default Dialcode