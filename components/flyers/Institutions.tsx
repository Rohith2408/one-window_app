import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { ServerResponse, UG_Institutes } from "../../types";
import { getServerRequestURL, serverRequest } from "../../utils";

const Institutions=()=>{

    const [search,setSearch]=useState("");
    const [isLoading,setIsLoading]=useState(false)
    const [list,setlist]=useState<UG_Institutes[]>([]);

    const fetchList=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("regex","GET",{search:search.trim(),institutions:1,universities:0,disciplines:0,subDisciplines:0}),
            reqType:"GET"
        })
        setIsLoading(false);
        res.success?setlist(res.data):null
        return res
    }

    useEffect(()=>{
        fetchList()
    },[search])

    return(
        <View style={{flex:1}}>
            <View><TextInput onChangeText={((txt)=>setSearch(txt))} style={{padding:10}}>{search}</TextInput></View>
            <ScrollView>
            {
                list.map((item)=>
                <Pressable ><Text>{item.instituteName}</Text></Pressable>
                )
            }
            </ScrollView>
        </View>
    )

}

export default Institutions