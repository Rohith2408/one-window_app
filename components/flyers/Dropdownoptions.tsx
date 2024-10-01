import { useEffect, useRef, useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
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
    },
    search:{
        padding:10,
        borderRadius:100
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
    const [page,setPage]=useState(0);
    let info=useRef(getBasket(props.basketid)).current
    const options=useRef([]);
    const [selected,setSelected]=useState<ListItem[]>(info.selected?info.selected:[])
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Card=info.options.card
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const itemsPerPage=useRef(9).current
    const maxPages=useRef((info.options.list.length/itemsPerPage)+(info.options.list.length%itemsPerPage!=0?1:0)).current
    const pageUpdated=useRef(false);
    const [selectionType,setSelectionType]=useState<"custom"|"default">("default");
    //const [custom,setCustom]=useState<string|undefined>(info.options.custom?info.selected:undefined);

    const selection=(data:any)=>{
        if(selected.find((item)=>info.options.idExtractor(item)==info.options.idExtractor(data))){
            setSelected(selected.filter((item)=>info.options.idExtractor(item)!=info.options.idExtractor(data)))
        }
        else
        {
            setSelected(info.selectionMode=="single"?[data]:[...selected,data])
        }
    }

    const onScroll=(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        if(page<maxPages)
        {
            if(!pageUpdated.current && (e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y>e.nativeEvent.contentSize.height))
            {
                setPage(page+1)
                pageUpdated.current=true
            }
            else
            {
                if((e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y<=e.nativeEvent.contentSize.height)){
                    pageUpdated.current=false
                }
            }
        }
    }

    // useEffect(()=>{
    //     //search.length>0?info.options.searchEvaluator?setoptions(options.map((item)=>info.options.searchEvaluator(item,search))):null:setoptions(info.options?.list?info.options.list:[])
    // },[search])

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
    if(info.options.searchEvaluator)
    {
        if(search)
        {
            //console.log(info.options.list.filter((item)=>{console.log(item,search,info.options.searchEvaluator(item,search));return info.options.searchEvaluator(item,search)}))
            options.current=info.options.list.filter((item)=>info.options.searchEvaluator(item,search)).slice(0,(page+1)*itemsPerPage);
        }
        else
        {
            options.current=info.options.list.slice(0,(page+1)*itemsPerPage)
        }
    }
    else{
        options.current=info.options.list.slice(0,(page+1)*itemsPerPage)
    }

    // useEffect(()=>{
    //     setSelected([]);
    // },[selectionType])

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
                        info.options.searchEvaluator
                        ?
                        <TextInput placeholder="Search..." style={[GeneralStyles.search,{borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)}]} value={search} onChangeText={(text)=>setSearch(text)}></TextInput>
                        :
                        null
                    }
                    {/* {
                        info.options.custom
                        ?
                        <Pressable onPress={()=>{setSelected([]);setSelectionType(selectionType=="custom"?"default":"custom")}}>
                            <Text>
                            { 
                                selectionType=="custom"
                                ?
                                info.options.custom.defaultMessage
                                :
                                info.options.custom.customMessage
                            }
                            </Text>
                        </Pressable>
                        :
                        null
                    } */}
                    {
                        selectionType=="custom"
                        ?
                        <View>
                            <TextInput placeholder="" style={[GeneralStyles.search,{borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)}]} onChangeText={(text)=>text.length==0?setSelected([]):selection({label:text,value:text})}></TextInput>
                            {/* <Pressable onPress={()=>selection({label:custom,value:custom})}><Text>Add</Text></Pressable> */}
                        </View>
                        :
                        <ScrollView onScroll={onScroll} style={[GeneralStyles.options_wrapper]} contentContainerStyle={{gap:15,paddingBottom:10}}>
                        {
                            options.current.map((item:any,i:number)=>
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
                    }
                </View>
            }
            </View>
        </View>
    )
}

export default Dropdownoptions