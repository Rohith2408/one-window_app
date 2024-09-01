import { Pressable, Text, View } from "react-native"
import Listselection from "../resources/Listselection"
import { getBasket } from "../../constants/basket"
import { ListItem, ProgramIntake } from "../../types";
import Intakecard from "../cards/Intakecard";
import { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import { Fonts, Themes } from "../../constants";



const Intake=(props:{basketid:"intakes-dropdownoptions"})=>{

    const info=getBasket(props.basketid);
    const [intake,setIntake]=useState<{year:undefined|string,month:undefined|string}>({year:info.selected?new Date(info.selected).getFullYear().toString():undefined,month:info.selected?(new Date(info.selected).getMonth()+1).toString():undefined})
    const [path,navigate]=useNavigation()
    const [error,setError]=useState<string|undefined>(undefined)

    const yearSelected=(data:ListItem[])=>{
        setIntake({...intake,year:data.length==0?undefined:data[0].value})
    }

    const monthSelected=(data:ProgramIntake[])=>{
        setIntake({...intake,month:data.length==0?undefined:(data[0].courseStartingMonth+1).toString()})
    }

    const apply=()=>{
        navigate?navigate({type:"RemoveScreen"}):null
        info.onselection({name:"apply",data:intake});
    }

    const checkIfAlreadyExists=()=>{
        
    }

    console.log("info",info);

    return(
        <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:'center',gap:15,padding:10}}>
            {/* <Text style={[{margin:15,fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Please select the Intake</Text> */}
            <View style={{flex:1,alignSelf:'stretch',gap:7}}>
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Select the year</Text>
                <View style={{flex:1}}>
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
            <View style={{flex:2,alignSelf:'stretch',gap:7}}>
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Select the Month</Text>
                <View style={{flex:1}}>
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
            {
                intake.month && intake.year
                ?
                <Pressable style={{padding:10,alignSelf:"stretch",alignItems:'center',justifyContent:'center'}} onPress={apply}><Text>Apply</Text></Pressable>
                :
                null
            }   
            {
                error!=undefined
                ?
                <Text style={[{fontFamily:Fonts.NeutrifStudio.Bold,color:"red"}]}>{error}</Text>
                :
                null
            }        
        </View>
    )

}

export default Intake