import { useRef } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Word2Sentence, getDevice } from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import Dropdown from "./Dropdown"
import { Image } from "expo-image"
import { Fonts, Themes } from "../../constants"
import { Countrycode, Dropdown as DropdownType, Event} from "../../types"
import { addToBasket } from "../../constants/basket"

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
    text:{
        fontSize:14
    },
    verified_icon:{
        width:16,
        height:16,
        resizeMode:'contain'
    },
    verify:{
        fontSize:10
    }
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Phoneinput=(props:{codes:DropdownType,eventHandler:(event:Event)=>void,id:string,value:{countryCode:Countrycode[],phoneNumber:string}})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()

    const phoneInput=(number:string)=>{
        console.log("phone",props.value,{...props.value,phoneNumber:number})
        //navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:date?.toISOString()}}}):null
        props.eventHandler({name:"phone-input",data:{...props.value,phoneNumber:number},triggerBy:"phoneinput"})
    }

    const codeSelected=(data:Event)=>{
        console.log("code",{...props.value,countryCode:data.data})
        props.eventHandler({name:"phone-input",data:{...props.value,countryCode:data.data},triggerBy:"phoneinput"})
    }

    console.log("phone input",props.value);

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={{flex:2}}><Dropdown eventHandler={codeSelected} {...props.codes} value={props.value.countryCode} id={props.id}/></View>
                <View style={[{flex:5,padding:10,flexDirection:"row"},!props.value.verified?{borderWidth:1,borderRadius:5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.1)}:{}]}>
                    <TextInput style={{flex:1,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}} onChangeText={(txt)=>phoneInput(txt)} value={props.value.phoneNumber}/>
                </View>
            </View>
        </View>
    )
}

export default Phoneinput