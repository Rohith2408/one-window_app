import { StyleSheet, Text, View } from "react-native"
import { Package } from "../../types"
import { useRef } from "react"
import { getDevice, getLightThemeColor, getThemeColor } from "../../utils"
import { Fonts } from "../../constants"
import icon_purple from '../../assets/images/packages/purple.png'
import icon_red from '../../assets/images/packages/red.png'
import icon_teal from '../../assets/images/packages/teal.png'
import icon_yellow from '../../assets/images/packages/yellow.png'
import { Image } from "expo-image"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        borderRadius:20,
        display:"flex",
        flexDirection:'row',
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
    const icons=useRef([icon_purple,icon_red,icon_teal,icon_yellow]).current

    return(
        <View style={[GeneralStyles.wrapper,{gap:10}]}>
            <Image style={{width:30,height:30,objectFit:'contain'}} source={icons[props.index]}/>
            <View>
                <Text style={[styles[Device].name,{fontFamily:Fonts.NeutrifStudio.Regular,color:"rgba(0,0,0,0.4)"}]}>{props.name}</Text>
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
        </View>
    )
}

export default Packagecard