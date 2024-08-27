
import { Tests } from "../../constants"
import { Pressable, Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"

const Testoptions=()=>{

    const [path,navigate]=useNavigation()

    const openForm=(test:string)=>{
        // console.log("ll",JSON.stringify(testFields(test),null,2))
        navigate?navigate({type:"RemoveScreen"}):null
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:test,forminitialdataid:test}}}):null
    }

    return(
        <View style={{flex:1}}>
        {
            Tests.map((test)=>
            <Pressable onPress={()=>openForm(test.name)}><Text style={{padding:10}}>{test.name}</Text></Pressable>
            )
        }
        </View>
    )
}

export default Testoptions