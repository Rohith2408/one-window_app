import { StyleSheet, Text, View } from "react-native"
import { QuickFilterInfo } from "../../types"
import { Image } from "expo-image"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { Fonts, Themes } from "../../constants"
import icon_purple from '../../assets/images/quickfilters/purple.png'
import icon_red from '../../assets/images/quickfilters/red.png'
import icon_yellow from '../../assets/images/quickfilters/yellow.png'
import icon_teal from '../../assets/images/quickfilters/teal.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    }
})

const TabStyles=StyleSheet.create({
    icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    title:{
        fontSize:17
    }
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    title:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    title:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    title:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Quickfiltercard=(props:QuickFilterInfo & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const icons=useRef([icon_purple,icon_red,icon_yellow,icon_teal]).current;

    return(
        <View style={{display:'flex',flexDirection:'row',alignItems:"center",gap:5,padding:5,paddingLeft:10,paddingRight:10}}>
            <Image style={[styles[Device].icon]} source={icons[props.index]}/>
            <Text style={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.title}</Text>
        </View>
    )
}

export default Quickfiltercard