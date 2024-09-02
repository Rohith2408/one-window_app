import { useEffect, useReducer, useRef, useState } from "react"
import { Animated, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ListReducer } from "../../reducers/ListReducer"
import {Fonts, Themes, lists} from "../../constants"
import { AppliedFilter, ListItem, QuickFilterInfo, ServerResponse } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import { getDevice } from "../../utils"
import { Image } from "expo-image"
import Listselection from "../resources/Listselection"
import Quickfiltercard from "../cards/Quickfiltercard"
import filter_icon from '../../assets/images/misc/filter.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    },
    sub_wrapper:{
        flex:1
    },
    filter_wrapper:{
        padding:10,
        gap:10,
        flexDirection:'row',
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    card:{
        height:100,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    }
})

const MobileSStyles=StyleSheet.create({
    card:{
        height:100,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    },
    filter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    }
})

const MobileMStyles=StyleSheet.create({
    card:{
        height:150,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    },
    filter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    }
})

const MobileLStyles=StyleSheet.create({
    card:{
        height:100,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    },
    filter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Listing=(props:{listid:string,additionalFilters:AppliedFilter[],quickFilters:AppliedFilter[],search:string,page:number,basketid:string})=>{

    const ListInfo=useRef(lists.find((list)=>list.id==props.listid)).current
    const [list,setList]=useState<any[]>([]);
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Component:React.FC<any>|undefined=ListInfo?.card
    const dataRequested=useRef(false);
    const Device=useRef(getDevice()).current
    const maxPages=useRef(1)

    useEffect(()=>{
        //console.log("Fetching List",);
        getList().then((res:ServerResponse|undefined)=>{
            maxPages.current=res?.data.totalPages;
            console.log("setting list",res?.data.list?(JSON.stringify(res.data.list.splice(0,2),null,2)):"");
            //(res && res.success)?setList(res.data.list):null
            //console.log("fetched list",JSON.stringify);
            (res && res.success)?props.page==1?setList([...res.data.list]):setList([...list,...res.data.list]):null
        })
    },[props.additionalFilters,props.quickFilters,props.search,props.page])

    const getList=async ()=>{
        //console.log("list reacher",JSON.stringify(props.additionalFilters,null,2))
        setIsLoading(true);
        let appliedFilters=bakeFilters(props.additionalFilters,props.quickFilters);
        let res=await ListInfo?.listFetcher({search:props.search,filters:appliedFilters,page:props.page})
        setIsLoading(false)
        return res
    }

    const applyQuickFilter=(data:QuickFilterInfo[])=>{
        console.log(props.listid)
        let arr=data.map((item)=>({type:item.type,data:item.items}));
        navigate?navigate({type:"UpdateParam",payload:{param:props.listid+"listquery",newValue:{search:props.search,page:props.page,additionalFilters:correctAdditionalFilters(props.additionalFilters,arr),quickFilters:arr}}}):null
    }

    const applyAdditionalFilters=(data:AppliedFilter[])=>{
        //console.log("addition apply",JSON.stringify({param:props.listid+"listquery",newValue:{search:props.search,page:props.page,additionalFilters:correctAdditionalFilters(data,props.quickFilters),quickFilters:props.quickFilters}},null,2));
        navigate?navigate({type:"UpdateParam",payload:{param:props.listid+"listquery",newValue:{search:props.search,page:props.page,additionalFilters:[...correctAdditionalFilters(data,props.quickFilters)],quickFilters:[...props.quickFilters]}}}):null;
    }

    const openAllFilters=()=>{
        addToBasket(props.listid+"filters",{
            additionalFiltersApplied:props.additionalFilters,
            callback:applyAdditionalFilters
        })
        console.log(props.listid)
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:ListInfo?.formid,forminitialdataid:props.listid+"filters",formbasket:props.listid+"filters"}}}):null
    }

    const onScroll=(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        if(props.page<maxPages.current)
        {
            if(!dataRequested.current && (e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y>e.nativeEvent.contentSize.height-20))
            {
                
                navigate?navigate({type:"UpdateParam",payload:{param:props.listid+"listquery",newValue:{search:props.search,page:props.page+1,additionalFilters:props.additionalFilters,quickFilters:props.quickFilters}}}):null
                dataRequested.current=true
            }
            else
            {
                if((e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y<=e.nativeEvent.contentSize.height-20)){
                    dataRequested.current=false
                }
            }
        }
    }

    //console.log("Defined list",JSON.stringify(list.splice(0,2),null,2));

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.filter_wrapper]}>
                <View style={{flex:1,backgroundColor:Themes.Light.OnewindowLightBlue,borderRadius:100}}>
                    <Listselection 
                        direction="horizontal"
                        selectionStyle="border"
                        initialSelection={props.quickFilters.map((item)=>ListInfo?.filters.quick.find((item2)=>item.type==item2.type))}
                        styles={{contentcontainer:{gap:10}}}
                        onselection={applyQuickFilter}
                        options={{
                            list:ListInfo?.filters?.quick,
                            card:Quickfiltercard,
                            idExtractor:(data:QuickFilterInfo)=>data.type,
                            labelExtractor:(data:QuickFilterInfo)=>data.title,
                            selectionMode:"multi"
                        }}
                    />
                </View>
                <Pressable style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:"center"}} onPress={openAllFilters}>
                    <Image style={[styles[Device].filter_icon]} source={filter_icon}/>
                    {/* <Text style={[styles[Device].allfilters]}>All Filters</Text> */}
                </Pressable>
            </View>
        {
            Component
            ?
                list.length>0
                ?
                <ScrollView scrollEventThrottle={100} onScroll={(e)=>onScroll(e)} style={[GeneralStyles.sub_wrapper]}>
                {
                    list.map((item:any,i:number)=>
                        <View><Component {...item} index={i}/></View>
                    )
                }
                </ScrollView>
                :
                <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                    <Text>No items found!</Text>
                </View>
            :
            null
        }
        </View>
    )

}

