import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { ListItem } from "../../types"
import { Fonts, Themes } from "../../constants"
import tick_icon from '../../assets/images/misc/tick.png'
import { Image } from "expo-image"
import { setLayoutAnimation } from "../../utils"
import loading_gif from '../../assets/images/misc/loader.gif'

const GeneralStyles=StyleSheet.create({
    options_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:"column",
    },
    option_wrapper:{
        padding:10,
        flexDirection:"row",
        borderRadius:10
    },
    apply:{
        alignSelf:"flex-end",
        borderRadius:100,
        borderWidth:1
    },
    apply_text:{
        fontSize:12,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:8,
        paddingRight:8,
        fontWeight:"500"
    },
    tick:{
        width:14,
        height:14,
        objectFit:'contain'
    }
})

const Dropdownoptions=(props:{basketid:string})=>{

    let info=useRef(getBasket(props.basketid)).current
    const [selected,setSelected]=useState<ListItem[]>(info.selected?info.selected:[])
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const selection=(data:ListItem)=>{
        if(selected.find((item)=>item.label==data.label))
        {
            setSelected(selected.filter((item)=>item.label!=data.label))
        }
        else
        {
            setSelected([...selected,data])
        }
    }

    useEffect(()=>{
        // if(info.optionsFetcher)
        // {
        //     setIsLoading(true);
        //     info.optionsFetcher().then((res:ListItem[])=>options.current=res)
        // }
        // else
        // {
            
        // }
    },[])

    const apply=()=>{
        console.log("apply",selected)
        navigate?navigate({type:"RemoveScreen"}):null;
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:info?.fieldid,newvalue:selected}}}):null
    }

    setLayoutAnimation()

    return(
        <View style={{flex:1,gap:10}}>
            {
                selected.length>0
                ?
                <Pressable style={[GeneralStyles.apply,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]} onPress={apply}><Text style={[GeneralStyles.apply_text,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Apply</Text></Pressable>
                :
                null
            }
            <View style={{flex:1}}>
            {
                isLoading
                ?
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Image style={{width:24,height:24,resizeMode:"contain"}} source={loading_gif}></Image></View>
                :
                <ScrollView style={[GeneralStyles.options_wrapper]} contentContainerStyle={{gap:10,paddingBottom:10}}>
                {
                    info.options.map((item:{label:string,value:string})=>
                    <Pressable key={item.label} onPress={()=>selection(item)} style={[GeneralStyles.option_wrapper]}>
                        <View style={{flex:1}}><Text style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item.label}</Text></View>
                        {
                            selected.find((sitem)=>sitem.label==item.label)
                            ?
                            <Image source={tick_icon} style={[GeneralStyles.tick]}/>
                            :
                            null
                        }
                    </Pressable>
                    )
                }
                </ScrollView>
            }
            </View>
        </View>
    )
}

export default Dropdownoptions