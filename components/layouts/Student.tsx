import { AppState, Text, View } from "react-native"
import Stacknavigator from "../../navigation/stackNavigator"
import { FormField, Meeting_Server, ServerResponse, TriggerObject } from "../../types"
import { getComponent, getFriends, getServerRequestURL, propsMapper, serverRequest } from "../../utils"
import Invalidpath from "../partials/Invalidpath"
import Form from "../resources/Form"
import { useEffect, useRef } from "react"
import Textbox from "../resources/Textbox"
import Dropdown from "../resources/Dropdown"
import {components} from "../../constants/components"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { initPersonalInfo } from "../../store/slices/personalinfoSlice"
import { initSharedInfo } from "../../store/slices/sharedinfoSlice"
import useServerResponseChecker from "../../hooks/useServerResponseChecker"
import useNavigation from "../../hooks/useNavigation"
import { serverResponses } from "../../constants/server"
import { initEducationHistory } from "../../store/slices/educationHistorySlice"
import { initRecommendations } from "../../store/slices/recommendationsSlice"
import { initDocuments } from "../../store/slices/documentsSlice"
import { initPreferences } from "../../store/slices/preferencesSlice"
import { initSkills } from "../../store/slices/skillsSlice"
import { initFamilyinfo } from "../../store/slices/familyInfoSlice"
import { initTestScores } from "../../store/slices/testScoresSlice"
import { initWorkexperience } from "../../store/slices/workexperienceSlice"
import { initAdvisors } from "../../store/slices/advisorsSlice"
import { initVerification } from "../../store/slices/verificationSlice"
import { initMeetings } from "../../store/slices/meetingsSlice"
import { initCart } from "../../store/slices/cartSlice"
import { initWishlist } from "../../store/slices/wishlistSlice"
import { initOrders } from "../../store/slices/ordersSlice"
import { initSuggestedPackage } from "../../store/slices/suggestedpackageSlice"
import { initProducts } from "../../store/slices/productsSlice"
import { store } from "../../store"
import { initChats, updateChat, updateParticipantActivity, updateParticipantsActivity } from "../../store/slices/chatsSlice"
import socket from "../../socket"

