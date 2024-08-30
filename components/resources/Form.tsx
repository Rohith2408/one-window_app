import { useEffect, useReducer, useRef, useState } from "react"
import { FormReducer } from "../../reducers/FormReducer";
import { Event, FormField as FieldType, FormData, Form as FormType, ServerResponse} from "../../types";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fonts, Themes, forms } from "../../constants";
import { getDevice } from "../../utils";
import useNavigation from "../../hooks/useNavigation";
import Asynchronousbutton from "./Asynchronousbutton";
import { addToBasket, clearBasket, getFullBasket } from "../../constants/basket";

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
        gap:30
    },
    field:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        gap:8
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
        fontSize:12,
        paddingLeft:10
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
        fontSize:14,
        paddingLeft:10
    },
    form_title:{
        fontSize:14,
        marginTop:30,
        marginBottom:30
    }
})
const MobileLStyles=StyleSheet.create({
    field_title:{
        fontSize:15,
        paddingLeft:10
    },
    form_title:{
        fontSize:15,
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
    const [errors,setError]=useState<{id:string,error:undefined|string}[]>([]) 
    const [path,navigate]=useNavigation()

    const eventHandler=async (event:Event)=>{
        console.log("event",event);
        let field=formInfo?.allFields.find((field)=>field.id==event.triggerBy)
        console.log(field?.onUpdate)
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
                        console.log("evv",event)
                        dispatch({type:"update",payload:{id:event.triggerBy,data:event.data}})
                    }
                    break;

                case field.onFocus?.event:
                    console.log(event.triggerBy)
                    setFocussedField(event.triggerBy)
                    break;
            }
        }
    }

    const onSubmit=async ()=>{ 
        let errors=validate()
        setError(errors);
        if(errors.length==0)
        {
            let handler=formInfo?.submit.onSubmit;
            let res:ServerResponse={
                success:false,
                message:"",
                data:undefined
            };
            if(handler)
            {
                res=await handler(formInfo?.submit.dataConverter?formInfo.submit.dataConverter(fields,props.forminitialdataid):fields);
                if(formInfo?.submit.redirect)
                {
                    //console.log("aaa",JSON.stringify(formInfo.submit.redirect(res.data),null,2));
                    navigate?navigate(formInfo.submit.redirect(res.data)):null
                }
            }
            return res.success
        }
        else
        {
            return false
        }
    }

    const validate=()=>{
        let errors:{id:string,error:string}[]=[]
        fields.forEach((field)=>{
            let info=formInfo?.allFields.find((item)=>item.id==field.id)
            let error:undefined|string=undefined
            let isEmpty=false;
            let validation:ServerResponse={success:false,message:"",data:undefined}
            isEmpty=(info?.emptyChecker)?(info.emptyChecker(field.value).success):(field.value==undefined || field.value?.length==0)
            !isEmpty ? validation=(info?.validator)?info.validator(field.value):{success:true,message:"",data:undefined} :null
            error=(isEmpty && !info?.isOptional)?"Field cannot be empty":(!validation.success?validation.message:undefined)
            error?errors.push({id:field.id,error:error}):null
        })
        return errors;
    }

    useEffect(()=>{
        console.log("update form",props.formupdate)
        if(props.formupdate)
        {
            let field=formInfo?.allFields.find((field)=>field.id==props.formupdate?.id);
            field?.onUpdate.handler?field.onUpdate.handler(fields,props.formupdate.newvalue):null
            dispatch({type:"update",payload:{id:props.formupdate.id,data:props.formupdate.newvalue}})
        }
    },[props.formupdate])

    useEffect(()=>{
        formInfo?.onLoad?formInfo.onLoad():null
        return (()=>clearBasket())
    },[])

    useEffect(()=>{
        fields.forEach(field => {
            addToBasket(field.id,field.value);
        })
    },[fields])

    console.log("fields",fields);

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.fields_wrapper]}>
                {
                    formInfo?.title
                    ?
                    <Text style={[GeneralStyles.form_title,styles[Device].form_title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{formInfo?.title}</Text>
                    :
                    null
                }
                <ScrollView style={{flex:1}} contentContainerStyle={[GeneralStyles.fields]}>
                {
                    fields.map((field,i)=>
                    <Field error={errors.find((item)=>item.id==field.id)?.error} key={field.id} data={field} info={formInfo?.allFields.find((item)=>field.id==item.id)} isFocussed={focussedField==undefined?false:(focussedField==field.id?true:false)} index={i} eventHandler={eventHandler}></Field>
                    )
                }
                </ScrollView>
            </View>
            <Asynchronousbutton idleText={formInfo?.submit.idleText} successText={formInfo?.submit.successText} failureText={formInfo?.submit.failureText} callback={onSubmit}/>
        </View>
    )
}

const Field=(props:{info:FieldType,data:FormData,isFocussed:boolean,index:number,error:string|undefined,eventHandler:(event:Event)=>void})=>{

    const Container=props.info.componentInfo.component
    const Device=useRef(getDevice()).current
    const [path,navigate]=useNavigation()

    const eventHandler=async (event:Event)=>{
        switch(event.name){
            case props.info.onUpdate?.event:
                if(props.info.onUpdate?.handler)
                {
                    let updatedFields=await props.info.onUpdate.handler()
                }
                else
                {

                }
                break;
        }
    }

    return(
        <View style={[GeneralStyles.field,{zIndex:props.isFocussed?1:-1}]}>
            <Text style={[GeneralStyles.field_title,styles[Device].field_title,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.info.title}</Text>
            <Container id={props.info.id} {...props.info.componentInfo.props} value={props.data.value} isFocussed={props.isFocussed} eventHandler={(e:Event)=>{props.eventHandler({...e,triggerBy:props.info.id})}}></Container>
            {
                props.error
                ?
                <Text style={[GeneralStyles.field_title,styles[Device].field_title,{color:'red',fontFamily:Fonts.NeutrifStudio.Medium}]}>{props.error}</Text>
                :
                null
            }
        </View>
    )
}


export default Form