const baseAppUrl="onewindow://"
const andReplacer="__AND__";
const Themes={
    Light:{
        OnewindowPrimaryBlue:(opacity:number)=>"rgba(48,51,99,"+opacity+")",
        OnewindowRed:(opacity:number)=>"rgba(255, 168, 156,"+opacity+")",
        OnewindowPurple:(opacity:number)=>"rgba(209, 211, 249,"+opacity+")",
        OnewindowTeal:(opacity:number)=>"rgba(117, 236, 229,"+opacity+")",
        OnewindowYellow:(opacity:number)=>"rgba(250, 234, 208,"+opacity+")",
        OnewindowLightBlue:"#F7F6FB"
    }
}
const Fonts={
    NeutrifStudio:{
        ExtraBold:"NeutrifStudio-ExtraBold",
        Bold:"NeutrifStudio-Bold",
        SemiBold:"NeutrifStudio-SemiBold",
        Medium:"NeutrifStudio-Medium",
        Regular:"NeutrifStudio-Regular"
    }
}

export {baseAppUrl,Themes,Fonts,andReplacer}