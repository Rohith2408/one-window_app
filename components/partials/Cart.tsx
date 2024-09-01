import { Pressable, ScrollView, Text, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import { CartItem, Event, ProgramIntake } from "../../types";
import { requests } from "../../constants/requests";
import { useRef, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import { store } from "../../store";
import { ISOtoIntakeformat, formatDate } from "../../utils";
import { addToBasket } from "../../constants/basket";

const Cart=()=>{

    const [path,navigate]=useNavigation()
    const cart=useAppSelector((state)=>state.cart);
    const [isLoading,setIsLoading]=useState(false)
    const currentSelection=useRef<CartItem|undefined>()

    const deleteItem=async (item:CartItem)=>{
        setIsLoading(true);
        let data={
            action:"remove",
            itemId:item._id
        }
        let serverRes;
        let requestInfo=requests.find((item)=>item.id=="removeFromCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        console.log("res",validation,serverRes);
        setIsLoading(false)
    }

    const updateItem=async (event:Event)=>{
        console.log("selllll",event.data);
        setIsLoading(true);
        let data={
            action:"update",
            itemId:currentSelection.current?._id,
            courseId:currentSelection.current?.course._id,
            intake:(event.data.month).padStart(2, '0')+"/"+"10"+"/"+event.data.year
        }
        let serverRes;
        let requestInfo=requests.find((item)=>item.id=="updateCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
        console.log("res",validation,serverRes);
        setIsLoading(false)
    }

    const showIntakes=(item:CartItem)=>{
        currentSelection.current=item;
        let dropdowndata={
            list:item?.course.startDate,
            onselection:updateItem,
            selected:item.intake
        }
        addToBasket("intakes-dropdownoptions",dropdowndata);
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intake",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
    }

    const order=()=>{
        console.log()
        addToBasket("orderinfo",{
            package:undefined,
            products:cart.data.map((item)=>({
                intake:item?.intake,
                category:item?.course.elite?"elite application":"premium application",
                course:{name:item?.course?.name,id:item.course._id}
            }))
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:"orderinfo"}}}):null
    }

    return(
        <View style={{flex:1}}>
        {
            cart.responseStatus=="not_recieved"
            ?
            <Text>Loading</Text>
            :
            <View style={{flex:1}}>
                <Pressable onPress={order}><Text>Checkout</Text></Pressable>
                <ScrollView style={{flex:1}}>
                {
                    cart.data.map((item)=>
                    <View style={{flexDirection:'row',gap:10}}>
                        <Text>{item.course.name}</Text>
                        <Text>{item.course.university.name}</Text>
                        {
                            isLoading
                            ?
                            <Text>Loading</Text>
                            :
                            <View style={{flexDirection:"row"}}>
                                <Pressable onPress={()=>deleteItem(item)}><Text>Delete</Text></Pressable>
                                <Pressable onPress={()=>showIntakes(item)}><Text>Update</Text></Pressable>
                            </View>
                        }
                    </View>
                    )
                }
                </ScrollView>
            </View>
        }
        </View>
    )
}

export default Cart