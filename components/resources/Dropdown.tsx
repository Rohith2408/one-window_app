import { useEffect, useRef, useState } from "react"
import { Dropdown as DropdownType, ListItem} from "../../types"
import { Animated, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket, removeFromBasket } from "../../constants/basket"
import { Fonts, Themes } from "../../constants"
import arrow_icon from '../../assets/images/misc/back.png'
import close_icon from '../../assets/images/misc/close.png'
import { Image } from "expo-image"
import { setLayoutAnimation } from "../../utils"

const GeneralStyles=StyleSheet.create({
    mainWrapper:{
        flex:1,
        position:"relative",
    },
    optionsWrapper:{
        position:"absolute",
        height:100,
        width:"100%",
        backgroundColor:'white',
        top:0
    },
    selecttext_wrapper:{
        display:"flex",
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:"#E3E3E3",
        padding:10,
        borderRadius:5
    },
    selected_wrapper:{
        display:"flex",
        flexDirection:'column',
        // gap:5,
        justifyContent:'center'
    },
    selecteditem_wrapper:{
        display:"flex",
        flexDirection:'row',
        alignItems:'center'
    },
    selected:{
        padding:10
    },
    close:{
        width:16,
        height:16,
        objectFit:"contain",
    }
})

const Dropdown=(props:DropdownType & {value:ListItem[],id:string})=>{

    const [path,navigate]=useNavigation()

    const onSelect=()=>{
        props.options?addToBasket(props.basketid,{options:props.options}):null
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Dropdownoptions",flyerdata:{basketid:props.basketid,selectionMode:props.selectionMode,id:props.id,selected:props.value}}}}):null
    }

    const removeSelected=(item:ListItem)=>{
        setLayoutAnimation()
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.id,newvalue:props.value.filter((data)=>data.label!=item.label)}}}):null
    }

    useEffect(()=>{
     
        return ()=>{
            removeFromBasket(props.basketid);
        }
    })

    console.log(props.selectionMode);

    return(
        <View style={[GeneralStyles.mainWrapper]}>
            <Pressable style={[GeneralStyles.selecttext_wrapper]} onPress={onSelect}>
                <View style={{flex:1}}><Text style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold,fontWeight:"700"}]}>{(props.selectionMode=="single" && props.value.length!=0)?props.value[0].label:"Select"}</Text></View>
                <Image source={arrow_icon} style={{width:10,height:10,resizeMode:"contain",transform:[{rotate:"-90deg"}]}}></Image>
            </Pressable>
            {
                props.selectionMode=="multi"
                ?
                <View style={[GeneralStyles.selected_wrapper]}>
                {
                    props.value?.map((item)=>
                    <View key={item.label} style={[GeneralStyles.selecteditem_wrapper]}>
                        <View style={{flex:1}}><Text style={[GeneralStyles.selected,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item.label}</Text></View>
                        <Pressable onPress={()=>removeSelected(item)}><Image source={close_icon} style={[GeneralStyles.close]}/></Pressable>
                    </View>
                    )
                }
                </View>
                :
                null
            }
            {/* {
                selectDimensions
                ?
                <Animated.View style={[styles.optionsWrapper,{height:Animated.multiply(100,scaleY),transform:[{translateY:selectDimensions.height}]}]}>
                    <ScrollView style={{flex:1}}>
                    {
                        props.options.map((option)=>
                        <Pressable onPress={()=>selection(option)} key={option.label}><Text>{option.label}</Text></Pressable>
                        )
                    }
                    </ScrollView>
                </Animated.View>
                :
                null
            } */}
        </View>
    )

}


export default Dropdown