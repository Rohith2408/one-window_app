import { useEffect, useRef } from "react"
import { Dropdown as DropdownType, ListItem } from "../../types"
import Dropdown from "./Dropdown"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"

const Countrydropdown=(props:DropdownType & {cityFieldId?:string,stateFieldId?:string} & {value:ListItem[],id:string})=>{

    const [path,navigate]=useNavigation()
    const initialRender=useRef(true)

    useEffect(()=>{
        if(!initialRender.current)
        {
            if(props.cityFieldId)
            {
                navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.cityFieldId,newvalue:[]}}}):null
            }
            if(props.stateFieldId)
            {
                setTimeout(()=>{
                    navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.stateFieldId,newvalue:[]}}}):null
                },100)
            }
        }
        else
        {
            initialRender.current=false
        }
    },[props.value])

    return(
        <Dropdown {...props}/>
    )

}

export default Countrydropdown