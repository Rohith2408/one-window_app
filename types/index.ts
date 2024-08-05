import React from "react"

export type StackNavigator={
    screens:StackScreen[],
    invalidPathScreen:React.FC
    //swipeStripWidth:number
}

export type StackScreen={
    component:React.FC,
    props:any,
    animationStyle:"HorizontalSlideToLeft"|"HorizontalSlideToRight"|"VerticalSlideToTop"|"VerticalSlideToBottom"|"Custom",
    initialPosition?:{
        top:number,
        left:number
    }
}