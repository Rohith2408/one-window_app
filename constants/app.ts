const baseAppUrl="onewindow://"
const Themes={
    Light:{
        OnewindowPrimaryBlue:(opacity:number)=>"rgba(48,51,99,"+opacity+")",
        OnewindowRed:(opacity:number)=>"rgba(255, 168, 156,"+opacity+")",
        OnewindowPurple:(opacity:number)=>"rgba(209, 211, 249,"+opacity+")",
        OnewindowTeal:(opacity:number)=>"rgba(117, 236, 229,"+opacity+")",
        OnewindowYellow:(opacity:number)=>"rgba(250, 234, 208,"+opacity+")"
    }
}

export {baseAppUrl,Themes}