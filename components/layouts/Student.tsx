import { Text, View } from "react-native"
import Stacknavigator from "../../navigation/stackNavigator"
import { ComponentInfo, FormField } from "../../types"
import { getComponent } from "../../utils"
import Invalidpath from "../partials/Invalidpath"
import Form from "../resources/Form"
import { useRef } from "react"
import Textbox from "../resources/Textbox"
import Dropdown from "../resources/Dropdown"
import { screenProps } from "../../constants"
import ComponentsInfo from "../info"

const Student=(props:{screens:string[],params:any})=>{

    // const fields=useRef<FormField[]>([
    // {
    //     id:"firstname",
    //     componentInfo:{
    //         component:Textbox,
    //         props:{
    //             placeholder:"Enter your firstname"
    //         }
    //     },
    //     title:"Firstname",
    //     value:undefined,
    //     onFocus:{
    //         event:"onFocus"
    //     }
    // },
    // {
    //     id:"gender",
    //     componentInfo:{
    //         component:Dropdown,
    //         props:{
    //            options:[
    //             {label:"Male",value:"male"},
    //             {label:"Female",value:"female"},
    //            ]
    //         }
    //     },
    //     onFocus:{
    //         event:"onToggle"
    //     },
    //     onUpdate:{
    //         event:"onSelect"
    //     },
    //     title:"Gender",
    //     value:undefined,
    // },
    // {
    //     id:"lastname",
    //     componentInfo:{
    //         component:Textbox,
    //         props:{
    //             placeholder:"Enter your lastname"
    //         }
    //     },
    //     title:"Lastname",
    //     value:undefined,
    // }
    // ]).current

    return(
        <View style={{width:"100%",height:"100%"}}>
            {/* <Form fields={fields} initialFocussedField={0} submit={{successText:"Success",failureText:"Failed",idleText:"Submit",onSubmit:(data)=>console.log(data)}}></Form> */}
            <Stacknavigator 
                invalidPathScreen={Invalidpath}
                screens={propsMapper(props.screens,props.params).map((screen)=>({
                    id:screen.id,
                    component:screen.id,
                    props:screen.props,
                    swipable:true,
                    animationStyle:ComponentsInfo.find((component)=>component.id==screen.id)?.animationStyle
            }))}
            />
        </View>
    )
}

const propsMapper=(screens:string[],params:any|undefined)=>{
    console.log("mapper",screens,params)
    return screens.map((screen)=>{
        let requiredKeys=screenProps.find((item)=>item.id==screen)?.props
        return {id:screen,props:requiredKeys?requiredKeys.reduce((acc,curr,i)=>{acc[curr]=params?params[curr]:undefined;return acc},{}):undefined}
    })
}

export default Student