import Dropdown from "../components/resources/Dropdown";
import Textbox from "../components/resources/Textbox";
import { store } from "../store";
import { setWorkExperience } from "../store/slices/workexperienceSlice";
import { FormData, FormField, ServerResponse, WorkExperience } from "../types";
import { getServerRequestURL, serverRequest } from "../utils";

const forms=[
    {
        id:"Workexperience",
        getInitialData:(id:string|undefined)=>{
            let data:WorkExperience|undefined=id?store.getState().workexperience.data.find((item)=>item._id==id):undefined
            return [
                {id:"companyname",value:data?data.companyName:""},
                {id:"ongoing",value:data?data.Ongoing:""},
                {id:"designation",value:data?data.designation:""},
                {id:"document",value:data?data.docId:""},
                {id:"enddate",value:data?data.endDate:""},
                {id:"sector",value:data?data.sector:""},
                {id:"startdate",value:data?data.startDate:""},
                {id:"worktype",value:data?data.type:""}
            ]
        },
        submit:{
            onSubmit:async (data:FormData[])=>{
                let workexperience:WorkExperience={
                    companyName:data[data.findIndex((item)=>item.id=="companyname")].value.toString(),
                    sector:data[data.findIndex((item)=>item.id=="sector")].value.toString(),
                    type:data[data.findIndex((item)=>item.id=="worktype")].value.toString(),
                    designation:data[data.findIndex((item)=>item.id=="designation")].value.toString(),
                    Ongoing:data[data.findIndex((item)=>item.id=="ongoing")].value.toString()=="yes"?true:false,
                    startDate:data[data.findIndex((item)=>item.id=="startdate")].value.toString(),
                    endDate:data.find((item)=>item.id=="enddate")?.value,
                    docId:undefined
                    //docId:Doc2Upload
                }
                // let res:ServerResponse=await serverRequest({
                //     url: getServerRequestURL("workexperience","POST"),
                //     reqType: "POST",
                //     body:workexperience
                // })
                // if(res.success)
                // {
                //     store.dispatch(setWorkExperience(res.data.workExperience))
                // }
                return workexperience
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        initialFields:["companyname","worktype","sector","designation","ongoing","startdate"],
        allFields:[
            {
                id:"companyname",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"Company Name",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"worktype",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:[
                            {label:"Full-time",value:"full-time"},
                            {label:"Part-time",value:"part-time"},
                            {label:"Freelancing",value:"freelancing"},
                            {label:"Contract",value:"contract"},
                            {label:"Remote",value:"remote"},
                            {label:"Flexible",value:"flexible"},
                            {label:"Shift-work",value:"shift work"}
                        ]},
                        selectionMode:"single"
                },
                title:"Work type",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"sector",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"Sector",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"designation",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"Designation",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"ongoing",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"Ongoing?",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"startdate",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"Start Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"enddate",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"End Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"document",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Ex. Microsoft"}
                },
                title:"Document",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                    // handler:(formData:FormData[],data:any)=>{

                    // }
                },
                onFocus:{
                    event:"onFocus"
                }
            }
        ]
    }
]

export {forms}

//const formFields:FormField[]=[
//     {
//         _id:"companyname",
//         title:"Company Name",
//         container:{
//             _id:'companyname',
//             component:"textbox",
//             data:{placeholder:""},
//             formUpdateEventName:"textInput",
//             formFocusEventName:"onInteraction"
//         },
//         emptyChecker:stringEmptyChecker,
//         initialValue:undefined
//     },
//     {
//         _id:"worktype",
//         title:"Work Type",
//         container:{
//             _id:'worktype',
//             component:"formdropdown",
//             data:{
//                 options:[
//                     {label:"Full-time",value:"full-time"},
//                     {label:"Part-time",value:"part-time"},
//                     {label:"Freelancing",value:"freelancing"},
//                     {label:"Contract",value:"contract"},
//                     {label:"Remote",value:"remote"},
//                     {label:"Flexible",value:"flexible"},
//                     {label:"Shift-work",value:"shift work"}
//                 ]
//             },
//             formUpdateEventName:"itemSelected",
//             formFocusEventName:"onToggle"
//         },
//         emptyChecker:stringEmptyChecker,
//         initialValue:undefined
//     },
//     {
//         _id:"sector",
//         title:"Sector",
//         container:{
//             _id:'sector',
//             component:"formdropdown",
//             data:{
//                 options:Industries.map((industry)=>({label:setWordCase(industry),value:industry})),
//                 showSearch:true
//             },
//             formUpdateEventName:"itemSelected",
//             formFocusEventName:"onToggle"
//         },
//         emptyChecker:stringEmptyChecker,
//         initialValue:undefined
//     },
//     {
//         _id:"designation",
//         title:"Designation",
//         container:{
//             _id:'designation',
//             component:"textbox",
//             data:{placeholder:"Your role in the company"},
//             formUpdateEventName:"textInput",
//             formFocusEventName:"onInteraction"
//         },
//         emptyChecker:stringEmptyChecker,
//         initialValue:undefined
//     },
//     {
//         _id:"ongoing",
//         title:"Ongoing?",
//         container:{
//             _id:'ongoing',
//             component:"formdropdown",
//             data:{
//                 options:[
//                     {label:"Yes",value:"yes"},
//                     {label:"No",value:"no"}
//                 ]
//             },
//             formUpdateEventName:"itemSelected",
//             formFocusEventName:"onToggle"
//         },
//         listeners:[{
//             event:"itemSelected",
//             type:"state",
//             function:(data)=>{
//                 let endDateField:FormField={
//                     _id:"enddate",
//                     title:"End Date",
//                     container:{
//                         _id:'enddate',
//                         component:"dateinput",
//                         data:"Ex. dd/mm/yyyy",
//                         formUpdateEventName:"dateChange"
//                     },
//                     emptyChecker:stringEmptyChecker,
//                     initialValue:undefined
//                 }
//                 let updatedFields:FormField[]=data.fields
//                 let currentFields=[...data.fields];
//                 if(data.data=="no")
//                 {
//                     let startDateindex=data.fields.findIndex((field)=>field._id=="startdate") 
//                     currentFields.splice(startDateindex+1,0,endDateField)
//                     updatedFields=currentFields
//                 }
//                 if(data.data=="yes")
//                 {
//                     updatedFields=currentFields.filter((item)=>item._id!="enddate")
//                 }
//                 return updatedFields
//             }
//             }],
//         emptyChecker:stringEmptyChecker,
//         initialValue:undefined
//     },
//     {
//         _id:"startdate",
//         title:"Start Date",
//         container:{
//             _id:'startdate',
//             component:"dateinput",
//             data:"Ex. dd/mm/yyyy",
//             formUpdateEventName:"dateChange"
//         },
//         emptyChecker:stringEmptyChecker,
//         initialValue:undefined
//     },
//     {
//         _id:"document",
//         title:"Document",
//         container:{
//             _id:'document',
//             component:"formdoccontainer",
//             data:undefined,
//             formUpdateEventName:"docsChanged"
//         },
//         isOptional:true,
//         initialValue:{uploadedDoc:undefined,pickedDoc:undefined}
//     }
// ]

