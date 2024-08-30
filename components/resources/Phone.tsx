import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Countrycode, Dropdown as DropdownType} from "../../types"
import Dropdown from "./Dropdown"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"
import { useRef } from "react"
import { Word2Sentence, getDevice } from "../../utils"
import { addToBasket } from "../../constants/basket"
import { Image } from "expo-image"
import verified_icon from '../../assets/images/misc/verified.png'

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
    },
    sub_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        alignItems:'center',
        gap:10,
    },
    verify_wrapper:{
        alignSelf:"center",
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

const Phone=(props:{codes:DropdownType,id:string,value:{countryCode:Countrycode[],phoneNumber:string,verified:boolean}})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()

    const phoneInput=(number:string)=>{
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:{...props.value,phoneNumber:number}}}}):null
    }

    const openVerification=()=>{
        addToBasket("phonenumber",{countryCode:props.value.countryCode[0].dial_code,number:props.value.phoneNumber})
        navigate?navigate({type:"AddScreen",payload:{screen:"Phoneverification"}}):null
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            {
                !props.value.verified
                ?
                <View style={[GeneralStyles.sub_wrapper]}>
                    <View style={{flex:2}}><Dropdown {...props.codes} value={props.value.countryCode} id={props.id}/></View>
                    <View style={[{flex:5,padding:10,flexDirection:"row"},!props.value.verified?{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}:{}]}>
                        <TextInput style={{flex:1}} onChangeText={(txt)=>phoneInput(txt)} value={props.value.phoneNumber}/>
                        <Pressable onPress={openVerification} style={[GeneralStyles.verify_wrapper,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]}><Text style={[styles[Device].verify,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular,padding:5}]}>Verify</Text></Pressable>
                    </View>
                </View>
                :
                <View style={[GeneralStyles.sub_wrapper]}>
                    <View style={{flex:1}}><Text style={{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}}>{Word2Sentence([props.value.countryCode[0].dial_code,props.value.phoneNumber],""," ")}</Text></View>
                    <Image source={verified_icon} style={[styles[Device].verified_icon]}></Image>
                </View>
            }
        </View>
    )
}

export default Phone