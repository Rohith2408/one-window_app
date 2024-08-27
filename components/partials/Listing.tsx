import { useEffect, useReducer, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ListReducer } from "../../reducers/ListReducer"
import { ListsInfo } from "../../constants/lists"
import { AppliedFilter, ListItem, QuickFilterInfo, ServerResponse } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"


const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%"
    },
    sub_wrapper:{
        flex:1
    },
    filter_wrapper:{
        height:100
    }
})

const Listing=(props:{listid:string,additionalFilters:AppliedFilter[],quickFilters:AppliedFilter[],search:string,page:number,basketid:string})=>{

    const ListInfo=useRef(ListsInfo.find((list)=>list.id==props.listid)).current
    const [list,setList]=useState<any[]>([]);
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Component:React.FC<any>|undefined=ListInfo?.card

    useEffect(()=>{
        getList().then((res:ServerResponse|undefined)=>(res && res.success)?setList(res.data.list):null)
    },[props.additionalFilters,props.quickFilters,props.search])

    useEffect(()=>{
        getList().then((res:ServerResponse|undefined)=>(res && res.success)?setList([...list,...res.data.list]):null)
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
        //console.log("alll",JSON.stringify(ListInfo?.filters,null,2))
        addToBasket(props.basketid,{
            additionalFiltersApplied:props.additionalFilters,
            quickFiltersApplied:props.quickFilters
        })
        navigate?navigate({type:"AddScreen",payload:{screen:"Filters",params:{filtersbasketid:props.basketid,filterslistid:props.listid}}}):null
    }

    //console.log()

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        <View style={[GeneralStyles.filter_wrapper]}>
            <Pressable onPress={openAllFilters}><Text>All Filters</Text></Pressable>
            <ScrollView style={{flex:1}} horizontal contentContainerStyle={{gap:20}}>
            {
                ListInfo?.filters.quick.map((filterinfo)=>
                    <Pressable onPress={()=>applyQuickFilter(filterinfo)} style={[{backgroundColor:props.quickFilters.find((item)=>item.type==filterinfo.type)?"red":"white"}]}><Text>{filterinfo.title}</Text></Pressable>
                )
            }
            </ScrollView>
        </View>
        {
            Component
            ?
            <ScrollView style={[GeneralStyles.sub_wrapper]}>
            {
                list.map((item:any,i:number)=>
                    <Component {...item} index={i}/>
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

export default Listing