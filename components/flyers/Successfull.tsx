import { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { getDevice } from "../../utils"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setRemoveScreen } from "../../store/slices/removeScreenSlice"
const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        paddingTop:20,
        justifyContent:"center",
        alignItems:'center',
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:30
    },
    subtext:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:26
    },
    subtext:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    text:{
        fontSize:28
    },
    subtext:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:24
    },
    subtext:{
        fontSize:16
    }
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Successfull=(props:{message:string,preventAutoHide?:boolean,hideInterval?:number})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()

    useEffect(()=>{
        if(!props.preventAutoHide)
        {
            setTimeout(()=>{
                dispatch(setRemoveScreen({id:"Successfull"}))
                //navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}}):null
            },props.hideInterval?props.hideInterval:2500)
        }
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginSmall]}>
            <Text style={[styles[Device].text,{color:"green",fontFamily:Fonts.NeutrifStudio.Bold}]}>Success!</Text>
            <Text style={[styles[Device].subtext,{textAlign:"center",color:Themes.Light.OnewindowPrimaryBlue(0.4),fontFamily:Fonts.NeutrifStudio.Regular}]}>{props.message}</Text>
        </View>
    )
}

export default Successfull