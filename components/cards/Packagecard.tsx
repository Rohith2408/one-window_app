import { StyleSheet, Text, View } from "react-native"
import { Package } from "../../types"
import { useRef } from "react"
import { getDevice, getLightThemeColor, getThemeColor } from "../../utils"
import { Fonts } from "../../constants"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        padding:10
    }
})

const TabStyles=StyleSheet.create({
    name:{
        fontSize:14
    },
    price:{
        fontSize:22
    },
    wrapper:{
        width:150,
        height:125,
    }
})

const MobileSStyles=StyleSheet.create({
    name:{
        fontSize:10
    },
    price:{
        fontSize:18
    },
    wrapper:{
        width:110,
        height:105,
    }
})

const MobileMStyles=StyleSheet.create({
    name:{
        fontSize:12
    },
    price:{
        fontSize:22
    },
    wrapper:{
        width:130,
        height:115,
    }
})

const MobileLStyles=StyleSheet.create({
    name:{
        fontSize:12
    },
    price:{
        fontSize:22
    },
    wrapper:{
        width:130,
        height:105,
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Packagecard=(props:Package & {index:number})=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.wrapper,styles[Device].wrapper,{gap:5,backgroundColor:getLightThemeColor(props.index)}]}>
            <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Regular,maxWidth:"90%"}]}>{props.name}</Text>
            <Text style={[styles[Device].price,{fontFamily:Fonts.NeutrifStudio.Medium,maxWidth:"90%"}]}>
            {
                props.priceDetails.totalPrice==0
                ?
                "Free"
                :
                props.priceDetails.currency.symbol+" "+props.priceDetails.totalPrice
            }
            </Text>
        </View>
    )
}

export default Packagecard