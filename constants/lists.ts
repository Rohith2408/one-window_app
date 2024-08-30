
import Listasynchronous from "../components/flyers/Listasynchronous";
import { AppliedFilter, ListInfo, ListItem, ServerResponse } from "../types";
import { getServerRequestURL, serverRequest } from "../utils";
import sample_icon from '../assets/images/misc/edit.png'
import Universitycard from "../components/cards/Universitycard";
import Programcard from "../components/cards/Programcard";
import Dropdown from "../components/resources/Dropdown";

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
        formid:"Programfilters",
        card:Programcard,
        filters:{
            additional:[
                {
                    type:"country",
                    title:"Country",
                    icon:sample_icon
                },
                {
                    type:"LanguageTestName",
                    title:"Language Test",
                    icon:sample_icon
                },
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
                type:"rating",
                title:"Rating 4+ ?",
                icon:sample_icon,
                items:[{label:"4",value:'4'}]
            },
            {
                type:"studyLevel",
                title:"M.Sc ?",
                icon:sample_icon,
                items:[{label:"M.Sc",value:"M.Sc."}]
            },
        ]
        },
        pageUpdator:(page:number)=>({type:"UpdateParam",payload:{param:"programspage",newValue:page+1}}),
        listFetcher:async (search:string,appliedFilters:AppliedFilter[],page:number)=>{
            //console.log("applied",JSON.stringify([...appliedFilters.map((item)=>({...item,data:item.data.map((val)=>val.value)})),{type:'name',data:[search.trim()]}]));
            let res:ServerResponse=await serverRequest({
                    url: getServerRequestURL("programs","POST"),
                    reqType: "POST",
                    body:{
                        //search.trim().length>0?{type:'name',data:[search.trim()]}:{}
                        filterData:[...appliedFilters.map((item)=>({...item,data:item.data.map((val)=>val.value)}))],
                        page:page,
                        currency:"INR"
                    }
                }
            )
            return res
        }
    },
    {
        id:"Universities",
        basketid:"universities",
        formid:"Universityfilters",
        card:Universitycard,
        filters:{
            additional:[
                {
                    type:"country",
                    title:"Country",
                    icon:sample_icon
                },
                {
                    type:"Type",
                    title:"Universaity Type",
                    icon:sample_icon
                }
            ],
            quick:[{
                type:"rating",
                title:"Rating 4+ ?",
                icon:sample_icon,
                items:[{label:"4",value:'4'}]
            },
            {
                type:"studyLevel",
                title:"M.Sc ?",
                icon:sample_icon,
                items:[{label:"M.Sc",value:"M.Sc."}]
            },
        ]
        },
        pageUpdator:(page:number)=>({type:"UpdateParam",payload:{param:"programspage",newValue:page+1}}),
        listFetcher:async (search:string,appliedFilters:AppliedFilter[],page:number)=>{
            //console.log("applied",JSON.stringify([...appliedFilters.map((item)=>({...item,data:item.data.map((val)=>val.value)})),{type:'name',data:[search.trim()]}]));
            let res:ServerResponse=await serverRequest({
                    url: getServerRequestURL("universities","POST"),
                    reqType: "POST",
                    body:{
                        filterData:[...appliedFilters.map((item)=>({...item,data:item.data.map((val)=>val.value)})),search.trim().length>0?{type:'name',data:[search.trim()]}:{}],
                        page:page,
                        currency:"INR"
                    }
                }
            )
            return res
        }
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