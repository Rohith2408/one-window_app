import { Pressable, Text, View } from "react-native"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { ServerResponse, Test as TestType } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { useEffect, useState } from "react"
import { profileUpdator } from "../../utils"
import { store } from "../../store"
import { setTests } from "../../store/slices/testScoresSlice"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import add_icon from '../../assets/images/misc/add.png'
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'

const Testscores=()=>{

    const [path,navigate]=useNavigation()
    const tests=useAppSelector((state)=>state.testscores)

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Testoptions"}}}):null
    }

    useEffect(()=>{
        
    },[])

    return(
        <View style={{flex:1}}>
        {
            tests.data
            ?
            <View style={{flex:1}}>
                <Pressable onPress={add}><Text>Add</Text></Pressable>
                <View>
                {
                    tests.data.map((test)=>
                    <Test {...test}/>
                    )
                }</View>
            </View>
            :
            null
        }
        </View>
    )
}

const Test=(props:TestType)=>{

    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({tests:store.getState().testscores.data.filter((item)=>item._id!=props._id)},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
        setIsLoading(false);
        return res
    }
    
    const edit=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:props.name,forminitialdata:props.name}}}):null
    }

    return(
        <View>
           <View>
                <Pressable onPress={edit}><Image style={{width:20,height:20,objectFit:'contain'}} source={edit_icon}></Image></Pressable>
                <Pressable onPress={remove}><Image style={{width:20,height:20,objectFit:'contain'}} source={isLoading?loading_gif:delete_icon}></Image></Pressable>
                <View>
                    <Text>{props.name}</Text>
                    <Text>{props.testDate}</Text>
                    {
                        props.scores.map((item)=>
                        <Text>{item.description+"-"+item.count}</Text>
                        )
                    }
                    {/* <Text>{props.data?.country}</Text> */}
                </View>
            </View>
        </View>
    )

}

export default Testscores

// {
//     "name": "Graduate Record Examination",
//     "scores": [
//         {
//             "description": "Verbal Reasoning",
//             "count": 162,
//             "_id": "6621f60d8e2a22f3c82abe26"
//         },
//         {
//             "description": "Quantitative Reasoning",
//             "count": 160,
//             "_id": "6621f60d8e2a22f3c82abe27"
//         },
//         {
//             "description": "Analytical Writing Assessment",
//             "count": 4,
//             "_id": "6621f60d8e2a22f3c82abe28"
//         },
//         {
//             "description": "Total",
//             "count": 320,
//             "_id": "6621f60d8e2a22f3c82abe29"
//         }
//     ],
//     "testDate": "2023-01-19T00:00:00.000Z",
//     "_id": "6621f60d8e2a22f3c82abe25"
// }