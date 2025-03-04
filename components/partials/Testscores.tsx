import { Animated, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { ServerResponse, Test as TestType } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { useEffect, useRef, useState } from "react"
import { formatDate, getDevice, getThemeColor, profileUpdator } from "../../utils"
import { store } from "../../store"
import { setTests } from "../../store/slices/testScoresSlice"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'
import add_icon from '../../assets/images/misc/add.png'
import delete_icon from '../../assets/images/misc/delete.png'
import edit_icon from '../../assets/images/misc/edit.png'
import test_icon from '../../assets/images/misc/test.png'
import { Fonts, Tests, Themes, setComponentInfo } from "../../constants"
import emptylist from '../../assets/images/illustrations/thinking.png'

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:5,
        margin:5
    },
    sub_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"stretch",
        gap:30
    },
    test_wrapper:{
       display:"flex",
       width:"100%",
       alignSelf:"stretch",
       flexDirection:"row",
       alignItems:"flex-start",
       gap:7
    },
    info_wrapper:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        gap:20,
        position:"relative"
    },
    info_subwrapper:{
        display:"flex",
        flexDirection:"column",
        gap:7
    },
    sections_wrapper:{
        display:"flex",
        flexDirection:"column",
        gap:13
    },
    section_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    total_wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        gap:10
    },
    add_wrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        position:'absolute',
        gap:7.5,
        bottom:20,
        right:0,
        zIndex:1,
        backgroundColor:"white",
        borderRadius:100,
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:2,
        padding:7
    },
    header:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        position:"absolute"
    }
})

const TabStyles=StyleSheet.create({
    add_icon:{
        width:36,
        height:36,
        resizeMode:"contain"
    },
    edit_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    delete_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    test_icon:{
        width:22,
        height:22,
        resizeMode:"contain",
        position:"relative"
    },
    test_icon_bg:{
        width:18,
        height:18,
        borderRadius:100,
        position:"absolute",
        zIndex:-1,
        left:-5,
        top:4
    },
    test_name:{
        fontSize:18
    },
    section_name:{
        fontSize:16
    },
    score:{
        fontSize:16
    },
    total_heading:{
        fontSize:16
    },
    total:{
        fontSize:16
    },
    test_date:{
        fontSize:14
    },
    no_workexperience:{
        fontSize:20
    },
    click_message:{
        fontSize:16,
        lineHeight:20
    },
    emptylist_image:{
        width:200,
        height:200,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:18
    }
})

