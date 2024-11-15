import { useEffect, useReducer, useRef, useState } from "react"
import { FormReducer } from "../../reducers/FormReducer";
import { Event, FormField as FieldType, FormData, Form as FormType, ServerResponse} from "../../types";
import { Animated, Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fonts, Themes, appStandardStyles, forms } from "../../constants";
import { getDevice } from "../../utils";
import useNavigation from "../../hooks/useNavigation";
import Asynchronousbutton from "./Asynchronousbutton";
import { addToBasket, clearBasket, getBasket, getFullBasket } from "../../constants/basket";
import Transitionview from "./Transitionview";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setRemoveScreen } from "../../store/slices/removeScreenSlice";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        gap:10,
        backgroundColor:"white",
        padding:5,
        paddingBottom:0
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
        fontSize:18,
        paddingLeft:10
    },
    form_title:{
        fontSize:20,
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
        fontSize:14,
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
        fontSize:16,
        marginTop:30,
        marginBottom:30
    }
})
const MobileLStyles=StyleSheet.create({
    field_title:{
        fontSize:14,
        paddingLeft:10
    },
    form_title:{
        fontSize:16,
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

const Form=(props:{formid:string,formerrors?:{id:string,error:string},formupdate?:{id:string,newvalue:any},forminitialdataid?:string,formbasket:string})=>{

    const additionalInfo=getBasket(props.formbasket);
    const formInfo=useRef(forms.find((form)=>form.id==props.formid)).current
    const [fields,dispatch]=useReducer(FormReducer,formInfo?formInfo.getInitialData(props.forminitialdataid):[]);
    const [focussedField,setFocussedField]=useState<string|number|undefined>(undefined);
    const Device=useRef(getDevice()).current
    const [errors,setError]=useState<{id:string,error:undefined|string}[]>([]) 
    const [path,navigate]=useNavigation()
    const [keyboard,setKeyboard]=useState({duration:0,height:0});
    const offset=useRef(new Animated.Value(0)).current
    const storeDispatch=useAppDispatch()
    //console.log("fodod",additionalInfo,props.formbasket)

    const eventHandler=async (event:Event)=>{
        console.log("event",event);
        let field=formInfo?.allFields.find((field)=>field.id==event.triggerBy)
        //console.log(field?.onUpdate)
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
                    //console.log(event.triggerBy)
                    setFocussedField(event.triggerBy)
                    break;
            }
        }
    }

    const onSubmit=async ()=>{ 
        Keyboard.dismiss();
        let errors=validate()
        setError(errors);
        console.log("Submitting");
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
                let convertedData=formInfo?.submit.dataConverter?formInfo.submit.dataConverter(fields,props.forminitialdataid):fields
                res=await handler(convertedData);
                if(!res.success){
                    navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Error",flyerdata:{error:res.message}}}})
                }
                else{
                    storeDispatch(setRemoveScreen({id:"Form"}));
                    //navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Form"}}):null
                    if(formInfo?.submit.redirect)
                    {
                        navigate?navigate(formInfo.submit.redirect(res.data)):null
                    }
                    //console.log("Form callback",additionalInfo.callback)
                    if(additionalInfo?.callback){
                        additionalInfo.callback(convertedData);
                    }
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
            //console.log("bhai",field.id,isEmpty,field.value,info?.emptyChecker?info.emptyChecker(field.value):"ledu");
            !isEmpty ? validation=(info?.validator)?info.validator(field.value):{success:true,message:"",data:undefined} :null
            error=(isEmpty && !info?.isOptional)?info?.title+" cannot be empty":(!validation.success?validation.message:undefined)
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
        if(props.formerrors)
        {
            let errorexisting=errors.find((error)=>error.id==props.formerrors?.id)?true:false
            if(errorexisting)
            {
                if(props.formerrors.error!=undefined)
                {
                    setError(errors.map((error)=>error.id==props.formerrors?.id?props.formerrors:error))
                }
                else
                {
                    setError(errors.filter((error)=>error.id!=props.formerrors?.id))
                }
            }
            else
            {
                if(props.formerrors!=undefined)
                {
                    setError([...errors,props.formerrors])
                }
            }
        }
    },[props.formerrors])

    useEffect(()=>{
        console.log(keyboard.height);
        Animated.timing(offset, {
            duration: keyboard.duration,
            toValue: keyboard.height==0?5:(-keyboard.height+(Platform.OS=="ios"?20:0)),
            useNativeDriver: false,
          }).start();
    },[keyboard])

    useEffect(()=>{
        let keyboardWillShow = Keyboard.addListener(Platform.OS=="android"?'keyboardDidShow':'keyboardWillShow', (event) => {console.log("Workinggggg",event.endCoordinates);setKeyboard({duration:event.duration,height:event.endCoordinates.height})});
        let keyboardWillHide = Keyboard.addListener(Platform.OS=="android"?'keyboardDidHide':'keyboardWillHide', (event) => setKeyboard({duration:event.duration,height:0}));

        console.log("form info",props.formid,formInfo?.id)
        formInfo?.onLoad?formInfo.onLoad():null
        return (()=>{
            keyboardWillShow?.remove();
            keyboardWillHide?.remove();
            clearBasket()
        })
    },[])

    useEffect(()=>{
        fields.forEach(field => {
            addToBasket(field.id,field.value);
        })
        console.log("data",getFullBasket());
    },[fields])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.fields_wrapper]}>
                {
                    formInfo?.title
                    ?
                    <Text style={[GeneralStyles.form_title,appStandardStyles.screenMarginSmall,styles[Device].form_title,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Regular}]}>{formInfo?.title}</Text>
                    :
                    null
                }
                <ScrollView style={{flex:1}} keyboardShouldPersistTaps="handled" contentContainerStyle={[GeneralStyles.fields,{paddingBottom:keyboard.height,padding:15}]}>
                {
                    fields.map((field,i)=>
                    <Transitionview style={[GeneralStyles.field]} effect="pan" delay={70*i}>
                        <Field error={errors.find((item)=>item.id==field.id)?.error} key={field.id} data={field} info={formInfo?.allFields.find((item)=>field.id==item.id)} isFocussed={focussedField==undefined?false:(focussedField==field.id?true:false)} index={i} eventHandler={eventHandler}></Field>
                    </Transitionview>
                    )
                }
                </ScrollView>
            </View>
            <Animated.View style={[appStandardStyles.screenMarginLarge,{transform:[{translateY:offset}]}]}><Asynchronousbutton idleText={formInfo?.submit.idleText} successText={formInfo?.submit.successText} failureText={formInfo?.submit.failureText} callback={onSubmit}/></Animated.View>
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
        <View style={{flex:1,zIndex:props.isFocussed?1:-1,gap:7.5}}>
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