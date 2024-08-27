import { useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getDevice } from "../../utils"
import { Image } from "expo-image"
import personal_icon from '../../assets/images/profile/personal.png'
import cart_icon from '../../assets/images/profile/cart.png'
import expert_icon from '../../assets/images/profile/expert.png'
import favourites_icon from '../../assets/images/profile/favourites.png'
import orders_icon from '../../assets/images/profile/orders.png'
import preferences_icon from '../../assets/images/profile/preferences.png'
import go_icon from '../../assets/images/misc/back.png'
import { Fonts, Themes } from "../../constants"

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


const Mydetails=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const options=useRef([
        {title:"My Details",icon:personal_icon},
        {title:"Experts",icon:expert_icon},
        {title:"Preferences",icon:preferences_icon},
        {title:"Recommended",icon:preferences_icon},
        {title:"Favourites",icon:favourites_icon},
    ]).current


    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            options.map((option)=>
            <Option key={option.title} {...option} Device={Device}></Option>
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

export default Mydetails