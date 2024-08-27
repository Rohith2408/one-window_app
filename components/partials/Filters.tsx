import { ScrollView, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { AdditionalFilterInfo, AppliedFilter } from "../../types"
import { getBasket } from "../../constants/basket"
import React, { useRef, useState } from "react"
import { ListsInfo } from "../../constants/lists"

const Filters=(props:{filtersbasketid:string,filterslistid:string})=>{

    let info=useRef(getBasket(props.filtersbasketid)).current
    let Filtersinfo=ListsInfo.find((list)=>list.id==props.filterslistid)?.filters
    const [additionalFilters,setAdditionalFilters]=useState<AppliedFilter[]>(info.additionalFiltersApplied?info.additionalFiltersApplied:[])
    const [quickFilters,setQuickFilters]=useState<AppliedFilter[]>(info.quickFiltersApplied?info.quickFiltersApplied:[]);

    console.log("infff",Filtersinfo?.additional)

    return(
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
            {
                Filtersinfo?.additional.map((item:AdditionalFilterInfo)=>
                <Filercontainer info={item} applied={additionalFilters.find((itemApplied)=>item.type==itemApplied.type)}/>
                )
            }
            </ScrollView>
        </View>
    )
}

const Filercontainer=(props:{info:AdditionalFilterInfo,applied:AppliedFilter|undefined})=>{

    const Container:React.FC<any>|undefined=props.info.container?.component
    //console.log("app",props.info.type,props.info.container)

    return(
        <View style={{ flex:1,display:"flex",flexDirection:"column",gap:8}}>
            <Text>{props.info.title}</Text>
            {
                Container
                ?
                <Container value={props.applied?props.applied:{type:props.info.type,data:[]}} {...props.info.container?.props}/>
                :
                null
            }
        </View>
    )

}

export default Filters