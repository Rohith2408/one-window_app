import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { ServerResponse } from "../../types"
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
    },
    search:{
        padding:10,
        borderRadius:10
    }
})

const Dropdownoptionsasync=(props:{basketid:string})=>{

    let info=useRef(getBasket(props.basketid)).current
    const [options,setOptions]=useState(info.options?info.options:[])
    const [selected,setSelected]=useState<any[]>(info.selected?info.selected:[])
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const [search,setSearch]=useState(info.initialSearch?info.initialSearch:"")
    const Card=info.optionsCard

    const selection=(data:any)=>{
        if(selected.find((item)=>info.idExtractor(item)==info.idExtractor(data))){
            setSelected(selected.filter((item)=>info.idExtractor(item)!=info.keyExtractor(data)))
        }
        else
        {
            setSelected(info.selectionMode=="single"?[data]:[...selected,data])
        }
    }

    useEffect(()=>{
        info.optionsFetcher?info.optionsFetcher(search).then((res:ServerResponse)=>{
            //console.log("uni",JSON.stringify(res,null,2))
            res.success?setOptions(res.data.institutions.map((item:any)=>(info.optionsCard?item:{label:item.InstitutionName,value:item.InstitutionName}))):null
        }):null
    },[search])

    const apply=()=>{
        navigate?navigate({type:"RemoveScreen"}):null;
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:info?.fieldid,newvalue:info.selectedHandler?info.selectedHandler(selected):selected}}}):null
    }

    setLayoutAnimation()

    useEffect(()=>{
        info.optionsFetcher?info.optionsFetcher("National Institute Of technology").then((res:ServerResponse)=>{
            console.log("uni",JSON.stringify(res,null,2))
            res.success?setOptions(res.data.institutions.map((item:any)=>(info.optionsCard?item:{label:item.InstitutionName,value:item.InstitutionName}))):null
        }):null
    },[])

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
                    <TextInput placeholder="Search..." style={[GeneralStyles.search,{borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.25)}]} value={search} onChangeText={(text)=>setSearch(text)}></TextInput>
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
                                    <View style={{flex:1}}><Text style={[{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{item.label}</Text></View>
                                    {
                                        selected.find((selecteditem)=>info.idExtractor(selecteditem)==info.idExtractor(item))
                                        ?
                                        <Image source={tick_icon} style={[GeneralStyles.tick]}/>
                                        :
                                        null
                                    }
                                </View>
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