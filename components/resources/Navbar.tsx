import { useEffect, useRef } from "react"
import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import home_icon from '../../assets/images/navbar/home.png'
import chat_icon from '../../assets/images/navbar/chat.png'
import community_icon from '../../assets/images/navbar/community.png'
import profile_icon from '../../assets/images/navbar/profile.png'
import { Image } from "expo-image"
import { getDevice, getLightThemeColor } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { Device } from "../../types"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        backgroundColor:'white',
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:2,
        borderRadius:100,
        display:'flex',
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5
    },
    nav_item:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    icon:{
        resizeMode:"contain"
    },
    highlighter:{
        position:"absolute",
        // backgroundColor:Themes.Light.OnewindowRed(1),
        borderRadius:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"75%"
    },
    text:{
        alignSelf:"center",
        fontWeight:"700",
        color:"black",
    }
})

const TabStyles=StyleSheet.create({
    icon:{
        width:50,
        height:50
    },
    text:{
        fontSize:18
    },
    highlighter:{
        // width:"90%",
        // height:40
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:30,
        height:30
    },
    text:{
        fontSize:12
    },
    highlighter:{
        // width:60,
        // height:40
    }
})
const MobileMStyles=StyleSheet.create({
    icon:{
        width:36,
        height:36
    },
    text:{
        fontSize:14
    },
    highlighter:{
        // width:60,
        // height:40
    }
    
})
const MobileLStyles=StyleSheet.create({
    icon:{
        width:36,
        height:36
    },
    text:{
        fontSize:14
    },
    highlighter:{
        // width:60,
        // height:40
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Navbar=(props:{tab:string})=>{

    const tabs=useRef([
        {icon:home_icon,title:"Home",color:Themes.Light.OnewindowRed(1)},
        // {icon:home_icon,title:"Activity"},
        {icon:community_icon,title:"Community",color:Themes.Light.OnewindowPurple(1)},
        {icon:chat_icon,title:"Chats",color:Themes.Light.OnewindowTeal(1)},
        {icon:profile_icon,title:"Profile",color:Themes.Light.OnewindowYellow(1)},
    ]).current
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            tabs.map((tab,i)=>
            <Navitem key={tab.title} device={Device} {...tab} index={i} isFocussed={tab.title.toLowerCase()==props.tab.toLowerCase()}/>
            )
        }
        </View>
    )

}

const Navitem=(props:{device:Device,icon:string,color:string,index:number,title:string,isFocussed:boolean})=>{

    const scale=useRef(new Animated.Value(0)).current
    const [path,navigate]=useNavigation()

    useEffect(()=>{
        Animated.spring(scale,{
            toValue:props.isFocussed?1:0,
            useNativeDriver:true
        }).start()
    },[props.isFocussed])

    return(
        <Pressable onPress={()=>navigate?navigate({type:"UpdateParam",payload:{param:"tab",newValue:props.title.toLowerCase()}}):null} style={[GeneralStyles.nav_item]}>
            <Animated.View style={[props.device?styles[props.device].highlighter:{},{backgroundColor:getLightThemeColor(props.index)},GeneralStyles.highlighter,{transform:[{scale:scale}]}]}><Text style={[props.device?styles[props.device].text:{},GeneralStyles.text,{color:"black",fontFamily:Fonts.NeutrifStudio.Bold}]}>{props.title}</Text></Animated.View>
            <Animated.Image source={props.icon} style={[props.device?styles[props.device].icon:{},{transform:[{scale:Animated.subtract(1,scale)}]}]}></Animated.Image>
        </Pressable>
    )
}

export default Navbar

// const styles=StyleSheet.create({
//     mainWrapper:{
//         flex:1,
//         flexDirection:"row",
//         alignItems:"center",
//         justifyContent:"center"
//     },
//     navItem:{
//         flex:1,
//         flexDirection:"column",
//         justifyContent:"center",
//         alignItems:"center"
//     }
// })