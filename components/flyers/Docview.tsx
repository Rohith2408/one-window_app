import { useRef } from "react";
import { Text, View } from "react-native"
import WebView from "react-native-webview"
import { getBasket } from "../../constants/basket";
import { Fonts, Themes } from "../../constants";

const Docview=(props:{docpreviewurl:string})=>{

    const webviewRef = useRef(null);
    let docurl=getBasket("docurl")

    return(
        <View style={{flex:1}}>
            <Text style={{alignSelf:"center",padding:10,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}}>Document</Text>
            <View style={{width:"80%",height:"80%",alignSelf:"center",paddingTop:50}}>
            <WebView
                source={{ uri: docurl}} 
                style={{ flex:1,padding:10}}
            />
            </View>
        </View>
    )
}

export default Docview