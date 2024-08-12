import React from "react"
import Home from "./screens/Home"
import Profile from "./screens/Profile"
import Student from "./layouts/Student"
import Login from "./layouts/Login"
import Base from "./partials/Base"
import Popup from "./partials/Popup"
import Sample from "./popups/sample"

const ComponentsInfo:{id:string,component:React.FC<any>,type:"Screen"|"Partial"|"Layout"|"Popup",animationStyle?:"HorizontalSlideToLeft"|"HorizontalSlideToRight"|"VerticalSlideToTopPartial"|"VerticalSlideToTop"|"VerticalSlideToBottom"|"Custom"}[]=[
    {id:"Base",component:Base,type:"Screen",animationStyle:"HorizontalSlideToLeft"},
    {id:"Home",component:Home,type:"Screen",animationStyle:"HorizontalSlideToLeft"},
    {id:"Profile",component:Profile,type:"Screen",animationStyle:"HorizontalSlideToLeft"},
    {id:"Student",component:Student,type:"Layout"},
    {id:"Login",component:Login,type:"Layout"},
    {id:"Popup",component:Popup,type:"Screen",animationStyle:"VerticalSlideToTopPartial"},
    {id:"sample",component:Sample,type:"Popup"}
]

export default ComponentsInfo