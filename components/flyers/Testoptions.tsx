
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
        fontSize:12,
        padding:10
    }
    
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:12,
        padding:10
    }
})
const MobileMStyles=StyleSheet.create({

    text:{
        fontSize:14,
        padding:10
    }
})
const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:12,
        padding:10
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
        <View style={{flex:1,paddingTop:10,gap:10}}>
        {
            Tests.filter((test)=>!store.getState().testscores.data?.find((item)=>item.name==test.name)).map((test)=>
            <Pressable onPress={()=>openForm(test.name)}>
                <Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{test.name}</Text>
            </Pressable>
            )
        }
        </View>
    )
}

export default Testoptions