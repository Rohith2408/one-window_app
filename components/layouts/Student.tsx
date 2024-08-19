import { Text, View } from "react-native"
import Stacknavigator from "../../navigation/stackNavigator"
import { FormField, Meeting_Server, ServerResponse } from "../../types"
import { getComponent, getServerRequestURL, propsMapper, serverRequest } from "../../utils"
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
    const Navigation=useNavigation()

    const fetchProfile=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("profile","GET"),
            reqType: "GET"
        })
        if(!res.success)
        {
            if(res.message==serverResponses.LOGIN_AGAIN)
            {
                Navigation?.navigate({type:"Logout"});
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
                    isPlanningToTakeAcademicTest:res.data.isPlanningToTakeAcademicTest,
                    isPlanningToTakeLanguageTest:res.data.isPlanningToTakeLanguageTest,
                }
            }))
            dispatch(initEducationHistory({
                requestStatus:"initiated",
                responseStatus:"recieved",
                haveAnIssue:false,
                issue:"",
                data:res.data.education
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
                data:res.data.verification
            }))
        }
    }

    const fetchActivity=async ()=>{
        let res:ServerResponse=await serverRequest({
            url:getServerRequestURL("dashboard","GET"),
            reqType: "GET"
        })
        if(!res.success)
        {
            if(res.message==serverResponses.LOGIN_AGAIN)
            {
                Navigation?.navigate({type:"Logout"});
            }
        }
        else{
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

    useEffect(()=>{
        //fetchProfile()
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