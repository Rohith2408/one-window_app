import { Pressable, Text, View } from "react-native"
import { Order } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket, removeFromBasket } from "../../constants/basket"
import { useEffect } from "react"

const Ordercard=(props:Order)=>{

    const [path,navigate]=useNavigation()

    // const redirectToPayment=()=>{
    //     navigate?navigate({type:"AddScreen",payload:{screen:"Payment",params:{orderinfoid:props._id}}}):null
    // }

    const redirectToPayment=async ()=>{
        addToBasket("payment_options",props.paymentDetails);
        navigate?navigate({type:"AddScreen",payload:{screen:"Payment"}}):null
    }

    useEffect(()=>{
        return ()=>{
            removeFromBasket("payment_options")
        }
    },[])

    return(
        <View style={{gap:5}}>
            <View>
                <Text>Package Name</Text>
                <Text>{props.Package?props.Package?.name:"Not selected any package"}</Text>
            </View>
            <View>
                <Text>Package Name</Text>
                <Text>Products</Text>
                <View>
                {
                    props.products.map((item)=>
                    <Text>{item.course.name}</Text>
                    )
                }
                </View>
            </View>
            <View>
                <Text>Payment Details</Text>
                <View>
                    <Text>{"Total "+props.paymentDetails.amount}</Text>
                    <Text>{"Amount Due "+props.paymentDetails.amount}</Text>
                    <Text>{props.paymentDetails.paymentStatus}</Text>
                    {
                    props.paymentDetails.paymentStatus=="pending"
                    ?
                    <Pressable onPress={redirectToPayment}><Text>Pay Now</Text></Pressable>
                    :
                    null
                }
                </View>
            </View>
        </View>
    )

}

export default Ordercard