const MobileSStyles=StyleSheet.create({
    add_icon:{
        width:28,
        height:28,
        resizeMode:"contain"
    },
    edit_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    delete_icon:{
        width:14,
        height:14,
        resizeMode:"contain"
    },
    test_icon:{
        width:16,
        height:16,
        resizeMode:"contain",
        position:"relative"
    },
    test_icon_bg:{
        width:16,
        height:16,
        borderRadius:100,
        position:"absolute",
        zIndex:-1,
        left:-5,
        top:4
    },
    test_name:{
        fontSize:14
    },
    section_name:{
        fontSize:12
    },
    score:{
        fontSize:12
    },
    total_heading:{
        fontSize:12
    },
    total:{
        fontSize:12
    },
    test_date:{
        fontSize:10
    },
    no_workexperience:{
        fontSize:16
    },
    click_message:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:130,
        height:130,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:12
    }
})
const MobileMStyles=StyleSheet.create({
    add_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    edit_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    delete_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    test_icon:{
        width:18,
        height:18,
        resizeMode:"contain",
        position:"relative"
    },
    test_icon_bg:{
        width:16,
        height:16,
        borderRadius:100,
        position:"absolute",
        zIndex:-1,
        left:4,
        top:4
    },
    test_name:{
        fontSize:16
    },
    section_name:{
        fontSize:14
    },
    score:{
        fontSize:14
    },
    total_heading:{
        fontSize:14
    },
    total:{
        fontSize:14
    },
    test_date:{
        fontSize:12
    },
    no_workexperience:{
        fontSize:18
    },
    click_message:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:140,
        height:140,
        resizeMode:"contain"
    },
    add_text:{
        fontSize:14
    }
})
const MobileLStyles=StyleSheet.create({
    add_icon:{
        width:30,
        height:30,
        resizeMode:"contain"
    },
    edit_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    delete_icon:{
        width:16,
        height:16,
        resizeMode:"contain"
    },
    test_icon:{
        width:18,
        height:18,
        resizeMode:"contain",
        position:"relative"
    },
    test_icon_bg:{
        width:16,
        height:16,
        borderRadius:100,
        position:"absolute",
        zIndex:-1,
        left:4,
        top:4
    },
    test_name:{
        fontSize:16
    },
    section_name:{
        fontSize:14
    },
    score:{
        fontSize:14
    },
    total_heading:{
        fontSize:14
    },
    total:{
        fontSize:14
    },
    test_date:{
        fontSize:12
    },
    no_workexperience:{
        fontSize:18
    },
    click_message:{
        fontSize:14,
        lineHeight:20
    },
    emptylist_image:{
        width:140,
        height:140,
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

const Testscores=()=>{

    const Device=useRef<keyof typeof styles>(getDevice()).current
    const [path,navigate]=useNavigation()
    const tests=useAppSelector((state)=>state.testscores)

    const add=()=>{
        navigate?navigate({type:"AddScreen",payload:{screen:"Testoptions"}}):null
    }

    useEffect(()=>{
        
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.sub_wrapper]}>
                <Pressable onPress={add} style={[GeneralStyles.add_wrapper]}>
                    <Text style={[{fontFamily:Fonts.NeutrifStudio.Medium,color:Themes.Light.OnewindowPrimaryBlue(0.75)},styles[Device].add_text]}>Add Test</Text>
                    <Image style={[styles[Device].add_icon]} source={add_icon}></Image>
                </Pressable>
                {/* <Pressable onPress={add}><Image style={[styles[Device].add_icon]} source={add_icon}/></Pressable> */}
                <View style={{flex:1,alignSelf:"stretch"}}>
                {
                    tests.data.length==0
                    ?
                    <View style={{flex:1,gap:10,justifyContent:"center",alignItems:"center"}}>
                        <Image source={emptylist} style={[styles[Device].emptylist_image]}/>
                        <Text style={[styles[Device].no_workexperience,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>It's awfully quiet in here...!</Text>
                        <Text style={[styles[Device].click_message,{textAlign:"center",maxWidth:"85%",color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Test Scores play a major role in recommending programs for you, click on the above plus icon to start adding your scores now!</Text>
                    </View>
                    :
                    <ScrollView style={{flex:1}} contentContainerStyle={{gap:60,padding:5,paddingTop:30}}>
                    {
                        tests.data
                        ?
                            tests.data.map((test,i)=>
                            <Test {...test} index={i}/>
                            )
                        :
                        null
                    }
                    </ScrollView>
                }
                </View>
            </View>
        </View>
    )
}

const Test=(props:TestType & {index:number})=>{

    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:0,height:0,x:0,y:0})
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const translateY=useRef(new Animated.Value(-10)).current

    const remove=async ()=>{
        setIsLoading(true);
        let res:ServerResponse=await profileUpdator({tests:store.getState().testscores.data.filter((item)=>item._id!=props._id)},(res)=>res.success?store.dispatch(setTests(res.data.tests)):null)
        setIsLoading(false);
        return res
    }
    
    const edit=()=>{
        setComponentInfo("Form","title","Test")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:props.name,forminitialdata:props.name}}}):null
    }

    const animate=()=>{
        Animated.spring(translateY,{
            toValue:-dimensions.height-7,
            useNativeDriver:false
        }).start()
    }

    useEffect(()=>{
        animate()
    },[dimensions])

    return(
        <View style={[GeneralStyles.test_wrapper]}>
            <View>
                <View style={[styles[Device].test_icon_bg,{backgroundColor:getThemeColor(props.index%4)}]}></View>
                <Image style={[styles[Device].test_icon]} source={test_icon}/>
            </View>
            <View style={[GeneralStyles.info_wrapper]}>
                <Animated.View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={[GeneralStyles.header,{top:translateY}]}>
                    <View style={{flex:1}}><Text style={[styles[Device].test_date,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.5)}]}>{formatDate(props.testDate)}</Text></View>
                    <View style={{flexDirection:'row',gap:7}}>
                        <Pressable onPress={edit}><Image style={[styles[Device].edit_icon]} source={edit_icon}></Image></Pressable>
                        <Pressable onPress={remove}><Image style={[styles[Device].delete_icon]} source={isLoading?loading_gif:delete_icon}></Image></Pressable> 
                    </View>
                </Animated.View>
                <View style={[GeneralStyles.info_subwrapper]}>
                    <Text style={[styles[Device].test_name,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.name}</Text>
                    <View style={[GeneralStyles.sections_wrapper]}>
                    {
                        props.scores.map((item)=>
                        <View style={[GeneralStyles.section_wrapper]}>
                            <View style={{flex:1}}><Text style={[styles[Device].section_name,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.75)}]}>{item.description}</Text></View>
                            <Text style={[styles[Device].score,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(0.75)}]}>{item.count}</Text>
                        </View>
                        )
                    }
                    </View>
                </View>
                <View style={[GeneralStyles.total_wrapper]}>
                    <Text style={[styles[Device].total_heading,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>Total</Text>
                    <Text style={[styles[Device].total,{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Math.round(Tests.find((item)=>item.name==props.name)?.totalEvaluator(props.scores))}</Text>
                </View>
            </View>
           {/* <View>
                <Pressable onPress={edit}><Image style={{width:20,height:20,objectFit:'contain'}} source={edit_icon}></Image></Pressable>
                <Pressable onPress={remove}><Image style={{width:20,height:20,objectFit:'contain'}} source={isLoading?loading_gif:delete_icon}></Image></Pressable>
                <View>
                    <Text>{props.testDate}</Text>
                    
                </View>
            </View> */}
        </View>
    )

}

export default Testscores

// {
//     "name": "Graduate Record Examination",
//     "scores": [
//         {
//             "description": "Verbal Reasoning",
//             "count": 162,
//             "_id": "6621f60d8e2a22f3c82abe26"
//         },
//         {
//             "description": "Quantitative Reasoning",
//             "count": 160,
//             "_id": "6621f60d8e2a22f3c82abe27"
//         },
//         {
//             "description": "Analytical Writing Assessment",
//             "count": 4,
//             "_id": "6621f60d8e2a22f3c82abe28"
//         },
//         {
//             "description": "Total",
//             "count": 320,
//             "_id": "6621f60d8e2a22f3c82abe29"
//         }
//     ],
//     "testDate": "2023-01-19T00:00:00.000Z",
//     "_id": "6621f60d8e2a22f3c82abe25"
// }