import React from "react"
import Home from "../components/screens/Home"
import Profile from "../components/screens/Profile"
import Student from "../components/layouts/Student"
import Login from "../components/layouts/Login"
import Base from "../components/partials/Base"
import Popup from "../components/partials/Popup"
import Error from "../components/popups/Error"
import Loginbase from "../components/partials/Loginbase"
import Workexperience from "../components/partials/Workexperience"
import Form from "../components/resources/Form"
import { ScreenInfo } from "../types"
import Flyer from "../components/partials/Flyer"
import Filters from "../components/flyers/Filters"
import Explore from "../components/partials/Explore"
import Dropdownoptions from "../components/flyers/Dropdownoptions"
import Personalinfo from "../components/partials/Personalinfo"
import DPoptions from "../components/flyers/DPoptions"
import Dp from "../components/partials/Dp"
import Documents from "../components/partials/Documents"
import Educationhistory from "../components/partials/Educationhistory"

const components:ScreenInfo[]=[
    {id:"Base",component:Base,props:["tab"],type:"Screen",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Home",component:Home,type:"Screen",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Profile",component:Profile,type:"Screen",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Student",component:Student,type:"Layout"},
    {id:"Login",component:Login,type:"Layout"},
    {id:"Popup",component:Popup,props:["popupid","popupdata"],swipeDirection:"XY",type:"Screen",animationStyle:"Custom",customPlacement:{initial:{x:0,y:0,scale:0,opacity:1,height:0,width:0},final:{x:0.25,y:0.25,scale:1,opacity:1,height:0.5,width:0.5}}},
    {id:"Error",component:Error,props:["message"],type:"Popup"},
    {id:"Loginbase",component:Loginbase,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",props:["auth"],type:"Partial",title:"Login"},
    {id:"Form",component:Form,type:"Partial",title:"Form",props:["formid","forminitialdataid","formupdate"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Flyer",component:Flyer,type:"Flyer",props:["flyerid","flyerdata"],swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Filters",component:Filters,type:"Flyer",props:["additionalfilters","quickfilters"]},
    {id:"Explore",component:Explore,type:"Partial",title:"Explore",props:["additionalfilters","quickfilters","initialexploretab","page","search"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Dropdownoptions",component:Dropdownoptions,type:"Flyer"},
    {id:"Personalinfo",component:Personalinfo,type:"Partial",title:"Personal Info",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3,swipeDirection:"X"},
    {id:"DPoptions",component:DPoptions,type:"Flyer",swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6},
    {id:"Dp",component:Dp,type:"Popup",props:["image"],swipeDirection:"XY",isTransparent:true,occupyFullScreen:true,animationStyle:"FadeIn",removalThreshold:0.5},
    {id:"Documents",component:Documents,type:"Partial",title:"Documents",props:["documentstab"],swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Workexperience",component:Workexperience,type:"Partial",title:"Workexperience",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Educationhistory",component:Educationhistory,type:"Partial",title:"Education History",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3}
]

const setComponentInfo=(id:string,key:keyof ScreenInfo,value:any)=>{
    let component=components.find((item)=>item.id==id)
    if(component)
    {
        component[key]=value
    }
}

export {components,setComponentInfo}