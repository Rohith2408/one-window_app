import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import Product from "../cards/Productcard"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { useRef } from "react"
import { getDevice } from "../../utils"
import { Image } from "expo-image"
import emptylist from '../../assets/images/illustrations/angry.png'
import { Fonts, Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:10,
        paddingTop:0,
        backgroundColor:'white'
    },
    products_wrapper:{
        width:"100%",
        display:'flex'
    }
})

const TabStyles=StyleSheet.create({
    products_wrapper:{
        gap:10
    },
    card:{
        // width:250,
        height:205
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products:{
        fontSize:15
    },
    no_products_image:{
        width:120,
        height:120,
        resizeMode:"contain"
    }
})

const MobileSStyles=StyleSheet.create({
    products_wrapper:{
        gap:10
    },
    card:{
        // width:250,
        height:205
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products:{
        fontSize:12
    },
    no_products_image:{
        width:90,
        height:90,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    products_wrapper:{
        gap:10
    },
    card:{
        // width:250,
        height:205
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products:{
        fontSize:12
    },
    no_products_image:{
        width:110,
        height:110,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    products_wrapper:{
        gap:10
    },
    card:{
        // width:250,
        height:205
    },
    loader_card:{
        width:250,
        height:205
    },
    no_products:{
        fontSize:14
    },
    no_products_image:{
        width:110,
        height:110,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Myproducts=()=>{

    const products=useAppSelector((state)=>state.products)
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            products.responseStatus=="recieved"
            ?
            <View style={{flex:1}}>
            {
                products.data.length==0
                ?
                <View style={{flex:1,justifyContent:'center',alignItems:'center',gap:10}}>
                    <Image source={emptylist} style={[styles[Device].no_products_image]}/>
                    <Text style={[styles[Device].no_products,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Not purchased any products yet!</Text>
                </View>
                :
                <ScrollView style={{flex:1}}>
                {
                    products.data.map((product,i)=>
                    <View style={[styles[Device].card,{padding:10}]}><Product {...product} index={i}/></View>
                    )
                }
                </ScrollView>
            }
            </View>
            :
            <Loadinglistscreen cardStyles={styles[Device].loader_card} cardGap={30} count={3} direction="vertical"/>
        }
        </View>
    )
}

export default Myproducts