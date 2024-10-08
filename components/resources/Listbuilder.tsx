import { Image } from "expo-image"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import add_icon from '../../assets/images/misc/add.png'
import { useRef, useState } from "react"
import { getDevice } from "../../utils"
import useNavigation from "../../hooks/useNavigation"
import { Fonts, Themes } from "../../constants"


const GeneralStyles=StyleSheet.create({
    wrapper:{
        width:"100%",
        height:"100%",
        display:'flex',
        flexDirection:'column',
        gap:5
    },
    input_wrapper:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      gap:5
    },
    list_wrapper:{
        display:"flex",
        flex:1
    },
    list_subwrapper:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:5
    },
    input:{
        flex:1,
        alignSelf:"stretch",
        borderWidth:1,
        borderRadius:10,
        padding:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    list_wrapper:{
        padding:10
    },
    add:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    input:{
        fontSize:14
    },
    selected:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    list_wrapper:{
        padding:10
    },
    add:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    input:{
        fontSize:14
    },
    selected:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    list_wrapper:{
        padding:10
    },
    add:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    input:{
        fontSize:14
    },
    selected:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Listbuilder=(props:{placeholder:string,addHandler:(list:string[],current:string)=>any,value:string[],index:string})=>{

    const [item,setItem]=useState("")
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()

    const add=()=>{
        item?navigate?navigate(props.addHandler(props.value,item)):null:null
        setItem("")
    }

    return(
        <View style={[styles[Device].wrapper]}>
            <View style={[GeneralStyles.input_wrapper]}>
               <View style={{flex:1}}><TextInput placeholder={props.placeholder} value={item} onChangeText={(txt)=>setItem(txt)} style={[GeneralStyles.input,{borderColor:Themes.Light.OnewindowPrimaryBlue(0.1),fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}></TextInput></View>
               <Pressable onPress={add}><Image source={add_icon} style={[styles[Device].add]}/></Pressable>
            </View>
            <View style={[styles[Device].list_wrapper]}>
               <ScrollView style={[styles[Device].list_subwrapper]}>
                {
                    props.value.map((item)=>
                    <Pressable onPress={()=>add(item)}>
                        <Text style={[styles[Device].selected,{padding:10,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{item}</Text>
                    </Pressable>
                    )
                }
               </ScrollView>
            </View>
        </View>
    )
}

export default Listbuilder