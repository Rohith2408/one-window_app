
import Listasynchronous from "../components/flyers/Listasynchronous";
import { AppliedFilter, ListInfo, ListItem, Listquery, ServerResponse } from "../types";
import { getServerRequestURL, getUpcomingIntakeData, listHandler, serverRequest } from "../utils";
import sample_icon from '../assets/images/misc/edit.png'
import Universitycard from "../components/cards/Universitycard";
import Programcard from "../components/cards/Programcard";
import Dropdown from "../components/resources/Dropdown";
import Degreepreferencecard from "../components/cards/Degreepreferencecard";

// {type:"universityId",title:"University",selectionType:"multi",customContainer:{name:"universityidfiltercontainer"},handler:universityIdFilterhandler,focusEventName:"onSearch",filterUpdateEventName:"itemSelected"},
// {type:"country",title:"Country",options:Countries.map((country)=>({label:country,value:country})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
// {type:"intake",title:"Admission",options:intakes,selectionType:"single",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
// {type:"budget",handler:budgetFilterHandler,selectionType:'custom',customContainer:{name:"budgetfiltercontainer"}},
// {type:'openNow',title:"Open now?",selectionType:"custom",customContainer:{name:"opennowfiltercontainer"},handler:openNowFilterhandler,filterUpdateEventName:"onToggle"},
// {type:"LanguageTestName",title:"Language Test",options:["TOEFL", "IELTS", "DET", "PTE"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
// {type:"studyLevel",title:"Study Level",options:studyLevel.map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",showSearch:true},
// {type:"discipline" ,title:"Discipline", options:disciplines.map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",showSearch:true},
// {type:"subDiscipline",title:"Sub-Discipline" , options:subDisciplines.map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",showSearch:true},
// {type:"studyMode",title:"Study Mode",options:["On Campus", "Online", "Blended"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
// {type:"type",dropdownDirection:"bottom2top",title:"Type",options:[{label:"Public",value:"public"},{label:"Private",value:"private"}],selectionType:"single",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
// {type:"AcademicTestName",dropdownDirection:"bottom2top",title:"Academic Test",options:["GRE", "GMAT"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",styles:{zIndex:1}},

// {type:"rating",label:"Top Rated?",icon:rating_icon,data:[{label:9,value:9}]},
// {type:"studyLevel",label:"M.Sc.?",icon:studylevel_icon,data:[{label:"M.Sc",value:"M.Sc."}]},
// {type:"intake",label:"Upcoming Intake?",icon:intake_icon,data:[intakes[Math.floor(new Date().getMonth()/4)]]},
// {type:"AcademicTestName",label:"No GRE?",icon:test_icon,data:[{label:"No GRE",value:{"required": false,"name": "GRE"}}]},
// {type:"openNow",label:"Approaching Deadline?",icon:deadline_icon,data:[{label:true,value:true}]}

