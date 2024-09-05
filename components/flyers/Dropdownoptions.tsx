import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { getBasket, removeFromBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { ListItem } from "../../types"
import { Fonts, Themes } from "../../constants"
import tick_icon from '../../assets/images/misc/tick.png'
import { Image } from "expo-image"
import { getDevice, setLayoutAnimation } from "../../utils"
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

const TabStyles=StyleSheet.create({
    apply_text:{
        fontSize:16
    },
    item_text:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    apply_text:{
        fontSize:14
    },
    item_text:{
        fontSize:16
    }
})

const MobileMStyles=StyleSheet.create({
    apply_text:{
        fontSize:14
    },
    item_text:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    apply_text:{
        fontSize:16
    },
    item_text:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Dropdownoptions=(props:{basketid:string})=>{

    const [search,setSearch]=useState("");
    let info=useRef(getBasket(props.basketid)).current
    const [options,setoptions]=useState(info.options?.list?info.options.list:[])
    const [selected,setSelected]=useState<ListItem[]>(info.selected?info.selected:[])
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Card=info.options.card
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const selection=(data:any)=>{
        if(selected.find((item)=>info.options.idExtractor(item)==info.options.idExtractor(data))){
            setSelected(selected.filter((item)=>info.options.idExtractor(item)!=info.options.idExtractor(data)))
        }
        else
        {
            setSelected(info.selectionMode=="single"?[data]:[...selected,data])
        }
    }

    useEffect(()=>{
        //search.length>0?info.options.searchEvaluator?setoptions(options.map((item)=>info.options.searchEvaluator(item,search))):null:setoptions(info.options?.list?info.options.list:[])
    },[search])

    useEffect(()=>{
        return ()=>{
            removeFromBasket(props.basketid)
        }
    },[])

    const apply=()=>{
        //console.log("apply",info.apply)
        info.eventHandler?info.eventHandler({name:"onSelect",data:selected,triggerBy:"dropdownoptions"}):null
        navigate?navigate({type:"RemoveScreen"}):null;
        navigate?navigate(info.apply?info.apply(selected):{type:"UpdateParam",payload:{param:"formupdate",newValue:{id:info?.fieldid,newvalue:selected}}}):null
    }

    setLayoutAnimation()

    //console.log("oppp",info.selected,info.options)

    return(
        <View style={{flex:1,paddingTop:10,gap:10}}>
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
                <View style={{flex:1,gap:20,padding:10}}>
                    {
                        options.length>10 && info.options.searchEvaluator
                        ?
                        <TextInput placeholder="Search..." style={[GeneralStyles.search,{borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)}]} value={search} onChangeText={(text)=>setSearch(text)}></TextInput>
                        :
                        null
                    }
                    <ScrollView style={[GeneralStyles.options_wrapper]} contentContainerStyle={{gap:15,paddingBottom:10}}>
                    {
                        options.map((item:any,i:number)=>
                        <Pressable key={item.label} onPress={()=>selection(item)} style={[GeneralStyles.option_wrapper]}>
                        {
                            Card
                            ?
                            <Card key={item._id?item._id:i} {...item}/>
                            :
                            <View style={{flex:1}}>
                                <View style={{flex:1}}><Text style={[styles[Device].item_text,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item.label}</Text></View>
                            </View>
                        }
                        {
                            selected.find((selecteditem)=>info.options.idExtractor(selecteditem)==info.options.idExtractor(item))
                            ?
                            <Image source={tick_icon} style={[GeneralStyles.tick]}/>
                            :
                            null
                        }
                        </Pressable>
                        )
                    }
                    </ScrollView>
                </View>
            }
            </View>
        </View>
    )
}

export default Dropdownoptions