import { useState } from "react"
import { Pressable, Text, View } from "react-native";
import { EducationHistory_UnderGraduation, ServerResponse } from "../../types";
import { getServerRequestURL, serverRequest } from "../../utils";
import Dropdown from "../resources/Dropdown";
import { useAppSelector } from "../../hooks/useAppSelector";

const Undergraduation=()=>{

    const ugdata=useAppSelector((state)=>state.educationhistory)
    const [isLoading,setIsLoading]=useState(false)

    const instituteSelected=()=>{

    }

    const showInstitutes=()=>{

    }

    const fetchList=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("regex","GET",{search:search.trim(),institutions:0,universities:1,disciplines:1,subDisciplines:1}),
            reqType:"GET"
        })
        setIsLoading(false);
        res.success?setLists(res.data):null
    }

    return(
        <View style={{flex:1}}>
            
        </View>
    )
}

const Editable=(data:EducationHistory_UnderGraduation)=>{

    return(
        <View style={{flex:1}}>
            <View style={{flexDirection:"row"}}>
                
            </View>
        </View>
    )

}

const Fixed=()=>{

}

export default Undergraduation