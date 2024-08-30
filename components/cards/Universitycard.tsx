import { StyleSheet, Text, View } from "react-native"
import { UniversityListObj } from "../../types"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        padding:15
    },
    sub_wrapper:{
        display:"flex",
        flexDirection:"row",
        flex:1,
        gap:7
    }
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

const Universitycard=(props:UniversityListObj)=>{
    return(
        <View style={{flexDirection:"column"}}>
            <Text>{props.name}</Text>
            <Text>{props.location.country}</Text>
        </View>
    )
}

export default Universitycard