import Datetime from "../components/resources/Datetime";
import Dropdown from "../components/resources/Dropdown";
import Textbox from "../components/resources/Textbox";
import { store } from "../store";
import { setEducationHistory } from "../store/slices/educationHistorySlice";
import { setWorkExperience } from "../store/slices/workexperienceSlice";
import { EducationHistory_School, FormData, FormField, FormInfo, ListItem, ServerResponse, WorkExperience } from "../types";
import { fetchCities, fetchStates, getServerRequestURL, profileUpdator, serverRequest, setWordCase } from "../utils";
import { validations} from "../utils/validations";
import { getBasket, setBasket } from "./basket";
import { GradingSystems, Industries } from "./misc";

const forms:FormInfo[]=[
    {
        id:"Workexperience",
        title:"Please provide your Work Experience",
        getInitialData:(id:string|undefined)=>{
            let data:WorkExperience|undefined=id?store.getState().workexperience.data.find((item)=>item._id==id):undefined
            return [
                {id:"companyname",value:data?data.companyName:""},
                {id:"ongoing",value:data?data.Ongoing:""},
                {id:"worktype",value:data?[{label:setWordCase(data.type),value:data.type}]:[]},
                {id:"designation",value:data?data.designation:""},
                {id:"document",value:data?data.docId:""},
                {id:"enddate",value:data?data.endDate:undefined},
                {id:"sector",value:data?[{label:setWordCase(data.sector),value:data.sector}]:[]},
                {id:"startdate",value:data?data.startDate:undefined}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                console.log("id",id)
                let workexperience:WorkExperience={
                    _id:id,
                    companyName:data[data.findIndex((item)=>item.id=="companyname")].value,
                    sector:data[data.findIndex((item)=>item.id=="sector")].value[0].value,
                    type:data[data.findIndex((item)=>item.id=="worktype")].value[0].value,
                    designation:data[data.findIndex((item)=>item.id=="designation")].value,
                    Ongoing:data[data.findIndex((item)=>item.id=="ongoing")].value=="yes"?true:false,
                    startDate:data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate:data.find((item)=>item.id=="enddate")?.value,
                    docId:undefined
                    //docId:Doc2Upload
                }
                !id?delete workexperience._id:null
                return workexperience
            },
            onSubmit:async (data:WorkExperience)=>{
                console.log("data",data);
                let updatedWorkexperiences:WorkExperience[]=[]
                let currentWorkexperiences=store.getState().workexperience.data
                if(currentWorkexperiences.find((item)=>item._id==data._id))
                {
                    updatedWorkexperiences=currentWorkexperiences.map((item)=>item._id==data._id?data:item);
                }
                else
                {
                    updatedWorkexperiences=[...currentWorkexperiences,data]
                }
                console.log("updated",updatedWorkexperiences);
                let res:ServerResponse=await profileUpdator({workExperience:updatedWorkexperiences},(res)=>res.success?store.dispatch(setWorkExperience(res.data.workExperience)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        //initialFields:["companyname","worktype","sector","designation","ongoing","startdate"],
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
                        ],
                        selectionMode:"single",
                        basketid:"worktype-dropdown"
                    },
                },
                title:"Work type",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"sector",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:Industries.map((item)=>({label:setWordCase(item),value:item})),
                        selectionMode:"single",
                        basketid:"sector-dropdown"
                    }
                },
                title:"Sector",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
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
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"startdate",
                componentInfo:{
                    component:Datetime,
                    props:undefined
                },
                title:"Start Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"enddate",
                componentInfo:{
                    component:Datetime,
                    props:undefined
                },
                title:"End Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
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
                isOptional:true,
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            }
        ]
    },
    {
        id:"School",
        title:"Please provide your School Details",
        getInitialData:(id:string|undefined)=>{
            let data:EducationHistory_School|undefined=store.getState().educationhistory.data.school
            return [
                {id:"instituteName",value:data?data.instituteName:""},
                {id:"country",value:data?[{label:setWordCase(data.country),value:data.country}]:[]},
                {id:"state",value:data?[{label:setWordCase(data.state),value:data.state}]:[]},
                {id:"city",value:data?[{label:setWordCase(data.city),value:data.city}]:[]},
                {id:"languageOfInstruction",value:data?data.languageOfInstruction:""},
                {id:"gradingSystem",value:data?data.gradingSystem:undefined},
                {id:"board",value:data?data.board:[]},
                {id:"totalScore",value:data?data.totalScore:undefined},
                {id:"startDate",value:data?data.startDate:[]},
                {id:"endDate",value:data?data.endDate:undefined}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let schooldetail:EducationHistory_School={
                    instituteName:data[data.findIndex((item)=>item.id=="institutename")].value,
                    city: data[data.findIndex((item)=>item.id=="city")].value[0].value,
                    state: data[data.findIndex((item)=>item.id=="state")].value[0].value,
                    country: data[data.findIndex((item)=>item.id=="country")].value[0].value,
                    languageOfInstruction:data[data.findIndex((item)=>item.id=="languageofinstruction")].value,
                    gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value,
                    board: data[data.findIndex((item)=>item.id=="board")].value,
                    totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value,
                    startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate: data[data.findIndex((item)=>item.id=="enddate")].value
                }
                return schooldetail
            },
            onSubmit:async (data:EducationHistory_School)=>{
                let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,school:data}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:[
            {
                id:"institutename",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Institute Name",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"country",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:[],
                        selectionMode:"single",
                        basketid:"country-dropdown"
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    handler:async (fields:FormData[],data:ListItem[])=>{
                        let selectedCountry=data[0].value;
                        setBasket("state-dropdown",{isLoading:true,options:[]})
                        let states=await fetchStates(selectedCountry)
                        setBasket("state-dropdown",{isLoading:false,options:states.map((city:string)=>({label:setWordCase(city),value:city}))})
                    }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"state",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:[],
                        selectionMode:"single",
                        basketid:"state-dropdown"
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    handler:async (fields:FormData[],data:ListItem[])=>{
                        let selectedCountry=fields.find((field)=>field.id=="country")?.value[0].value
                        let selectedState=data[0].value;
                        setBasket("city-dropdown",{isLoading:true,options:[]})
                        let cities=await fetchCities(selectedCountry,selectedState)
                        setBasket("city-dropdown",{isLoading:false,options:cities.map((city:string)=>({label:setWordCase(city),value:city}))})
                    }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"city",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:[],
                        selectionMode:"single",
                        basketid:"city-dropdown"
                    }
                },
                title:"City",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"board",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:[
                            {label:"CBSE",value:"CBSE"},
                            {label:"ICSE",value:"ICSE"},
                            {label:"IB",value:"IB"},
                            {label:"NIOS",value:"NIOS"},
                            {label:"AISSCE",value:"AISSCE"},
                            {label:"other",value:"other"}
                        ],
                        selectionMode:"single",
                        basketid:"board-dropdown"
                    }
                },
                title:"Board",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"languageofinstruction",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:[
                            {label:"English",value:"english"},
                            {label:"Hindi",value:"hindi"},
                            {label:"Telugu",value:"telugu"},
                            {label:"Other",value:"other"}
                        ],
                        selectionMode:"single",
                        basketid:"language-dropdown"
                    }
                },
                title:"Language Of Instruction",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"gradingsystem",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:GradingSystems.map((item)=>({label:item,value:item.toLowerCase()})),
                        selectionMode:"single",
                        basketid:"gradingsystem-dropdown"
                    }
                },
                validator:()=>{
                    
                },
                title:"Grading System",
                onUpdate:{
                    event:"onSelect",
                    handler:(formdata:FormData[],data:ListItem[])=>{
                        setBasket("gradingsystem-dropdown",data[0].value)
                    }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"totalscore",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                validator:(data:ListItem[])=>{
                    let gradingSystemSelected=getBasket("gradingsystem-dropdown");
                    let validationData=validations[gradingSystemSelected.toUpperCase()]
                    return {
                        success:validationData.regex.test(data[0].value),
                        message:validationData.errorMessage,
                        data:undefined
                    }
                },
                title:"Total Score",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"startdate",
                componentInfo:{
                    component:Datetime,
                    props:undefined
                },
                title:"Start Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"enddate",
                componentInfo:{
                    component:Datetime,
                    props:undefined
                },
                title:"End Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
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

