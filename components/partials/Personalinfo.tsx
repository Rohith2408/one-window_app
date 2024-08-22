import { useRef } from "react"
import { Image } from "expo-image"
import { Pressable, StyleSheet, Text, View } from "react-native"
import personal_icon from '../../assets/images/profile/personal.png'
import cart_icon from '../../assets/images/profile/cart.png'
import expert_icon from '../../assets/images/profile/expert.png'
import favourites_icon from '../../assets/images/profile/favourites.png'
import orders_icon from '../../assets/images/profile/orders.png'
import preferences_icon from '../../assets/images/profile/preferences.png'
import go_icon from '../../assets/images/misc/back.png'
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:'white',
        paddingTop:10,
    },
    option_wrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        gap:5,
        padding:10
    },
    go_icon:{
        transform:[{scaleX:-1}]
    }
})

const TabStyles=StyleSheet.create({
    option_icon:{
        width:20,
        height:20,
        objectFit:'contain'
    },
    options_text:{
        fontSize:14
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:10,
        height:10,
        objectFit:'contain'
    }
})

const MobileSStyles=StyleSheet.create({
    option_icon:{
        width:36,
        height:36,
        objectFit:'contain'
    },
    options_text:{
        fontSize:13
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:10,
        height:10,
        objectFit:'contain'
    }
})

const MobileMStyles=StyleSheet.create({
    option_icon:{
        width:24,
        height:24,
        objectFit:'contain'
    },
    options_text:{
        fontSize:14
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:10,
        height:10,
        objectFit:'contain'
    }
})

const MobileLStyles=StyleSheet.create({
    option_icon:{
        width:20,
        height:20,
        objectFit:'contain'
    },
    options_text:{
        fontSize:14
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:10,
        height:10,
        objectFit:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Personalinfo=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const options=useRef([
        {title:"My Details",icon:personal_icon,screen:{id:"Mydetails",params:undefined}},
        {title:"Documents",icon:expert_icon,screen:{id:"Documents",params:{documentstab:"Personal"}}},
        {title:"Workexperience",icon:preferences_icon,screen:{id:"Workexperience",params:undefined}},
        {title:"Education History",icon:preferences_icon,screen:{id:"Educationhistory",params:undefined}},
        {title:"Test Scores",icon:favourites_icon,screen:{id:"Mydetails",params:undefined}},
    ]).current
    const [path,navigate]=useNavigation()

    const openScreen=(screen:{id:string,params:any})=>{
        navigate?navigate({type:"AddScreen",payload:{screen:screen.id,params:screen.params}}):null
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            options.map((option)=>
            <Pressable key={option.title} onPress={()=>openScreen(option.screen)}><Option {...option} Device={Device}></Option></Pressable>
            )
        }
        </View>
    )

}

const Option=(props:{icon:string,title:string,Device:keyof typeof styles})=>{

    return(
        <View style={[GeneralStyles.option_wrapper]}>
            <Image source={props.icon} style={[styles[props.Device].option_icon]}></Image>
            <View style={{flex:1}}><Text style={[styles[props.Device].options_text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text></View>
            <Image source={go_icon} style={[GeneralStyles.go_icon,styles[props.Device].go_icon]}></Image>
        </View>
    )
}

export default Personalinfo