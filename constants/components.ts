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

const components:ScreenInfo[]=[
    {id:"Base",component:Base,props:["tab"],type:"Screen",swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Home",component:Home,type:"Screen",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Profile",component:Profile,type:"Screen",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3},
    {id:"Student",component:Student,type:"Layout"},
    {id:"Login",component:Login,type:"Layout"},
    {id:"Popup",component:Popup,props:["popupid","popupdata"],swipeDirection:"XY",type:"Screen",animationStyle:"Custom",customPlacement:{initial:{x:0,y:0,scale:0,opacity:1,height:0,width:0},final:{x:0.25,y:0.25,scale:1,opacity:1,height:0.5,width:0.5}}},
    {id:"Error",component:Error,props:["message"],type:"Popup"},
    {id:"Loginbase",component:Loginbase,swipeDirection:"X",props:["auth"],type:"Partial"},
    {id:"Workexperience",component:Workexperience,swipeDirection:"X",animationStyle:"HorizontalSlideToLeft",removalThreshold:0.3,type:"Partial"},
    {id:"Form",component:Form,type:"Partial",swipeDirection:"X",props:["formid","forminitialdataid"]},
    {id:"Flyer",component:Flyer,type:"Partial",props:["flyerid","flyerdata"],swipeDirection:"Y",animationStyle:"VerticalSlideToTopPartial",removalThreshold:5/6} 
]

const setComponentInfo=(id:string,key:keyof ScreenInfo,value:any)=>{
    let component=components.find((item)=>item.id==id)
    if(component)
    {
        component[key]=value
    }
}

export {components,setComponentInfo}