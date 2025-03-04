import { Pressable, StyleSheet, Text, View } from "react-native"
import Listselection from "../resources/Listselection"
import { getBasket } from "../../constants/basket"
import { ListItem, Paymentsummary, ProgramIntake, Request, ServerResponse } from "../../types";
import Intakecard from "../cards/Intakecard";
import { useRef, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import { Fonts, Themes, appStandardStyles } from "../../constants";
import { compareProducts, getDevice } from "../../utils";
import Asynchronousbutton from "../resources/Asynchronousbutton";
import { store } from "../../store";

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    apply:{
        fontSize:18
    },
    heading:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    apply:{
        fontSize:14
    },
    heading:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    apply:{
        fontSize:16
    },
    heading:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    apply:{
        fontSize:16
    },
    heading:{
        fontSize:16
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Intake=(props:{intakebasketid:"intakes-dropdownoptions"})=>{

    const info=getBasket(props.intakebasketid);
    const [intake,setIntake]=useState<{year:undefined|string,month:undefined|string}>({year:info.selected?new Date(info.selected).getFullYear().toString():undefined,month:info.selected?(new Date(info.selected).getMonth()+1).toString():undefined})
    const [path,navigate]=useNavigation()
    const [error,setError]=useState<string|undefined>(undefined)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsloading]=useState(false)
    const [paymentDetails,setPaymentDetails]=useState<Request<Paymentsummary>>()
    const currentYear=useRef(new Date().getFullYear()).current
    const years=useRef([0,1,2,3,4].map((item)=>currentYear+item)).current

    const yearSelected=(data:ListItem[])=>{
        setIntake({...intake,year:data.length==0?undefined:data[0].value})
    }

    const monthSelected=(data:ProgramIntake[])=>{
        setIntake({...intake,month:data.length==0?undefined:(data[0].courseStartingMonth+1).toString()})
    }

    const apply=async ()=>{
        await info.onselection({name:"apply",data:intake});
        // navigate?navigate({type:"RemoveScreen"}):null
        // setTimeout(()=>{
        //     navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Successfull",flyerdata:{message:"Item added to cart successfully!"}}}}):null;
        // },100)
        return true;
    }

    const getErrors=(intake:{year:undefined|string,month:undefined|string})=>{
        //console.log("validation",info.validation);
        if(intake.year==undefined || intake.month==undefined)
        {
            return "Please select the month and year"
        }
        else if (parseInt(intake.year)==new Date().getFullYear() && parseInt(intake.month)<(new Date().getMonth()+1))
        {
            return "Selected intake not available"
        }
        else if(info.validation && !info.validation.validator(intake))
        {
            return info.validation.errorMessage
        }
        else{
            return undefined
        }
    }

    return(
        <View style={[{flexDirection:'column',justifyContent:"center",alignItems:'center',gap:25,paddingTop:20,paddingBottom:0},appStandardStyles.screenMarginMini]}>
            <View style={{alignSelf:'stretch',gap:7}}>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Select the year</Text>
                <View>
                    <Listselection 
                        {...{
                            direction:"horizontal",
                            selectionStyle:"border",
                            styles:{contentcontainer:{gap:10}},
                            onselection:yearSelected,
                            initialSelection:info.selected?[{label:new Date(info.selected).getFullYear(),value:new Date(info.selected).getFullYear()}]:[],
                            options:{
                                list:years.map((item)=>({label:item,value:item})),
                                idExtractor:(item)=>item.label,
                                labelExtractor:(item)=>item.label,
                                selectionMode:"single"
                        }}}
                    />
                </View>
            </View>
            <View style={{alignSelf:'stretch',gap:7,maxHeight:150}}>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Select the Month</Text>
                <View>
                    <Listselection 
                    {...{
                        direction:"vertical",
                        selectionStyle:"tick",
                        styles:{contentcontainer:{gap:10}},
                        onselect:info.onselection,
                        onselection:monthSelected,
                        initialSelection:info.selected?[(info.list.find((item2:ProgramIntake)=>item2.courseStartingMonth==new Date(info.selected).getMonth()))]:[],
                        options:{
                            list:info.list,
                            idExtractor:(item:ProgramIntake)=>item._id,
                            card:Intakecard,
                            selectionMode:"single"
                        }}}
                    />
                </View>
            </View> 
            <View style={{alignSelf:'stretch',transform:[{scale:getErrors(intake)==undefined?1:0}]}}><Asynchronousbutton successText="Added Succesfully" idleText="Apply" failureText="Something went wront" callback={apply}/></View>
            {
                getErrors(intake)!=undefined
                ?
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,textAlign:"center",color:"red"}]}>{getErrors(intake)}</Text>
                :
                null
            }        
        </View>
    )

}

export default Intake