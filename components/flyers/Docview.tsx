import { useRef } from "react";
import { View } from "react-native"
import WebView from "react-native-webview"
import { getBasket } from "../../constants/basket";

const Docview=(props:{docpreviewurl:string})=>{

    const webviewRef = useRef(null);
    let docurl=getBasket("docurl")

    return(
        <View style={{flex:1}}>
            <View style={{width:"70%",height:"70%",alignSelf:"center",paddingTop:50}}>
            <WebView
                source={{ uri: docurl}} 
                style={{ flex:1,padding:10}}
            />
            </View>
        </View>
    )
}

export default Docview