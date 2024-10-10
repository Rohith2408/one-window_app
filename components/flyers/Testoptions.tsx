
import { Fonts, Tests, Themes } from "../../constants"
import { Pressable, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { store } from "../../store"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:13,
    },
    shortform:{
        fontSize:16,
    }
    
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:9,
    },
    shortform:{
        fontSize:12,
    }
})
const MobileMStyles=StyleSheet.create({

    text:{
        fontSize:11,
    },
    shortform:{
        fontSize:14,
    }
})
const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:11,
    },
    shortform:{
        fontSize:14,
    }
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Testoptions=()=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const openForm=(test:string)=>{
        // console.log("ll",JSON.stringify(testFields(test),null,2))
        navigate?navigate({type:"RemoveScreen"}):null
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:test,forminitialdataid:test}}}):null
    }

    return(
        <View style={{flex:1,padding:5,paddingTop:15,gap:20}}>
        {
            Tests.filter((test)=>!store.getState().testscores.data?.find((item)=>item.name==test.name)).map((test)=>
            <Pressable style={{gap:5}} onPress={()=>openForm(test.name)}>
                <Text style={[styles[Device].shortform,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{test.shortForm}</Text>
                <Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>{test.name}</Text>
            </Pressable>
            )
        }
        </View>
    )
}

export default Testoptions