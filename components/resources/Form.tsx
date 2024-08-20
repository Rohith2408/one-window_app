import { useEffect, useReducer, useRef, useState } from "react"
import { FormReducer } from "../../reducers/FormReducer";
import { Event, FormField as FieldType, FormData, Form as FormType} from "../../types";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fonts, Themes, forms } from "../../constants";
import { getDevice } from "../../utils";
import useNavigation from "../../hooks/useNavigation";


const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        gap:10,
        backgroundColor:"white",
        padding:10
    },
    submit_button:{
        flex:1
    },
    fields_wrapper:{
        flex:9
    },
    fields:{
        gap:20
    },
    field:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        gap:10
    },
    form_title:{
        fontWeight:"500"
    },
    field_title:{
        fontWeight:"500"
    }
})

const TabStyles=StyleSheet.create({
    field_title:{
        fontSize:12
    },
    form_title:{
        fontSize:13,
        marginTop:30,
        marginBottom:30
    }
})

const MobileSStyles=StyleSheet.create({
    field_title:{
        fontSize:12,
        paddingLeft:10
    },
    form_title:{
        fontSize:13,
        marginTop:30,
        marginBottom:30
    }
})
const MobileMStyles=StyleSheet.create({
    field_title:{
        fontSize:12
    },
    form_title:{
        fontSize:13,
        marginTop:30,
        marginBottom:30
    }
})
const MobileLStyles=StyleSheet.create({
    field_title:{
        fontSize:12
    },
    form_title:{
        fontSize:13,
        marginTop:30,
        marginBottom:30
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Form=(props:{formid:string,formupdate?:{id:string,newvalue:any},forminitialdataid?:string})=>{

    const formInfo=useRef(forms.find((form)=>form.id==props.formid)).current
    const [fields,dispatch]=useReducer(FormReducer,formInfo?formInfo.getInitialData(props.forminitialdataid):[]);
    const [focussedField,setFocussedField]=useState<string|number|undefined>(undefined);
    const Device=useRef(getDevice()).current

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

    useEffect(()=>{
        if(props.formupdate)
        {
            dispatch({type:"update",payload:{id:props.formupdate.id,data:props.formupdate.newvalue}})
        }
    },[props.formupdate])

    console.log("fields",fields)

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.fields_wrapper]}>
                <Text style={[GeneralStyles.form_title,Device?styles[Device].form_title:{},{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{formInfo?.title}</Text>
                <ScrollView style={{flex:1}} contentContainerStyle={[GeneralStyles.fields]}>
                {
                    fields.map((field,i)=>
                    <Field key={field.id} data={field} info={formInfo?.allFields.find((item)=>field.id==item.id)} isFocussed={focussedField==undefined?false:(focussedField==field.id?true:false)} index={i} eventHandler={eventHandler}></Field>
                    )
                }
                </ScrollView>
            </View>
            <Pressable onPress={onSubmit} style={[GeneralStyles.submit_button]}><Text adjustsFontSizeToFit>{formInfo?.submit.idleText}</Text></Pressable>
        </View>
    )
}

const Field=(props:{info:FieldType,data:FormData,isFocussed:boolean,index:number,eventHandler:(event:Event)=>void})=>{

    const Container=props.info.componentInfo.component
    const Device=useRef(getDevice()).current
    const [path,navigate]=useNavigation()

    const eventHandler=async (event:Event)=>{
        navigate?navigate({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:props.info.id,newvalue:event.data}}}):null
        //console.log("e",event)
        //props.eventHandler({...event,triggerBy:props.info.id})
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
        <View style={[GeneralStyles.field,{zIndex:props.isFocussed?1:-1}]}>
            <Text style={[GeneralStyles.field_title,Device?styles[Device].field_title:{},{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.info.title}</Text>
            <Container id={props.info.id} {...props.info.componentInfo.props} value={props.data.value} isFocussed={props.isFocussed} eventHandler={eventHandler}></Container>
        </View>
    )

}

export default Form