import { Pressable, ScrollView, Text, View } from "react-native"
import { Package, Product } from "../../types"
import { addToBasket, getBasket } from "../../constants/basket"
import { useEffect, useState } from "react"
import { PackageProductsValidator, compareProducts, formatDate } from "../../utils"
import { useAppSelector } from "../../hooks/useAppSelector"
import Listselection from "../resources/Listselection"
import useNavigation from "../../hooks/useNavigation"

const Order=(props:{orderinfoid:string})=>{

    let orderInfo:{package:Package|undefined,products:Product[]}=getBasket(props.orderinfoid)
    const [path,navigate]=useNavigation()
    const [Package,setPackage]=useState(orderInfo.package)
    const [Products,setProducts]=useState(orderInfo.products)
    const [errors,setErrors]=useState<{id:string,data:any}[]|undefined>(undefined);
    const suggestedPackages=useAppSelector((state)=>state.suggestedpackages.data);

    useEffect(()=>{
        setErrors(PackageProductsValidator(Package,Products))
    },[Package,Products])

    console.log("Errors",JSON.stringify(errors,null,2));

    const packageSelected=(item:Package[])=>{
        setPackage(item[0]);
    }

    const deleteProduct=(item:Product)=>{
        setProducts(Products.filter((product)=>!compareProducts(item,product)))
    }

    const showOrderSummary=()=>{
        addToBasket("ordersummary",{
            package:Package,
            products:orderInfo.products.map((item)=>({
                intake:item?.intake,
                category:item?.category,
                course:{name:item?.course?.name,id:item.course.id}
            }))
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Ordersummary",params:{ordersummaryid:"ordersummary"}}}):null
    }
    
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <Text>Suggested Packages</Text>
                <View style={{flex:1}}>
                    <Listselection
                        {...{
                            direction:"horizontal",
                            selectionStyle:"border",
                            styles:{contentcontainer:{gap:10}},
                            onselection:packageSelected,
                            initialSelection:[orderInfo.package?orderInfo.package:[]],
                            options:{
                                list:suggestedPackages,
                                idExtractor:(item:Package)=>item._id,
                                labelExtractor:(item:Package)=>item.name,
                                selectionMode:"single"
                            }}}
                    />
                    </View>
                <View>
                </View>
            </View>
            <View style={{flex:1,gap:5}}>
                <Text>Products</Text>
                <ScrollView>
                {
                    Products.map((product)=>
                    <View style={{padding:10}}>
                        <Text>{product.course.name}</Text>
                        <Text>{product.category}</Text>
                        <Text>{formatDate(product.intake)}</Text>
                        {
                            errors?.find((error)=>error.id=="unfit")?.data.find((item)=>compareProducts(item,product))
                            ?
                            <Text style={{color:'red'}}>Doesnt fit in the above package</Text>
                            :
                            null
                        }
                        <Pressable onPress={()=>deleteProduct(product)}><Text>Delete</Text></Pressable>
                    </View>
                    )
                }
                </ScrollView>
            </View>
            {
                errors?.length==0
                ?
                <Pressable onPress={showOrderSummary}><Text>Continue</Text></Pressable>
                :
                null
            }
        </View>
    )

}

export default Order