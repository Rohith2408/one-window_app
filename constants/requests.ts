import { store } from "../store";
import { setCart } from "../store/slices/cartSlice";
import { RequestInfo, ServerResponse } from "../types";
import { ISOtoIntakeformat, keyVerifier, profileUpdator } from "../utils";
import { cartRequest } from "../utils/serverrequests";

const requests:RequestInfo[]=[
    {
        id:"addToCart",
        inputValidator:(data:cartdata)=>{
            let keyVerifierResponse=keyVerifier(data,["action","category","courseId","intake"])
            let alreadyExists=store.getState().cart.data.find((item)=>((item.category==data.category) && (item.course._id==data.courseId) && (data.intake==ISOtoIntakeformat(item.intake))))?true:false
            let res={
                success:keyVerifierResponse.success && !alreadyExists,
                message:keyVerifierResponse.message+(alreadyExists?" , Item already in cart":""),
                data:keyVerifierResponse.data
            }
            console.log("validation",res)
            return res
        },
        serverCommunicator:async (data:any)=>{
            let res=await cartRequest(data);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(setCart(res.data));
            }
        }
    },
    {
        id:"updateCart",
        inputValidator:(data:cartdata)=>{
            let keyVerifierResponse=keyVerifier(data,["action","itemId","courseId","intake"])
            console.log("validation",keyVerifierResponse)
            return keyVerifierResponse
        },
        serverCommunicator:async (data:any)=>{
            let res=await cartRequest(data);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(setCart(res.data));
            }
        }
    },
    {
        id:"removeFromCart",
        inputValidator:(data:cartdata)=>{
            let keyVerifierResponse=keyVerifier(data,["action","itemId"])
            return keyVerifierResponse
        },
        serverCommunicator:async (data:any)=>{
            let res=await cartRequest(data);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            console.log("response delete",res)
            if(res.success)
            {
                store.dispatch(setCart(res.data));
            }
        }
    },
    // {
    //     id:"setPreference",
    //     inputValidator:(data:cartdata)=>{
    //         let keyVerifierResponse=keyVerifier(data,["action","itemId"])
    //         return keyVerifierResponse
    //     },
    //     serverCommunicator:async (data:any)=>{
    //         let res=await profileUpdator()
    //         return res;
    //     },
    //     responseHandler:(res:ServerResponse)=>{
    //         console.log("response delete",res)
    //         if(res.success)
    //         {
    //             store.dispatch(setCart(res.data));
    //         }
    //     }
    // }
]



interface cartdata{
    action:"add"|"update"|"remove", // add,update remove
    category?:string,
    itemId?:string,
    courseId:string,
    intake:string // 05/18/2024
}

export {requests}