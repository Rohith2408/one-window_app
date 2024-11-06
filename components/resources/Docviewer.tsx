import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { Document, PickedDoc } from "../../types"
import loader from '../../assets/images/misc/loader.gif'
import upload_icon from '../../assets/images/misc/upload.png'
import delete_icon from '../../assets/images/misc/delete.png'
import { formatDate, getDevice } from "../../utils"
import { useEffect, useRef, useState } from "react"
import WebView from "react-native-webview"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import document_icon from '../../assets/images/misc/document.png'
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        padding:10
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"row",
        flex:1,
        gap:7
    },
    icon_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:'center'
    },
    info_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        gap:10,
    },
    actions_wrapper:{
        display:'flex',
        flexDirection:"column"
    },
    status:{
        position:"absolute",
        display:'flex',
        flexDirection:"row",
        gap:5,
        alignItems:'center'
    }
})

const TabStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:20
    },
    category:{
        fontSize:18
    },
    intake:{
        fontSize:16
    },
    icon:{
        width:20,
        height:20,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    upload_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:13
    },
    category:{
        fontSize:14
    },
    intake:{
        fontSize:11
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    upload_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    name:{
        lineHeight:22,
        fontSize:14
    },
    category:{
        fontSize:14
    },
    intake:{
        fontSize:13
    },
    icon:{
        width:18,
        height:18,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    upload_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    name:{
        lineHeight:20,
        fontSize:14
    },
    category:{
        fontSize:14
    },
    intake:{
        fontSize:11
    },
    icon:{
        width:16,
        height:16,
        resizeMode:"contain",
        borderRadius:100
    },
    clock_icon:{
        width:10,
        height:10,
        resizeMode:"contain",
    },
    upload_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Docviewer=(props:{value:Document|undefined,title:string,id:string,eventHandler:any})=>{

    const previewUrl=useRef("")
    const scale=useRef(new Animated.Value(0)).current
    const [path,navigate]=useNavigation()
    const [pickedDoc,setPickedDoc]=useState<PickedDoc|undefined>(undefined)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translate=useRef(new Animated.Value(0)).current
    const [isLoading,setIsLoading]=useState(false);

    const showProgram=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Program",params:{programid:props.course._id}}}):null
    }

    const animate=(y:number)=>{
        Animated.spring(translate,{
            toValue:y,
            useNativeDriver:false
        }).start()
    }

    const viewDoc=()=>{
        //console.log("Preview url",props.value?.data.preview_url)
        if(props.value?.data.preview_url.length>0)
        {
            //addToBasket("docurl",props.value?.data.preview_url);
            navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Documentview",flyerdata:{docpreviewurl:props.value?.data.preview_url}}}}):null
        }
    }

    const remove=async ()=>{
        setIsLoading(true);
        await props.eventHandler({name:"delete"})
        setIsLoading(false);
    }

    const upload=async ()=>{
        setIsLoading(true);
        await props.eventHandler({name:"upload"})
        setIsLoading(false);
    }

    //console.log("Document",props.value?.data.preview_url,props.title);

    return(
        <View style={[GeneralStyles.sub_wrapper]}>
            <View style={[GeneralStyles.icon_wrapper]}>
                <Image source={document_icon} style={[styles[Device].icon]}/>
            </View>
            <View style={[GeneralStyles.info_wrapper]}>
                {
                    props.value
                    ?
                    <View style={{flexDirection:"row"}}>
                        <Animated.View onLayout={(e)=>animate(-e.nativeEvent.layout.height-5)} style={[GeneralStyles.status,styles[Device].status,{transform:[{translateY:translate}]}]}>
                            <View style={{width:5,height:5,borderRadius:10,backgroundColor:"#69FF6F"}}></View>
                            <Text style={[styles[Device].category,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.title}</Text>
                        </Animated.View>
                        <View style={{flex:1}}><Text style={[styles[Device].name,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.value?.data.FileName}</Text></View>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                            <Pressable onPress={viewDoc} style={{borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(1),borderRadius:100,padding:5}}>
                                <Text style={[styles[Device].category,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>View</Text>
                            </Pressable>
                            <Pressable onPress={!isLoading?remove:null}>
                                <Image style={[styles[Device].upload_icon]} source={isLoading?loader:delete_icon}/>
                            </Pressable>
                        </View>
                    </View>
                    :
                    null
                }
                {
                props.value==undefined
                ?
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View style={{flex:1}}><Text style={[styles[Device].category,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text></View>
                    <Pressable onPress={!isLoading?upload:null}>
                        <Image style={[styles[Device].upload_icon]} source={isLoading?loader:upload_icon}/>
                    </Pressable>
                </View>
                :
                null
            }
            </View>    
        </View>

        /* {
            props.value!=undefined
            ?
            <View>
                <Pressable onPress={viewDoc}><Text>View Doc</Text></Pressable>
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

            </View>
            :
            null
        } */

    )

}

export default Docviewer