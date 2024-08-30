import { useEffect, useReducer, useRef, useState } from "react"
import { Animated, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ListReducer } from "../../reducers/ListReducer"
import {Fonts, Themes, lists} from "../../constants"
import { AppliedFilter, ListItem, QuickFilterInfo, ServerResponse } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import { getDevice } from "../../utils"
import { Image } from "expo-image"


const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    },
    sub_wrapper:{
        flex:1
    },
    filter_wrapper:{
        height:55,
        padding:10,
        gap:10,
        flexDirection:'row'
    }
})

const TabStyles=StyleSheet.create({
    
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
        getList().then((res:ServerResponse|undefined)=>(res && res.success)?setList(res.data.list):null)
    },[props.additionalFilters,props.quickFilters,props.search])

    useEffect(()=>{
        getList().then((res:ServerResponse|undefined)=>{
            maxPages.current=res?.data.totalPages;
            (res && res.success)?setList([...list,...res.data.list]):null
        })
    },[props.page])

    const getList=async ()=>{
        setIsLoading(true);
        let appliedFilters=bakeFilters(props.additionalFilters,props.quickFilters);
        let res=await ListInfo?.listFetcher(props.search,appliedFilters,props.page)
        setIsLoading(false)
        return res
    }

    const applyQuickFilter=(data:QuickFilterInfo)=>{
        let arr=props.quickFilters.find((item)=>item.type==data.type)?props.quickFilters.filter((item)=>item.type!=data.type):[...props.quickFilters,{type:data.type,data:data.items}]
        navigate?navigate({type:"UpdateParam",payload:{param:props.listid.toLowerCase()+"quickfilters",newValue:arr}}):null
    }

    const openAllFilters=()=>{
        addToBasket(props.listid+"filters",{
            additionalFiltersApplied:props.additionalFilters,
            quickFiltersApplied:props.quickFilters
        })
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:ListInfo?.formid,forminitialid:props.listid+"filters"}}}):null
    }

    const onScroll=(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        if(props.page<maxPages.current)
        {
            if(!dataRequested.current && !(e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y+10<=e.nativeEvent.contentSize.height))
            {
                (navigate && ListInfo?.pageUpdator)?navigate(ListInfo?.pageUpdator(props.page)):null
                dataRequested.current=true
            }
            else
            {
                if((e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y+10<=e.nativeEvent.contentSize.height)){
                    dataRequested.current=false
                }
            }
        }
    }

    //console.log("filters",JSON.stringify(props.additionalFilters,null,2))

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        <View style={[GeneralStyles.filter_wrapper]}>
            <Pressable style={{display:'flex',alignItems:"center",justifyContent:"center"}} onPress={openAllFilters}><Text style={[styles[Device].allfilters]}>All Filters</Text></Pressable>
            <ScrollView style={{flex:1}} horizontal contentContainerStyle={{gap:20,alignItems:'center'}}>
            {
                ListInfo?.filters.quick.map((filterinfo)=>
                    <Pressable onPress={()=>applyQuickFilter(filterinfo)}>
                        <Quickfilter focus={props.quickFilters.find((item)=>item.type==filterinfo.type)?true:false} icon={filterinfo.icon} text={filterinfo.title}/>
                    </Pressable>
                )
            }
            </ScrollView>
        </View>
        {
            Component
            ?
            <ScrollView scrollEventThrottle={100} onScroll={(e)=>onScroll(e)} style={[GeneralStyles.sub_wrapper]}>
            {
                list.map((item:any,i:number)=>
                    <View><Component {...item} index={i}/></View>
                )
            }
            </ScrollView>
            :
            null
        }
        </View>
    )

}

const bakeFilters=(additionalFilters:AppliedFilter[],baseFilters:AppliedFilter[])=>{
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