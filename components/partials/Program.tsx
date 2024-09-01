import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import { Course, Event, Product, ProgramIntake, ServerResponse } from "../../types"
import { PackageProductsValidator, Word2Sentence, getServerRequestURL, serverRequest } from "../../utils";
import { cartRequest } from "../../utils/serverrequests";
import useNavigation from "../../hooks/useNavigation";
import { addToBasket } from "../../constants/basket";
import Intakecard from "../cards/Intakecard";
import { removeCart, setCart, updateCart } from "../../store/slices/cartSlice";
import { store } from "../../store";
import { requests } from "../../constants/requests";

const Program=(props:{programid:string})=>{

    let [programInfo,setProgramInfo]=useState<Course|undefined>();
    const [path,navigate]=useNavigation();
    const freePackageInfo=useRef(store.getState().suggestedpackages.data.find((item)=>item.priceDetails.totalPrice==0)).current;
    const feePackagePurchased=useRef(store.getState().orders.data.find((order)=>order.Package.priceDetails.totalPrice==0)?true:false).current
    //const eligibleForFree=!programInfo?.elite && ;

    const order=(event:Event)=>{
        console.log(event);
        addToBasket(props.programid,{
            package:freePackageInfo,
            products:[{
                intake:new Date(event.data.year,parseInt(event.data.month)-1,10).toISOString(),
                category:programInfo?.elite?"elite application":"premium application",
                course:{name:programInfo?.name,id:programInfo?._id}
            }]
        }) 
        navigate?navigate({type:"AddScreen",payload:{screen:"Order",params:{orderinfoid:props.programid}}}):null
    }

    const fetchProgram=async ()=>{
        console.log("id",props.programid)
        const res:ServerResponse=await serverRequest({
            url:getServerRequestURL("program","GET",{id:props.programid,currency:"INR"}),
            reqType:"GET"
        });
        res.success?setProgramInfo(res.data):null
    }

    const showIntakes=(callback:any)=>{
        let dropdowndata={
            list:programInfo?.startDate,
            onselection:callback
        }
        addToBasket("intakes-dropdownoptions",dropdowndata);
        navigate?navigate({type:"AddScreen",payload:{screen:"Flyer",params:{flyerid:"Intake",flyerdata:{basketid:"intakes-dropdownoptions"}}}}):null
    }

    const addToCart=async (event:Event)=>{
        let data={
            action:"add",
            category:programInfo?.elite?"elite application":"premium application",
            courseId:programInfo?._id,
            intake:(event.data.month).padStart(2, '0')+"/"+"10"+"/"+event.data.year
        }
        let requestInfo=requests.find((item)=>item.id=="addToCart");
        let validation=requestInfo?.inputValidator(data);
        if(validation?.success)
        {
            let serverRes=await requestInfo?.serverCommunicator(data);
            if(serverRes?.success)
            {
                requestInfo?.responseHandler(serverRes);
            }
        }
    }

    const removeFromCart=async (event:Event)=>{
        let res:ServerResponse=await cartRequest({
            action: "remove",
            category:programInfo?.elite?"elite application":"premium application",
            course:programInfo?._id,
            intake:"10"+event.data.month.padStart(2, '0')+"/"+"/"+event.data.year
        })
        //res.success?removeCart():null
    }

    //console.log("packages",store.getState().suggestedpackages.data);

    useEffect(()=>{
        fetchProgram();
    },[])

    return(
        <View style={{flex:1}}>
        {
            programInfo
            ?
            <ScrollView style={{flex:1}}>
                <Text>{programInfo.name}</Text>
                <Text>{programInfo.university?.name}</Text>
                <Pressable onPress={()=>showIntakes(addToCart)}><Text>Add to cart</Text></Pressable>
                <Pressable onPress={()=>showIntakes(order)}><Text>Apply</Text></Pressable>
            </ScrollView>
            :
            <Text>Loading</Text>
        }
        </View>
    )

}

export default Program