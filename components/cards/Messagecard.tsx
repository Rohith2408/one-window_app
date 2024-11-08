import { Pressable, StyleSheet, Text, View } from "react-native"
import { Message} from "../../types"
import { useRef, useState } from "react"
import { getDevice} from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { profile } from "console"
import { Fonts, Themes } from "../../constants"
import { TypingAnimation } from 'react-native-typing-animation';
import { Image } from "expo-image"
import default_icon from '../../assets/images/misc/defaultDP.png'
import document_icon from '../../assets/images/misc/document.png'
import WebView from "react-native-webview"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        // backgroundColor:'red'
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
        flexDirection:"column",
        gap:5
    },
    status:{
        position:"absolute",
        display:'flex',
        flexDirection:"row",
        gap:5,
        alignItems:'center'
    },
    doc_wrapper:{
        borderRadius:10,
        flexDirection:'row',
        alignItems:"center",
        gap:5
    }
})

const TabStyles=StyleSheet.create({
    icon:{
        width:26,
        height:26,
        resizeMode:'contain'
    },
    title:{
        fontSize:20
    },
    datetime:{
        fontSize:18
    },
    attendees:{
        fontSize:12,
        lineHeight:16
    },
    edit:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    },
    sender_dp:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    normal_msg:{
        fontSize:20
    },
    repliedTo:{
        fontSize:16
    },
    doc_wrapper:{
        height:40,
        padding:5,
        resizeMode:"contain"
    },
    doc_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    title:{
        fontSize:12
    },
    datetime:{
        fontSize:10,
        lineHeight:16
    },
    attendees:{
        fontSize:10
    },
    edit:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    },
    sender_dp:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    normal_msg:{
        fontSize:14
    },
    repliedTo:{
        fontSize:10
    },
    doc_wrapper:{
        height:30,
        padding:5,
        resizeMode:"contain"
    },
    doc_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:26,
        height:26,
        resizeMode:'contain'
    },
    title:{
        fontSize:14
    },
    datetime:{
        fontSize:12
    },
    attendees:{
        fontSize:12
    },
    edit:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    },
    sender_dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    normal_msg:{
        fontSize:16
    },
    repliedTo:{
        fontSize:12
    },
    doc_wrapper:{
        height:30,
        padding:5,
        resizeMode:"contain"
    },
    doc_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    icon:{
        width:26,
        height:26,
        resizeMode:'contain'
    },
    title:{
        fontSize:14
    },
    datetime:{
        fontSize:12
    },
    attendees:{
        fontSize:12,
        lineHeight:16
    },
    edit:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    delete:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    clock:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    status:{
        fontSize:10
    },
    sender_dp:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    normal_msg:{
        fontSize:14
    },
    repliedTo:{
        fontSize:10
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Messagecard=(props:Message & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()
    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false)
    const profile=useAppSelector((state)=>state.sharedinfo).data
    const blockedUsers=useAppSelector((state)=>state.blockedusers).data

    //console.log("msgs",props.content)

    return(
        <View style={[GeneralStyles.wrapper]}>
        {
            blockedUsers?.find((user)=>user._id==props.sender?._id && props.sender._id!=profile?._id)
            ?
            <Blocked/>
            :
                props.type=="normal"
                ?
                <Normal {...props}/>
                :
                props.type=="typing"
                ?
                <Typing {...props}/>
                :
                <Seen {...props}/>
        }
        </View>
    )

}

const Blocked=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{flexDirection:"column",alignSelf:"flex-start",maxWidth:"50%",backgroundColor:"#F6F6F6",borderRadius:10}}>
            <Text style={[styles[Device].normal_msg,{fontFamily:Fonts.NeutrifStudio.Regular,padding:10}]}>Message sent from a user you have blocked</Text>
            {/* <Text style={[styles[Device].normal_msg,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Unblock the user to see the message</Text> */}
        </View>
    )
}

const Seen=(props:Message)=>{

    console.log("seen",props);

    return(
        <View style={{alignSelf:"flex-end"}}>
            <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Regular,color:"lightgrey"}]}>{props.content}</Text>
        </View>
    )
}

