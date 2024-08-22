import { useEffect, useRef } from "react"
import { Dropdown as DropdownType, ListItem } from "../../types"
import Dropdown from "./Dropdown"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"

const Statedropdown=(props:DropdownType & {cityFieldId:string} & {value:ListItem[],id:string})=>{

    const [path,navigate]=useNavigation()
    const initialRender=useRef(true)

    useEffect(()=>{
        if(!initialRender.current)
        {
            navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.cityFieldId,newvalue:[]}}}):null
        }
        else
        {
            //props.value.length!=0?addToBasket(props.basketid,props.value[0].value):null
            initialRender.current=false
        }
    },[props.value])

    return(
        <Dropdown {...props}/>
    )

}

export default Statedropdown