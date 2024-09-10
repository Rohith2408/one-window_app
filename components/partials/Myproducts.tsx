import { View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"

const Myproducts=()=>{

    const products=useAppSelector((state)=>state.products)

    return(
        <View style={{flex:1}}>
            
        </View>
    )
}