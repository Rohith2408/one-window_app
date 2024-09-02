import { View } from "react-native"
import WebView from "react-native-webview"

const Docview=(props:{docpreviewurl:string})=>{

    console.log("view")

    return(
        <View style={{flex:1}}>
            <View style={{width:"70%",height:"70%",alignSelf:"center",paddingTop:50}}>
            <WebView
                source={{ uri:props.docpreviewurl}} 
                style={{ flex:1,padding:10}}
            />
            </View>
        </View>
    )
}

export default Docview