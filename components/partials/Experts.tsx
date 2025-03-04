import { useEffect, useRef, useState } from "react"
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Loadinglistscreen from "../resources/Loadinglistscreen"
import { useAppSelector } from "../../hooks/useAppSelector"
import { getChatType, getDevice } from "../../utils"
import Expertcard from "../cards/Expertcard"
import { Fonts, Themes, appStandardStyles } from "../../constants"
import { Advisor } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { store } from "../../store"
import Requestcounsellorcard from "../cards/Requestcounsellorcard"
import Styledtext from "../resources/Styledtext"
import Transitionview from "../resources/Transitionview"
import { Image } from "expo-image"
import add_icon from '../../assets/images/misc/add.png'
import stars_icon from '../../assets/images/misc/stars.png'
import next_icon from '../../assets/images/misc/next.png'
import { addTutorial, setTutorial } from "../../store/slices/tutorialSlice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import Heading from "../resources/Heading"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        alignItems:'center',
        padding:10
    },
    verify_wrapper:{
        borderWidth:1,
        borderRadius:20
    },
    add_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        position:'absolute',
        gap:7.5,
        bottom:20,
        right:15,
        zIndex:1,
        backgroundColor:"white",
        borderRadius:100,
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:2,
        padding:10
    },
    text_wrapper:{
        flexDirection:"row",
        alignItems:'center',
        borderRadius:100,
        borderWidth:2,
        gap:5,
        padding:10
    }
})

const TabStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:210,
        borderRadius:25
    },
    briefing:{
        fontSize:18
    },
    next_icon:{
        width:34,
        height:34,
        resizeMode:"contain"
    },
    stars_icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:150,
        borderRadius:25
    },
    briefing:{
        fontSize:12
    },
    next_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    stars_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:12
    }
})

const MobileMStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:150,
        borderRadius:25
    },
    briefing:{
        fontSize:14
    },
    next_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    stars_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    card_wrapper:{
        width:"100%",
        height:190,
        borderRadius:25
    },
    briefing:{
        fontSize:14
    },
    next_icon:{
        width:26,
        height:26,
        resizeMode:"contain"
    },
    stars_icon:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Experts=()=>{

    const [path,navigate]=useNavigation()
    const experts=useAppSelector((state)=>state.advisors);
    const [pageLoad,setPageload]=useState()
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const viewRef1 = useRef(null);
    const viewRef2 = useRef(null);
    const dispatch=useAppDispatch()

    const showDetails=(expert:Advisor)=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Expert",params:{expertid:expert.info._id}}}):null
    }

    const showExperts=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Expertintro"}}):null
    }

    const setTutorialPos=(pos:LayoutRectangle,id:string)=>{
        console.log("posssssitionnn",pos);
        dispatch(addTutorial({x:pos.x,y:pos.y-pos.height,id:id}))
    }

    useEffect(()=>{
        // viewRef1.current?.measureInWindow((x, y, width, height) =>setTutorialPos({x:x,y:y,width:width,height:height},"Experts1"));
        // viewRef2.current?.measureInWindow((x, y, width, height) =>setTutorialPos({x:x,y:y,width:width,height:height},"Experts2"));
    },[])

    return(
        <View style={{flex:1,paddingTop:15}}>
        {
            experts.responseStatus=="not_recieved"
            ?
            <View style={[{flex:1},appStandardStyles.screenMarginSmall]}>
                <Loadinglistscreen cardGap={30} count={4} visibilityCount={3} direction="vertical"/>
            </View>
            :
            <View style={{flex:1,gap:30}}>
                <Pressable ref={viewRef2} onPress={showExperts} style={[GeneralStyles.add_wrapper]}>
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.75)},styles[Device].add_text]}>Who’s Here to Help?</Text>
                    <Image style={[styles[Device].next_icon]} source={next_icon}></Image>
                </Pressable>
                <View ref={viewRef1} style={[GeneralStyles.text_wrapper,appStandardStyles.screenMarginMini,{borderColor:Themes.Light.OnewindowLightBlue}]}>
                    <Image style={[styles[Device].stars_icon]} source={stars_icon}></Image>
                    <Styledtext styles={[{lineHeight:20},{fontFamily:Fonts.NeutrifStudio.Medium},styles[Device].briefing]} text="Your Study Abroad Success Starts with Our Expert Guidance" focusWord="Study Abroad"/>
                </View>
                <View style={{gap:10,flex:1}}>
                    <View style={[appStandardStyles.screenMarginSmall]}><Heading heading="Meet Your Experts!"/></View>
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:15,paddingLeft:15,paddingRight:15}}>
                    {
                        store.getState().preferences.data?.country?.map((country)=>
                        !alreadyAssigned(experts.data,country)
                        ?
                        <Requestcounsellorcard country={country}/>
                        :
                        null
                        )
                    }
                    {
                        experts.data?.map((expert,i)=>
                        <Transitionview delay={100*i} effect="pan"><Pressable onPress={()=>showDetails(expert)} key={expert.info._id} style={[styles[Device].card_wrapper]}><Expertcard index={i} {...expert}/></Pressable></Transitionview>
                        )
                    }
                    </ScrollView>
                </View>
            </View>
        }
        </View>
    )

}

const alreadyAssigned=(experts:Advisor[],country:string)=>{
   //console.log(country,experts);
    let assignedCountries=experts.reduce((acc,curr)=>[...acc,...curr.assignedCountries],[])
    return assignedCountries?.find((item)=>item==country)?true:false
}

export default Experts