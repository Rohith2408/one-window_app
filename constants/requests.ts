import { getSocket } from "../socket";
import { store } from "../store";
import { addBlockedUser, removeBlockedUser } from "../store/slices/blockedUsersSlice";
import { setCart } from "../store/slices/cartSlice";
import { updateChat } from "../store/slices/chatsSlice";
import { addMessage } from "../store/slices/messagesSlice";
import { addOrders, setOrders, updateOrder } from "../store/slices/ordersSlice";
import { addProducts, replaceProducts, setProducts, updateProduct } from "../store/slices/productsSlice";
import { setRecommendations } from "../store/slices/recommendationsSlice";
import { setWishlist } from "../store/slices/wishlistSlice";
import { Advisor_compact, Product, PurchasedProduct, Recommendation, RecommendationType, RequestInfo, ServerResponse, ServerUnpurchasedProduct, TriggerObject } from "../types";
import { ISOtoIntakeformat, Word2Sentence, getServerRequestURL, keyVerifier, pickDocument, profileUpdator, serverRequest } from "../utils";
import { cartRequest } from "../utils/serverrequests";
import Constants from "expo-constants";

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
        // serverCommunicator:async (data:{products:ServerUnpurchasedProduct[],package:string|undefined})=>{
        //     let res=await serverRequest({
        //         url:getServerRequestURL("checkout","POST"),
        //         reqType:"POST",
        //         body:data
        //     })
        //     return res;
        // },
        serverCommunicator:async (data:{products:ServerUnpurchasedProduct[],package:string|undefined})=>{
            let res=await serverRequest({
                url:getServerRequestURL("checkout","POST"),
                reqType:"POST",
                body:data
            })
            // console.log("dummy res",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(addOrders(res.data.order));
                console.log("Order place res",JSON.stringify(res.data.order,null,2));
                if(res.data.order.paymentDetails.amount==0)
                {
                    store.dispatch(addProducts(res.data.order.products));
                }
                //
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
            console.log("res",);
            let res=await serverRequest({
                url:getServerRequestURL("add-products","POST"),//getServerRequestURL("add-products","POST"),
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
                //console.log("order",JSON.stringify(res.data,null,2));
                store.dispatch(replaceProducts(res.data.products));
            }
        }
    },
    {
        id:"cancel-product",
        inputValidator:(data:{applicationId:string})=>{
            let res={success:data.applicationId!=undefined,data:data,message:"No Application ID"}
            return res
        },
        serverCommunicator:async (data:{applicationId:string})=>{
            let res=await serverRequest({
                url:getServerRequestURL("cancel-product","GET")+"/"+data.applicationId,
                reqType:"PUT"
            })
            console.log("Cancel Order place res",JSON.stringify(res,null,2));
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(updateProduct(res.data));
                console.log("Cancel Order place res",JSON.stringify(res.data,null,2));
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
            let succ=false;
            if(data && data.chatId)
            {
                if(data.uploaded_file==undefined && data.content.length>0)
                {
                    succ=true
                }
                if(data.uploaded_file!=undefined)
                {
                    succ=true;
                }
            }
            return {success:succ,data:undefined,message:succ?"":"All fields are not present"}
        },
        serverCommunicator:async (data:{content:string,chatId:string,repliedTo:string,uploaded_file:any})=>{
            console.log("send data",data);
            const formData = new FormData();
            formData.append('content',data.content);
            formData.append('chatId',data.chatId);
            data.repliedTo?formData.append('repliedTo',data.repliedTo):null;
            data.uploaded_file?formData.append('uploaded_file',data.uploaded_file):null
            console.log(formData);
            let res:ServerResponse=await serverRequest({
                url:getServerRequestURL("message-send","POST"),
                reqType: "POST",
                body:formData,
                preventStringify:true
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
    {
        id:"block/unblock-user",
        inputValidator:(data:{action:"block"|"unblock",studentId:string})=>{
            return {success:((data.action=="block" || data.action=="unblock") && data.studentId!=undefined),data:undefined,message:""};
        },
        serverCommunicator:async (data:{action:"block"|"unblock",studentId:string})=>{
            console.log("block res",data,getServerRequestURL(data.action=="block"?"block-user":"unblock-user","PUT")+"/"+data.studentId);
            let res=await serverRequest({
                url:getServerRequestURL(data.action=="block"?"block-user":"unblock-user","PUT")+"/"+data.studentId,
                reqType:"PUT"
            })
            console.log("block res",res);
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.getState().blockedusers.data?.find((user)=>user._id==res.data.blocked._id)!=undefined?store.dispatch(removeBlockedUser(res.data.blocked._id)):store.dispatch(addBlockedUser(res.data.blocked))
            }
        }
    },
    {
        id:"upload-doc-application",
        inputValidator:(data:{applicationId:string,checklistItemId:string,docMaxSize:number})=>{
            return {success:data && data.applicationId.length!=0 && data.checklistItemId.length!=0 && data.docMaxSize!=undefined,data:undefined,message:""};
        },
        serverCommunicator:async (data:{applicationId:string,checklistItemId:string,docMaxSize:number})=>{
            let docRes=await pickDocument(data.docMaxSize);
            if(docRes.success)
            {
                const formData = new FormData()
                formData.append('uploaded_file',docRes.data);
                formData.append("applicationId", data.applicationId);
                formData.append("checklistItemId",data.checklistItemId);
                let res:ServerResponse=await serverRequest({
                    url:getServerRequestURL("upload-doc-application","POST"),
                    reqType:"POST",
                    body:formData,
                    preventStringify:true,
                })
                console.log("product doc res",JSON.stringify(res,null,2));
                if(res.success)
                {
                    store.dispatch(updateProduct(res.data));
                    const triggerObj:TriggerObject={
                        action:"checklist_updated",
                        sender:store.getState().sharedinfo.data,
                        recievers:[res.data.advisors.find((item:Advisor_compact)=>item.role=="counsellor")],
                        data:"Document updated"
                    };
                    getSocket().emit("trigger",triggerObj);
                }
                return res;   
            }
            return docRes;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(setWishlist(res.data));
            }
        }
    },
    {
        id:"delete-doc-application",
        inputValidator:(data:{applicationId:string,checklistItemId:string,documentId:string})=>{
            return {success:data && data.applicationId.length!=0 && data.checklistItemId.length!=0 && data.documentId.length!=0,data:undefined,message:""};
        },
        serverCommunicator:async (data:{applicationId:string,checklistItemId:string,documentId:string})=>{
            console.log("doc data",data);
            let res:ServerResponse=await serverRequest({
                url:getServerRequestURL("delete-doc-application","POST"),
                reqType:"POST",
                body:data
            })
            console.log("product doc del res",JSON.stringify(res,null,2));
            return res;
        },
        responseHandler:(res:ServerResponse)=>{
            if(res.success)
            {
                store.dispatch(updateProduct(res.data));
                const triggerObj:TriggerObject={
                    action:"checklist_updated",
                    sender:store.getState().sharedinfo.data,
                    recievers:[res.data.advisors.find((item:Advisor_compact)=>item.role=="counsellor")],
                    data:"Document removed"
                };
                getSocket().emit("trigger",triggerObj);
            }
        }
    },
    {
        id:"Get-Appdata",
        inputValidator:(data:{appId:string})=>{
            return {success:data.appId!=undefined,data:undefined,message:""};
        },
        serverCommunicator:async (data:{appId:string})=>{
            let res:any=await fetch("https://itunes.apple.com/lookup?id="+data.appId);
            let versionMatch=res?.results[0]?.version==Constants.expoConfig?.version
            return {success:versionMatch,data:res?.results[0],message:versionMatch?"":("A new version "+res?.results[0]?.version+" is now available, Please update to the latest version to continue!")};
        },
        responseHandler:(res:ServerResponse)=>{
            
        }
    }
]



interface cartdata{
    action:"add"|"update"|"remove", // add,update remove
    category?:string,
    itemId?:string,
    courseId:string,
    intake:string // 05/18/2024
}

export {requests}