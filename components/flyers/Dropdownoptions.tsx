import { useRef, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { getBasket } from "../../constants/basket"
import useNavigation from "../../hooks/useNavigation"
import { ListItem } from "../../types"

const Dropdownoptions=(props:{basketid:string})=>{

    let info=useRef(getBasket(props.basketid)).current
    let options=useRef(info?.options).current
    const [selected,setSelected]=useState<ListItem[]>(info.selected?info.selected:[])
    const [path,navigate]=useNavigation()
    console.log("dooo",props.basketid,getBasket(props.basketid))

    const selection=(data:ListItem)=>{
        setSelected([...selected,data])
    }

    const apply=()=>{
        navigate?navigate({type:"RemoveScreen"}):null;
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:info?.id,newvalue:selected}}}):null
    }

    return(
        <View style={{flex:1}}>
            <Pressable onPress={apply}><Text>Okay</Text></Pressable>
            {
                options?.map((item:{label:string,value:string})=>
                <Pressable onPress={()=>selection(item)} style={{flexDirection:"row"}}>
                    <Text>{item.label}</Text>
                    {
                        selected.find((sitem)=>sitem.label==item.label)
                        ?
                        <Text>selected</Text>
                        :
                        null
                    }
                </Pressable>
                )
            }
        </View>
    )
}

export default Dropdownoptions