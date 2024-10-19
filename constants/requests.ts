import { store } from "../store";
import { setCart } from "../store/slices/cartSlice";
import { updateChat } from "../store/slices/chatsSlice";
import { addMessage } from "../store/slices/messagesSlice";
import { addOrders, setOrders, updateOrder } from "../store/slices/ordersSlice";
import { addProducts, setProducts } from "../store/slices/productsSlice";
import { setRecommendations } from "../store/slices/recommendationsSlice";
import { setWishlist } from "../store/slices/wishlistSlice";
import { Product, PurchasedProduct, Recommendation, RecommendationType, RequestInfo, ServerResponse, ServerUnpurchasedProduct } from "../types";
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
            let keyVerifierResponse=keyVerifier(data,["action","itemIds"])
            console.log("validation",keyVerifierResponse)
            return keyVerifierResponse
        },
        serverCommunicator:async (data:any)=>{
            console.log("server data",JSON.stringify(data,null,2));
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
        inputValidator:(data:{products:ServerUnpurchasedProduct[],package:string|undefined})=>{
            console.log("Order I/P Recieved ",JSON.stringify(data,null,2));
            let keyVerifierResponse=keyVerifier(data,["packageId","products"])
            let emptyProductsRes={success:data.products.length!=0,data:undefined,message:data.products.length==0?"Products cant be empty":""}
            let res={success:keyVerifierResponse.success && emptyProductsRes.success,data:data,message:Word2Sentence([keyVerifierResponse.message,emptyProductsRes.message])}
            console.log("Order I/P Validation Response ",res);
            return res
        },
        serverCommunicator:async (data:{products:ServerUnpurchasedProduct[],package:string|undefined})=>{
            let res=await serverRequest({
                url:getServerRequestURL("checkout","POST"),
                reqType:"POST",
                body:data
            })
            //console.log("Order Server Response ",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(addOrders(res.data.order));
                store.dispatch(addProducts(res.data.order.products));
            }
        }
    },
    {
        id:"addproducts",
        inputValidator:(data:{products:ServerUnpurchasedProduct[],orderid:string})=>{
            console.log("Order I/P Recieved ",JSON.stringify(data,null,2));
            let keyVerifierResponse=keyVerifier(data,["orderId","products"])
            let emptyProductsRes={success:data.products.length!=0,data:undefined,message:data.products.length==0?"Products cant be empty":""}
            let res={success:keyVerifierResponse.success && emptyProductsRes.success,data:data,message:Word2Sentence([keyVerifierResponse.message,emptyProductsRes.message])}
            return res
        },
        serverCommunicator:async (data:{products:ServerUnpurchasedProduct[],orderId:string})=>{
            let res=await serverRequest({
                url:getServerRequestURL("add-products","POST"),
                reqType:"POST",
                body:data
            })
            console.log("Order Server Response ",JSON.stringify(res,null,2));
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(updateOrder(res.data));
                console.log("order",JSON.stringify(res.data,null,2));
                store.dispatch(setProducts([...store.getState().products.data.filter((pdct)=>!res.data.products.find((item:PurchasedProduct)=>item._id==pdct._id)),...res.data.products]));
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
    {
        id:"message-send",
        inputValidator:(data:{content:string,chatId:string,repliedTo:string,uploaded_file:any})=>{
            let allFields=(data && data.content.length!=0 && data.chatId)?true:false
            return {success:allFields,data:undefined,message:allFields?"":"All fields are not present"}
        },
        serverCommunicator:async (data:{content:string,chatId:string,repliedTo:string,uploaded_file:any})=>{
            let res:ServerResponse=await serverRequest({
                url:getServerRequestURL("message-send","POST"),
                reqType: "POST",
                body:data
            })
            console.log("Message send response ",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(updateChat(res.data.chat))
                store.dispatch(addMessage({...res.data.message,type:"normal"}))
            }
        }
    },
    {
        id:"message-seen",
        inputValidator:(data:{chatId:string})=>{
            let allFields=(data.chatId)?true:false
            return {success:allFields,data:undefined,message:allFields?"":"All fields are not present"}
        },
        serverCommunicator:async (data:{chatId:string})=>{
            let res:ServerResponse=await serverRequest({
                url:getServerRequestURL("message-seen","GET")+"/"+data.chatId,
                reqType: "GET"
            })
            console.log("Message seen response ",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(updateChat(res.data))
            }
        }
    },
    {
        id:"modify-wishlist",
        inputValidator:(data:{action:string,courseId:string})=>{
            return {success:(data.action!=undefined && data.action.length!=0) && (data.courseId!=undefined && data.courseId.length!=0),data:undefined,message:""};
        },
        serverCommunicator:async (data:{action:string,courseId:string})=>{
            let res=await serverRequest({
                url:getServerRequestURL("wishlist","POST"),
                reqType:"POST",
                body:data
            })
            console.log("wishlist Server Response ",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(setWishlist(res.data));
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