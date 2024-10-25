import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { ListItem, Recommendation, ServerResponse } from "../../types"
import Loadingview from "../resources/Loadingview"
import Recommendationcard from "../cards/Recommendationcard"
import { useEffect, useRef, useState } from "react"
import { getChatType, getDevice } from "../../utils"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import useNavigation from "../../hooks/useNavigation"
import { store } from "../../store"
import { requests } from "../../constants/requests"
import Loader from "../resources/Loader"
import { Fonts, Themes } from "../../constants"
import Listselection from "../resources/Listselection"
import Asynchronousbutton from "../resources/Asynchronousbutton"
import emptylist from '../../assets/images/illustrations/sad.png'
import { Image } from "expo-image"
import Chatcard from "../cards/Chatcard"
import Userdoesntexist from "../cards/Userdoesntexistcard"
import Transitionview from "../resources/Transitionview"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        padding:20,
        backgroundColor:'white',
        gap:20
    }
})

const TabStyles=StyleSheet.create({
    card:{
        width:"100%",
        height:250,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    no_workexperience:{
        fontSize:20
    },
    click_message:{
        fontSize:16
    },
    emptylist_image:{
        width:180,
        height:180,
        resizeMode:"contain"
    },
    search:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
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
    search:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
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
    search:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({

    card:{
        width:"100%",
        height:200,
        borderRadius:30
    },
    loader:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:12,
        lineHeight:20
    },
    emptylist_image:{
        width:120,
        height:120,
        resizeMode:"contain"
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

const Chats=()=>{

    let chats=useAppSelector((state)=>state.chats)
    const recommendations=useAppSelector((state)=>state.recommendations)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()
    const [isLoading,setIsloading]=useState(false);
    const ref=useRef<any>()
    const tabs=useRef([{label:"Experts",value:"experts"},{label:"Community",value:"Community"}]).current
    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:0,height:0,x:0,y:0})
    let profile=useAppSelector((state)=>state.sharedinfo)
    let experts=chats.data?.filter((chat)=>getChatType(chat)=="advisors")
    let community=chats.data?.filter((chat)=>getChatType(chat)=="community");

    useEffect(()=>{
       
    },[])

    const tabSelected=(selected:ListItem[])=>{
        ref.current.scrollTo({x:dimensions.width*(tabs.findIndex((tab)=>tab.label==selected[0].label)),animated:true})
    }

    const openSearch=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Chatsearch"}}):null
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"Chatsearch",params:{initialChatSearch:""}}}):null
        },200)
    }

    //console.log("chats",JSON.stringify(chats,null,2));

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,paddingTop:20}}>
            {
                chats.responseStatus!="recieved"
                ?
                <Loadinglistscreen cardStyles={{width:"100%",height:Device=="MobileS"?100:(Device=="MobileM"?130:170)}} cardGap={30} count={3} direction="vertical"/>
                :
                <View style={{flex:1,gap:25}}>
                    <Pressable style={{borderWidth:1.25,borderColor:Themes.Light.OnewindowPrimaryBlue(0.25),borderRadius:100}} onPress={openSearch}><Text style={[styles[Device].search,{padding:10,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(0.25)}]}>{"Search..."}</Text></Pressable>
                    <Listselection
                        direction="horizontal"
                        selectionStyle="background"
                        initialSelection={[{label:"Experts",value:"experts"}]}
                        blurUnSelected={true}
                        styles={{contentcontainer:{gap:10}}}
                        onselection={tabSelected}
                        options={{
                            list:tabs,
                            idExtractor:(data:ListItem)=>data.label,
                            labelExtractor:(data:any)=>data.label,
                            selectionMode:"single"
                        }}
                    />
                    <ScrollView horizontal scrollEnabled={false} ref={ref} style={{flex:1}} contentContainerStyle={{paddingTop:0}}>
                        <View style={{width:dimensions.width}}>
                            {
                                experts.length==0
                                ?
                                <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                                    <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                                    <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Oops...!</Text>
                                    <Pressable ><Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>No experts assigned , request for an expert?</Text></Pressable>
                                </View>
                                :
                                <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:15,paddingTop:0,paddingBottom:30}}>
                                {
                                    experts.map((item,i)=>
                                    <Transitionview effect="pan" delay={100*i}>
                                        <View key={item._id}><Chatcard {...item} index={i}/></View>
                                    </Transitionview>
                                    )
                                }
                                </ScrollView>
                            }
                        </View>
                        <View style={{width:dimensions.width}}>
                            {
                                community.length==0
                                ?
                                <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                                    <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                                    <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Oops...!</Text>
                                    <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Seems like you have no friends!</Text>
                                </View>
                                :
                                <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{gap:15,paddingTop:0,paddingBottom:30}}>
                                {
                                    community.map((item,i)=>
                                    (item.participants.length==1)
                                    ?
                                    <Transitionview effect="pan" delay={100*i}>
                                        <Userdoesntexist/>
                                    </Transitionview>
                                    :
                                    <Transitionview effect="pan" delay={100*i}>
                                        <View key={item._id}><Chatcard {...item} index={i}/></View>
                                    </Transitionview>
                                    )
                                }
                                </ScrollView>
                            }
                        </View>
                    </ScrollView>
                </View>
            }
        </View>
    )

}

export default Chats