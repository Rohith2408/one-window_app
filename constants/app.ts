import { Dimensions, StyleSheet } from "react-native";

const baseAppUrl="onewindow://"
const andReplacer="__AND__";
const slashReplacer="__SLASH__";
const Themes={
    Light:{
        OnewindowPrimaryBlue:(opacity:number)=>"rgba(44,47,92,"+opacity+")",
        OnewindowRed:(opacity:number)=>"rgba(255, 168, 156,"+opacity+")",
        OnewindowPurple:(opacity:number)=>"rgba(209, 211, 249,"+opacity+")",
        OnewindowTeal:(opacity:number)=>"rgba(117, 236, 229,"+opacity+")",
        OnewindowYellow:(opacity:number)=>"rgba(250, 234, 208,"+opacity+")",
        OnewindowLightBlue:"#F7F6FB"
    },
    ExtraLight:{
        OnewindowRed:"#FFD8D3",
        OnewindowPurple:"#F4F4FF",
        OnewindowTeal:"#B6FFFB",
        OnewindowYellow:"#FEF7E9",
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
export const screenMargin=Dimensions.get("screen").width*0.05
export const appStandardStyles=StyleSheet.create({
    screenMarginMini:{
        marginLeft:Dimensions.get("screen").width*0.03,
        marginRight:Dimensions.get("screen").width*0.03
    },
    screenMarginSmall:{
        marginLeft:Dimensions.get("screen").width*0.04,
        marginRight:Dimensions.get("screen").width*0.04
    },
    screenMarginMedium:{
        marginLeft:Dimensions.get("screen").width*0.05,
        marginRight:Dimensions.get("screen").width*0.05
    },
    screenMarginLarge:{
        marginLeft:Dimensions.get("screen").width*0.06,
        marginRight:Dimensions.get("screen").width*0.06
    },
    buttonWrapper:{
        alignItems:'center',
        justifyContent:"center",
        borderWidth:1.2,
        borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),
        borderRadius:100
    },
    buttonText:{
        padding:7.5,
        paddingLeft:15,
        paddingRight:15,
        fontFamily:Fonts.NeutrifStudio.Medium,
        color:Themes.Light.OnewindowPrimaryBlue(1)
    }
})

export {baseAppUrl,Themes,Fonts,andReplacer,slashReplacer}