const Typing=(props:Message)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={{alignSelf:"flex-start",flexDirection:'row',alignItems:"center",gap:1}}>
            <Image style={[styles[Device].sender_dp]} source={props.sender?.displayPicSrc?props.sender?.displayPicSrc:default_icon} />
            <Text style={[{padding:10},{fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.content}</Text>
            <View>
                <TypingAnimation
                    dotColor="black"
                    dotMargin={5}
                    dotAmplitude={2}
                    dotSpeed={0.25}
                    dotRadius={2.5}
                    dotX={12}
                    dotY={0}
                />
            </View>
        </View>
    )
}

const Normal=(props:Message)=>{

    const profile=useAppSelector((state)=>state.sharedinfo).data
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()

    const showDoc=()=>{
        if(props.document?.data.preview_url && props.document?.data.preview_url?.length>0)
        {
           navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Documentview",flyerdata:{docpreviewurl:props.document.data.preview_url}}}}):null
        }
    }

    return(
        <View style={{gap:5,alignSelf:props.sender?._id==profile?._id?"flex-end":"flex-start",maxWidth:"50%"}}>
            {
                props.sender && props.sender._id==undefined
                ?
                <Text style={[styles[Device].repliedTo,{color:"grey",padding:10,alignSelf:"flex-end"}]}>User doesn't exist</Text>
                :
                null
            }
            <View style={{flexDirection:"row",alignSelf:props.sender?._id==profile?._id?"flex-end":"flex-start",alignItems:"center",backgroundColor:(props.sender?._id==profile?._id)?Themes.Light.OnewindowLightBlue:"#F6F6F6",borderRadius:20}}>
                {
                    props.sender?._id!=profile?._id
                    ?
                    <Image style={[styles[Device].sender_dp,{transform:[{translateY:-styles[Device].sender_dp.height/1.5}],borderRadius:100}]} source={props.sender?.displayPicSrc?props.sender?.displayPicSrc:default_icon} />
                    :
                    null
                }
                <Text style={[styles[Device].normal_msg,{padding:10},{fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.content}</Text>
                {
                    props.sender?._id==profile?._id
                    ?
                    <Image style={[styles[Device].sender_dp,{transform:[{translateY:-styles[Device].sender_dp.height/1.5}],borderRadius:100}]} source={props.sender?.displayPicSrc?props.sender?.displayPicSrc:default_icon} />
                    :
                    null
                }
            </View>
            {
                props.document
                ?
                <Pressable onPress={showDoc} style={[styles[Device].doc_wrapper,GeneralStyles.doc_wrapper,{backgroundColor:Themes.Light.OnewindowLightBlue}]}>
                    <Image source={document_icon} style={[styles[Device].doc_icon]}/>
                    <Text style={[styles[Device].repliedTo,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.document.data.FileName}</Text>
                   {/* <WebView
                        setDisplayZoomControls={false}
                        setBuiltInZoomControls={true}
                        hideKeyboardAccessoryView={true} 
                        allowsBackForwardNavigationGestures={false} 
                        source={{ uri:props.document.data.preview_url}} 
                        injectedJavaScript={`
                            const meta = document.createElement('meta');
                            meta.setAttribute('name', 'viewport');
                            meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
                            document.head.appendChild(meta);
                            function hideControls() {
                                const controlsDiv = document.getElementsByClassName('zwd-hide-display zwd-icon-on-hover zwd-icons zwd-tools zwd-c-aligned zwd-atom-previewaction-controls zwd-fmedium zwd-p-left4 zwd-p-right4 ');
                                if (controlsDiv) {
                                  controlsDiv[0].style.display = 'none';
                                } else {
                                  setTimeout(hideControls, 100); // Retry if element not found yet
                                }
                              }  
                            hideControls();
                            true; // Note: this is required for the injectedJavaScript to take effect on iOS
                        `}
                        style={{ flex:1}}
                    /> */}
                </Pressable>
                :
                null
            }
            {
                props.repliedTo
                ?
                <Text style={[styles[Device].repliedTo,{color:"grey",padding:10}]}>{"Replied to "+props.repliedTo.content}</Text>
                :
                null
            }
        </View>
    )
}

export default Messagecard