import { store } from "../store";
import { setCart } from "../store/slices/cartSlice";
import { addOrders, setOrders } from "../store/slices/ordersSlice";
import { setRecommendations } from "../store/slices/recommendationsSlice";
import { Product, Recommendation, RecommendationType, RequestInfo, ServerResponse } from "../types";
import { ISOtoIntakeformat, Word2Sentence, getServerRequestURL, keyVerifier, profileUpdator, serverRequest } from "../utils";
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
    {
        id:"placeorder",
        inputValidator:(data:{products:Product[],package:string|undefined})=>{
            console.log("Order I/P Recieved ",JSON.stringify(data,null,2));
            let keyVerifierResponse=keyVerifier(data,["packageId","products"])
            let emptyProductsRes={success:data.products.length!=0,data:undefined,message:data.products.length==0?"Products cant be empty":""}
            let res={success:keyVerifierResponse.success && emptyProductsRes.success,data:data,message:Word2Sentence([keyVerifierResponse.message,emptyProductsRes.message])}
            console.log("Order I/P Validation Response ",res);
            return res
        },
        serverCommunicator:async (data:{products:Product[],package:string|undefined})=>{
            let res=await serverRequest({
                url:getServerRequestURL("checkout","POST"),
                reqType:"POST",
                body:data
            })
            console.log("Order Server Response ",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(addOrders(res.data.order));
            }
        }
    },
    {
        id:"generate-recommendations",
        inputValidator:(data:RecommendationType)=>{
            // const ugdata=store.getState().educationhistory.data.underGraduation
            // const gredata=store.getState().testscores.data.find((test)=>test.name=="")
            // return {success:(data==undefined || data.criteria==undefined || data.data.length==0 || Object.keys(data.)) || ()}
        },
        serverCommunicator:async ()=>{
            let res=await serverRequest({
                url:getServerRequestURL("generate-recommendations","POST"),
                reqType:"PUT"
            })
            console.log("AI Rec Server Response ",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(setRecommendations(res.data));
            }
        }
    },
]



interface cartdata{
    action:"add"|"update"|"remove", // add,update remove
    category?:string,
    itemId?:string,
    courseId:string,
    intake:string // 05/18/2024
}

export {requests}