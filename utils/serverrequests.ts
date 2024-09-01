import { getServerRequestURL, serverRequest } from "."
import { ServerResponse } from "../types"

interface cartdata{
    action:"add"|"update"|"remove", // add,update remove
    category?:string,
    itemId?:string,
    courseId:string,
    intake:string // 05/18/2024
}

export const cartRequest=async (data:cartdata)=>{
    const res:ServerResponse=await serverRequest({
        url:getServerRequestURL("cart","POST"),
        reqType:"POST",
        body:data
    });
    return res;
}