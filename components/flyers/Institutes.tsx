import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { Institute, ServerResponse, UG_Institutes } from "../../types";
import { getServerRequestURL, serverRequest } from "../../utils";
import { getBasket } from "../../constants/basket";

import Institutecard from "../cards/Institutecard";
import { addTimer, resetTimer, startTimer } from "../../utils/timer";
import Listselection from "../resources/Listselection";
import Institutionscard from "../cards/Institutionscard";

const Institutes=(props:{basketid:string})=>{

    const info:Institute|undefined=getBasket(props.basketid);

    return(
        <ScrollView>
            <Predefined data={info}/>
            <Custom/>
        </ScrollView>
    )
}

const Predefined=(props:{data:any})=>{

    const [search,setSearch]=useState(props.data?.instituteName?props.data.instituteName:"");
    const [isLoading,setIsLoading]=useState(false)
    const [list,setlist]=useState<Institute[]|undefined>(undefined);
    const [selected,setSelected]=useState()
    const makeRequest=useRef(false).current

    const fetchList=async ()=>{
        console.log("Fetching");
        setIsLoading(true);
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("regex","GET",{search:search.trim(),institutions:1,universities:0,disciplines:0,subDisciplines:0}),
            reqType:"GET"
        })
        setIsLoading(false);
        //console.log("List",res.data);
        res.success?setlist(res.data.institutions):null
        return res
    }

    const onselection=(sel)=>{
        console.log("sel",sel);
    }

    useEffect(()=>{
        // search?fetchList():null
        makeRequest
    },[search])

    useEffect(()=>{
        addTimer("institutes",200);
        search?fetchList():null
    },[])

    const onsearch=(txt:string)=>{
        setSearch(txt)
    }

    console.log("ueee");
    

    return(
        <View style={{flex:1,padding:10}}>
            <TextInput onKeyPress={()=>{resetTimer("institutes");startTimer("institutes",()=>search?fetchList():null)}} placeholder="Search..." onChangeText={(txt)=>onsearch(txt)} value={search} style={{padding:10,borderWidth:1.25}}/>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {
                list==undefined
                ?
                    <View><Text>Start searching</Text></View>
                :
                    list.length==0
                    ?
                    <Pressable style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Institute not found?</Text>
                    </Pressable>
                    :
                    <View style={{flex:1}}>
                        {/* <Listselection
                        {...{
                            direction:"vertical",
                            selectionStyle:"tick",
                            styles:{contentcontainer:{gap:10}},
                            onselect:onselection,
                            onselection:onselection,
                            initialSelection:[],
                            options:{
                                list:list,
                                idExtractor:(item:Institute)=>item._id,
                                card:Institutionscard,
                                selectionMode:"single"
                            }}}
                        /> */}
                        <ScrollView style={{flex:1}} contentContainerStyle={{gap:10}}>
                        {
                            list.map((item,i)=>
                                <Institutecard {...item} index={i}/>
                            )
                        }
                        </ScrollView>
                    </View>
            }
            </View>
        </View>
    )
}

const Custom=()=>{
    return(
        <View style={{flex:1}}></View>
    )
}

export default Institutes