import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { ListItem, ServerResponse, UniversityListObj, UniversitySearchObj } from "../../types"
import { Word2Sentence, getDevice, getServerRequestURL, getThemeColor, serverRequest, truncateString } from "../../utils"
import { Fonts, Themes, appStandardStyles, disciplines, subDisciplines, topUniversities } from "../../constants"
import { Image } from "expo-image"
import go_icon from '../../assets/images/misc/back.png'
import discipline_icon from '../../assets/images/misc/discipline.png'
import sample_illustration from '../../assets/images/illustrations/sad_male.png'
import useNavigation from "../../hooks/useNavigation"
import { getBasket } from "../../constants/basket"
import Loader from "../resources/Loader"
import Listselection from "../resources/Listselection"
import Universitysearchcard from "../cards/Universitysearchcard"
import Dynamicsearch from "../resources/Dynamicsearch"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:'column',
        gap:25,
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
    }
})

const TabStyles=StyleSheet.create({
    uni_icon:{
        width:20,
        height:20,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:20,
        height:20,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:18
    },
    uni_text2:{
        fontSize:16
    },
    location_icon:{
        width:12,
        height:12,
        resizeMode:"contain"
    },
    go_icon:{
        width:7,
        height:7,
        resizeMode:"contain"
    },
    discipline_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    discipline:{
        fontSize:18
    },
    subdiscipline:{
        fontSize:18
    },
    loader:{
        width:22,
        height:22,
        objectFit:"contain"
    },
    not_found:{
        fontSize:20
    },
    not_found_sub:{
        fontSize:16
    },
    illustration:{
        width:210,
        height:210,
        resizeMode:"contain"
    },
    search:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
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
        fontSize:13
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
        fontSize:13
    },
    subdiscipline:{
        fontSize:13
    },
    loader:{
        width:18,
        height:18,
        objectFit:"contain"
    },
    not_found:{
        fontSize:18
    },
    not_found_sub:{
        fontSize:12
    },
    illustration:{
        width:200,
        aspectRatio:2,
        resizeMode:"contain"
    },
    search:{
        fontSize:14
    }
})
const MobileMStyles=StyleSheet.create({
    list_heading:{
        fontSize:12
    },
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:19,
        height:19,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:14
    },
    uni_text2:{
        fontSize:12
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    go_icon:{
        width:9,
        height:9,
        resizeMode:"contain"
    },
    discipline_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    discipline:{
        fontSize:14
    },
    subdiscipline:{
        fontSize:14
    },
    not_found:{
        fontSize:18
    },
    not_found_sub:{
        fontSize:14
    },
    illustration:{
        width:250,
        aspectRatio:2,
        resizeMode:"contain"
    },
    search:{
        fontSize:16
    }
})
const MobileLStyles=StyleSheet.create({
    list_heading:{
        fontSize:12
    },
    uni_icon:{
        width:19,
        height:19,
        resizeMode:"contain",
        borderRadius:100
    },
    uni_icon_bg:{
        width:19,
        height:19,
        borderRadius:100,
        left:3,
        top:10
    },
    uni_text1:{
        fontSize:14
    },
    uni_text2:{
        fontSize:12
    },
    location_icon:{
        width:10,
        height:10,
        resizeMode:"contain"
    },
    go_icon:{
        width:9,
        height:9,
        resizeMode:"contain"
    },
    discipline_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    discipline:{
        fontSize:14
    },
    subdiscipline:{
        fontSize:14
    },
    not_found:{
        fontSize:18
    },
    not_found_sub:{
        fontSize:14
    },
    illustration:{
        width:250,
        aspectRatio:2,
        resizeMode:"contain"
    },
    search:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Search=(props:{initialSearch:string})=>{

    const Device=useRef(getDevice()).current
    const [search,setSearch]=useState(props.initialSearch?props.initialSearch:"")
    const [lists,setLists]=useState({disciplines:undefined, institutions:undefined, subDisciplines: undefined, universities: undefined})
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const tabs=useRef([
        {label:"Universities",value:"universities"},
        {label:"Disciplines",value:"disciplines"},
        {label:"Sub-Disciplines",value:"subdisciplines"}
    ]).current
    const scrollRef=useRef<any>();
    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:0,height:0,x:0,y:0})

    const fetchList=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("regex","GET",{search:search.trim(),institutions:0,universities:1,disciplines:1,subDisciplines:1}),
            routeType:"public",
            reqType:"GET"
        })
        setIsLoading(false);
        res.success?setLists(res.data):null
    }

    const select=(item:ListItem,type:string)=>{
        console.log("Selected",JSON.stringify([{type:type,data:[item]}],null,2));
        navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}})
        setTimeout(()=>{
            let programslistquery={search:search,additionalFilters:[{type:type,data:[item]}],quickFilters:[],page:1}
            let universitieslistquery={search:"",additionalFilters:[{type:"search",data:[{label:search,value:search}]}],quickFilters:[],page:1}
            navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:"Programs",programslistquery:programslistquery,universitieslistquery:universitieslistquery}}})
        },200)
    }

    const tabSelected=(selected:ListItem[])=>{
        scrollRef.current?scrollRef.current.scrollTo({x:dimensions.width*(tabs.findIndex((tab)=>tab.label==selected[0].label)),animated:true}):null
    }

    const onSearch=(txt:string)=>{
        setSearch(txt);
    }


    useEffect(()=>{
        search?fetchList():null
    },[search])

    return(
        <View style={[GeneralStyles.main_wrapper,appStandardStyles.screenMarginMini]}>
            <View style={{flexDirection:'row',alignItems:'center',borderRadius:100,borderWidth:1.5,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2)}}>
                <View style={{flex:1}}>
                    <Dynamicsearch initialSearch={props.initialSearch} onSearch={onSearch}/>
                    {/* <TextInput value={search} style={{padding:7,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}} onChangeText={(text)=>setSearch(text)}></TextInput> */}
                </View>
                <View style={{paddingRight:10}}><Loader isLoading={isLoading} loaderStyles={styles[Device].loader}/></View>
            </View>
            <View style={{flex:1,gap:20}}>
                <Listselection 
                    direction="horizontal"
                    selectionStyle="border"
                    initialSelection={[{label:"Universities",value:"universities"}]}
                    styles={{contentcontainer:{gap:10}}}
                    onselection={tabSelected}
                    options={{
                        list:tabs,
                        idExtractor:(data:ListItem)=>data.label,
                        labelExtractor:(data:any)=>data.label,
                        selectionMode:"single"
                    }}
                />
                <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={[{flex:1},GeneralStyles.list_wrapper]}>
                    {
                        dimensions
                        ?
                        <ScrollView scrollEnabled={false} horizontal ref={scrollRef} style={{flex:1}}>
                            <View style={{width:dimensions.width,height:dimensions.height}}>
                            {
                                lists.universities
                                ?
                                    lists.universities.length==0
                                    ?
                                    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
                                        <Image source={sample_illustration} style={[styles[Device].illustration]}/>
                                        <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{"University not found "+":("}</Text>
                                        <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Don't worry there are over 8000+ Universities to explore!</Text>
                                    </View>
                                    :
                                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:20}}>
                                    {
                                        lists.universities.map((university:UniversitySearchObj,i)=>
                                            <Pressable onPress={()=>select({label:university.name,value:university._id},"universityId")}><Universitysearchcard {...university} index={i}/></Pressable>
                                        )
                                    }
                                    </ScrollView>
                                :
                                <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
                                    <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Lets gooo!</Text>
                                    <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>We have got over 8000+ Universities, start exploring now!</Text>
                                </View>
                            }
                            </View>
                            <View style={{width:dimensions.width,height:dimensions.height}}>
                            {
                                lists.disciplines
                                ?
                                    lists.disciplines.length==0
                                    ?
                                    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:5}}>
                                        <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{"Discipline not found "+":("}</Text>
                                        <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>No matching discipline!!</Text>
                                    </View>
                                    :
                                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:20}}>
                                    {
                                        lists.disciplines.map((discipline:string,i)=>
                                        <Pressable onPress={()=>select({label:discipline,value:discipline},"discipline")} style={[GeneralStyles.discipline_wrapper]}>
                                            <Image source={discipline_icon} style={[{position:'relative'},styles[Device].discipline_icon]}/>
                                            <View style={[{flex:1}]}>
                                                <Text style={[styles[Device].discipline,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{discipline}</Text>
                                            </View>
                                            <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
                                        </Pressable>
                                        )
                                    }
                                    </ScrollView>
                                :
                                <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
                                    <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Lets gooo!</Text>
                                    <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Start exploring now!</Text>
                                </View>
                            }
                            </View>
                            <View style={{width:dimensions.width,height:dimensions.height}}>
                            {
                                lists.subDisciplines
                                ?
                                    lists.subDisciplines.length==0
                                    ?
                                    <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:5}}>
                                        <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{"Sub-Discipline not found "+":("}</Text>
                                        <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>No matching sub-discipline!!</Text>
                                    </View>
                                    :
                                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:20}}>
                                    {
                                        lists.subDisciplines.map((subdiscipline:string,i)=>
                                        <Pressable onPress={()=>select({label:subdiscipline,value:subdiscipline},"subDiscipline")} style={[GeneralStyles.subdiscipline_wrapper]}>
                                            <Image source={discipline_icon} style={[{position:'relative'},styles[Device].discipline_icon]}/>
                                            <View style={[{flex:1}]}>
                                                <Text style={[styles[Device].subdiscipline,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{subdiscipline}</Text>
                                            </View>
                                            <Image source={go_icon} style={[styles[Device].go_icon,{transform:[{scaleX:-1}]}]}/>
                                        </Pressable>
                                        )
                                    }
                                    </ScrollView>
                                :
                                <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:10}}>
                                    <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>Lets gooo!</Text>
                                    <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Start exploring now!</Text>
                                </View>
                            }
                            </View>
                        </ScrollView>
                        :
                        null
                    }
                    {/* <View style={[styles[Device].list_heading_wrapper]}>
                        <Text style={[styles[Device].list_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Universities</Text>
                    </View> */}
                </View>
            </View>
        </View>
    )

}


export default Search

