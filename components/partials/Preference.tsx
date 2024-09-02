import { ScrollView, StyleSheet, Text, View } from "react-native"
import { getBasket } from "../../constants/basket"
import { ListItem, PreferenceInfo } from "../../types";
import { useRef, useState } from "react";
import Listselection from "../resources/Listselection";
import { preferences } from "../../constants/preferences";
import { getDevice } from "../../utils";
import { Fonts, Themes } from "../../constants";

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    text:{
        fontSize:12
    },
    heading:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    text:{
        fontSize:14
    },
    heading:{
        fontSize:16
    }
})

const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Preference=(props:{preferenceid:string})=>{

    let info:PreferenceInfo=preferences.find((item)=>item.id==props.preferenceid);
    console.log("preference",props,info)
    const [preference,setPreference]=useState(info.getInitialData())
    const Card=info.options.card
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const selection=(data:ListItem[])=>{
        setPreference(data);
    }

    return(
        <View style={{flex:1,gap:20}}>
            <View>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Selected</Text>
                <ScrollView>
                {
                    preference.map((item:ListItem)=>
                    <Card {...item}/>
                    )
                }
                </ScrollView>
            </View>
            <View>
                <Text style={[styles[Device].heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>All</Text>
                <Listselection
                {...{
                    direction:"vertical",
                    selectionStyle:"tick",
                    
                    styles:{contentcontainer:{gap:10}},
                    onselection:selection,
                    initialSelection:info.getInitialData(),
                    options:info.options}}
                />
            </View>
        </View>
    )

}

export default Preference