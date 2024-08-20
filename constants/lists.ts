import Program from "../components/cards/Program";
import University from "../components/cards/University";
import { AppliedFilter, FilterInfo, ListInfo, ServerResponse } from "../types";
import { getServerRequestURL, serverRequest } from "../utils";

const ListsInfo:ListInfo[]=[
    {
        id:"Programs",
        card:Program,
        filters:{
            additional:[],
            quick:[]
        },
        listFetcher:async (search:string,appliedFilters:AppliedFilter[],page:number)=>{
            let res:ServerResponse=await serverRequest({
                    url: getServerRequestURL("programs","POST"),
                    reqType: "POST",
                    body:{
                        filterData:[...appliedFilters,{type:'name',data:[search]}],
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
        card:University,
        filters:{
            additional:[],
            quick:[]
        },
        listFetcher:async (search:string,appliedFilters:AppliedFilter[],page:number)=>{
            let res:ServerResponse=await serverRequest({
                    url: getServerRequestURL("universities","POST"),
                    reqType: "POST",
                    body:{
                        filterData:[...appliedFilters,{type:'name',data:[search]}],
                        page:page,
                        currency:"INR"
                    }
                }
            )
            return res
        }

    },
]

const ProgramFilters:FilterInfo[]=[
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
]

export {ListsInfo}