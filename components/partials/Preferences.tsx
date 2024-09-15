import { useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { getDevice } from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import degree_icon from '../../assets/images/preferences/degree.png'
import course_icon from '../../assets/images/preferences/course.png'
import country_icon from '../../assets/images/preferences/country.png'
import currency_icon from '../../assets/images/preferences/currency.png'
import go_icon from '../../assets/images/misc/back.png'
import { addToBasket } from "../../constants/basket"
import { preferences } from "../../constants/preferences"
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        backgroundColor:'white',
        paddingTop:10
    },
    option_wrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        gap:7,
        padding:10
    },
    go_icon:{
        transform:[{scaleX:-1}]
    }
})

const TabStyles=StyleSheet.create({
    main_wrapper:{
        gap:7
    },
    option_icon:{
        width:16,
        height:16,
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
    main_wrapper:{
        gap:10
    },
    option_wrapper:{
        gap:5
    },
    option_icon:{
        width:26,
        height:26,
        objectFit:'contain'
    },
    options_text:{
        fontSize:13
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:8,
        height:8,
        objectFit:'contain'
    }
})

const MobileMStyles=StyleSheet.create({
    main_wrapper:{
        gap:15
    },
    option_wrapper:{
        gap:10
    },
    option_icon:{
        width:28,
        height:28,
        objectFit:'contain'
    },
    options_text:{
        fontSize:15
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
    main_wrapper:{
        gap:17
    },
    option_wrapper:{
        gap:10
    },
    option_icon:{
        width:34,
        height:34,
        objectFit:'contain'
    },
    options_text:{
        fontSize:16
    },
    options_wrapper:{
        flex:5,
    },
    go_icon:{
        width:8,
        height:8,
        objectFit:'contain'
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Preferences=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const options=useRef([
        {title:"Degree",icon:degree_icon,screen:{id:"Flyer",params:{flyerid:"Degreepreference"}}},
        {title:"Course",icon:degree_icon,screen:{id:"Flyer",params:{flyerid:"Coursepreference"}}},
        {title:"Country",icon:degree_icon,screen:{id:"Flyer",params:{flyerid:"Countrypreference"}}},
        // {title:"Course",icon:course_icon,screen:{id:"Preference",params:{preferenceid:"courses"}}},
        // {title:"Country",icon:country_icon,screen:{id:"Preference",params:{preferenceid:"country"}}},
        // {title:"Currency",icon:currency_icon,screen:{id:"Currency",params:undefined}},
    ]).current
    const [path,navigate]=useNavigation()

    const openScreen=(screen:{id:string,params:{preferenceid:string}})=>{
        navigate?navigate({type:"AddScreen",payload:{screen:screen.id,params:screen.params}}):null
    }

    return(
        <View style={[GeneralStyles.main_wrapper,styles[Device].main_wrapper]}>
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
            <View style={{flex:1}}><Text style={[styles[props.Device].options_text,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text></View>
            <Image source={go_icon} style={[GeneralStyles.go_icon,styles[props.Device].go_icon]}></Image>
        </View>
    )
}

export default Preferences