const lists:ListInfo[]=[
    {
        id:"Programs",
        basketid:"programs",
        formid:"Programsfilter",
        card:Programcard,
        filters:{
            additional:[
                {
                    type:"country",
                    title:"Country",
                    icon:sample_icon
                },
                {
                    type:"state",
                    title:"State",
                    icon:sample_icon
                },
                {
                    type:"city",
                    title:"City",
                    icon:sample_icon
                },
                // {
                //     type:"LanguageTestName",
                //     title:"Language Test",
                //     icon:sample_icon
                // },
                {
                    type:"Type",
                    title:"Universaity Type",
                    icon:sample_icon
                },
                {
                    type:"studyLevel",
                    title:"Study Level",
                    icon:sample_icon
                },
                {
                    type:"discipline",
                    title:"Disciplines",
                    icon:sample_icon
                },
                {
                    type:"subDiscipline",
                    title:"Sub-Discipline",
                    icon:sample_icon
                },
                {
                    type:"studyMode",
                    title:"Study Mode",
                    icon:sample_icon
                },
                {
                    type:"intake",
                    title:"Intake",
                    icon:sample_icon
                }
            ],
            quick:[{
                type:"quickfilter1",
                title:"Data Science in US?",
                icon:sample_icon,
                filters:[{
                    type:"subDiscipline",
                    data:[{label:"Data Science & Big Data",value:'Data Science & Big Data'}]
                },
                {
                    type:"country",
                    data:[{label:"United States of America",value:'United States of America'}]
                },
            ]
            },
            {
                type:"quickfilter2",
                title:"M.Sc in US?",
                icon:sample_icon,
                filters:[{
                    type:"studyLevel",
                    data:[{label:"M.Sc",value:"M.Sc."}]
                },
                {
                    type:"country",
                    data:[{label:"United States of America",value:'United States of America'}]
                },
            ]
            },
            {
                type:"quickfilter3",
                title:"Upcoming Intake?",
                icon:sample_icon,
                filters:[{
                    type:"intake",
                    data:getUpcomingIntakeData()
                }
            ]
            },
        ]// {label: "January-March", value: 0 },
        },
        pageUpdator:(page:number)=>({type:"UpdateParam",payload:{param:"programspage",newValue:page+1}}),
        listFetcher:async (query:{search:string,filters:any[],page:number})=>{
            console.log("query recieved pro",query.page,JSON.stringify(query.filters.filter((item)=>item.data.length>0).map((item)=>({...item,data:item.data.map((val:ListItem)=>val.value)})),null,2));
            let res:ServerResponse=await serverRequest({
                    url: getServerRequestURL("programs","POST"),
                    reqType: "POST",
                    routeType:query.page<=2?"public":"private",
                    body:{
                        filterData:query.filters.filter((item)=>item.data.length>0).map((item)=>({...item,data:item.data.map((val:ListItem)=>val.value)})),
                        page:query.page,
                        currency:"INR"
                    }
                }
            )
            //console.log("respon liiist",res.data.list?JSON.stringify(res.data.list.splice(0,2),null,2):"")
            return res
        }
    },
    {
        id:"Universities",
        basketid:"universities",
        formid:"Universitiesfilter",
        card:Universitycard,
        filters:{
            additional:[
                {
                    type:"country",
                    title:"Country",
                    icon:sample_icon
                },
                {
                    type:"state",
                    title:"State",
                    icon:sample_icon
                },
                {
                    type:"city",
                    title:"City",
                    icon:sample_icon
                },
                {
                    type:"Type",
                    title:"Universaity Type",
                    icon:sample_icon
                }
            ],
            quick:[{
                type:"quickfilter1",
                title:"Top Universities in US?",
                icon:sample_icon,
                filters:[{
                    type:"country",
                    data:[{label:"United States of America",value:'United States of America'}]
                },
            ]
            },
            {
                type:"quickfilter2",
                title:"Top Universities in Canada?",
                icon:sample_icon,
                filters:[{
                    type:"country",
                    data:[{label:"Canada",value:'Canada'}]
                },
            ]
            },
            {
                type:"quickfilter3",
                title:"Top Universities in United Kingdom?",
                icon:sample_icon,
                filters:[{
                    type:"country",
                    data:[{label:"United Kingdom",value:'United Kingdom'}]
                },
            ]
            },
        ]// {label: "January-March", value: 0 },
        },
        pageUpdator:(page:number)=>({type:"UpdateParam",payload:{param:"programspage",newValue:page+1}}),
        listFetcher:async (query:{search:string,filters:any[],page:number})=>{
            console.log("query recieved uni",query,JSON.stringify(query.filters.filter((item)=>item.data.length>0).map((item)=>({...item,data:item.data.map((val:ListItem)=>val.value)})),null,2));
            let res:ServerResponse=await serverRequest({
                    url: getServerRequestURL("universities","POST"),
                    reqType: "POST",
                    routeType:query.page<=2?"public":"private",
                    body:{
                        filterData:query.filters.filter((item)=>item.data.length>0).map((item)=>({...item,data:item.data.map((val:ListItem)=>val.value)})),
                        page:query.page,
                        currency:"INR"
                    }
                }
            )
            //console.log("respon liiist",res.data.list?JSON.stringify(res.data.list.splice(0,2),null,2):"")
            return res
        }
    },
    // {
    //     id:"Programs",
    //     basketid:"programs",
    //     formid:"Programfilters",
    //     card:Programcard,
    //     pageUpdator:(page:number)=>({type:"UpdateParam",payload:{param:"programspage",newValue:page+1}}),
    //     listFetcher:async (search:string,appliedFilters:AppliedFilter[],page:number)=>{
    //         //console.log("applied",JSON.stringify([...appliedFilters.map((item)=>({...item,data:item.data.map((val)=>val.value)})),{type:'name',data:[search.trim()]}]));
    //         let res:ServerResponse=await serverRequest({
    //                 url: getServerRequestURL("programs","POST"),
    //                 reqType: "POST",
    //                 body:{
    //                     //search.trim().length>0?{type:'name',data:[search.trim()]}:{}
    //                     filterData:[...appliedFilters.map((item)=>({...item,data:item.data.map((val)=>val.value)}))],
    //                     page:page,
    //                     currency:"INR"
    //                 }
    //             }
    //         )
    //         return res
    //     }
    // },
    {
        id:"degreepreference",
        basketid:"degreepreference",
        card:Degreepreferencecard,
        pagnation:false,
        showSearch:false,
        // listFetcher:async (data:Listquery)=>listHandler("degreepreference",data)
    },
]

//const ProgramFilters=[
    // {type:"universityId",title:"University",selectionType:"multi",customContainer:{name:"universityidfiltercontainer"},handler:universityIdFilterhandler,focusEventName:"onSearch",filterUpdateEventName:"itemSelected"},
    // {type:"country",title:"Country",options:Countries.map((country)=>({label:country,value:country})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
    // {type:"intake",title:"Admission",options:intakes,selectionType:"single",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
    // {type:"budget",handler:budgetFilterHandler,selectionType:'custom',customContainer:{name:"budgetfiltercontainer"}},
    // {type:'openNow',title:"Open now?",selectionType:"custom",customContainer:{name:"opennowfiltercontainer"},handler:openNowFilterhandler,filterUpdateEventName:"onToggle"},
    // {type:"LanguageTestName",title:"Language Test",options:["TOEFL", "IELTS", "DET", "PTE"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
    // {type:"studyLevel",title:"Study Level",options:studyLevel.map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",showSearch:true},
    // {type:"discipline" ,title:"Discipline", options:disciplines.map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",showSearch:true},
    // {type:"subDiscipline",title:"Sub-Discipline" , options:subDisciplines.map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",showSearch:true},
    // {type:"studyMode",title:"Study Mode",options:["On Campus", "Online", "Blended"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
    // {type:"type",dropdownDirection:"bottom2top",title:"Type",options:[{label:"Public",value:"public"},{label:"Private",value:"private"}],selectionType:"single",focusEventName:"onToggle",filterUpdateEventName:"onPress"},
    // {type:"AcademicTestName",dropdownDirection:"bottom2top",title:"Academic Test",options:["GRE", "GMAT"].map((item)=>({label:item,value:item})),selectionType:"multi",focusEventName:"onToggle",filterUpdateEventName:"onPress",styles:{zIndex:1}},
    //city,state,courseid,AcademicTest,LanguageTest
//]

export {lists}