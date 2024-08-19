import { useReducer, useRef, useState } from "react"
import { FormReducer } from "../../reducers/FormReducer";
import { Event, FormField as FieldType, FormData, Form as FormType} from "../../types";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { forms } from "../../constants";

const Form=(props:{formid:string,forminitialdataid?:string})=>{

    // console.log("s",props)
    const formInfo=useRef(forms.find((form)=>form.id==props.formid)).current
    const [fields,dispatch]=useReducer(FormReducer,formInfo?formInfo.getInitialData(props.forminitialdataid):[]);
    const [focussedField,setFocussedField]=useState<string|number|undefined>(undefined);

    const eventHandler=async (event:Event)=>{
        console.log(event)
        let field=formInfo?.allFields.find((field)=>field.id==event.triggerBy)
        console.log(event,field?.id)
        if(field)
        {
            switch(event.name){
            case field.onUpdate?.event:
                if(field.onUpdate?.handler)
                {
                    let updatedFields=await field.onUpdate.handler(fields,event.data)
                    dispatch({type:"set",payload:{fields:updatedFields}})
                }
                else
                {
                    //xconsole.log(event)
                    dispatch({type:"update",payload:{id:event.triggerBy,data:event.data}})
                }
                break;

            case field.onFocus?.event:
                console.log(event.triggerBy)
                setFocussedField(event.triggerBy)
                break;
            }
        }
        // switch(event.name){
        //     case "updateFields":
        //         dispatch({type:"update",payload:event.data})
        //         break;

        //     case "setFields":
        //         dispatch({type:"set",payload:event.data})
        //         break;

        //     case "setFocus":
        //         setFocussedField(event.data)
        //         break;

        // }
    }

    const onSubmit=async ()=>{
        let handler=formInfo?.submit.onSubmit;
        if(handler)
        {
            let res=await handler(fields);
            console.log("res",res);
        }
    }

    // console.log("Fields",fields)

    return(
        <View style={[styles.mainWrapper]}>
            <View style={[styles.fieldsWrapper]}>
                <ScrollView style={{flex:1}} contentContainerStyle={[styles.fields]}>
                {
                    fields.map((field,i)=>
                    <Field key={field.id} data={field} info={formInfo?.allFields.find((item)=>field.id==item.id)} isFocussed={focussedField==undefined?false:(focussedField==field.id?true:false)} index={i} eventHandler={eventHandler}></Field>
                    )
                }
                </ScrollView>
            </View>
            <Pressable onPress={onSubmit} style={[styles.submitButton]}><Text adjustsFontSizeToFit>{formInfo?.submit.idleText}</Text></Pressable>
        </View>
    )
}

const Field=(props:{info:FieldType,data:FormData,isFocussed:boolean,index:number,eventHandler:(event:Event)=>void})=>{

    const Container=props.info.componentInfo.component

    const eventHandler=async (event:Event)=>{
        console.log("e",event)
        props.eventHandler({...event,triggerBy:props.info.id})
        // switch(event.name){
        //     case props.info.onUpdate?.event:
        //         if(props.info.onUpdate?.handler)
        //         {
        //             let updatedFields=await props.info.onUpdate.handler()
        //         }
        //         else
        //         {

        //         }
        //         break;
        // }
    }

    return(
        <View style={{flex:1,zIndex:props.isFocussed?1:-1}}>
            <Text>{props.info.title}</Text>
            <Container {...props.info.componentInfo.props} value={props.data.value} isFocussed={props.isFocussed} eventHandler={eventHandler}></Container>
        </View>
    )

}

export default Form

const styles=StyleSheet.create({
    mainWrapper:{
        flex:1,
        gap:10,
        backgroundColor:"white"
    },
    submitButton:{
        flex:1
    },
    fieldsWrapper:{
        flex:9
    },
    fields:{
        gap:20
    },
    Field:{

    }
})