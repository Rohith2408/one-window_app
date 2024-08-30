import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { ListItem, ServerResponse, UniversityListObj, UniversitySearchObj } from "../../types"
import { Word2Sentence, getDevice, getServerRequestURL, getThemeColor, serverRequest } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"
import location_icon from '../../assets/images/misc/location.png'
import go_icon from '../../assets/images/misc/back.png'
import discipline_icon from '../../assets/images/misc/discipline.png'
import useNavigation from "../../hooks/useNavigation"
import { getBasket } from "../../constants/basket"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:'column',
        gap:10,
        padding:10
    },
    list_wrapper:{
        display:'flex',
        flexDirection:"column",
        gap:10
    },
    list_heading_wrapper:{
        display:'flex',
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:"center"
    },
    uni_wrapper:{
        alignSelf:'stretch',
        display:"flex",
        flexDirection:"row",
        gap:5,
        justifyContent:"center",
        alignItems:"flex-start",
        padding:7
    },
    uni_info_wrapper:{
        display:"flex",
        flex:1,
        alignSelf:'stretch',
        flexDirection:"column",
        gap:8
    },
    discipline_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        gap:5,
        padding:3
    },
    subdiscipline_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        gap:5,
        padding:3
    },
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    list_heading:{
        fontSize:12
    },
    uni_icon:{
        width:15,
        height:15,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:15,
        height:15,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:12
    },
    uni_text2:{
        fontSize:10
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    },
    discipline_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    discipline:{
        fontSize:12
    },
    subdiscipline:{
        fontSize:12
    }
})
const MobileMStyles=StyleSheet.create({
    
})
const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Search=()=>{

    console.log("aaaaaa",getBasket("search"))
    const Device=useRef(getDevice()).current
    const [search,setSearch]=useState(getBasket("search")?getBasket("search").searchString:"")
    const [lists,setLists]=useState({disciplines: [], institutions: [], subDisciplines: [], universities: []})
    const [path,navigate]=useNavigation()

    const fetchList=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("regex","GET",{search:search.trim(),institutions:0,universities:1,disciplines:1,subDisciplines:1}),
            reqType:"GET"
        })
        res.success?setLists(res.data):null
    }

    const select=(item:ListItem,type:string)=>{
        console.log("item",item);
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}}):null
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"programs",programsadditionalfilters:[{type:type,data:[item]}],programsquickfilters:[],search:search,programspage:1}}}):null
        },200)
    }

    useEffect(()=>{
        search?fetchList():null
    },[search])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <TextInput value={search} style={{padding:7,fontFamily:Fonts.NeutrifStudio.Bold,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(1),color:Themes.Light.OnewindowPrimaryBlue(1),borderRadius:10}} onChangeText={(text)=>setSearch(text)}></TextInput>
            <View style={{flex:1,gap:20}}>
                <View style={[{flex:lists.universities.length==0?0:2},GeneralStyles.list_wrapper]}>
                    <View style={[styles[Device].list_heading_wrapper]}>
                        <Text style={[styles[Device].list_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Universities</Text>
                    </View>
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:15}}>
                    {
                        lists.universities.map((university:UniversitySearchObj,i)=>
                        <Pressable onPress={()=>select({label:university.name,value:university._id},"universityId")} style={[GeneralStyles.uni_wrapper]}>
                            <View style={[styles[Device].uni_icon_bg,{position:"absolute",backgroundColor:getThemeColor(i%4)}]}></View>
                            <Image source={university.logoSrc} style={[{position:'relative'},styles[Device].uni_icon]}/>
                            <View style={[styles[Device].uni_info_wrapper,GeneralStyles.uni_info_wrapper]}>
                                <Text style={[styles[Device].uni_text1,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([university.name,university.code],"","|")}</Text>
                                <View style={{flexDirection:"row",gap:3}}>
                                    <Image source={location_icon} style={[styles[Device].location_icon]}/>
                                    <Text style={[styles[Device].uni_text2,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{Word2Sentence([university.location.city,university.location.state,university.location.country],"")}</Text>
                                </View>
                            </View>
                            <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
                        </Pressable>
                        )
                    }
                    </ScrollView>
                </View>
                <View style={[{flex:lists.disciplines.length==0?0:1},GeneralStyles.list_wrapper]}>
                    <View style={[styles[Device].list_heading_wrapper]}>
                        <Text style={[styles[Device].list_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Disciplines</Text>
                    </View>
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:15}}>
                    {
                        lists.disciplines.map((discipline:string,i)=>
                        <Pressable style={[GeneralStyles.discipline_wrapper]}>
                            <Image source={discipline_icon} style={[{position:'relative'},styles[Device].discipline_icon]}/>
                            <View style={[{flex:1}]}>
                                <Text style={[styles[Device].discipline,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{discipline}</Text>
                            </View>
                            <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
                        </Pressable>
                        )
                    }
                    </ScrollView>
                </View>
                <View style={[{flex:lists.subDisciplines.length==0?0:1},GeneralStyles.list_wrapper]}>
                    <View style={[styles[Device].list_heading_wrapper]}>
                        <Text style={[styles[Device].list_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Sub-Disciplines</Text>
                    </View>
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:15}}>
                    {
                        lists.subDisciplines.map((subdiscipline:string,i)=>
                        <Pressable style={[GeneralStyles.subdiscipline_wrapper]}>
                            <Image source={discipline_icon} style={[{position:'relative'},styles[Device].discipline_icon]}/>
                            <View style={[{flex:1}]}>
                                <Text style={[styles[Device].subdiscipline,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{subdiscipline}</Text>
                            </View>
                            <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
                        </Pressable>
                        )
                    }
                    </ScrollView>
                </View>
            </View>
        </View>
    )

}

export default Search

