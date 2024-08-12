import { useReducer, useState } from "react"
import { FormReducer } from "../../reducers/FormReducer";
import { Event, FormField as FieldType, Form as FormType} from "../../types";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const Form=(props:FormType)=>{

    const [fields,dispatch]=useReducer(FormReducer,props.fields);
    const [focussedField,setFocussedField]=useState(props.initialFocussedField?props.initialFocussedField:-1);

    const eventHandler=async (event:Event)=>{
        let field=fields.find((field)=>field.id==event.triggerBy)
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
                setFocussedField(fields.findIndex((field)=>field.id==event.triggerBy))
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

    console.log(JSON.stringify(fields[1],null,2))

    return(
        <View style={[styles.mainWrapper]}>
            <View style={[styles.fieldsWrapper]}>
                <ScrollView style={{flex:1}} contentContainerStyle={[styles.fields]}>
                {
                    fields.map((field,i)=>
                    <Field key={field.id} info={{...field}} isFocussed={focussedField==i?true:false} index={i} eventHandler={eventHandler}></Field>
                    )
                }
                </ScrollView>
            </View>
            <Pressable style={[styles.submitButton]}><Text adjustsFontSizeToFit>{props.submit.idleText}</Text></Pressable>
        </View>
    )
}

const Field=(props:{info:FieldType,isFocussed:boolean,index:number,eventHandler:(event:Event)=>void})=>{

    const Container=props.info.componentInfo.component

    const eventHandler=async (event:Event)=>{
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
            <Container {...props.info.componentInfo.props} value={props.info.value} isFocussed={props.isFocussed} eventHandler={eventHandler}></Container>
        </View>
    )

}

export default Form

const styles=StyleSheet.create({
    mainWrapper:{
        flex:1,
        gap:10
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