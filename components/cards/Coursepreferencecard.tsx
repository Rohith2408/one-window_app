import { useRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { getDevice } from "../../utils"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    
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

const Coursepreferencecard=(props:{preference:string})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <Pressable>
            <View style={{flex:1}}><Text>{props.preference}</Text></View>
        </Pressable>
    )
}

export default Coursepreferencecard