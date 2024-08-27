import { useRef } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { getDevice } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"
import verified_icon from '../../assets/images/misc/verified.png'
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        alignItems:'center',
        padding:5
    },
    verify_wrapper:{
        borderWidth:1,
        borderRadius:20
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:14
    },
    verified_icon:{
        width:14,
        height:14,
        resizeMode:'contain'
    },
    verify:{
        fontSize:10
    }
})

const MobileMStyles=StyleSheet.create({
    
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Email=(props:{value:string,id:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const emailVerificationData=useAppSelector((state)=>state.verification).data?.find((item)=>item.type=="email")
    const [path,navigate]=useNavigation()

    const openVerification=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Emailverification"}}):null
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={{display:"flex",flex:1}}>
            {
                emailVerificationData?.status
                ?
                <Text style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.value}</Text>
                :
                <TextInput style={[styles[Device].text,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]} placeholder="Email..." value={props.value}></TextInput>
            }
            </View>
            <View>
            {
                false
                ?
                <Image source={verified_icon} style={[styles[Device].verified_icon]}></Image>
                :
                <Pressable onPress={openVerification} style={[GeneralStyles.verify_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}><Text style={[styles[Device].verify,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>Verify</Text></Pressable>
            }
            </View>
        </View>
    )
}

export default Email