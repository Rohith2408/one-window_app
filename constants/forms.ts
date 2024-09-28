import Institutionscard from "../components/cards/Institutionscard";
import Countrydropdown from "../components/resources/Countrydropdown";
import Datetime from "../components/resources/Datetime";
import Dropdown from "../components/resources/Dropdown";
import Email from "../components/resources/Email";
import Phone from "../components/resources/Phone";
// import Institutename from "../components/resources/Institutename";
import Statedropdown from "../components/resources/Statedropdown";
import Textbox from "../components/resources/Textbox";
import { store } from "../store";
import { setEducationHistory } from "../store/slices/educationHistorySlice";
import { setTests } from "../store/slices/testScoresSlice";
import { setWorkExperience } from "../store/slices/workexperienceSlice";
import { AdditionalFilterInfo, Advisor, AppliedFilter, AppliedQuickFilter, Countrycode, EducationHistory_Plus2, EducationHistory_PostGraduation, EducationHistory_School, EducationHistory_UnderGraduation, FormData, FormField, FormInfo, ListInfo, ListItem, Meeting, Phone as PhoneType, ServerResponse, Sharedinfo, Test, WorkExperience } from "../types";
import { Word2Sentence, fetchCities, fetchCountries, fetchStates,  getMergedFilters,  getServerRequestURL, profileUpdator, serverRequest, setWordCase} from "../utils";
import { validations} from "../utils/validations";
import { addToBasket, getBasket, getFullBasket} from "./basket";
import { Countries, GradingSystems, Industries, Languages, Tests, disciplines, intakes, studyLevel, subDisciplines } from "./misc";
import { Countrycodes } from "./misc";
import Dialcode from "../components/cards/Dialcode";
import { setSharedInfo } from "../store/slices/sharedinfoSlice";
import Listbuilder from "../components/resources/Listbuilder";
import Datetimepro from "../components/resources/Datetimepro";
import Expertslistcard from "../components/cards/Expertslistcard";
import { addMeeting, updateMeeting } from "../store/slices/meetingsSlice";
import sample_icon from '../assets/images/misc/edit.png'
import Universitycard from "../components/cards/Universitycard";
import Programcard from "../components/cards/Programcard";
import { lists } from "./lists";
import Passwordinput from "../components/resources/Passwordinput";
import { secureStoreKeys } from "./securestore";
import * as SecureStore from 'expo-secure-store'
import Textitem from "../components/resources/Textitem";
import Checkbox from "../components/resources/Checkbox";
import Phoneinput from "../components/resources/Phoneinput";

export const testToForm=(testname:string)=>{
    const testData=store.getState().testscores.data.find((test)=>test.name==testname)
    let testInfo=Tests.find((item)=>item.name==testname)
    let scores=testInfo?.sections.map((section)=>({id:section.name,value:testData?testData.scores.find((score)=>score.description==section.name)?.count.toString():""}))
    return [
      {id:"testname",value:testInfo?.name},
      {id:"testdate",value:testData?testData.testDate:""},
    //   {id:"testdocument",value:undefined},
      ...scores
    ]
  }
  
  export const formToTest=(data:FormData[])=>{
    return {
      name: data.find((item)=>item.id=="testname")?.value,
      testDate: data.find((item)=>item.id=="testdate")?.value,
      scores:data.filter((item)=>(item.id!="testname" && item.id!="testdate" && item.id!="testdocument")).map((item)=>({
        description:item.id,
        count: item.value,
    }))
    }
  }
  
  export const testFields=(testname:string)=>{
    let testInfo=Tests.find((item)=>item.name==testname)
    return !testInfo?[]:[
      {
        id:"testname",
        componentInfo:{
            component:Textbox,
            props:{placeholder:""}
        },
        title:"Test Name",
        onUpdate:{
            event:"onTextInput",
            handler:undefined
        },
        onFocus:{
            event:"onFocus"
        }
      },
      {
        id:"testdate",
        componentInfo:{
            component:Datetime,
            props:{placeholder:undefined}
        },
        title:"Test Date",
        onUpdate:{
            event:"onTextInput",
            handler:undefined
        },
        onFocus:{
            event:"onFocus"
        }
      },
    //   {
    //     id:"testdocument",
    //     componentInfo:{
    //         component:Textbox,
    //         props:{placeholder:undefined}
    //     },
    //     title:"Test Doc",
    //     onUpdate:{
    //         event:"onTextInput",
    //         handler:undefined
    //     },
    //     onFocus:{
    //         event:"onFocus"
    //     }
    //   },
      ...testInfo?.sections.map((item)=>({
        id:item.name,
        componentInfo:{
            component:Textbox,
            props:{placeholder:item.validation.max+" - "+item.validation.min}
        },
        title:item.name,
        onUpdate:{
            event:"onTextInput",
            handler:undefined
        },
        onFocus:{
            event:"onFocus"
        }
      }))
  ]
  }

    console.log("dropdown-forms",Dropdown);

