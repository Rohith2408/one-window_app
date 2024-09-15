import { StyleSheet, Text, View } from "react-native"
import { Advisor } from "../../types"
import { Word2Sentence, getDevice, setWordCase } from "../../utils"
import { Image } from "expo-image"
import { useRef } from "react"
import expert_icon from '../../assets/images/misc/expert.png'
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        flexDirection:'column',
        alignItems:"center",
        justifyContent:'center',
        position:"relative",
        padding:10
    },
    sub_wrapper:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        alignSelf:"stretch",
        padding:5
    },
    sub_wrapper1:{
        flex:1,
        display:"flex",
        flexDirection:"row",
        gap:5
    },
    sub_wrapper2:{
        display:'flex',
        flexDirection:'column',
        alignItems:"flex-end",
        justifyContent:"center",
        gap:5
    },
    icon_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start"
    },
    info_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        gap:7
    },
    role_wrapper:{
        borderRadius:100
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    wrapper:{
        gap:10,
        padding:20,
        borderRadius:25
    },
    sub_wrapper:{
        gap:10
    },
    icon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    name:{
        fontSize:14
    },
    email:{
        fontSize:10
    },
    role:{
        fontSize:10,
        color:"white",
        padding:3
    },
    assigned_for:{
        fontSize:10
    },
    countries:{
        fontSize:11
    }
})
const MobileMStyles=StyleSheet.create({
    wrapper:{
        gap:10,
        padding:15,
        borderRadius:25
    },
    sub_wrapper:{
        gap:15
    },
    icon:{
        width:22,
        height:22,
        resizeMode:'contain'
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

const Expertcard=(props:Advisor & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    
    return(
        <View style={[GeneralStyles.wrapper,styles[Device].wrapper,{backgroundColor:props.index%2==0?Themes.Light.OnewindowPurple(0.5):Themes.Light.OnewindowTeal(0.7)}]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <View style={[GeneralStyles.sub_wrapper1]}>
                    <View style={[GeneralStyles.icon_wrapper]}><Image source={expert_icon} style={[styles[Device].icon]}></Image></View>
                    <View style={[GeneralStyles.info_wrapper]}>
                        <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Bold}]}>{Word2Sentence([props.info.firstName,props.info.lastName],""," ")}</Text>
                        <Text style={[styles[Device].email,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{props.info.email}</Text>
                        <View style={[styles[Device].role_wrapper,{backgroundColor:props.index%2==0?Themes.Light.OnewindowPurple(1):Themes.Light.OnewindowTeal(1),borderRadius:100}]}><Text style={[styles[Device].role,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{setWordCase(props.info.role)}</Text></View>
                    </View>
                </View>
                <View style={[GeneralStyles.sub_wrapper2]}>
                    <Text style={[styles[Device].assigned_for,{textAlign:"right",fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>Assigned for</Text>
                    <Text style={[styles[Device].countries,{fontFamily:Fonts.NeutrifStudio.Medium}]}>{Word2Sentence(props.assignedCountries,"",",")}</Text>
                </View>
            </View>
        </View>
    )
    
}

export default Expertcard