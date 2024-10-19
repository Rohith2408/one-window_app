import { Pressable, StyleSheet, Text, View } from "react-native"
import Listselection from "../resources/Listselection"
import { getBasket } from "../../constants/basket"
import { ListItem, ProgramIntake } from "../../types";
import Intakecard from "../cards/Intakecard";
import { useRef, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import { Fonts, Themes } from "../../constants";
import { compareProducts, getDevice } from "../../utils";
import Asynchronousbutton from "../resources/Asynchronousbutton";
import { store } from "../../store";

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    apply:{
        fontSize:16
    },
    heading:{
        fontSize:16
    }
})

const MobileSStyles=StyleSheet.create({
    apply:{
        fontSize:12
    },
    heading:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    apply:{
        fontSize:14
    },
    heading:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    apply:{
        fontSize:14
    },
    heading:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Intake=(props:{basketid:"intakes-dropdownoptions"})=>{

    const info=getBasket(props.basketid);
    const [intake,setIntake]=useState<{year:undefined|string,month:undefined|string}>({year:info.selected?new Date(info.selected).getFullYear().toString():undefined,month:info.selected?(new Date(info.selected).getMonth()+1).toString():undefined})
    const [path,navigate]=useNavigation()
    const [error,setError]=useState<string|undefined>(undefined)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [isLoading,setIsloading]=useState(false)

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
        if(intake.year==undefined || intake.month==undefined)
        {
            return "Please select the month and year"
        }
        else if (parseInt(intake.year)==new Date().getFullYear() && parseInt(intake.month)<(new Date().getMonth()+1))
        {
            return "Selected intake not available"
        }
        else if(info.product && store.getState().products.data.find((product)=>compareProducts(product,{...info.product,intake:new Date(intake.year,parseInt(intake.month)-1,1)})))
        {
            return "Already applied for the selected intake"
        }
        else{
            return undefined
        }
    }

    return(
        <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:'center',gap:35,padding:5,paddingTop:15,paddingBottom:35}}>
            <View style={{alignSelf:'stretch',gap:7}}>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Select the year</Text>
                <View>
                    <Listselection 
                        {...{
                            direction:"horizontal",
                            selectionStyle:"border",
                            styles:{contentcontainer:{gap:10}},
                            onselection:yearSelected,
                            initialSelection:info.selected?[{label:new Date(info.selected).getFullYear(),value:new Date(info.selected).getFullYear()}]:[],
                            options:{
                                list:[{label:2024,value:2024},{label:2025,value:2025},{label:2026,value:2026}],
                                idExtractor:(item)=>item.label,
                                labelExtractor:(item)=>item.label,
                                selectionMode:"single"
                            }}}
                    />
                </View>
            </View>
            <View style={{flex:1,alignSelf:'stretch',gap:7}}>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Select the Month</Text>
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
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:"red"}]}>{getErrors(intake)}</Text>
                :
                null
            }        
        </View>
    )

}

export default Intake