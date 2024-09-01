import { useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { getDevice } from "../../utils"
import Form from "../resources/Form"
import { Fonts, Themes } from "../../constants"
import useNavigation from "../../hooks/useNavigation"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1
    },
    header_wrapper:{
        padding:0,
        position:"relative",
        display:"flex",
        justifyContent:"center",
        alignItems:'center'

    },
    header_wrapper_bg:{
        position:"absolute",
        padding:20,
        top:0,
        left:0,
        height:"125%",
        width:"100%",
        zIndex:-1
    },
    header_subwrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        padding:30,
        backgroundColor:'red'
    },
    name_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"flex-start",
        gap:5
    },
    dp_wrapper:{
        display:"flex",
        position:"relative"
    },
    dp_bg:{
        position:"absolute",
        zIndex:-1,
        borderRadius:100
    },
    body_wrapper:{
        flex:1,
        padding:20,
        gap:20,
        backgroundColor:'white',
        borderRadius:30
    },
    actions_wrapper:{
        display:"flex",
        flexDirection:"column",
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    header_wrapper:{
        height:125,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    login:{
        fontSize:24
    },
    forgot:{
        fontSize:12
    },
    noaccount:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    header_wrapper:{
        height:135,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    login:{
        fontSize:24
    },
    forgot:{
        fontSize:12
    },
    noaccount:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    header_wrapper:{
        height:170,
        width:"100%",
        display:"flex",
    },
    name:{
        fontSize:18
    },
    email:{
        fontSize:12
    },
    card_wrapper:{
        height:100,
        width:"100%"
    },
    login:{
        fontSize:24
    },
    forgot:{
        fontSize:14
    },
    noaccount:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Registerbase=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()

    const openLogin=()=>{
        navigate?navigate({type:"Logout"}):null
        setTimeout(()=>{
            navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Register"}}):null
        },200)
    }

    return(
        <View style={[GeneralStyles.wrapper]}>
            <View style={[GeneralStyles.header_wrapper,styles[Device].header_wrapper]}>
                <View style={[GeneralStyles.header_wrapper_bg,{backgroundColor:Themes.Light.OnewindowRed(1)}]}></View>
                <Text style={[styles[Device].login,{fontFamily:Fonts.NeutrifStudio.Bold,color:"#DF6A5A"}]}>Register</Text>
            </View>
            <View style={[GeneralStyles.body_wrapper]}>
                <Form formid="Register" />
                <View style={[GeneralStyles.actions_wrapper]}>
                    <View>
                        <Pressable onPress={openLogin}><Text style={[styles[Device].noaccount,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Already have an account?</Text></Pressable>
                    </View>
                    {/* <View>
                        <Text style={[styles[Device].forgot,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Forgot Password?</Text>
                    </View> */}
                </View>
            </View>
        </View>
    )
}

export default Registerbase