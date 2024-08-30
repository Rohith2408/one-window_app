import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Tabbar as TabbarType } from "../../types"
import { Image } from "expo-image"
import { getDevice } from "../../utils"
import { useEffect, useRef, useState } from "react"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    tab_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        padding:7,
        position:"relative"
    },
    tabs_wrapper:{
        gap:10,
    },
    tab_icon:{
        objectFit:"contain"
    },
    marker:{
        position:"absolute",
        width:"100%",
        height:"100%",
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        borderWidth:1,
        borderRadius:15
    }
})

const TabStyles=StyleSheet.create({
    tab_icon:{
        width:20,
        height:20
    },
    tab_title:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({
    tab_icon:{
        width:20,
        height:20
    },
    tab_title:{
        fontSize:12
    }
})
const MobileMStyles=StyleSheet.create({
    tab_icon:{
        width:20,
        height:20
    },
    tab_title:{
        fontSize:12
    }
})
const MobileLStyles=StyleSheet.create({
    tab_icon:{
        width:20,
        height:20
    },
    tab_title:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Tabbar=(props:TabbarType)=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [dimensions,setDimensions]=useState({width:0,height:0})

    const click=(tab:string)=>{
        if(props.currentTab!=tab)
        {
            props.tabChangeHandler(tab);
        }
    }

    return(
        <View style={{flex:1}}>
            <ScrollView onLayout={(e)=>setDimensions({width:e.nativeEvent.layout.width,height:e.nativeEvent.layout.height})} style={{flex:1}} horizontal={true} contentContainerStyle={[GeneralStyles.tabs_wrapper]}>
            {
                props.tabs.map((tab)=>
                <Pressable onPress={()=>click(tab.title)} style={[{flex:1,justifyContent:'center'},props.fitWidth?{width:dimensions.width/props.tabs.length,height:dimensions.height}:{}]}>
                   <Tab {...tab} currentTab={props.currentTab}></Tab>
                </Pressable>
                )
            }
            </ScrollView>
        </View>
    )

}

const Tab=(props:{title:string,icon?:string,currentTab:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const markerScale=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        //console.log(props.title,props.currentTab==props.title?1:0);
        Animated.spring(markerScale,{
            toValue:props.currentTab==props.title?1:0,
            useNativeDriver:true
        }).start()
    },[props.currentTab])

    return(
        <View style={[GeneralStyles.tab_wrapper]}>
        <Animated.View style={[GeneralStyles.marker,{transform:[{scale:markerScale}]},{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}></Animated.View>
        {
            props.icon
            ?
            <Image source={props.icon} style={[styles[Device].tab_icon,GeneralStyles.tab_icon]}></Image>
            :
            null
        }
        <Text style={[styles[Device].tab_title,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(props.currentTab==props.title?1:0.5)}]}>{props.title}</Text>
        </View>
    )
}

export default Tabbar