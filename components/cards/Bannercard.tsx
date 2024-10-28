import { Pressable, StyleSheet, Text, View } from "react-native"
import { Banner, CourseListObj } from "../../types"
import { useRef } from "react"
import { Word2Sentence, getDevice, getLightThemeColor, getThemeColor } from "../../utils"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import useNavigation from "../../hooks/useNavigation"
import { Linking } from 'react-native';

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center',
        padding:10,
        overflow:"hidden"
    }
})

const TabStyles=StyleSheet.create({
    sub_wrapper:{
        gap:26,
        borderRadius:40
    }
})

const MobileSStyles=StyleSheet.create({
    sub_wrapper:{
        gap:5,
        borderRadius:20
    },
    title:{
        fontSize:14
    },
    sub_title:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    sub_wrapper:{
        gap:10,
        borderRadius:30
    },
    title:{
        fontSize:16
    },
    sub_title:{
        fontSize:14
    },
    image:{
        width:100,
        height:100,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    sub_wrapper:{
        gap:10,
        borderRadius:30
    },
    title:{
        fontSize:16
    },
    sub_title:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Bannercard=(props:Banner & {index:number})=>{

    const Device=useRef(getDevice()).current
    const [path,navigate]=useNavigation()

    console.log(props)

    return(
        <Pressable onPress={()=>Linking.openURL(props.url)} style={[GeneralStyles.wrapper]}>
            <View><Image style={[{width:"100%",height:"auto",aspectRatio:1.6}]} source={props.image}/></View>
            {/* <View style={{alignSelf:"stretch",flexDirection:"column",alignItems:"flex-start",gap:5}}>
                <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text>
                <Text style={[styles[Device].sub_title,{textAlign:"left"},{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.7)}]}>{props.title}</Text>
            </View> */}
        </Pressable>
    )
}


export default Bannercard