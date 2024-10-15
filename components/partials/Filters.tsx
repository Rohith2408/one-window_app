import { ScrollView, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { AdditionalFilterInfo, AppliedFilter } from "../../types"
import { getBasket } from "../../constants/basket"
import React, { useEffect, useRef, useState } from "react"
import { lists } from "../../constants"
import Form from "../resources/Form"

const Filters=(props:{filtersbasketid:string,filterslistid:string,filtersupdate:{id:string,newvalue:any}})=>{

    let info=useRef(getBasket(props.filtersbasketid)).current
    let Filtersinfo=lists.find((list)=>list.id==props.filterslistid)?.filters
    const [additionalFilters,setAdditionalFilters]=useState<AppliedFilter[]>(info.additionalFiltersApplied?info.additionalFiltersApplied:[])
    //const [quickFilters,setQuickFilters]=useState<AppliedFilter[]>(info.quickFiltersApplied?info.quickFiltersApplied:[]);

    useEffect(()=>{
        if(props.filtersupdate)
        {
            setAdditionalFilters(additionalFilters.map((item)=>item.type==props.filtersupdate.id?{type:item.type,data:props.filtersupdate.newvalue}:item))
        }
    },[props.filtersupdate])


    return(
        <View style={{flex:1}}>
            <Form formid="Programsfilter" />
        </View>
    )
}

const Filercontainer=(props:{info:AdditionalFilterInfo,applied:AppliedFilter|undefined})=>{

    const Container:React.FC<any>|undefined=props.info.container?.component

    return(
        <View style={{ flex:1,display:"flex",flexDirection:"column",gap:8}}>
            <Text>{props.info.title}</Text>
            {
                Container
                ?
                <Container id={props.applied?.type} value={props.applied?props.applied.data:[]} {...props.info.container?.props}/>
                :
                null
            }
        </View>
    )

}

export default Filters