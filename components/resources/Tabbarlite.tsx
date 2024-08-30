import { Animated, Pressable, Text, View } from "react-native"

import { Fonts, Themes } from "../../constants"

const Tabbarlite=(props:{tabs:string[],tabPosition:Animated.Value,tabChangeHandler:(tab:string)=>void})=>{

    //console.log(props.tabs)

    return(
        <View style={{flexDirection:'row'}}>
        {
            props.tabs.map((tab,i)=>
            <Pressable style={{flexDirection:"row",justifyContent:'center',alignItems:'center'}} onPress={()=>props.tabChangeHandler(tab)}>
                <Animated.Text 
                style={[
                    {fontFamily:Fonts.NeutrifStudio.Medium},
                    {color:Themes.Light.OnewindowPrimaryBlue(1),opacity:getInterpolatedData(i==0?"left":i==1?"right":"middle",props.tabPosition,i,props.tabs.length)}
                    ]}>{tab}</Animated.Text>
            </Pressable>
            )
        }
        </View>
    )

}

export default Tabbarlite

const getInterpolatedData=(position:"left"|"right"|"middle",val:Animated.Value,index:number,totalTabs:number)=>{
    let data;
    switch(position){
        case "left":
            data=val.interpolate({inputRange:[0,1/totalTabs],outputRange:[1,0.5]})
            break;

        case "right":
            data=val.interpolate({inputRange:[(totalTabs-1)/totalTabs,1],outputRange:[0.5,1]})
            break

        case "middle":
            data=val.interpolate({inputRange:[(index-1)/totalTabs,(index/totalTabs),(index+1)/totalTabs],outputRange:[0.5,1,0.5]})
            break;
    }
    return data
}