
import { Fonts, Tests, Themes, appStandardStyles, setComponentInfo } from "../../constants"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { store } from "../../store"
import Styledtext from "../resources/Styledtext"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setRemoveScreen } from "../../store/slices/removeScreenSlice"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:16,
    },
    shortform:{
        fontSize:20,
    },
    title:{
        fontSize:20
    }
    
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:10,
    },
    shortform:{
        fontSize:14,
    },
    title:{
        fontSize:16
    }
})
const MobileMStyles=StyleSheet.create({

    text:{
        fontSize:12,
    },
    shortform:{
        fontSize:16,
    },
    title:{
        fontSize:18
    }
})
const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:12,
    },
    shortform:{
        fontSize:16,
    },
    title:{
        fontSize:18
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
    const dispatch=useAppDispatch()

    const openForm=(test:string)=>{
        setComponentInfo("Form","title","Test")
        dispatch(setRemoveScreen({id:"Testoptions"}));
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:test,forminitialdataid:test}}}):null
    }

    return(
        <View style={[appStandardStyles.screenMarginSmall,{paddingTop:20,gap:10}]}>
            <Styledtext styles={[styles[Device].title,appStandardStyles.screenMarginSmall,{fontFamily:Fonts.NeutrifStudio.Medium}]} focusWord="test" text="Select the test"/>
            <ScrollView contentContainerStyle={{gap:30,padding:15}}>
            {
                Tests.filter((test)=>!store.getState().testscores.data?.find((item)=>item.name==test.name)).map((test)=>
                <Pressable style={{flexDirection:"column",gap:5}} onPress={()=>openForm(test.name)}>
                    <Text style={[styles[Device].shortform,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{test.shortForm}</Text>
                    <Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>{test.name}</Text>
                </Pressable>
                )
            }
            </ScrollView>
        </View>
    )
}

export default Testoptions