const Student=(props:{screens:string[],params:any})=>{

    // const fields=useRef<FormField[]>([
    // {
    //     id:"firstname",
    //     componentInfo:{
    //         component:Textbox,
    //         props:{
    //             placeholder:"Enter your firstname"
    //         }
    //     },
    //     title:"Firstname",
    //     value:undefined,
    //     onFocus:{
    //         event:"onFocus"
    //     }
    // },
    // {
    //     id:"gender",
    //     componentInfo:{
    //         component:Dropdown,
    //         props:{
    //            options:[
    //             {label:"Male",value:"male"},
    //             {label:"Female",value:"female"},
    //            ]
    //         }
    //     },
    //     onFocus:{
    //         event:"onToggle"
    //     },
    //     onUpdate:{
    //         event:"onSelect"
    //     },
    //     title:"Gender",
    //     value:undefined,
    // },
    // {
    //     id:"lastname",
    //     componentInfo:{
    //         component:Textbox,
    //         props:{
    //             placeholder:"Enter your lastname"
    //         }
    //     },
    //     title:"Lastname",
    //     value:undefined,
    // }
    // ]).current
    const dispatch=useAppDispatch()
    const [path,navigate]=useNavigation()

    const fetchProfile=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("profile","GET"),
            reqType: "GET"
        })
        console.log("ress",res.data.otp)
        if(!res.success)
        {
            if(res.message==serverResponses.VerificationFailed || res.message==serverResponses.InvalidTokens || res.message==serverResponses.TokenMissing)
            {
                navigate?navigate({type:"Logout"}):null
            }
        }
        else
        {
            dispatch(initPersonalInfo({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.personalDetails
            }))
            //console.log("personal",res.data.personalDetails)
            dispatch(initSharedInfo({
                requestStatus: "initiated",
                responseStatus: "recieved",
                haveAnIssue: false,
                issue: "",
                data: {
                    _id:res.data._id,
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    email:res.data.email,
                    displayPicSrc:res.data.displayPicSrc?res.data.displayPicSrc:"",
                    phone:res.data.phone,
                    LeadSource:res.data.LeadSource,
                }
            }))
            dispatch(initEducationHistory({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.education
            }))
            dispatch(initDocuments({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.documents
            }))
            console.log("documents",res.data.documents);
            dispatch(initPreferences({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.preference
            }))
            dispatch(initSkills({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.skills
            }))
            dispatch(initFamilyinfo({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.familyDetails
            }))
            dispatch(initTestScores({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.tests
            }))
            dispatch(initWorkexperience({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.workExperience
            }))
            dispatch(initAdvisors({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.advisors
            }))
            dispatch(initVerification({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:[
                    {type:"email",status:res.data.otp.emailLoginOtp.verified},
                    {type:"phone",status:res.data.otp.phoneLoginOtp.verified}
                ]
            }))
        }
        return res
    }

    const fetchActivity=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("dashboard","GET"),
            reqType: "GET"
        })
        //console.log("act",JSON.stringify(res.data.activity,null,2))
        if(!res.success)
        {
            if(res.message==serverResponses.VerificationFailed || res.message==serverResponses.TokenMissing)
            {
                navigate?navigate({type:"Logout"}):null
            }
        }
        else{
            dispatch(initOrders({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.orders
            }))
            dispatch(initProducts({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.activity.products
            }))
            dispatch(initSuggestedPackage({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.suggestedPackages
            }))
            dispatch(initWishlist({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.activity.wishList
            }))
            dispatch(initCart({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.activity.cart
            }))
            //console.log("meet",res.data.activity.meetings)
            dispatch(initMeetings({
                requestStatus: "initiated",
                responseStatus: "recieved",
                haveAnIssue: false,
                issue: "",
                data:res.data.activity.meetings.map((meeting:Meeting_Server)=>({
                    _id:meeting._id,
                    description:meeting.data.summary,
                    attendees:meeting.data.attendees.map((item)=>item.email),
                    link:meeting.data.hangoutLink,
                    //calenderLink:meeting.data.,
                    startDate:meeting.data.start,
                    endDate:meeting.data.end,
                    status:meeting.status,
                    member:meeting.member
                }))
            }))
            dispatch(initRecommendations({
                requestStatus: "initiated",
                responseStatus: "recieved",
                haveAnIssue: false,
                issue: "",
                data:res.data.recommendations
            }))
        }
    }

    const fetchChats=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("chats","GET"),
            reqType: "GET"
        })
        if(res.success)
        {
            dispatch(initChats({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data
            }))
            //console.log("chats",res.data);
        }
        return res
    }
    
    const triggerRoot=(triggerObj:TriggerObject)=>{
        console.log("trigger",triggerObj);
        switch(triggerObj.action){
            case "activityList":
                dispatch(updateParticipantsActivity(triggerObj.data))
                break

            case "ping":
                dispatch(updateParticipantActivity({...triggerObj.sender,role:"",activity:triggerObj.data.status}))
                break;

            case "typing":
                dispatch(updateParticipantActivity({...triggerObj.sender,role:"",activity:triggerObj.data=="start"?"typing":"inchat"}))
                break;
            
            case "send":
                dispatch(updateChat(triggerObj.data.chat))
                break;

            case "seen":
                dispatch(updateChat(triggerObj.data));
                break;
        }
    }

    useEffect(()=>{
        //socket.removeListener("trigger",triggerRoot)
        socket.on("trigger",triggerRoot);
        fetchProfile().then((res:ServerResponse)=>{
            if(res.success)
            {
                let user={
                    _id:res.data._id,
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    email:res.data.email,
                    displayPicSrc:res.data.displayPicSrc?res.data.displayPicSrc:"",
                    phone:res.data.phone,
                }
                socket.emit('join',user)
                fetchChats().then((res2)=>{
                    if(res2.success)
                    {
                        let friends:any=getFriends(res2.data,user._id);
                        let triggerObj:TriggerObject={
                            action:"ping",
                            sender:{...user,userType:"student"},
                            recievers:friends,
                            data:{respond:false,status:'online'}
                        }
                        socket.emit('trigger',triggerObj);
                        AppState.addEventListener('change',(state)=>{
                            var triggerObject;
                            triggerObject={
                                action:'ping',
                                sender:{...user,userType:"student"},
                                recievers:friends,
                                data:{respond:false,status:state=="active"?"online":"offline"}
                            };
                            socket.emit('trigger',{...triggerObj});
                        })
                    }
                })
            }
        })
        fetchActivity()
    },[])   
    
    return(
        <View style={{width:"100%",height:"100%"}}>
            {/* <Form fields={fields} initialFocussedField={0} submit={{successText:"Success",failureText:"Failed",idleText:"Submit",onSubmit:(data)=>console.log(data)}}></Form> */}
            <Stacknavigator 
                invalidPathScreen={Invalidpath}
                screens={propsMapper(props.screens,props.params).map((screen)=>({
                    id:screen.id,
                    component:screen.id,
                    props:screen.props,
                    swipable:true,
                    animationStyle:components.find((component)=>component.id==screen.id)?.animationStyle
            }))}
            />
        </View>
    )
}

export default Student