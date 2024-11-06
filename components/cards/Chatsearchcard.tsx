import { Pressable, StyleSheet, Text, View } from "react-native"
import { ServerResponse, User } from "../../types"
import { getDevice,  getServerRequestURL, serverRequest} from "../../utils"
import { Image } from "expo-image"
import { useRef, useState } from "react"
import { Fonts, Themes } from "../../constants"
import default_icon from '../../assets/images/misc/defaultDP.png'
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addChats } from "../../store/slices/chatsSlice"
import add_icon from '../../assets/images/misc/add-friend.png'
import loader from '../../assets/images/misc/loader.gif'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5
    }
})

const TabStyles=StyleSheet.create({
    dp:{
        width:36,
        height:36
    },
    name:{
        fontSize:20
    },
    add_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    },
})

const MobileSStyles=StyleSheet.create({
    dp:{
        width:24,
        height:24
    },
    name:{
        fontSize:14
    },
    add_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
})

const MobileMStyles=StyleSheet.create({
    dp:{
        width:26,
        height:26
    },
    name:{
        fontSize:16
    },
    add_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
})

const MobileLStyles=StyleSheet.create({
    dp:{
        width:26,
        height:26
    },
    name:{
        fontSize:16
    },
    add_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },

})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Chatsearchcard=(props:User & {index:number,alreadyFriend:boolean})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [loading,setLoading]=useState(false);
    const dispatch=useAppDispatch()

    const addFriend=async (user:User)=>{
        setLoading(true)
        console.log("urrr",getServerRequestURL("add-friend","GET")+"/"+user._id)
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("add-friend","GET")+"/"+user._id,
            reqType: "GET"
        })
        console.log("new friend",res);
        if(res.success)
        {
            dispatch(addChats(res.data));
        }
        setLoading(false)
    }
    //console.log(props.assignedCountries,props.info.firstName,props.info.role)
    
    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <Image source={props.displayPicSrc?props.displayPicSrc:default_icon} style={[styles[Device].dp,{borderRadius:100}]}/>
            <View style={{flex:1}}><Text style={[styles[Device].name,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.firstName+" "+props.lastName}</Text></View>
            <Pressable onPress={()=>!loading?addFriend(props):null}><Image source={loading?loader:add_icon} style={[styles[Device].add_icon]}/></Pressable>
        </View>
    )
    
}

export default Chatsearchcard