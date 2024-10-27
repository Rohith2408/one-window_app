import { LayoutRectangle, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import Form from "../resources/Form"
import React, { useEffect, useRef, useState } from "react"
import { store } from "../../store"
import useNavigation from "../../hooks/useNavigation"

type Listitem={
    id:string,
    component:React.FC,
    data:any,
    isSkippable:boolean
}

const Basicinfo=()=>{

    const [dimensions,setDimesnions]=useState<LayoutRectangle>()
    const dataList=useRef<Listitem[]>([
        {id:"name",component:Name,data:{firstName:store.getState().sharedinfo.data?.firstName,lastName:store.getState().sharedinfo.data?.firstName},isSkippable:false},
        {id:"Email",component:Email,data:{Email:store.getState().sharedinfo.data?.email},isSkippable:false},
        {id:"Phonenumber",component:Phonenumber,data:store.getState().sharedinfo.data?.phone,isSkippable:false},
        {id:"Dp",component:Dp,data:{Dp:store.getState().sharedinfo.data?.displayPicSrc},isSkippable:false},
        {id:"Countrypreference",component:Countrypreference,data:{Countrypreference:store.getState().preferences.data?.country},isSkippable:false},
        {id:"Coursepreference",component:Coursepreference,data:{Coursepreference:store.getState().preferences.data?.courses},isSkippable:false}
    ]).current
    const requiredData=useRef(dataList.filter((item)=>(Object.values(item.data).find((item2:any)=>item2==undefined || item2.length==0))!=undefined)).current
    const scrollRef=useRef()
    const [path,navigate]=useNavigation()

    const setScreen=(screenIndex:number)=>{
        (dimensions && scrollRef.current)?scrollRef.current.scrollTo({x:screenIndex*dimensions.width,animated:true}):null
    }

    useEffect(()=>{
        console.log(requiredData)
        requiredData.length==0?navigate({type:"RemoveSpecificScreen",payload:{id:"Basicinfo"}}):null
    },[])

     
    return(
        <View style={{flex:1}} onLayout={(e)=>setDimesnions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false} ref={scrollRef} horizontal pagingEnabled style={{width:dimensions.width,height:dimensions.height}}>
            {
                requiredData.map((item,i)=>
                    <View style={{width:dimensions.width,height:dimensions.height}}><Container setScreen={setScreen} total={requiredData.length} index={i} {...item}/></View>
                )
            }
            </ScrollView>
            :
            null
        }
        </View>
    )
}

const Container=(props:Listitem & {index:number,total:number,setScreen:any})=>{

    let Card=props.component
    const [data,setData]=useState<any>(props.data)
    const [path,navigate]=useNavigation()

    const skip=()=>{
        props.index==(props.total-1)?navigate({type:"RemoveSpecificScreen",payload:{id:"Basicinfo"}}):props.setScreen(props.index+1)
    }
    

    return(
        <View>
            <Card/>
            <View style={{flexDirection:'row'}}>
                {
                    !props.isSkippable
                    ?
                    <Pressable onPress={skip}><Text>Skip</Text></Pressable>
                    :
                    null
                }
                {
                    Object.values(props.data).find((item2:any)=>item2==undefined || item2.length==0)==undefined
                    ?
                    <Pressable><Text>Next</Text></Pressable>
                    :
                    null
                }
            </View>
        </View>
    )
}

const Name=()=>{

    const [data,setData]=useState({
        firstName:store.getState().sharedinfo.data?.firstName,
        lastName:store.getState().sharedinfo.data?.lastName
    })

    return(
        <View>
            <TextInput onChangeText={(txt)=>setData({...data,firstName:txt})} value={data.firstName}/>
            <TextInput onChangeText={(txt)=>setData({...data,lastName:txt})} value={data.lastName}/>
            <Pressable></Pressable>
        </View>
    )
}

const Email=()=>{
    
    return(
        <View><Text>Email</Text></View>
    )
}

const Phonenumber=()=>{
    return(
        <View><Text>Phone</Text></View>
    )
}

const Countrypreference=()=>{

    return(
        <View><Text>Country Pref</Text></View>
    )
}

const Dp=()=>{

    return(
        <View><Text>Dp</Text></View>
    )
}

const Coursepreference=()=>{

    return(
        <View><Text>Dp</Text></View>
    )
}


export default Basicinfo