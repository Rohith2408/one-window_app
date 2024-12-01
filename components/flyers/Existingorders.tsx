import { useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import useNavigation from "../../hooks/useNavigation"
import sample_pic from '../../assets/images/misc/sampledp.png'
import loader from '../../assets/images/misc/loader.gif'
import { formatDate, getDevice, profileUpdator } from "../../utils"
import * as ImagePicker from 'expo-image-picker';
import { Order, Package, Product, ServerResponse } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setSharedInfo } from "../../store/slices/sharedinfoSlice"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Image } from "expo-image"
import Listselection from "../resources/Listselection"
import Ordercard from "../cards/Ordercard"
import { addToBasket, getBasket } from "../../constants/basket"
import Ordercompactcard from "../cards/Ordercompactcard"
import Styledtext from "../resources/Styledtext"
import { setRemoveScreen } from "../../store/slices/removeScreenSlice"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1
    }
})

const TabStyles=StyleSheet.create({
    option:{
        fontSize:12
    },
    heading:{
        fontSize:14
    },
    checkout:{
        fontSize:18
    },
})

const MobileSStyles=StyleSheet.create({
    option:{
        fontSize:12
    },
    heading:{
        fontSize:14,
        lineHeight:20
    },
    checkout:{
        fontSize:14
    },
})

const MobileMStyles=StyleSheet.create({
    option:{
        fontSize:16
    },
    heading:{
        fontSize:16,
        lineHeight:24
    },
    checkout:{
        fontSize:16
    },
})

const MobileLStyles=StyleSheet.create({
    option:{
        fontSize:14
    },
    heading:{
        fontSize:16,
        lineHeight:24
    },
    checkout:{
        fontSize:16
    },
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Existingorders=()=>{

    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()
    const orders=useAppSelector((state)=>state.orders).data.filter((item)=>item.Package && (item.products.length!=item.Package.products.reduce((acc,curr)=>(acc+curr.quantity),0)))
    const [selected,setSelected]=useState<undefined|Order>(undefined)
    const [loading,setloading]=useState(false);
    const orderinfo:{package:Package|undefined,products:Product[]}=getBasket("orderinfo");

    const onselect=(order:Order[])=>{
        setSelected(order[0])
    }

    const addToExisting=()=>{
        console.log("add to ",selected?.Package,orderinfo.products)
        addToBasket("orderinfo",{
            orderId:selected?._id,
            //package:selected?.Package,
            products:orderinfo.products
        }) 
        dispatch(setRemoveScreen({id:"Existingorders"}))
        //navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}})
        navigate?navigate({type:"AddScreen",payload:{screen:"Addtoorder",params:{orderinfoid:"orderinfo"}}}):null
    }

    const newOrder=()=>{
        dispatch(setRemoveScreen({id:"Existingorders"}))
        //navigate({type:"RemoveSpecificScreen",payload:{id:"Flyer"}})
        navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:"orderinfo"}}}):null
    }

    return(
        <View style={[GeneralStyles.wrapper,appStandardStyles.screenMarginSmall,{paddingTop:20,paddingBottom:20,gap:10}]}>
            <Styledtext styles={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Medium}]} text="Do you want to add the products to an existing purchase?" focusWord="products"/>
            {/* <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}></Text> */}
            <View style={{flex:1}}>
            <Listselection
                {...{
                    direction:"vertical",
                    selectionStyle:"tick",
                    styles:{contentcontainer:{gap:10}},
                    onselect:onselect,
                    onselection:onselect,
                    initialSelection:[],
                    options:{
                        list:orders,
                        idExtractor:(item:Order)=>item._id,
                        card:Ordercompactcard,
                        selectionMode:"single"
                    }}}
                />
            </View>
            <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center',gap:10}}>
                {
                    selected
                    ?
                    <Pressable style={{alignSelf:"center",padding:5,paddingLeft:15,paddingRight:15,borderRadius:100,borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={addToExisting}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Add To Existing Order</Text></Pressable>
                    :
                    null
                }
                <Pressable style={{alignSelf:"center",padding:5,paddingLeft:15,paddingRight:15,borderRadius:100,borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}} onPress={newOrder}><Text style={[styles[Device].checkout,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1),padding:7.5}]}>Place a new Order</Text></Pressable>
            </View>
        </View>
    )

}

export default Existingorders