import { ScrollView, Text, View } from "react-native"
import { getBasket } from "../../constants/basket"
import { ListItem, PreferenceInfo } from "../../types";
import { useState } from "react";
import Listselection from "../resources/Listselection";
import { preferences } from "../../constants/preferences";

const Preference=(props:{preferenceid:string})=>{

    let info:PreferenceInfo=preferences.find((item)=>item.id==props.preferenceid);
    console.log("preference",props,info)
    const [preference,setPreference]=useState(info.getInitialData())
    const Card=info.options.card

    const selection=(data:ListItem[])=>{
        setPreference(data);
    }

    return(
        <View style={{flex:1,gap:20}}>
            <View>
                <Text>Selected</Text>
                <ScrollView>
                {
                    preference.map((item:ListItem)=>
                    <Card {...item}/>
                    )
                }
                </ScrollView>
            </View>
            <View>
                <Text>All</Text>
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