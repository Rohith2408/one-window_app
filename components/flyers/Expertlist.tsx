import { Pressable, Text, View } from "react-native"
import Styledtext from "../resources/Styledtext"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { useRef } from "react"
import { Word2Sentence, camelCaseToString, getDevice, setWordCase } from "../../utils"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { getNextStageInfo, setStageData, taskApi } from "../../constants/tasks"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    text:{
        fontSize:16,
    },
    shortform:{
        fontSize:20,
    },
    title:{
        fontSize:20
    }
    
})

const MobileSStyles=StyleSheet.create({
    text:{
        fontSize:10,
    },
    shortform:{
        fontSize:14,
    },
    title:{
        fontSize:16
    }
})
const MobileMStyles=StyleSheet.create({

    text:{
        fontSize:12,
    },
    shortform:{
        fontSize:16,
    },
    title:{
        fontSize:18
    }
})
const MobileLStyles=StyleSheet.create({
    text:{
        fontSize:12,
    },
    shortform:{
        fontSize:16,
    },
    title:{
        fontSize:18
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Expertlist=(props:{taskId:string,stageId:string})=>{

    const experts=useAppSelector((state)=>state.advisors).data
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()
    console.log("props",props);

    const openForm=(expertId:string)=>{
        setStageData(props.taskId,props.stageId,{expertId:expertId});
        let nextScreen=getNextStageInfo(props.taskId,props.stageId);
        if(nextScreen)
        {
            let screenInfo=nextScreen.screenFetcher(expertId);
            navigate?navigate({type:"AddScreen",payload:{screen:screenInfo.id,params:screenInfo.props}}):null
        }
    }

    return(
        <View style={[appStandardStyles.screenMarginSmall,{paddingTop:20,gap:10}]}>
            <Styledtext styles={[styles[Device].title,{fontFamily:Fonts.NeutrifStudio.Medium}]} focusWord="Expert" text="Select the Expert"/>
            <ScrollView contentContainerStyle={{gap:30,padding:10}}>
            {
                experts?.map((expert)=>
                <Pressable style={{flexDirection:"column",gap:5}} onPress={()=>openForm(expert.info._id)}>
                    <Text style={[styles[Device].shortform,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Medium}]}>{setWordCase(expert.info.firstName)}</Text>
                    <Text style={[styles[Device].text,{color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>{Word2Sentence(camelCaseToString(expert.info.role),"","")+" | "+(expert.assignedCountries.length>0?expert.assignedCountries:"All Countries")}</Text>
                </Pressable>
                )
            }
            </ScrollView>
        </View>
    )
}

export default Expertlist