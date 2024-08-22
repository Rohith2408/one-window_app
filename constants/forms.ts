import Countrydropdown from "../components/resources/Countrydropdown";
import Datetime from "../components/resources/Datetime";
import Dropdown from "../components/resources/Dropdown";
import Statedropdown from "../components/resources/Statedropdown";
import Textbox from "../components/resources/Textbox";
import { store } from "../store";
import { setEducationHistory } from "../store/slices/educationHistorySlice";
import { setWorkExperience } from "../store/slices/workexperienceSlice";
import { EducationHistory_Plus2, EducationHistory_PostGraduation, EducationHistory_School, EducationHistory_UnderGraduation, FormData, FormField, FormInfo, ListItem, ServerResponse, WorkExperience } from "../types";
import { fetchCities, fetchCountries, fetchStates, getServerRequestURL, profileUpdator, serverRequest, setWordCase } from "../utils";
import { validations} from "../utils/validations";
import { addToBasket, getBasket, getFullBasket} from "./basket";
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
                {id:"institutename",value:data?.instituteName?data.instituteName:""},
                {id:"country",value:data?.country?[{label:setWordCase(data.country),value:data.country}]:[]},
                {id:"state",value:data?.state?[{label:setWordCase(data.state),value:data.state}]:[]},
                {id:"city",value:data?.city?[{label:setWordCase(data.city),value:data.city}]:[]},
                {id:"languageofinstruction",value:data?.languageOfInstruction?[{label:setWordCase(data.languageOfInstruction),value:data.languageOfInstruction}]:[]},
                {id:"board",value:data?.board?[{label:setWordCase(data.board),value:data.board}]:[]},
                {id:"gradingsystem",value:data?.gradingSystem?[{label:setWordCase(data.gradingSystem),value:data.gradingSystem}]:[]},
                {id:"totalscore",value:data?.totalScore?data.totalScore:undefined},
                {id:"startdate",value:data?.startDate?data.startDate:undefined},
                {id:"enddate",value:data?.endDate?data.endDate:undefined},
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let schooldetails:EducationHistory_School={
                    instituteName:data[data.findIndex((item)=>item.id=="institutename")].value,
                    city: data[data.findIndex((item)=>item.id=="city")].value[0].value,
                    state: data[data.findIndex((item)=>item.id=="state")].value[0].value,
                    country: data[data.findIndex((item)=>item.id=="country")].value[0].value,
                    languageOfInstruction:data[data.findIndex((item)=>item.id=="languageofinstruction")].value[0].value,
                    gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value[0].value,
                    board: data[data.findIndex((item)=>item.id=="board")].value[0].value,
                    totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value,
                    startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate: data[data.findIndex((item)=>item.id=="enddate")].value,
                }
                return schooldetails
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
                    component:Countrydropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        optionsFetcher:async ()=>{
                            let countries=await fetchCountries();
                            return countries.map((country:any)=>({label:setWordCase(country.name),value:country.name}))
                        },
                        cityFieldId:"city",
                        stateFieldId:"state"
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        let selectedCountry=data[0].value;
                        addToBasket("country-dropdown",selectedCountry)
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
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let states=await fetchStates(selectedCountry)
                            return states.map((state:any)=>({label:setWordCase(state.name),value:state.name}))
                        }
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                    // (fields:FormData[],data:ListItem[])=>{
                    //     if(data.length>0)
                    //     {
                    //         let selectedCountry=data[0].value;
                    //         addToBasket("state-dropdown",selectedCountry)
                    //     }
                    // }
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
                        selectionMode:"single",
                        basketid:"city-dropdown",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let selectedState=getBasket("state-dropdown")
                            let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):[]
                            return cities.map((city:any)=>({label:setWordCase(city),value:city}))
                        } 
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
                title:"Grading System",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                    // (formdata:FormData[],data:ListItem[])=>{
                    //     addToBasket("gradingsystem-dropdown",data[0].value)
                    // }
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
                validator:(data:any)=>{
                    let gradingSystemSelected=getBasket("gradingsystem-dropdown");
                    let validationData=validations[gradingSystemSelected.toUpperCase()]
                    return {
                        success:validationData.regex.test(data),
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
            },
            {
                id:"stream",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Stream",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"backlogs",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Backlogs",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"completed",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Completed?",
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
        id:"Intermediate",
        title:"Please provide your Intermediate Details",
        getInitialData:(id:string|undefined)=>{
            let data:EducationHistory_Plus2|undefined=store.getState().educationhistory.data.plus2
            return [
                {id:"institutename",value:data?.instituteName?data.instituteName:""},
                {id:"country",value:data?.country?[{label:setWordCase(data.country),value:data.country}]:[]},
                {id:"state",value:data?.state?[{label:setWordCase(data.state),value:data.state}]:[]},
                {id:"city",value:data?.city?[{label:setWordCase(data.city),value:data.city}]:[]},
                {id:"languageofinstruction",value:data?.languageOfInstruction?[{label:setWordCase(data.languageOfInstruction),value:data.languageOfInstruction}]:[]},
                {id:"board",value:data?.board?[{label:setWordCase(data.board),value:data.board}]:[]},
                {id:"gradingsystem",value:data?.gradingSystem?[{label:setWordCase(data.gradingSystem),value:data.gradingSystem}]:[]},
                {id:"totalscore",value:data?.totalScore?data.totalScore:undefined},
                {id:"startdate",value:data?.startDate?data.startDate:undefined},
                {id:"enddate",value:data?.endDate?data.endDate:undefined},
                {id:"stream",value:data?.stream?data.stream:undefined},
                {id:"backlogs",value:data?.backlogs?data.backlogs.toString():undefined},
                {id:"completed",value:data?.isCompleted?(data.isCompleted?"yes":"no"):undefined}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let intermediatedetail:EducationHistory_Plus2={
                    instituteName:data[data.findIndex((item)=>item.id=="institutename")].value,
                    city: data[data.findIndex((item)=>item.id=="city")].value[0].value,
                    state: data[data.findIndex((item)=>item.id=="state")].value[0].value,
                    country: data[data.findIndex((item)=>item.id=="country")].value[0].value,
                    languageOfInstruction:data[data.findIndex((item)=>item.id=="languageofinstruction")].value[0].value,
                    gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value[0].value,
                    board: data[data.findIndex((item)=>item.id=="board")].value[0].value,
                    totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value,
                    startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate: data[data.findIndex((item)=>item.id=="enddate")].value,
                    stream:data[data.findIndex((item)=>item.id=="stream")].value,
                    backlogs:data[data.findIndex((item)=>item.id=="backlogs")].value,
                    isCompleted:data[data.findIndex((item)=>item.id=="completed")].value=="yes"?true:false
                }
                return intermediatedetail
            },
            onSubmit:async (data:EducationHistory_Plus2)=>{
                let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,plus2:data}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
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
                    component:Countrydropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state",
                        optionsFetcher:async ()=>{
                            let countries=await fetchCountries();
                            return countries.map((country:any)=>({label:setWordCase(country.name),value:country.name}))
                        }
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        let selectedCountry=data[0].value;
                        addToBasket("country-dropdown",selectedCountry)
                    }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"state",
                componentInfo:{
                    component:Statedropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let states=await fetchStates(selectedCountry)
                            return states.map((state:any)=>({label:setWordCase(state.name),value:state.name}))
                        }
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        if(data.length>0)
                        {
                            let selectedCountry=data[0].value;
                            addToBasket("state-dropdown",selectedCountry)
                        }
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
                        selectionMode:"single",
                        basketid:"city-dropdown",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let selectedState=getBasket("state-dropdown")
                            let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):[]
                            return cities.map((city:any)=>({label:setWordCase(city),value:city}))
                        } 
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
                title:"Grading System",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                    // (formdata:FormData[],data:ListItem[])=>{
                    //     addToBasket("gradingsystem-dropdown",data[0].value)
                    // }
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
                validator:(data:any)=>{
                    console.log("basket",getBasket("gradingsystem-dropdown"),getFullBasket())
                    let gradingSystemSelected=getBasket("gradingsystem-dropdown");
                    console.log("ggg",gradingSystemSelected);
                    let validationData=validations[gradingSystemSelected.toUpperCase()]
                    return {
                        success:validationData.regex.test(data),
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
            },
            {
                id:"stream",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Stream",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"backlogs",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Backlogs",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"completed",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Completed?",
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
        id:"Undergraduation",
        title:"Please provide your Undergraduation Details",
        getInitialData:(id:string|undefined)=>{
            let data:EducationHistory_UnderGraduation|undefined=store.getState().educationhistory.data.underGraduation
            return [
                {id:"institutename",value:data?.instituteName?data.instituteName:""},
                {id:"country",value:data?.country?[{label:setWordCase(data.country),value:data.country}]:[]},
                {id:"state",value:data?.state?[{label:setWordCase(data.state),value:data.state}]:[]},
                {id:"city",value:data?.city?[{label:setWordCase(data.city),value:data.city}]:[]},
                {id:"programmajor",value:data?.instituteName?data.programMajor:""},
                {id:"degreeprogram",value:data?.instituteName?data.degreeProgram:""},
                {id:"gradingsystem",value:data?.gradingSystem?[{label:setWordCase(data.gradingSystem),value:data.gradingSystem}]:[]},
                {id:"totalscore",value:data?.totalScore?data.totalScore:undefined},
                {id:"startdate",value:data?.startDate?data.startDate:undefined},
                {id:"enddate",value:data?.endDate?data.endDate:undefined},
                {id:"backlogs",value:data?.backlogs?data.backlogs.toString():undefined},
                {id:"completed",value:data?.isCompleted?(data.isCompleted?"yes":"no"):undefined}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let ugdetail:EducationHistory_UnderGraduation={
                    instituteName:data[data.findIndex((item)=>item.id=="institutename")].value,
                    city: data[data.findIndex((item)=>item.id=="city")].value[0].value,
                    state: data[data.findIndex((item)=>item.id=="state")].value[0].value,
                    country: data[data.findIndex((item)=>item.id=="country")].value[0].value,
                    degreeProgram:data[data.findIndex((item)=>item.id=="degreeprogram")].value,
                    programMajor:data[data.findIndex((item)=>item.id=="programmajor")].value,
                    gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value[0].value,
                    affiliatedUniversity:data[data.findIndex((item)=>item.id=="affiliateduniversity")].value,
                    totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value,
                    startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate: data[data.findIndex((item)=>item.id=="enddate")].value,
                    backlogs:data[data.findIndex((item)=>item.id=="backlogs")].value,
                    isCompleted:data[data.findIndex((item)=>item.id=="completed")].value=="yes"?true:false
                }
                return ugdetail
            },
            onSubmit:async (data:EducationHistory_UnderGraduation)=>{
                let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,underGraduation:data}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
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
                    component:Countrydropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state",
                        optionsFetcher:async ()=>{
                            let countries=await fetchCountries();
                            return countries.map((country:any)=>({label:setWordCase(country.name),value:country.name}))
                        }
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        let selectedCountry=data[0].value;
                        addToBasket("country-dropdown",selectedCountry)
                    }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"state",
                componentInfo:{
                    component:Statedropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let states=await fetchStates(selectedCountry)
                            return states.map((state:any)=>({label:setWordCase(state.name),value:state.name}))
                        }
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        if(data.length>0)
                        {
                            let selectedCountry=data[0].value;
                            addToBasket("state-dropdown",selectedCountry)
                        }
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
                        selectionMode:"single",
                        basketid:"city-dropdown",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let selectedState=getBasket("state-dropdown")
                            let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):[]
                            return cities.map((city:any)=>({label:setWordCase(city),value:city}))
                        } 
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
                id:"affiliateduniversity",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Affiliated University",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"programmajor",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Program Major",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"degreeprogram",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Degree Program",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
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
                title:"Grading System",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                    // (formdata:FormData[],data:ListItem[])=>{
                    //     addToBasket("gradingsystem-dropdown",data[0].value)
                    // }
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
                validator:(data:any)=>{
                    console.log("basket",getBasket("gradingsystem-dropdown"),getFullBasket())
                    let gradingSystemSelected=getBasket("gradingsystem-dropdown");
                    console.log("ggg",gradingSystemSelected);
                    let validationData=validations[gradingSystemSelected.toUpperCase()]
                    return {
                        success:validationData.regex.test(data),
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
            },
            {
                id:"backlogs",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Backlogs",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"completed",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Completed?",
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
        id:"Postgraduation",
        title:"Please provide your Postgraduation Details",
        getInitialData:(id:string|undefined)=>{
            let data:EducationHistory_PostGraduation|undefined=store.getState().educationhistory.data.postGraduation
            return [
                {id:"institutename",value:data?.instituteName?data.instituteName:""},
                {id:"country",value:data?.country?[{label:setWordCase(data.country),value:data.country}]:[]},
                {id:"state",value:data?.state?[{label:setWordCase(data.state),value:data.state}]:[]},
                {id:"city",value:data?.city?[{label:setWordCase(data.city),value:data.city}]:[]},
                {id:"affiliateduniversity",value:data?.instituteName?data.affiliatedUniversity:""},
                {id:"specialization",value:data?.instituteName?data.specialization:""},
                {id:"degreeprogram",value:data?.instituteName?data.degreeProgram:""},
                {id:"gradingsystem",value:data?.gradingSystem?[{label:setWordCase(data.gradingSystem),value:data.gradingSystem}]:[]},
                {id:"totalscore",value:data?.totalScore?data.totalScore:undefined},
                {id:"startdate",value:data?.startDate?data.startDate:undefined},
                {id:"enddate",value:data?.endDate?data.endDate:undefined},
                {id:"backlogs",value:data?.backlogs?data.backlogs.toString():undefined},
                {id:"completed",value:data?.isCompleted?(data.isCompleted?"yes":"no"):undefined}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let pgdetail:EducationHistory_PostGraduation={
                    instituteName:data[data.findIndex((item)=>item.id=="institutename")].value,
                    city: data[data.findIndex((item)=>item.id=="city")].value[0].value,
                    state: data[data.findIndex((item)=>item.id=="state")].value[0].value,
                    country: data[data.findIndex((item)=>item.id=="country")].value[0].value,
                    degreeProgram:data[data.findIndex((item)=>item.id=="degreeprogram")].value,
                    affiliatedUniversity:data[data.findIndex((item)=>item.id=="affiliateduniversity")].value,
                    specialization:data[data.findIndex((item)=>item.id=="specialization")].value,
                    gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value[0].value,
                    totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value,
                    startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate: data[data.findIndex((item)=>item.id=="enddate")].value,
                    backlogs:data[data.findIndex((item)=>item.id=="backlogs")].value,
                    isCompleted:data[data.findIndex((item)=>item.id=="completed")].value=="yes"?true:false
                }
                return pgdetail
            },
            onSubmit:async (data:EducationHistory_UnderGraduation)=>{
                let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,postGraduation:data}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
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
                    component:Countrydropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state",
                        optionsFetcher:async ()=>{
                            let countries=await fetchCountries();
                            return countries.map((country:any)=>({label:setWordCase(country.name),value:country.name}))
                        }
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        let selectedCountry=data[0].value;
                        addToBasket("country-dropdown",selectedCountry)
                    }
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"state",
                componentInfo:{
                    component:Statedropdown,
                    props:{
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let states=await fetchStates(selectedCountry)
                            return states.map((state:any)=>({label:setWordCase(state.name),value:state.name}))
                        }
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    handler:(fields:FormData[],data:ListItem[])=>{
                        if(data.length>0)
                        {
                            let selectedCountry=data[0].value;
                            addToBasket("state-dropdown",selectedCountry)
                        }
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
                        selectionMode:"single",
                        basketid:"city-dropdown",
                        optionsFetcher:async ()=>{
                            let selectedCountry=getBasket("country-dropdown")
                            let selectedState=getBasket("state-dropdown")
                            let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):[]
                            return cities.map((city:any)=>({label:setWordCase(city),value:city}))
                        } 
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
                id:"affiliateduniversity",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Affiliated University",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"specialization",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Specialization",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"degreeprogram",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Degree Program",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
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
                title:"Grading System",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                    // (formdata:FormData[],data:ListItem[])=>{
                    //     addToBasket("gradingsystem-dropdown",data[0].value)
                    // }
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
                validator:(data:any)=>{
                    console.log("basket",getBasket("gradingsystem-dropdown"),getFullBasket())
                    let gradingSystemSelected=getBasket("gradingsystem-dropdown");
                    console.log("ggg",gradingSystemSelected);
                    let validationData=validations[gradingSystemSelected.toUpperCase()]
                    return {
                        success:validationData.regex.test(data),
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
            },
            {
                id:"backlogs",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Backlogs",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"completed",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Completed?",
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



