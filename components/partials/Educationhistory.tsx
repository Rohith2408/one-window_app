import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { EducationHistory as  EducationHistoryType , EducationHistory_Plus2, EducationHistory_PostGraduation, EducationHistory_School, EducationHistory_UnderGraduation, Request, ServerResponse} from "../../types"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import Nestedview from "../resources/Nestedview"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import add_icon from '../../assets/images/misc/add.png'
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import useNavigation from "../../hooks/useNavigation"
import { profileUpdator } from "../../utils"
import { store } from "../../store"
import { setEducationHistory } from "../../store/slices/educationHistorySlice"
import { useState } from "react"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        paddingTop:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    
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

const Educationhistory=()=>{

    const education=useAppSelector((state)=>state.educationhistory)

    return(
        <View style={{flex:1}}>
        {
            education.responseStatus=="recieved"
            ?
            <View style={{flex:1,display:"flex",flexDirection:'column',gap:20,paddingTop:30}}>
                <Nestedview title="School" maxHeight={150}><School data={education.data.school}/></Nestedview>
                <Nestedview title="Intermediate" maxHeight={150}><Intermediate data={education.data.plus2}/></Nestedview>
                <Nestedview title="Undergraduation" maxHeight={150}><Undergraduation data={education.data.underGraduation}/></Nestedview>
                <Nestedview title="Masters" maxHeight={150}><Postgraduation data={education.data.postGraduation}/></Nestedview>
            </View>
            :
            <Loadinglistscreen cardGap={30} cardHeight={150}></Loadinglistscreen>
        }
        </View>
    )

}

const School=(props:{data:EducationHistory_School|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"School"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,school:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"School"}}}):null
    }

    console.log("school",props.data)

    return(
        <View>
        {
            props.data
            ?
            <View>
                <Pressable onPress={edit}><Image style={{width:20,height:20,objectFit:'contain'}} source={edit_icon}></Image></Pressable>
                <Pressable onPress={remove}><Image style={{width:20,height:20,objectFit:'contain'}} source={isLoading?loading_gif:delete_icon}></Image></Pressable>
                <View>
                    <Text>{props.data?.instituteName}</Text>
                    <Text>{props.data?.city}</Text>
                    <Text>{props.data?.country}</Text>
                </View>
            </View>
            :
            <View>
                <Pressable ><Image style={{width:30,height:30,resizeMode:'contain'}} source={add_icon}/></Pressable>
                <Text>Details not added</Text>
            </View>
        }
        </View>
    )

}

const Intermediate=(props:{data:EducationHistory_Plus2|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Intermediate"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,plus2:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Intermediate"}}}):null
    }

    return(
        <View>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View>
                <Pressable onPress={edit}><Image style={{width:20,height:20,objectFit:'contain'}} source={edit_icon}></Image></Pressable>
                <Pressable onPress={remove}><Image style={{width:20,height:20,objectFit:'contain'}} source={isLoading?loading_gif:delete_icon}></Image></Pressable>
                <View>
                    <Text>{props.data?.instituteName}</Text>
                    <Text>{props.data?.city}</Text>
                    <Text>{props.data?.country}</Text>
                </View>
            </View>
            :
            <View>
                <Pressable onPress={add}><Image style={{width:30,height:30,resizeMode:'contain'}} source={add_icon}/></Pressable>
                <Text>Details not added</Text>
            </View>
        }
        </View>
    )

}

const Undergraduation=(props:{data:EducationHistory_UnderGraduation|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Undergraduation"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,underGraduation:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Undergraduation"}}}):null
    }
    
    return(
        <View>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View>
                <Pressable onPress={edit}><Image style={{width:20,height:20,objectFit:'contain'}} source={edit_icon}></Image></Pressable>
                <Pressable onPress={remove}><Image style={{width:20,height:20,objectFit:'contain'}} source={isLoading?loading_gif:delete_icon}></Image></Pressable>
                <View>
                    <Text>{props.data?.instituteName}</Text>
                    <Text>{props.data?.city}</Text>
                    <Text>{props.data?.country}</Text>
                </View>
            </View>
            :
            <View>
                <Pressable onPress={add}><Image style={{width:30,height:30,resizeMode:'contain'}} source={add_icon}/></Pressable>
                <Text>Details not added</Text>
            </View>
        }
        </View>
    )

}

const Postgraduation=(props:{data:EducationHistory_PostGraduation|undefined})=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Postgraduation"}}}):null
    }

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,postGraduation:undefined}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
        setIsLoading(false);
        return res
    }

    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:"Postgraduation"}}}):null
    }

    return(
        <View>
        {
            props.data && Object.keys(props.data).length!=0
            ?
            <View>
                <Pressable onPress={edit}><Image style={{width:20,height:20,objectFit:'contain'}} source={edit_icon}></Image></Pressable>
                <Pressable onPress={remove}><Image style={{width:20,height:20,objectFit:'contain'}} source={isLoading?loading_gif:delete_icon}></Image></Pressable>
                <View>
                    <Text>{props.data?.instituteName}</Text>
                    <Text>{props.data?.city}</Text>
                    <Text>{props.data?.country}</Text>
                </View>
            </View>
            :
            <View>
                <Pressable onPress={add}><Image style={{width:30,height:30,resizeMode:'contain'}} source={add_icon}/></Pressable>
                <Text>Details not added</Text>
            </View>
        }
        </View>
    )

}



export default Educationhistory