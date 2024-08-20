import { useEffect, useReducer, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ListReducer } from "../../reducers/ListReducer"
import { ListsInfo } from "../../constants/lists"
import { AppliedFilter, ServerResponse } from "../../types"
import useNavigation from "../../hooks/useNavigation"

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

const Listing=(props:{listid:string,additionalFilters:AppliedFilter[],quickFilters:AppliedFilter[],search:string,page:number})=>{

    const ListInfo=useRef(ListsInfo.find((list)=>list.id==props.listid)).current
    const [list,setList]=useState([]);
    const Component:React.FC<any>|undefined=ListInfo?.card
    const [path,navigate]=useNavigation()

    useEffect(()=>{
        let appliedFilters=bakeFilters(props.additionalFilters,props.quickFilters);
        ListInfo?.listFetcher(props.search,appliedFilters,props.page).then((res:ServerResponse)=>{
            if(res.success)
            {
                setList([...list,...res.data.list])
            }
        })
    },[props.additionalFilters,props.quickFilters,props.page,props.search])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        <View style={[GeneralStyles.filter_wrapper]}>
            <Pressable onPress={()=>navigate?navigate({type:"UpdateParam",payload:{param:"page",newValue:2}}):null}><Text>Add Page</Text></Pressable>
            <Pressable onPress={()=>navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Filters",flyerdata:{additionalFilters:props.additionalFilters,quickFilters:props.quickFilters}}}}):null}><Text>All Filters</Text></Pressable>
            <ScrollView style={{flex:1}} horizontal>
            {
                ListInfo?.filters.quick.map((filterinfo)=>
                    <View style={[{backgroundColor:props.quickFilters.find((item)=>item.type==filterinfo.type)?"red":"white"}]}><Text>{filterinfo.title}</Text></View>
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