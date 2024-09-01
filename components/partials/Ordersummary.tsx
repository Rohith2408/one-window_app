import { ScrollView, Text, View } from "react-native"
import { Package, Product } from "../../types"
import { getBasket } from "../../constants/basket"
import { formatDate } from "../../utils"

const Ordersummary=(props:{ordersummaryid:string})=>{

    let orderInfo:{package:Package|undefined,products:Product[]}=getBasket(props.ordersummaryid)

    return(
        <View style={{flex:1,gap:50}}>
            <View>
                <Text>Selected Package</Text>
                <Text>{orderInfo.package?orderInfo.package?.name:"No Package Selected"}</Text>
            </View>
            <View>
                <Text>Products</Text>
                <ScrollView>
                {
                    orderInfo.products.map((product)=>
                    <View style={{padding:10}}>
                        <Text>{product.course.name}</Text>
                        <Text>{product.category}</Text>
                        <Text>{formatDate(product.intake)}</Text>
                    </View>
                    )
                }
                </ScrollView>
            </View>
            <View>
                <Text>Total</Text>
                <Text>{orderInfo.package?.priceDetails.currency.symbol+" "+orderInfo.package?.priceDetails.totalPrice}</Text>
            </View>
        </View>
    )

}

export default Ordersummary