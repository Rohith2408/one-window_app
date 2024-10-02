import { useEffect, useRef, useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { ServerResponse } from "../../types"
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
        // info.options.fetcher?info.options.fetcher(search).then((res:ServerResponse)=>{
        //     //console.log("uni",JSON.stringify(res,null,2))
        //     res.success?setOptions(res.data.institutions.map((item:any)=>(info.options.card?item:{label:item.InstitutionName,value:item.InstitutionName}))):null
        // }):null
    },[])

    //console.log(selected);

    return(
        <View style={{flex:1,paddingTop:10,gap:10}}>
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
                    <ScrollView onScroll={onScroll} style={[GeneralStyles.options_wrapper]} contentContainerStyle={{gap:15,paddingBottom:10}}>
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
                </View>
            }
            </View>
        </View>
    )
}

export default Dropdownoptionsasync