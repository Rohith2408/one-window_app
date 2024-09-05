import { Pressable, ScrollView, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation";
import Order from "./Order";
import Ordercard from "../cards/Ordercard";

const Myorders=()=>{

    const orders=useAppSelector((state)=>state.orders);

    return(
        <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{gap:30}}>
            {
                orders.data.map((order)=>
                <Ordercard {...order}/>
            )}
            </ScrollView>
        </View>
    )
}

export default Myorders