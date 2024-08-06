import React from "react"
import Home from "./screens/Home"
import Profile from "./screens/Profile"
import Student from "./layouts/Student"
import Login from "./layouts/Login"

const ComponentsInfo:{id:string,component:React.FC<any>,type:"Screen"|"Partial"|"Layout",animationStyle?:"HorizontalSlideToLeft"|"HorizontalSlideToRight"|"VerticalSlideToTop"|"VerticalSlideToBottom"|"Custom"}[]=[
    {id:"Home",component:Home,type:"Screen",animationStyle:"HorizontalSlideToLeft"},
    {id:"Profile",component:Profile,type:"Screen",animationStyle:"HorizontalSlideToLeft"},
    {id:"Student",component:Student,type:"Layout"},
    {id:"Login",component:Login,type:"Layout"}
]

export default ComponentsInfo