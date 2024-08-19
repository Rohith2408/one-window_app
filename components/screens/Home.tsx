import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { useRef } from "react"
import useTheme from "../../hooks/useTheme"
import { Themes } from "../../constants"
import { Image } from "expo-image";
import destinations_icon from "../../assets/images/explore/destinations.png"
import universities_icon from '../../assets/images/explore/universities.png'
import programs_icon from '../../assets/images/explore/programs.png'
import { Device } from "../../types"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:'white'
    },
    sub_wrapper:{
        width:"100%",
        height:"100%",
        gap:20
    },
    welcome_message:{
   
    },
    search:{
        borderRadius:100,
        borderWidth:1,
        padding:10
    },
    search_text:{
        color:"#C3C3C3",
        fontWeight:"600"
    },
    explore_wrapper:{
        display:"flex",
        flexDirection:"row"
    },
    explore_item:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    explore_icon:{
        resizeMode:"contain",
    },
    explore_text:{
        fontWeight:"700"
    }
})

const TabStyles=StyleSheet.create({

    sub_wrapper:{
        maxWidth:500
    },
    welcome_message:{
        fontSize:20
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:60,
        height:60
    },
    explore_text:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({

    sub_wrapper:{
        maxWidth:500
    },
    welcome_message:{
        fontSize:20,
        fontWeight:"700"
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:40,
        height:40
    },
    explore_text:{
        fontSize:10
    }
})
const MobileMStyles=StyleSheet.create({

    sub_wrapper:{
        maxWidth:500
    },
    welcome_message:{
        fontSize:20,
        fontWeight:"700"
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:50,
        height:50
        
    },
    explore_text:{
        fontSize:12
    }
})
const MobileLStyles=StyleSheet.create({

    sub_wrapper:{
        maxWidth:500
    },
    welcome_message:{
        fontSize:20,
        fontWeight:"700"
    },
    search_text:{
        fontSize:12
    },
    explore_icon:{
        width:50,
        height:50
    },
    explore_text:{
        fontSize:12
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Home=(props:undefined|{name:string})=>{

    const [theme,setTheme]=useTheme();
    const Nav=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const exploreTabs=useRef([
        {text:"Destinations",icon:destinations_icon},
        {text:"Universities",icon:universities_icon},
        {text:"Programs",icon:programs_icon}
    ]).current

    console.log(Device?styles[Device].sub_wrapper:{})

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.sub_wrapper,Device?styles[Device].sub_wrapper:{}]}>
                <View>
                    <Text style={[{color:theme=="light"?Themes.Light.OnewindowPrimaryBlue(1):'white'},Device?styles[Device].welcome_message:{}]}>Hello , Rohith!</Text>
                </View>
                <Pressable style={[GeneralStyles.search,{borderColor:theme=="light"?Themes.Light.OnewindowPrimaryBlue(1):'white'}]}>
                    <Text style={[GeneralStyles.search_text,Device?styles[Device].search_text:{}]}>Search for "Harvard University"</Text>
                </Pressable>
                <View style={[GeneralStyles.explore_wrapper]}>
                {
                    exploreTabs.map((item)=>
                    <Exploreitem key={item.text} {...item} device={Device} theme={theme}></Exploreitem>
                    )
                }
                </View>
            </View>
            {/* <Text>Home</Text>
            <Text>{props?.name}</Text>
            <Pressable onPress={()=>Nav?.navigate({type:"Logout"})}><Text>Logout</Text></Pressable> */}
        </View>
    )
}

const Exploreitem=(props:{icon:string,text:string,theme:"light"|"dark",device:Device})=>{


    return(
        <Pressable style={[GeneralStyles.explore_item]}>
            <Image source={props.icon} style={[GeneralStyles.explore_icon,props.device?styles[props.device].explore_icon:{}]}></Image>
            <Text style={[GeneralStyles.explore_text, {color:Themes.Light.OnewindowPrimaryBlue(1)} ,props.device?styles[props.device].explore_text:{}]}>{props.text}</Text>
        </Pressable>
    )

}

export default Home