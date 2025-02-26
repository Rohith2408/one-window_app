import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { ListItem, ServerResponse } from "../../types"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import tick_icon from '../../assets/images/misc/tick.png'
import { Image } from "expo-image"
import { getDevice, setLayoutAnimation } from "../../utils"
import loading_gif from '../../assets/images/misc/loader.gif'
import Styledtext from "../resources/Styledtext"
import Transitionview from "../resources/Transitionview"

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
    noitems_wrapper:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
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
    },
    search:{
        padding:10,
        borderRadius:10
    }
})

const TabStyles=StyleSheet.create({
    apply_text:{
        fontSize:16
    },
    item_text:{
        fontSize:18
    },
    custom_title:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    apply_text:{
        fontSize:14
    },
    item_text:{
        fontSize:14
    },
    custom_title:{
        fontSize:15
    }
})

const MobileMStyles=StyleSheet.create({
    apply_text:{
        fontSize:14
    },
    item_text:{
        fontSize:15
    },
    custom_title:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    apply_text:{
        fontSize:4
    },
    item_text:{
        fontSize:15
    },
    custom_title:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Dropdownoptionsasync=(props:{basketid:string,eventHandler:any})=>{

    let info=useRef(getBasket(props.basketid)).current
    const [options,setOptions]=useState([])
    const [selected,setSelected]=useState<any[]>(info.selected?info.selected:[])
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const [search,setSearch]=useState(info.initialSearch?info.initialSearch:"")
    const Card=info.options.card
    const [page,setPage]=useState(0);
    const itemsPerPage=useRef(9).current
    const maxPages=useRef(info.initialSearch?1:0);
    const pageUpdated=useRef(false);
    const [selectionType,setSelectionType]=useState<"custom"|"default">("default");
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const scrollRef=useRef<any>();
    const [dimensions,setDimensions]=useState<LayoutRectangle>()

    //console.log("inf",info.options);
    const selection=(data:any)=>{
        let sel;
        if(selected.find((item)=>info.options.idExtractor(item)==info.options.idExtractor(data))){
            sel=selected.filter((item)=>info.options.idExtractor(item)!=info.options.idExtractor(data))
        }
        else
        {
            sel=info.selectionMode=="single"?[data]:[...selected,data]
        }
        setSelected(sel)
        info.selectionMode=="single"?apply(sel):null;
    }

    const onScroll=(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        console.log("scroll",page,maxPages.current);
        if(page<maxPages.current)
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

    useEffect(()=>{
        if(search.length>0)
        {
            info.options.fetcher?info.options.fetcher(search).then((res:ServerResponse)=>{
                if(res.success)
                {
                    //console.log("ressssssAAA",res.data[0]);
                    maxPages.current=(res.data.length/itemsPerPage)+(res.data.length%itemsPerPage!=0?1:0)
                    console.log("max pages",maxPages.current);
                    setPage(0);
                    setOptions(res.data)
                }
            }):null
        }
    },[search])

    const apply=(selected:any)=>{
        info.eventHandler?info.eventHandler({name:"onSelect",data:selected,triggerBy:"dropdownoptions"}):null
        navigate?navigate({type:"RemoveScreen"}):null;
        navigate?navigate(info.apply?info.apply(selected):{type:"UpdateParam",payload:{param:"formupdate",newValue:{id:info?.fieldid,newvalue:selected}}}):null
    }

    setLayoutAnimation()

    useEffect(()=>{

    },[])

    const setScreen=(type:"default"|"custom")=>{
        if(dimensions && info.selectionMode=="single")
        {
            scrollRef.current.scrollTo({x: dimensions.width*(type=="custom"?1:0),animated: true})
        }
    }

    useEffect(()=>{
        setScreen(selectionType);
    },[selectionType,dimensions])

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,paddingTop:0}}>
            <ScrollView ref={scrollRef} horizontal scrollEnabled={false} style={{flex:1,gap:10}}>
                <View style={{width:dimensions?.width,height:dimensions?.height,padding:10}}>
                {
                    selected.length>0 && info.selectionMode!="single"
                    ?
                    <Pressable style={[GeneralStyles.apply,{borderColor:Themes.Light.OnewindowPrimaryBlue(1)}]} onPress={()=>apply(selected)}><Text style={[GeneralStyles.apply_text,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Apply</Text></Pressable>
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
                        <TextInput placeholder="Search..." style={[GeneralStyles.search,{borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)}]} value={search} onChangeText={(text)=>setSearch(text)}></TextInput>
                        {
                            options.length==0
                            ?
                            <View style={[GeneralStyles.noitems_wrapper]}>
                                <Styledtext styles={[{fontFamily:Fonts.NeutrifStudio.Medium}]} text="No items to show, try searching for something else!" focusWord="try searching"/>
                            </View>
                            :
                            <ScrollView keyboardShouldPersistTaps="handled" onScroll={onScroll} style={[GeneralStyles.options_wrapper]} contentContainerStyle={{gap:15,paddingBottom:10,paddingRight:10}}>
                            {
                                options.slice(0,(page+1)*itemsPerPage).map((item:any,i:number)=>
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
                {
                    info.selectionMode=="single" && info.options.allowCustomInput
                    ?
                    <Pressable style={{alignSelf:'flex-end'}} onPress={()=>setSelectionType("custom")}><Text style={{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.7)}}>Option not found?</Text></Pressable>
                    :
                    null
                }
            </View>
            <View style={{width:dimensions?.width,height:dimensions?.height,padding:15,paddingTop:20,gap:15}}>
                <Pressable onPress={()=>setSelectionType("default")}><Text style={[{color:Themes.Light.OnewindowPrimaryBlue(0.7),fontFamily:Fonts.NeutrifStudio.Regular}]}>Select from existing options?</Text></Pressable>
                <View style={{flex:1,gap:10}}>
                    <Styledtext styles={[styles[Device].custom_title,{fontFamily:Fonts.NeutrifStudio.Regular}]} focusWord="miss something" text="Did we miss something? You can add it manually!"/>
                    <TextInput style={[appStandardStyles.buttonWrapper,appStandardStyles.buttonText,{padding:10}]} onChangeText={(txt)=>setSelected([{label:txt,value:txt.toLocaleLowerCase()}])} placeholder="Enter the custom data here" value={selected[0]?.label}/>
                    {
                        selected[0]?.value 
                        ?
                        <Transitionview style={[{alignSelf:'flex-end'}]} effect="zoom"><Pressable style={[appStandardStyles.buttonWrapper]} onPress={()=>apply(selected)}><Text style={[appStandardStyles.buttonText]}>Submit</Text></Pressable></Transitionview>
                        :
                        null
                    }
                </View>
            </View>
        </ScrollView>
        </View>
    )
}

export default Dropdownoptionsasync