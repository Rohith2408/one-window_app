import { Animated, Pressable, Text, View } from "react-native"
import { Document, PickedDoc } from "../../types"
import upload_icon from '../../assets/images/misc/upload.png'
import delete_icon from '../../assets/images/misc/delete.png'
import { formatDate } from "../../utils"
import { useEffect, useRef, useState } from "react"
import WebView from "react-native-webview"
import useNavigation from "../../hooks/useNavigation"

const Docviewer=(props:{value:Document|undefined,title:string,id:string,eventHandler:any})=>{

    const previewUrl=useRef("")
    const scale=useRef(new Animated.Value(0)).current
    const [path,navigate]=useNavigation()
    const [pickedDoc,setPickedDoc]=useState<PickedDoc|undefined>(undefined)

    const viewDoc=(url:string)=>{
        console.log("url",url)
        if(url.length>0)
        {
            navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Docview",flyerdata:{docpreviewurl:""}}}}):null
            //navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Docview",flyerdata:{docpreviewurl:url}}}}):null
        }
    }

    return(
        <View>
            <Text>{props.title}</Text>
        {
            props.value!=undefined
            ?
            <View>
                <Pressable onPress={()=>viewDoc(props.value.data.preview_url)}><Text>View Doc</Text></Pressable>
                <View>
                    <Text>{props.value.data.FileName}</Text>
                </View>
                <Pressable onPress={()=>props.eventHandler({name:"delete"})}><Text>Delete</Text></Pressable>
            </View>
            :
            <Pressable onPress={()=>props.eventHandler({name:"upload"})}><Text>Upload</Text></Pressable>
        }
        {
            pickedDoc
            ?
            <View>
                <Text>{pickedDoc.name}</Text>
                <Text>{pickedDoc.type}</Text>
                {/* <Pressable onPress={()=>}><Text>Delete</Text></Pressable> */}
            </View>
            :
            null
        }
        </View>
    )

}

export default Docviewer