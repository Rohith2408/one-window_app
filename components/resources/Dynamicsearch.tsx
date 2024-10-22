import { useEffect, useRef, useState } from "react"
import {Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { getDevice} from "../../utils"
import Dynamicplaceholder from "./Dynamicplaceholder"

const GeneralStyles=StyleSheet.create({

})

const TabStyles=StyleSheet.create({
    search:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    search:{
        fontSize:14
    }
})
const MobileMStyles=StyleSheet.create({
    search:{
        fontSize:16
    }
})
const MobileLStyles=StyleSheet.create({
    search:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Dynamicsearch=(props:{onSearch:any,initialSearch:string})=>{

    const [mode,setMode]=useState<"display"|"input">(props.initialSearch?"input":"display")
    const [search,setSearch]=useState(props.initialSearch?props.initialSearch:"")
    const Device=useRef(getDevice()).current

    useEffect(()=>{
        props.onSearch(search)
    },[search])
    
    return(
        <View style={{padding:10}}>
        {
            mode=="display"
            ?
            <Pressable onPress={()=>setMode("input")} style={{flexDirection:"row",justifyContent:'center',alignItems:"center"}}>
                <Dynamicplaceholder />
            </Pressable>
            :
            <TextInput style={[styles[Device].search]} autoFocus value={search} onChangeText={(txt)=>setSearch(txt)} onBlur={()=>search.length==0?setMode("display"):null}/>
        }
        </View>
    )

}

export default Dynamicsearch