const forms:FormInfo[]=[
    {
        id:"Login_email",
        getInitialData:(id:string|undefined)=>{
            return [
                {id:"email",value:""},
                // {id:"password",value:""}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info={
                    email:data[data.findIndex((item)=>item.id=="email")].value,
                    //password:data[data.findIndex((item)=>item.id=="password")].value
                }
                return info
            },
            onSubmit:async (data:{email:string})=>{
                let res:ServerResponse=await serverRequest({url:getServerRequestURL("login","POST"),reqType:"POST",routeType:"public",body:{email:data.email}})
                return res;
            },
            //redirect:(data:any)=>({type:"AddScreen",payload:{screen:"Verifyuser",params:{type:"email",data:{email:data}}}}),
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Login"
        },
        allFields:[
            {
                id:"email",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Email"}
                },
                title:"Email",
                validator:(data)=>({
                    success:validations.EMAIL.regex.test(data),
                    message:validations.EMAIL.errorMessage,
                    data:undefined
                }),
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            // {
            //     id:"password",
            //     componentInfo:{
            //         component:Passwordinput,
            //         props:{placeholder:"Should be atleast 8 characters"}
            //     },
            //     title:"Password",
            //     validator:(data:string)=>({
            //         success:validations.PASSWORD.regex.test(data),
            //         message:validations.PASSWORD.errorMessage,
            //         data:undefined
            //     }),
            //     onUpdate:{
            //         event:"onTextInput",
            //         handler:undefined
            //     },
            //     onFocus:{
            //         event:"onFocus"
            //     }
            // }
        ]
    },
    {
        id:"Login_phone",
        getInitialData:(id:string|undefined)=>{
            return [
                {id:"phone",value:{countryCode:[],phoneNumber:undefined}},
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info={
                    phone:{countryCode:data[data.findIndex((item)=>item.id=="phone")].value.countryCode[0].dial_code,phoneNumber:data[data.findIndex((item)=>item.id=="phone")].value.phoneNumber},
                }
                return info
            },
            onSubmit:async (data:{phone:{countryCode:string,phoneNumber:string}})=>{
                let res:ServerResponse=await serverRequest({url:getServerRequestURL("login","POST"),reqType:"POST",routeType:"public",body:{...data.phone}})
                return res;
            },
            
            //redirect:(data:any)=>({type:"Login"}),
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Login"
        },
        allFields:[
            {
                id:"phone",
                componentInfo:{
                    component:Phoneinput,
                    props:{
                        codes:{
                            options:{
                                card:Dialcode,
                                list:Countrycodes,
                                labelExtractor:(item:Countrycode)=>item.dial_code,
                                idExtractor:(item:Countrycode)=>item.code
                            },
                            apply:(data:Countrycode[])=>{
                                let current:PhoneType=getBasket("phone")
                                return ({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"phone",newvalue:{...current,countryCode:data}}}})
                            },
                            selectionMode:"single",
                            basketid:"phonecodes-dropdown"
                        }
                    }
                },
                //isOptional:true,
                validator:(data:{countryCode:ListItem[],phoneNumber:string,verified:boolean})=>({
                    success:validations.PHONENUMBER.regex.test(data.phoneNumber),
                    data:undefined,
                    message:validations.PHONENUMBER.errorMessage
                }),
                emptyChecker:(data:{countryCode:ListItem[],phoneNumber?:string,verified?:boolean})=>({success:!(data.countryCode.length>0 && (data.phoneNumber && data.phoneNumber.length>0)),message:data.countryCode.length?"Dial code cannot be empty":"Phone number cannot be empty",data:undefined}),
                title:"Phone",
                onUpdate:{
                    event:"phone-input",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            // {
            //     id:"password",
            //     componentInfo:{
            //         component:Passwordinput,
            //         props:{placeholder:"Should be atleast 8 characters"}
            //     },
            //     title:"Password",
            //     validator:(data:string)=>({
            //         success:validations.PASSWORD.regex.test(data),
            //         message:validations.PASSWORD.errorMessage,
            //         data:undefined
            //     }),
            //     onUpdate:{
            //         event:"onTextInput",
            //         handler:undefined
            //     },
            //     onFocus:{
            //         event:"onFocus"
            //     }
            // }
        ]
    },
    {
        id:"Register",
        getInitialData:(id:string|undefined)=>{
            return [
                {id:"firstname",value:""},
                {id:"lastname",value:""},
                {id:"email",value:""},
                {id:"password",value:""},
                {id:"confirmpassword",value:""},
                {id:"preffereddestinations",value:[]},
                //{id:"prefferedlanguage",value:[]},
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info={
                    firstname:data[data.findIndex((item)=>item.id=="firstname")].value,
                    lastname:data[data.findIndex((item)=>item.id=="lastname")].value,
                    email:data[data.findIndex((item)=>item.id=="email")].value,
                    password:data[data.findIndex((item)=>item.id=="password")].value,
                    confirmpassword:data[data.findIndex((item)=>item.id=="confirmpassword")].value,
                    preffereddestinations:data[data.findIndex((item)=>item.id=="preffereddestinations")].value.map((item)=>(item.value)),
                    //prefferedlanguage:data[data.findIndex((item)=>item.id=="prefferedlanguage")].value[0].value,
                }
                return info
            },
            onSubmit:async (data:{firstname:string,lastname:string,email:string,password:string,confirmpassword:string,preffereddestinations:string[],prefferedlanguage:string})=>{
                console.log("reg",data);
                let deviceToken=await SecureStore.getItemAsync(secureStoreKeys.DEVICE_TOKEN);
                let res:ServerResponse=await serverRequest({url:getServerRequestURL("register","POST"),routeType:"public",reqType:"POST",body:{firstName:data.firstname,lastName:data.lastname,email:data.email,password:data.password,country:data.preffereddestinations}})//,language:data.prefferedlanguage
                console.log("ressss signup",res)
                return res;
            },
            redirect:(data:any)=>({type:"Login"}),
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Register"
        },
        allFields:[
            {
                id:"firstname",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"First Name",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"lastname",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Last Name",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"email",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Email"}
                },
                title:"Email",
                validator:(data)=>({
                    success:validations.EMAIL.regex.test(data),
                    message:validations.EMAIL.errorMessage,
                    data:undefined
                }),
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"password",
                componentInfo:{
                    component:Passwordinput,
                    props:{placeholder:"Should be atleast 8 characters"}
                },
                title:"Password",
                validator:(data:string)=>({
                    success:validations.PASSWORD.regex.test(data),
                    message:validations.PASSWORD.errorMessage,
                    data:undefined
                }),
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"confirmpassword",
                componentInfo:{
                    component:Passwordinput,
                    props:{placeholder:""}
                },
                title:"Confirm Password",
                validator:(data:string)=>{console.log("aallkk",data,getBasket("password"));return {
                    success:getBasket("password")==data,
                    message:"Password Mismatch",
                    data:undefined
                }},
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"prefferedlanguage",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            list:Languages.map((language)=>({label:language,value:language})),
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"prefferedlanguage",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"prefferedlanguage-dropdown"
                    }
                },
                title:"Preffered Language",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                },
                onFocus:{
                    event:"onToggle"
                }
            },
            {
                id:"preffereddestinations",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            list:Countries.map((country)=>({label:country,value:country})),
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        selectionMode:"single",
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"preffereddestinations",newvalue:data}}}),
                        basketid:"preffereddestinations-dropdown"
                    }
                },
                title:"Preffered Destinations",
                onUpdate:{
                    event:"onSelect",
                    handler:undefined
                },
                onFocus:{
                    event:"onToggle"
                }
            },
        ]
    },
    {
        id:"Forgotpassword",
        getInitialData:(id:string|undefined)=>{
            let info=id?getBasket(id):undefined
            console.log("ssss",info,id)
            return [
                {id:"email",value:info?info.email:""},
                {id:"verificationcode",value:""},
                {id:"newpassword",value:""},
                {id:"confirmpassword",value:""}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info={
                    email:data[data.findIndex((item)=>item.id=="email")].value,
                    verificationcode:data[data.findIndex((item)=>item.id=="verificationcode")].value,
                    newpassword:data[data.findIndex((item)=>item.id=="newpassword")].value,
                    confirmpassword:data[data.findIndex((item)=>item.id=="confirmpassword")].value
                }
                return info
            },
            onSubmit:async (data:{email:string,verificationcode:string,newpassword:string})=>{
                let res:ServerResponse=await serverRequest({url:getServerRequestURL("","POST"),reqType:"POST",routeType:"public",body:{email:data.email,password:data.newpassword,otp:data.verificationcode}})
                return res;
            },
            redirect:(data:any)=>({type:"RemoveScreen"}),
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Reset Password"
        },
        allFields:[
            {
                id:"email",
                componentInfo:{
                    component:Textbox,
                    props:{
                        readonly:true
                    }
                },
                title:"Email",
                validator:(data)=>({
                    success:validations.EMAIL.regex.test(data),
                    message:validations.EMAIL.errorMessage,
                    data:undefined
                }),
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"verificationcode",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Verification Code",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"newpassword",
                componentInfo:{
                    component:Passwordinput,
                    props:{placeholder:"Should be atleast 8 characters"}
                },
                title:"New Password",
                validator:(data:string)=>({
                    success:validations.PASSWORD.regex.test(data),
                    message:validations.PASSWORD.errorMessage,
                    data:undefined
                }),
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"confirmpassword",
                componentInfo:{
                    component:Passwordinput,
                    props:{placeholder:"Should be atleast 8 characters"}
                },
                title:"Confirm Password",
                validator:(data:string)=>({
                    success:getBasket("newpassword")==data,
                    message:"Password Mismatch",
                    data:undefined
                }),
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
        id:"Mydetails",
        title:"Please provide your details",
        getInitialData:(id:string|undefined)=>{
            let data:Sharedinfo|undefined=store.getState().sharedinfo.data
            //console.log("sss",data);
            return [
                {id:"firstname",value:data?data.firstName:""},
                {id:"lastname",value:data?data.lastName:""},
                {id:"email",value:{email:data?.email,verified:store.getState().verification.data?.find((item)=>item.type=="email")?.status}},
                {id:"phone",value:{countryCode:data?.phone?.countryCode?([Countrycodes.find((item)=>item.dial_code==data?.phone?.countryCode)]):[],phoneNumber:data?.phone?.number,verified:store.getState().verification.data?.find((item)=>item.type=="phone")?.status}},
                // {id:"planningtotakeacademictest",value:data?data.isPlanningToTakeAcademicTest:undefined},
                // {id:"planningtotakelanguagetest",value:data?data.isPlanningToTakeLanguageTest:undefined}
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info:Sharedinfo={
                    _id:store.getState().sharedinfo.data?._id,
                    firstName:data[data.findIndex((item)=>item.id=="firstname")].value,
                    lastName:data[data.findIndex((item)=>item.id=="lastname")].value,
                    email:data[data.findIndex((item)=>item.id=="email")].value.email,
                    phone:{countryCode:data[data.findIndex((item)=>item.id=="phone")].value.countryCode[0].dial_code,number:data[data.findIndex((item)=>item.id=="phone")].value.phoneNumber},
                }
                return info
            },
            onSubmit:async (data:Sharedinfo)=>{
                console.log("Submitting data",data);
                let res:ServerResponse=await profileUpdator({...data},(res)=>res.success?store.dispatch(setSharedInfo({...store.getState().sharedinfo.data,...data})):null)
                let res2:ServerResponse=await serverRequest({
                    url:getServerRequestURL("edit-phone","PUT"),
                    reqType:"PUT",
                    body:{
                        phone:data.phone
                    }
                })
                console.log("reply",res,res2)
                return {success:res.success && res2.success,data:undefined,message:res.message+" , "+res2.message}
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:[
            {
                id:"firstname",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"First Name",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"lastname",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:""}
                },
                title:"Last Name",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"email",
                componentInfo:{
                    component:Email,
                    props:{placeholder:""}
                },
                title:"Email",
                validator:(data:{email:string,verified:boolean})=>{
                    let validationData=validations.EMAIL
                    return {
                        success:validationData.regex.test(data.email),
                        message:validationData.errorMessage,
                        data:undefined
                    }
                },
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"phone",
                componentInfo:{
                    component:Phone,
                    props:{
                        codes:{
                            options:{
                                card:Dialcode,
                                list:Countrycodes,
                                labelExtractor:(item:Countrycode)=>item.dial_code,
                                idExtractor:(item:Countrycode)=>item.code
                            },
                            apply:(data:Countrycode[])=>{
                                let current:PhoneType=getBasket("phone")
                                return ({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"phone",newvalue:{...current,countryCode:data}}}})
                            },
                            selectionMode:"single",
                            basketid:"phonecodes-dropdown"
                        }
                    }
                },
                //isOptional:true,
                validator:(data:{countryCode:ListItem[],phoneNumber:string,verified:boolean})=>({
                    success:validations.PHONENUMBER.regex.test(data.phoneNumber),
                    data:undefined,
                    message:validations.PHONENUMBER.errorMessage
                }),
                emptyChecker:(data:{countryCode:ListItem[],phoneNumber?:string,verified?:boolean})=>({success:!(data.countryCode.length>0 && (data.phoneNumber && data.phoneNumber.length>0)),message:data.countryCode.length?"Dial code cannot be empty":"Phone number cannot be empty",data:undefined}),
                title:"Phone",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            // {
            //     id:"planningtotakeacademictest",
            //     componentInfo:{
            //         component:Phone,
            //         props:{placeholder:""}
            //     },
            //     title:"Planningtotakeacademictest",
            //     onUpdate:{
            //         event:"onTextInput",
            //         handler:undefined
            //     },
            //     onFocus:{
            //         event:"onFocus"
            //     }
            // },
            // {
            //     id:"phone",
            //     componentInfo:{
            //         component:Phone,
            //         props:{placeholder:""}
            //     },
            //     title:"Phone",
            //     onUpdate:{
            //         event:"onTextInput",
            //         handler:undefined
            //     },
            //     onFocus:{
            //         event:"onFocus"
            //     }
            // },
        ]
    },
    {
        id:"Workexperience_completed",
        title:"Please provide your Work Experience",
        getInitialData:(id:string|undefined)=>{
            
            let data:WorkExperience|undefined=id?store.getState().workexperience.data.find((item)=>item._id==id):undefined
            console.log("init",data)
            return [
                {id:"companyname",value:data?data.companyName:""},
                {id:"sector",value:data?[{label:setWordCase(data.sector),value:data.sector}]:[]},
                {id:"designation",value:data?data.designation:""},
                //{id:"ongoing",value:data?data.Ongoing?"yes":"no":"no"},
                {id:"worktype",value:data?[{label:setWordCase(data.type),value:data.type}]:[]},
                // {id:"document",value:data?data.docId:""},
                {id:"startdate",value:data?data.startDate:undefined},
                {id:"enddate",value:data?data.endDate:undefined},
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
                    Ongoing:false,
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
                        options:{
                            list:[
                                {label:"Full-time",value:"full-time"},
                                {label:"Part-time",value:"part-time"},
                                {label:"Freelancing",value:"freelancing"},
                                {label:"Contract",value:"contract"},
                                {label:"Remote",value:"remote"},
                                {label:"Flexible",value:"flexible"},
                                {label:"Shift-work",value:"shift work"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"worktype",newvalue:data}}}),
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
                        options:{
                            list:Industries.map((item)=>({label:setWordCase(item),value:item})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"sector",newvalue:data}}}),
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
                    props:{placeholder:"Front End Developer"}
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
                    component:Checkbox,
                    props:{
                        options:{
                            yes:{label:"Yes",value:"yes"},
                            no:{label:"No",value:"no"}
                        }
                    }
                },
                //emptyChecker:data,
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
            // {
            //     id:"document",
            //     componentInfo:{
            //         component:Textbox,
            //         props:{placeholder:""}
            //     },
            //     title:"Document",
            //     isOptional:true,
            //     onUpdate:{
            //         event:"onTextInput",
            //         handler:undefined
            //     },
            //     onFocus:{
            //         event:"onFocus"
            //     }
            // }
        ]
    },
    {
        id:"Workexperience_working",
        title:"Please provide your Work Experience",
        getInitialData:(id:string|undefined)=>{
            
            let data:WorkExperience|undefined=id?store.getState().workexperience.data.find((item)=>item._id==id):undefined
            console.log("init",data)
            return [
                {id:"companyname",value:data?data.companyName:""},
                {id:"sector",value:data?[{label:setWordCase(data.sector),value:data.sector}]:[]},
                {id:"designation",value:data?data.designation:""},
                //{id:"ongoing",value:data?data.Ongoing?"yes":"no":"no"},
                {id:"worktype",value:data?[{label:setWordCase(data.type),value:data.type}]:[]},
                // {id:"document",value:data?data.docId:""},
                {id:"startdate",value:data?data.startDate:undefined},
                //{id:"enddate",value:data?data.endDate:undefined},
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
                    Ongoing:true,
                    startDate:data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate:"",
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
                        options:{
                            list:[
                                {label:"Full-time",value:"full-time"},
                                {label:"Part-time",value:"part-time"},
                                {label:"Freelancing",value:"freelancing"},
                                {label:"Contract",value:"contract"},
                                {label:"Remote",value:"remote"},
                                {label:"Flexible",value:"flexible"},
                                {label:"Shift-work",value:"shift work"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"worktype",newvalue:data}}}),
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
                        options:{
                            list:Industries.map((item)=>({label:setWordCase(item),value:item})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"sector",newvalue:data}}}),
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
                    props:{placeholder:"Front End Developer"}
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
                    component:Checkbox,
                    props:{
                        options:{
                            yes:{label:"Yes",value:"yes"},
                            no:{label:"No",value:"no"}
                        }
                    }
                },
                //emptyChecker:data,
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
                {id:"board",value:data?.board?[{label:data.board,value:data.board}]:[]},
                {id:"gradingsystem",value:data?.gradingSystem?[{label:data.gradingSystem,value:data.gradingSystem}]:[]},
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
                    props:{placeholder:"Ramadevi Public School"}
                },
                title:"School Name",
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
                        options:{
                            fetcher:async ()=>{
                                let countries=await fetchCountries();
                                return {success:countries?true:false,data:countries?countries.map((country:any)=>({label:setWordCase(country.name),value:country.name})):undefined,message:""}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state"
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    // handler:(fields:FormData[],data:ListItem[])=>{
                    //     let selectedCountry=data[0].value;
                    //     addToBasket("country",selectedCountry)
                    // }
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let states=selectedCountry?await fetchStates(selectedCountry):undefined
                                return {success:(selectedCountry!=undefined && states!=undefined),data:states?states.map((state:any)=>({label:setWordCase(state.name),value:state.name})):undefined,message:selectedCountry==undefined?"Select the Country":undefined}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"state",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city"
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    // handler:(fields:FormData[],data:ListItem[])=>{
                    //     if(data.length>0)
                    //     {
                    //         let selectedCountry=data[0].value;
                    //         addToBasket("state",selectedCountry)
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let selectedState=getBasket("state")[0]?.label
                                let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):undefined
                                return {success:(selectedCountry!=undefined && selectedState!=undefined && cities!=undefined),data:cities?cities.map((city:any)=>({label:setWordCase(city),value:city})):undefined,message:selectedCountry==undefined?"Select the Country and State":"Select the State"}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"city",newvalue:data}}}),
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
                        options:{
                            list:[
                                {label:"CBSE",value:"CBSE"},
                                {label:"ICSE",value:"ICSE"},
                                {label:"IB",value:"IB"},
                                {label:"NIOS",value:"NIOS"},
                                {label:"AISSCE",value:"AISSCE"},
                                {label:"other",value:"other"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"board",newvalue:data}}}),
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
                        options:{
                            list:[
                                {label:"English",value:"english"},
                                {label:"Hindi",value:"hindi"},
                                {label:"Telugu",value:"telugu"},
                                {label:"Other",value:"other"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"languageofinstruction",newvalue:data}}}),
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
                        options:{
                            list:GradingSystems.map((item)=>({label:item,value:item.toLowerCase()})),
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"gradingsystem",newvalue:data}}}),
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
                    let gradingSystemSelected=getBasket("gradingsystem")[0]?.label;
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
                        options:{
                            fetcher:async ()=>{
                                let countries=await fetchCountries();
                                return {success:countries?true:false,data:countries?countries.map((country:any)=>({label:setWordCase(country.name),value:country.name})):undefined,message:""}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state"
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    // handler:(fields:FormData[],data:ListItem[])=>{
                    //     console.log("alll",fields,data)
                    //     let selectedCountry=data[0].value;
                    //     addToBasket("country",selectedCountry)
                    // }
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let states=selectedCountry?await fetchStates(selectedCountry):undefined
                                return {success:(selectedCountry!=undefined && states!=undefined),data:states?states.map((state:any)=>({label:setWordCase(state.name),value:state.name})):undefined,message:selectedCountry==undefined?"Select the Country":undefined}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"state",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city"
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    // handler:(fields:FormData[],data:ListItem[])=>{
                    //     if(data.length>0)
                    //     {
                    //         let selectedCountry=data[0].value;
                    //         addToBasket("state",selectedCountry)
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let selectedState=getBasket("state")[0]?.label
                                let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):undefined
                                return {success:(selectedCountry!=undefined && selectedState!=undefined && cities!=undefined),data:cities?cities.map((city:any)=>({label:setWordCase(city),value:city})):undefined,message:selectedCountry==undefined?"Select the Country and State":"Select the State"}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"city",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"city-dropdown",
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
                        options:{
                            list:[
                                {label:"CBSE",value:"CBSE"},
                                {label:"ICSE",value:"ICSE"},
                                {label:"IB",value:"IB"},
                                {label:"NIOS",value:"NIOS"},
                                {label:"AISSCE",value:"AISSCE"},
                                {label:"other",value:"other"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"board",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"city-dropdown",
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
                        options:{
                            list:[
                                {label:"English",value:"english"},
                                {label:"Hindi",value:"hindi"},
                                {label:"Telugu",value:"telugu"},
                                {label:"Other",value:"other"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"languageofinstruction",newvalue:data}}}),
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
                        options:{
                            list:GradingSystems.map((item)=>({label:item,value:item.toLowerCase()})),
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"gradingsystem",newvalue:data}}}),
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
                    let gradingSystemSelected=getBasket("gradingsystem")[0]?.label;
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
                    props:{placeholder:"MPC"}
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
    // {
    //     id:"Undergraduation",
    //     title:"Please provide your Undergraduation Details",
    //     getInitialData:(id:string|undefined)=>{
    //         let data:EducationHistory_UnderGraduation|undefined=store.getState().educationhistory.data.underGraduation
    //         return [
    //             {id:"institute",value:{
    //                 instituteName:data?.instituteName,
    //                 city:data?.city,
    //                 state:data?.state,
    //                 country:data?.country,
    //                 affiliatedUniversity:data?.affiliatedUniversity}},
    //             {id:"programmajor",value:data?.instituteName?data.programMajor:""},
    //             {id:"degreeprogram",value:data?.instituteName?data.degreeProgram:""},
    //             {id:"gradingsystem",value:data?.gradingSystem?[{label:setWordCase(data.gradingSystem),value:data.gradingSystem}]:[]},
    //             {id:"totalscore",value:data?.totalScore?data.totalScore:undefined},
    //             //{id:"affiliatedUniversity",value:data?.affiliatedUniversity?data.affiliatedUniversity:""},
    //             {id:"startdate",value:data?.startDate?data.startDate:undefined},
    //             {id:"enddate",value:data?.endDate?data.endDate:undefined},
    //             {id:"backlogs",value:data?.backlogs?data.backlogs.toString():undefined},
    //             {id:"completed",value:data?.isCompleted?(data.isCompleted?"yes":"no"):undefined}
    //         ]
    //     },
    //     submit:{
    //         dataConverter:(data:FormData[],id?:string)=>{
    //             let ugdetail:EducationHistory_UnderGraduation={
    //                 instituteName:data[data.findIndex((item)=>item.id=="institute")].value.instituteName,
    //                 custom:data[data.findIndex((item)=>item.id=="institutename")].value.isCustom?true:false,
    //                 city: data[data.findIndex((item)=>item.id=="city")].value[0].value,
    //                 state: data[data.findIndex((item)=>item.id=="state")].value[0].value,
    //                 country: data[data.findIndex((item)=>item.id=="country")].value[0].value,
    //                 degreeProgram:data[data.findIndex((item)=>item.id=="degreeprogram")].value,
    //                 programMajor:data[data.findIndex((item)=>item.id=="programmajor")].value,
    //                 gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value[0].value,
    //                 affiliatedUniversity:data[data.findIndex((item)=>item.id=="affiliateduniversity")].value,
    //                 totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value,
    //                 startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
    //                 endDate: data[data.findIndex((item)=>item.id=="enddate")].value,
    //                 backlogs:data[data.findIndex((item)=>item.id=="backlogs")].value,
    //                 isCompleted:data[data.findIndex((item)=>item.id=="completed")].value=="yes"?true:false
    //             }
    //             return ugdetail
    //         },
    //         onSubmit:async (data:EducationHistory_UnderGraduation)=>{
    //             let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,underGraduation:data}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
    //             return res
    //         },
    //         successText:"Success!",
    //         failureText:"Failed :(",
    //         idleText:"Submit"
    //     },
    //     allFields:[
    //         // {
    //         //     id:"institutename",
    //         //     componentInfo:{
    //         //         component:Institutename,
    //         //         props:{
    //         //             selectionMode:"single",
    //         //             isAsync:true,
    //         //             optionsCard:Institutionscard,
    //         //             selectedHandler:(data:any)=>({selected:data,isCustom:false}),
    //         //             basketid:"institutename-dropdown",
    //         //             optionsFetcher:async (search:string)=>{
    //         //                 let res:ServerResponse=await serverRequest({
    //         //                     url:getServerRequestURL("regex","GET",{search:search,institutions:1}),
    //         //                     reqType: "GET"
    //         //                 })
    //         //                 return res
    //         //             }
    //         //         }
    //         //     },
    //         //     title:"Institute Name",
    //         //     onUpdate:{
    //         //         event:"onTextInput",
    //         //         handler:undefined
    //         //     },
    //         //     onFocus:{
    //         //         event:"onFocus"
    //         //     }
    //         // },
    //         {
    //             id:"country",
    //             componentInfo:{
    //                 component:Countrydropdown,
    //                 props:{
    //                     options:{
    //                         fetcher:async ()=>{
    //                             let countries=await fetchCountries();
    //                             return {success:countries?true:false,data:countries?countries.map((country:any)=>({label:setWordCase(country.name),value:country.name})):undefined,message:""}
    //                         },
    //                         labelExtractor:(item:ListItem)=>item.label,
    //                         idExtractor:(item:ListItem)=>item.label
    //                     },
    //                     apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
    //                     selectionMode:"single",
    //                     basketid:"country-dropdown",
    //                     cityFieldId:"city",
    //                     stateFieldId:"state"
    //                 }
    //             },
    //             title:"Country",
    //             onUpdate:{
    //                 event:"onSelect",
    //                 // handler:(fields:FormData[],data:ListItem[])=>{
    //                 //     let selectedCountry=data[0].value;
    //                 //     addToBasket("country",selectedCountry)
    //                 // }
    //             },
    //             onFocus:{
    //                 event:"onToggle"
    //             }
    //         },
    //         {
    //             id:"state",
    //             componentInfo:{
    //                 component:Statedropdown,
    //                 props:{
    //                     options:{
    //                         fetcher:async ()=>{
    //                             let selectedCountry=getBasket("country")[0]?.label
    //                             let states=selectedCountry?await fetchStates(selectedCountry):undefined
    //                             return {success:(selectedCountry!=undefined && states!=undefined),data:states?states.map((state:any)=>({label:setWordCase(state.name),value:state.name})):undefined,message:selectedCountry==undefined?"Select the Country":undefined}
    //                         },
    //                         labelExtractor:(item:ListItem)=>item.label,
    //                         idExtractor:(item:ListItem)=>item.label
    //                     },
    //                     apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"state",newvalue:data}}}),
    //                     selectionMode:"single",
    //                     basketid:"state-dropdown",
    //                     cityFieldId:"city"
    //                 }
    //             },
    //             title:"State",
    //             onUpdate:{
    //                 event:"onSelect",
    //                 // handler:(fields:FormData[],data:ListItem[])=>{
    //                 //     if(data.length>0)
    //                 //     {
    //                 //         let selectedCountry=data[0].value;
    //                 //         addToBasket("state",selectedCountry)
    //                 //     }
    //                 // }
    //             },
    //             onFocus:{
    //                 event:"onToggle"
    //             }
    //         },
    //         {
    //             id:"city",
    //             componentInfo:{
    //                 component:Dropdown,
    //                 props:{
    //                     options:{
    //                         fetcher:async ()=>{
    //                             let selectedCountry=getBasket("country")[0]?.label
    //                             let selectedState=getBasket("state")[0]?.label
    //                             let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):undefined
    //                             return {success:(selectedCountry!=undefined && selectedState!=undefined && cities!=undefined),data:cities?cities.map((city:any)=>({label:setWordCase(city),value:city})):undefined,message:selectedCountry==undefined?"Select the Country and State":"Select the State"}
    //                         },
    //                         labelExtractor:(item:ListItem)=>item.label,
    //                         idExtractor:(item:ListItem)=>item.label
    //                     },
    //                     apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"city",newvalue:data}}}),
    //                     selectionMode:"single",
    //                     basketid:"city-dropdown",
    //                  }
    //             },
    //             title:"City",
    //             onUpdate:{
    //                 event:"onSelect",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onToggle"
    //             }
    //         },
    //         {
    //             id:"degreeprogram",
    //             componentInfo:{
    //                 component:Textbox,
    //                 props:{placeholder:""}
    //             },
    //             title:"Degree Program",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"affiliatedUniversity",
    //             componentInfo:{
    //                 component:Textbox,
    //                 props:{placeholder:""}
    //             },
    //             title:"Affiliated University",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"programmajor",
    //             componentInfo:{
    //                 component:Textbox,
    //                 props:{placeholder:""}
    //             },
    //             title:"Program Major",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"gradingsystem",
    //             componentInfo:{
    //                 component:Dropdown,
    //                 props:{
    //                     options:{
    //                         list:GradingSystems.map((item)=>({label:item,value:item.toLowerCase()})),
    //                         labelExtractor:(item:ListItem)=>item.label,
    //                         idExtractor:(item:ListItem)=>item.label
    //                     },
    //                     apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"gradingsystem",newvalue:data}}}),
    //                     selectionMode:"single",
    //                     basketid:"gradingsystem-dropdown"
    //                 }
    //             },
    //             title:"Grading System",
    //             onUpdate:{
    //                 event:"onSelect",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onToggle"
    //             }
    //         },
    //         {
    //             id:"totalscore",
    //             componentInfo:{
    //                 component:Textbox,
    //                 props:{placeholder:""}
    //             },
    //             validator:(data:any)=>{
    //                 //console.log("basket",getBasket("gradingsystem"),getFullBasket())
    //                 let gradingSystemSelected=getBasket("gradingsystem")[0]?.label;
    //                 //console.log("ggg",gradingSystemSelected);
    //                 let validationData=validations[gradingSystemSelected.toUpperCase()]
    //                 return {
    //                     success:validationData.regex.test(data),
    //                     message:validationData.errorMessage,
    //                     data:undefined
    //                 }
    //             },
    //             title:"Total Score",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"startdate",
    //             componentInfo:{
    //                 component:Datetime,
    //                 props:undefined
    //             },
    //             title:"Start Date",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"enddate",
    //             componentInfo:{
    //                 component:Datetime,
    //                 props:undefined
    //             },
    //             title:"End Date",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"backlogs",
    //             componentInfo:{
    //                 component:Textbox,
    //                 props:{placeholder:""}
    //             },
    //             title:"Backlogs",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         },
    //         {
    //             id:"completed",
    //             componentInfo:{
    //                 component:Textbox,
    //                 props:{placeholder:""}
    //             },
    //             title:"Completed?",
    //             onUpdate:{
    //                 event:"onTextInput",
    //                 handler:undefined
    //             },
    //             onFocus:{
    //                 event:"onFocus"
    //             }
    //         }
    //     ]
    // },
    {
        id:"Undergraduation",
        title:"Please provide your Undergraduation Details",
        getInitialData:(id:string|undefined)=>{
            let data:EducationHistory_UnderGraduation|undefined=store.getState().educationhistory.data.underGraduation
            console.log("dyate",data);
            return [
                {id:"institutename",value:data?.instituteName?data.instituteName:""},
                {id:"country",value:data?.country?[{label:setWordCase(data.country),value:data.country}]:[]},
                {id:"state",value:data?.state?[{label:setWordCase(data.state),value:data.state}]:[]},
                {id:"city",value:data?.city?[{label:setWordCase(data.city),value:data.city}]:[]},
                {id:"affiliateduniversity",value:data?.instituteName?data.affiliatedUniversity:""},
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
                    affiliatedUniversity:data[data.findIndex((item)=>item.id=="affiliateduniversity")].value,
                    programMajor:data[data.findIndex((item)=>item.id=="programmajor")].value,
                    gradingSystem: data[data.findIndex((item)=>item.id=="gradingsystem")].value[0].value,
                    totalScore: data[data.findIndex((item)=>item.id=="totalscore")].value.toString(),
                    startDate: data[data.findIndex((item)=>item.id=="startdate")].value,
                    endDate: data[data.findIndex((item)=>item.id=="enddate")].value,
                    backlogs:data[data.findIndex((item)=>item.id=="backlogs")].value.toString(),
                    isCompleted:data[data.findIndex((item)=>item.id=="completed")].value=="yes"?true:false
                }
                return ugdetail
            },
            onSubmit:async (data:EducationHistory_UnderGraduation)=>{
                console.log("dyat",data);
                let res:ServerResponse=await profileUpdator({education:{...store.getState().educationhistory.data,underGraduation:data}},(res)=>res.success?store.dispatch(setEducationHistory(res.data.education)):null)
                console.log("Server res",res);
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
                    props:{
                    }
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
                        options:{
                            fetcher:async ()=>{
                                let countries=await fetchCountries();
                                return {success:countries?true:false,data:countries?countries.map((country:any)=>({label:setWordCase(country.name),value:country.name})):undefined,message:""}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state"
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let states=selectedCountry?await fetchStates(selectedCountry):undefined
                                return {success:(selectedCountry!=undefined && states!=undefined),data:states?states.map((state:any)=>({label:setWordCase(state.name),value:state.name})):undefined,message:selectedCountry==undefined?"Select the Country":undefined}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"state",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city"
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let selectedState=getBasket("state")[0]?.label
                                let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):undefined
                                return {success:(selectedCountry!=undefined && selectedState!=undefined && cities!=undefined),data:cities?cities.map((city:any)=>({label:setWordCase(city),value:city})):undefined,message:selectedCountry==undefined?"Select the Country and State":"Select the State"}
                            } ,
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"city",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"city-dropdown",
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
                title:"Programmajor",
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
                        options:{
                            list:GradingSystems.map((item)=>({label:item,value:item.toLowerCase()})),
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"gradingsystem",newvalue:data}}}),
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
                    let gradingSystemSelected=getBasket("gradingsystem")[0]?.label;
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
                    component:Checkbox,
                    props:{
                        options:{
                            yes:{label:"Yes",value:"yes"},
                            no:{label:"No",value:"no"}
                        }
                    }
                },
                //emptyChecker:data,
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
                console.log("converted Data",pgdetail);
                return pgdetail
            },
            onSubmit:async (data:EducationHistory_PostGraduation)=>{
                console.log("Server",data);
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
                    props:{
                    }
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
                        options:{
                            fetcher:async ()=>{
                                let countries=await fetchCountries();
                                return {success:countries?true:false,data:countries?countries.map((country:any)=>({label:setWordCase(country.name),value:country.name})):undefined,message:""}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"country-dropdown",
                        cityFieldId:"city",
                        stateFieldId:"state"
                    }
                },
                title:"Country",
                onUpdate:{
                    event:"onSelect",
                    // handler:(fields:FormData[],data:ListItem[])=>{
                    //     let selectedCountry=data[0].value;
                    //     addToBasket("country",selectedCountry)
                    // }
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let states=selectedCountry?await fetchStates(selectedCountry):undefined
                                return {success:(selectedCountry!=undefined && states!=undefined),data:states?states.map((state:any)=>({label:setWordCase(state.name),value:state.name})):undefined,message:selectedCountry==undefined?"Select the Country":undefined}
                            },
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"state",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"state-dropdown",
                        cityFieldId:"city"
                    }
                },
                title:"State",
                onUpdate:{
                    event:"onSelect",
                    // handler:(fields:FormData[],data:ListItem[])=>{
                    //     if(data.length>0)
                    //     {
                    //         let selectedCountry=data[0].value;
                    //         addToBasket("state",selectedCountry)
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
                        options:{
                            fetcher:async ()=>{
                                let selectedCountry=getBasket("country")[0]?.label
                                let selectedState=getBasket("state")[0]?.label
                                let cities=(selectedCountry && selectedState)?await fetchCities(selectedCountry,selectedState):undefined
                                return {success:(selectedCountry!=undefined && selectedState!=undefined && cities!=undefined),data:cities?cities.map((city:any)=>({label:setWordCase(city),value:city})):undefined,message:selectedCountry==undefined?"Select the Country and State":"Select the State"}
                            } ,
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"city",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"city-dropdown",
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
                        options:{
                            list:GradingSystems.map((item)=>({label:item,value:item.toLowerCase()})),
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"gradingsystem",newvalue:data}}}),
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
                    //console.log("basket",getBasket("gradingsystem"),getFullBasket())
                    let gradingSystemSelected=getBasket("gradingsystem")[0]?.label;
                    //console.log("ggg",gradingSystemSelected);
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
                    component:Checkbox,
                    props:{
                        options:{
                            yes:{label:"Yes",value:"yes"},
                            no:{label:"No",value:"no"}
                        }
                    }
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
        id:"Graduate Record Examination",
        title:"Please provide your GRE Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="Graduate Record Examination")
            return testToForm("Graduate Record Examination");
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("Graduate Record Examination")
    },
    {
        id:"Graduate Management Admission Test",
        title:"Please provide your GMAT Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="Graduate Management Admission Test")
            let fields=testToForm("Graduate Management Admission Test")
            console.log("Fields",fields)
            return fields
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("Graduate Management Admission Test")
    },
    {
        id:"Test of English as a Foreign Language",
        title:"Please provide your TOEFL Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="Test of English as a Foreign Language")
            return testToForm("Test of English as a Foreign Language");
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("Test of English as a Foreign Language")
    },
    {
        id:"International English Language Testing System",
        title:"Please provide your IELTS Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="International English Language Testing System")
            return testToForm("International English Language Testing System");
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("International English Language Testing System")
    },
    {
        id:"Pearson Test of English",
        title:"Please provide your PTE Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="Pearson Test of English")
            return testToForm("Pearson Test of English");
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("Pearson Test of English")
    },
    {
        id:"Duolingo English Test",
        title:"Please provide your DET Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="Duolingo English Test")
            return testToForm("Duolingo English Test");
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("Duolingo English Test")
    },
    {
        id:"American College Testing",
        title:"Please provide your ACT Scores",
        getInitialData:(id:string|undefined)=>{
            let data:Test|undefined=store.getState().testscores.data.find((item)=>item.name=="American College Testing")
            return testToForm("American College Testing");
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                return formToTest(data);
            },
            onSubmit:async (data:Test)=>{
                let updatedTests:Test[]=[]
                let currentTests=store.getState().testscores.data
                if(currentTests.find((item)=>item.name==data.name))
                {
                    updatedTests=currentTests.map((item)=>item.name==data.name?data:item);
                }
                else
                {
                    updatedTests=[...currentTests,data]
                }
                console.log("updated",updatedTests);
                let res:ServerResponse=await profileUpdator({tests:updatedTests},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:testFields("American College Testing")
    },
    {
        id:"AddMeeting",
        title:"Please provide the details to book a slot",
        getInitialData:(id:string|undefined)=>{
            console.log("expert id",id)
            let data:Advisor|undefined=id?store.getState().advisors.data.find((item)=>item.info._id==id):undefined
            return [
                {id:"expert",value:{
                        label:Word2Sentence([data.info.firstName,data.info.lastName],""," "),
                        value:data.info._id
                }},
                {id:"description",value:""},
                {id:"attendees",value:[]},
                {id:"datetime",value:new Date().toISOString()},
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                const startdate = new Date(data[data.findIndex((item)=>item.id=="datetime")].value);
                startdate.setMinutes(startdate.getMinutes() + 30);
                const enddate = startdate.toISOString();
                let slotdata={
                    _id:id,
                    notes:data[data.findIndex((item)=>item.id=="description")].value,
                    attendees:data[data.findIndex((item)=>item.id=="attendees")].value,
                    startTime:new Date(data[data.findIndex((item)=>item.id=="datetime")].value),
                    endTime:enddate,
                    timeZone: "Asia/Kolkata",
                    expert:data[data.findIndex((item)=>item.id=="expert")].value.value
                }
                return slotdata
            },
            onSubmit:async (data:any)=>{
                console.log("submit data",data);
                let res:ServerResponse;
                res=await serverRequest({
                    url:getServerRequestURL("book-slot","POST")+"/"+data.expert,
                    reqType:"POST",
                    body:data
                })
                console.log("Server response",res);
                if(res.success)
                {
                    let meetingData={
                        _id:res.data._id,
                        description:res.data.data.summary,
                        attendees:res.data.data.attendees.map((item:any)=>item.email),
                        link:res.data.data.hangoutLink,
                        startDate:res.data.data.start,
                        endDate:res.data.data.end,
                        status:res.data.data.status,
                        member:res.data.member
                    }
                    store.dispatch(addMeeting(meetingData))
                }
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:[
            {
                id:"expert",
                componentInfo:{
                    component:Textitem,
                    props:undefined,
                },
                title:"Expert",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"description",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Keep it small and simple"}
                },
                title:"Purpose",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"attendees",
                componentInfo:{
                    component:Listbuilder,
                    props:{
                        placeholder:"Enter the Mail-id of the Attendee",
                        addHandler:(items:string[],current:string)=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"attendees",newvalue:[...items,current]}}})
                    }
                },
                title:"Attendees",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"datetime",
                componentInfo:{
                    component:Datetimepro,
                    props:{
                        datesFetcher:async ()=>{
                            let expert=getBasket("expert")
                            console.log("aaaddd",expert,getServerRequestURL("vacant-slots","GET")+"/"+expert.value);
                            if(expert.value.length==0)
                            {
                                return {success:false,data:undefined,message:""}
                            }
                            else
                            {
                                return await serverRequest({
                                    url:getServerRequestURL("vacant-slots","GET")+"/"+expert.value,
                                    reqType:"GET"
                                })
                            }
                        }
                    }
                },
                title:"Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
        ]
    },
    {
        id:"UpdateMeeting",
        title:"Please provide the details to update the slot",
        getInitialData:(id:string|undefined)=>{
            let data:Meeting|undefined=id?store.getState().meeting.data.find((item)=>item._id==id):undefined
            return [
                {id:"expert",value:{
                    label:Word2Sentence([data?.member.firstName,data?.member.lastName],""," "),
                    value:data?.member._id
                }},
                {id:"description",value:data?data.description:""},
                {id:"attendees",value:data?data.attendees:[]},
                {id:"datetime",value:data?.startDate.dateTime},
            ]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                const startdate = new Date(data[data.findIndex((item)=>item.id=="datetime")].value);
                startdate.setMinutes(startdate.getMinutes() + 30);
                const enddate = startdate.toISOString();
                let slotdata={
                    _id:id,
                    notes:data[data.findIndex((item)=>item.id=="description")].value,
                    attendees:data[data.findIndex((item)=>item.id=="attendees")].value,
                    startTime:new Date(data[data.findIndex((item)=>item.id=="datetime")].value),
                    endTime:enddate,
                    timeZone: "Asia/Kolkata",
                    expert:data[data.findIndex((item)=>item.id=="expert")].value.value
                }
                return slotdata
            },
            onSubmit:async (data:any)=>{
                let res:ServerResponse;
                console.log("update meeting input",data);
                res=await serverRequest({
                    url:getServerRequestURL("modify-slot","POST"),
                    reqType:"POST",
                    body:{
                        meetingId: data._id, 
                        option: "rescheduleEvent",
                        startTime: data.startTime,  
                        endTime:data.endTime, 
                        timeZone:data.timeZone 
                    }
                })
                console.log("update meeting res",res);
                if(res.success)
                {
                    let meetingData={
                        _id:res.data._id,
                        description:res.data.data.summary,
                        attendees:res.data.data.attendees.map((item:any)=>item.email),
                        link:res.data.data.hangoutLink,
                        startDate:res.data.data.start,
                        endDate:res.data.data.end,
                        status:res.data.status,
                        member:res.data.member
                    }
                    store.dispatch(updateMeeting(meetingData))
                }
                return res
            },
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        allFields:[
            {
                id:"expert",
                componentInfo:{
                    component:Textitem,
                    props:undefined,
                },
                title:"Expert",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"description",
                componentInfo:{
                    component:Textbox,
                    props:{placeholder:"Keep it small and simple"}
                },
                title:"Purpose",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"attendees",
                componentInfo:{
                    component:Listbuilder,
                    props:{
                        placeholder:"Enter the Mail-id of the Attendee",
                        addHandler:(items:string[],current:string)=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"attendees",newvalue:[...items,current]}}})
                    }
                },
                title:"Attendees",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"datetime",
                componentInfo:{
                    component:Datetimepro,
                    props:{
                        datesFetcher:async ()=>{
                            let expert=getBasket("expert")
                            console.log("aaaddd",expert,getServerRequestURL("vacant-slots","GET")+"/"+expert.value);
                            if(expert.value.length==0)
                            {
                                return {success:false,data:undefined,message:""}
                            }
                            else
                            {
                                return await serverRequest({
                                    url:getServerRequestURL("vacant-slots","GET")+"/"+expert.value,
                                    reqType:"GET"
                                })
                            }
                        }
                    }
                },
                title:"Date",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
        ]
    },
    {
        id:"Programsfilter",
        title:"Program Filters",
        getInitialData:(id:string|undefined)=>{
            console.log("filter idd",getBasket(id));
            let filtersInfo=lists.find((list)=>list.id=="Programs")?.filters.additional;
            let data:{additionalFilters:AppliedFilter[]}|undefined=id?getBasket(id):undefined
            return filtersInfo?filtersInfo.map((item)=>{
                let applied=data?.additionalFilters?.find((item2)=>item2.type==item.type)?.data
                return {id:item.type,value:applied?applied:[]}
            }):[]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info:AppliedFilter[]=data.map((item)=>({type:item.id,data:item.value})).filter((item)=>item.data.length!=0)
                return info
            },
            onSubmit:async (data:AppliedFilter[])=>{
                console.log("Form data",JSON.stringify(data,null,2));
                return {success:true,message:"",data:data}
            },
            //redirect:(data:AppliedFilter[])=>({type:"UpdateParam",payload:{param:"programsadditionalfilters",newValue:data}}),
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        // {type:"universityId",title:"University",selectionType:"multi",customContainer:{name:"universityidfiltercontainer"},handler:universityIdFilterhandler,focusEventName:"onSearch",filterUpdateEventName:"itemSelected"},
        // {type:"budget",handler:budgetFilterHandler,selectionType:'custom',customContainer:{name:"budgetfiltercontainer"}},
        // {type:'openNow',title:"Open now?",selectionType:"custom",customContainer:{name:"opennowfiltercontainer"},handler:openNowFilterhandler,filterUpdateEventName:"onToggle"},
        // {type:"AcademicTestName",dropdownDirection:"bottom2top",title:"Academic Test",options:["GRE", "GMAT"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",styles:{zIndex:1}},
        allFields:[
            {
                id:"country",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:(data:AppliedFilter)=>{
                                let baseFilter:AppliedQuickFilter|undefined=getBasket("Programsfilter").baseFilters.find((item)=>item.type=="country");
                                let options=Countries.map((country)=>({label:country,value:country}))
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
                        selectionMode:"single",
                    }
                },
                isOptional:true,
                title:"Country",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"studyLevel",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:()=>{
                                let baseFilter=getBasket("Programsfilter").baseFilters.find((item)=>item.type=="studyLevel");
                                let options=studyLevel.map((item)=>({label:item,value:item}))
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            //list:studyLevel.map((item)=>({label:item,value:item})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"studyLevel",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"sector-dropdown"
                    }
                },
                isOptional:true,
                title:"Ideal Study Level",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"discipline",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:()=>{
                                let baseFilter=getBasket("Programsfilter").baseFilters.find((item)=>item.type=="discipline");
                                let options=disciplines.map((discipline)=>({label:discipline,value:discipline}))
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            //list:disciplines.map((discipline)=>({label:discipline,value:discipline})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>{console.log("disci",data);return {type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"discipline",newvalue:data}}}},
                        selectionMode:"multi",
                        basketid:"sector-dropdown"
                    }
                },
                isOptional:true,
                title:"Discipline",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"subDiscipline",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:()=>{
                                let baseFilter=getBasket("Programsfilter").baseFilters.find((item)=>item.type=="subDiscipline");
                                let options=subDisciplines.map((discipline)=>({label:discipline,value:discipline}));
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            //list:subDisciplines.map((discipline)=>({label:discipline,value:discipline})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label,
                            searchEvaluator:(item:ListItem,query:string)=>item.label.includes(query)
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"subDiscipline",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"sector-dropdown"
                    }
                },
                isOptional:true,
                title:"Sub Discipline",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"studyMode",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:()=>{
                                let baseFilter=getBasket("Programsfilter").baseFilters.find((item)=>item.type=="studyMode");
                                let options=["On Campus", "Online", "Blended"].map((item)=>({label:item,value:item}));
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            //list:["On Campus", "Online", "Blended"].map((item)=>({label:item,value:item})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"studyMode",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"sector-dropdown"
                    }
                },
                isOptional:true,
                title:"Study Mode",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"LanguageTestName",
                title:"Language Test",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            list:[
                                {label:"GRE",value:"GRE"},
                                {label:"TOEFL",value:"TOEFL"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        selectionMode:"single",
                        basketid:"languagetest-dropdown"
                    },
                },
                isOptional:true,
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"Type",
                title:"University Type",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            list:[
                                {label:"Public",value:"public"},
                                {label:"Private",value:"private"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        selectionMode:"single",
                        basketid:"unitype-dropdown"
                    },
                },
                isOptional:true,
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"intake",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:()=>{
                                let baseFilter=getBasket("Programsfilter").baseFilters.find((item)=>item.type=="intake");
                                let options=intakes;
                                console.log("intakes base",baseFilter);
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            //list:intakes,
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"intake",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"sector-dropdown"
                    }
                },
                isOptional:true,
                title:"Intake",
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
        id:"Universitiesfilter",
        title:"",
        getInitialData:(id:string|undefined)=>{
            console.log("filter idd",getBasket(id));
            let filtersInfo=lists.find((list)=>list.id=="Universities")?.filters.additional;
            let data:{additionalFilters:AppliedFilter[]}|undefined=id?getBasket(id):undefined
            return filtersInfo?filtersInfo.map((item)=>{
                let applied=data?.additionalFilters?.find((item2)=>item2.type==item.type)?.data
                return {id:item.type,value:applied?applied:[]}
            }):[]
        },
        submit:{
            dataConverter:(data:FormData[],id?:string)=>{
                let info:AppliedFilter[]=data.map((item)=>({type:item.id,data:item.value})).filter((item)=>item.data.length!=0)
                return info
            },
            onSubmit:async (data:AppliedFilter[])=>{
                return {success:true,message:"",data:data}
            },
            redirect:(data:AppliedFilter[])=>({type:"UpdateParam",payload:{param:"universitiesadditionalfilters",newValue:data}}),
            successText:"Success!",
            failureText:"Failed :(",
            idleText:"Submit"
        },
        // {type:"universityId",title:"University",selectionType:"multi",customContainer:{name:"universityidfiltercontainer"},handler:universityIdFilterhandler,focusEventName:"onSearch",filterUpdateEventName:"itemSelected"},
        // {type:"budget",handler:budgetFilterHandler,selectionType:'custom',customContainer:{name:"budgetfiltercontainer"}},
        // {type:'openNow',title:"Open now?",selectionType:"custom",customContainer:{name:"opennowfiltercontainer"},handler:openNowFilterhandler,filterUpdateEventName:"onToggle"},
        // {type:"AcademicTestName",dropdownDirection:"bottom2top",title:"Academic Test",options:["GRE", "GMAT"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",styles:{zIndex:1}},
        allFields:[
            {
                id:"country",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            fetcher:(data:AppliedFilter)=>{
                                let baseFilter:AppliedQuickFilter|undefined=getBasket("Universitiesfilter").baseFilters.find((item)=>item.type=="country");
                                let options=Countries.map((country)=>({label:country,value:country}))
                                return  {success:true,data:baseFilter?baseFilter.data:options,messsage:""}
                            },
                            //list:Countries.map((country)=>({label:country,value:country})),
                            idExtractor:(item:ListItem)=>item.label,
                            labelExtractor:(item:ListItem)=>item.label
                        },
                        apply:(data:ListItem[])=>({type:"UpdateParam",payload:{param:"formupdate",newValue:{id:"country",newvalue:data}}}),
                        selectionMode:"single",
                        basketid:"sector-dropdown"
                    }
                },
                isOptional:true,
                title:"Country",
                onUpdate:{
                    event:"onTextInput",
                    handler:undefined
                },
                onFocus:{
                    event:"onFocus"
                }
            },
            {
                id:"Type",
                title:"Universaity Type",
                componentInfo:{
                    component:Dropdown,
                    props:{
                        options:{
                            list:[
                                {label:"Public",value:"public"},
                                {label:"Private",value:"private"}
                            ],
                            labelExtractor:(item:ListItem)=>item.label,
                            idExtractor:(item:ListItem)=>item.label
                        },
                        selectionMode:"single",
                        basketid:"unitype-dropdown"
                    },
                },
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
]

export {forms}



