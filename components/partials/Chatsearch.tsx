import { Image } from "expo-image"
import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { ServerResponse, User } from "../../types"
import emptylist from '../../assets/images/misc/emptylist.png'
import useNavigation from "../../hooks/useNavigation"
import { getDevice, getFriends, getServerRequestURL, serverRequest } from "../../utils"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import { store } from "../../store"
import add_icon from '../../assets/images/misc/add-friend.png'
import loader from '../../assets/images/misc/loader.gif'
import { useAppSelector } from "../../hooks/useAppSelector"
import Chatsearchcard from "../cards/Chatsearchcard"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    card:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    add_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:20
    },
    click_message:{
        fontSize:18
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    card:{
        width:'100%',
        height:75
    },
    dp:{
        width:30,
        height:30
    },
    name:{
        fontSize:18
    },
    search:{
        fontSize:20
    }
})

const MobileSStyles=StyleSheet.create({
    add_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:14
    },
    click_message:{
        fontSize:10,
        lineHeight:16
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:50
    },
    dp:{
        width:20,
        height:20
    },
    name:{
        fontSize:12
    },
    search:{
        fontSize:14
    }
})
const MobileMStyles=StyleSheet.create({
    add_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:75
    },
    dp:{
        width:20,
        height:20
    },
    name:{
        fontSize:14
    },
    search:{
        fontSize:16
    }
})
const MobileLStyles=StyleSheet.create({
    add_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:100,
        height:100,
        resizeMode:"contain"
    },
    card:{
        width:"100%",
        height:75
    },
    dp:{
        width:20,
        height:20
    },
    name:{
        fontSize:14
    },
    search:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Chatsearch=(props:{initialChatSearch:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [search,setSearch]=useState(props.initialChatSearch?props.initialChatSearch:"")
    const [users,setUsers]=useState<User[]|undefined>(undefined)
    const chats=useAppSelector((state)=>state.chats).data
    const friends=(getFriends(chats,store.getState().sharedinfo.data?._id))

    const getUsers=async ()=>{
        console.log(getServerRequestURL("users-search","GET",{search:search}))
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("users-search","GET",{search:search}),
            reqType: "GET"
        })
        if(res.success)
        {
            setUsers(res.data)
        }
    }

    const openChat=()=>{
        // navigate({type:"AddScreen",payload:{screen:"Message",params:{chatId:}}});
    }

    useEffect(()=>{
        getUsers()
    },[search])

    return(
        <View style={{flex:1,paddingTop:30}}>
        <View style={[{borderRadius:100,borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)},appStandardStyles.screenMarginSmall]}><TextInput autoFocus onChangeText={(txt)=>setSearch(txt)} placeholder="Search..." value={search} style={[styles[Device].search,{padding:10}]}/></View>
        {
            users!=undefined
            ?
            <View style={{flex:1}}>
            {
                users.length==0
                ?
                <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                    <Transitionview effect="zoom"><Image source={emptylist} style={[styles[Device].emptylist_image]}/></Transitionview>
                    <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>It's awfully quiet in here...!</Text>
                    <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Click on the add button below to start adding your work experience</Text>
                </View>
                :
                <ScrollView style={{flex:1}} contentContainerStyle={{gap:30,padding:20}}>
                {
                    users.filter((user)=>!friends.find((item)=>item?._id==user._id)).map((user,i)=>
                    <View key={user._id} style={[GeneralStyles.card]}>
                        <Chatsearchcard index={i} {...user}/>
                    </View>
                    )
                }
                </ScrollView>
            }
            </View>
            :
            <View style={{flex:1,gap:7.5,justifyContent:"center",alignItems:"center"}}>
                <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Start Chatting...!</Text>
                <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Use the search bar above to start meeting your study abroad companions!</Text>
                {/* <Text style={[{textAlign:"center"},styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}></Text> */}
            </View>
        }
        </View>
    )
}

export default Chatsearch