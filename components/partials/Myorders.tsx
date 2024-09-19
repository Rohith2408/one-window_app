import { Pressable, ScrollView, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation";
import Order from "./Order";
import Ordercard from "../cards/Ordercard";

const Myorders=()=>{

    const orders=useAppSelector((state)=>state.orders);
    console.log("Orders",JSON.stringify(orders.data[6],null,2))

    return(
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{gap:50}}>
            {
                orders.data.map((order,i)=>
                <Ordercard index={i} {...order}/>
            )}
            </ScrollView>
        </View>
    )
}

export default Myorders