const correctAdditionalFilters=(additionalFilters:AppliedFilter[],baseFilters:AppliedFilter[])=>{
    return additionalFilters.map((additionalFilter)=>{
        let data:AppliedFilter|undefined=baseFilters.find((baseFilter)=>baseFilter.type==additionalFilter.type)
        return {type:additionalFilter.type,data:data?additionalFilter.data.filter((item:ListItem)=>data?.data.find((item2)=>item2.label==item.label)?true:false):additionalFilter.data}
    })
}

const bakeFilters=(additionalFilters:AppliedFilter[],baseFilters:AppliedFilter[])=>{
    
    console.log("addi",JSON.stringify(additionalFilters,null,2))
    console.log("quick",JSON.stringify(baseFilters,null,2))
    return [ 
        ...baseFilters.filter((item)=>additionalFilters.find((item2)=>item2.type==item.type)?false:true),
        ...additionalFilters
    ]
}

const Quickfilter=(props:{icon:string,text:string,focus:boolean})=>{

    const Device=useRef(getDevice()).current
    const scale=useRef(new Animated.Value(0)).current
    const [dimensions,setDimensions]=useState<LayoutRectangle>()

    useEffect(()=>{
       
        Animated.spring(scale,{
            toValue:props.focus?1:0,
            useNativeDriver:true
        }).start()

    },[props.focus])

    //console.log(dimensions)

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",paddingLeft:15,paddingRight:15,gap:5,position:'relative'}}>
            {/* <Image source={props.icon} style={[styles[Device].quickfilter_icon]}/> */}
            <Text style={[styles[Device].quickfilter,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.text}</Text>
            <Animated.View style={{position:"absolute",width:dimensions?dimensions.width:0,height:dimensions?dimensions.height:0,borderWidth:1,top:0,left:0,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),transform:[{scale:1}]}}/>
        </View>
    )
}

export default Listing