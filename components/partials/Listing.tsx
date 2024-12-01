import { useEffect, useReducer, useRef, useState } from "react"
import { Animated, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { ListReducer } from "../../reducers/ListReducer"
import {Fonts, Themes, lists, setComponentInfo} from "../../constants"
import { AppliedFilter, AppliedQuickFilter, Event, ListItem, QuickFilterInfo, ServerResponse } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket, getBasket, removeFromBasket } from "../../constants/basket"
import { bakeFilters, chopOff, getAccessTokenFromStore, getAdditionalFilters, getDevice, getMergedFilters, mergeQuickFilters } from "../../utils"
import { Image } from "expo-image"
import Listselection from "../resources/Listselection"
import Quickfiltercard from "../cards/Quickfiltercard"
import filter_icon from '../../assets/images/misc/filter.png'
import { useAppSelector } from "../../hooks/useAppSelector"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
       flex:1,
       alignSelf:'stretch'
    },
    sub_wrapper:{
        flex:1
    },
    filter_wrapper:{
        padding:10,
        gap:10,
        flexDirection:'row',
        alignItems:"center"
    }
})

const TabStyles=StyleSheet.create({
    card:{
        height:140,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:14
    },
    allfilters:{
        fontSize:14
    },
    filter_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    },
    not_found:{
        fontSize:20
    },
    not_found_sub:{
        fontSize:14
    }
})

const MobileSStyles=StyleSheet.create({
    card:{
        height:100,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    },
    filter_icon:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    not_found:{
        fontSize:20
    },
    not_found_sub:{
        fontSize:14
    }
})

const MobileMStyles=StyleSheet.create({
    card:{
        height:150,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    },
    filter_icon:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    not_found:{
        fontSize:18
    },
    not_found_sub:{
        fontSize:14
    }
})

const MobileLStyles=StyleSheet.create({
    card:{
        height:100,
        width:"100%"
    },
    quickfilter_icon:{
        width:15,
        height:15,
        resizeMode:"contain"
    },
    quickfilter:{
        fontSize:12
    },
    allfilters:{
        fontSize:12
    },
    filter_icon:{
        width:22,
        height:22,
        resizeMode:"contain"
    },
    not_found:{
        fontSize:20
    },
    not_found_sub:{
        fontSize:14
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Listing=(props:{listid:string,eventHandler:(event:Event)=>void,additionalFilters:AppliedFilter[],quickFilters:AppliedQuickFilter[],page:number,search:string})=>{//,additionalFilters:AppliedFilter[],quickFilters:AppliedQuickFilter[],search:string,page:number

    //console.log("listfilters props",props);
    const ListInfo=useRef(lists.find((list)=>list.id==props.listid)).current
    const [list,setList]=useState<any[]>([]);
    const [path,navigate]=useNavigation()
    const [isLoading,setIsLoading]=useState(false)
    const Component:React.FC<any>|undefined=ListInfo?.card
    const dataRequested=useRef(false);
    const Device=useRef(getDevice()).current
    const maxPages=useRef(1)
    const phonenumber=useAppSelector((state)=>state.sharedinfo.data)?.phone;
    const verificationStatus=useAppSelector((state)=>state.verification.data)?.find((item)=>item.type=="phone")?.status;
    const basicProfileCompleted=useRef(false);        
    //const lisbasket=getBasket(props.basketid);

    useEffect(()=>{

        getList().then((res:ServerResponse|undefined)=>{
            console.log("server res",res);
            maxPages.current=res?.data.totalPages;
            (res && res.success)?setList(props.page==1?[...res.data.list]:[...list,...res.data.list]):null
        })
    },[JSON.stringify(props.additionalFilters),JSON.stringify(props.quickFilters),props.search,props.page])

    const getList=async ()=>{
        console.log("hitting",props.page);
        let AT=await getAccessTokenFromStore()
        if(!AT && props.page>2)
        {
            navigate?navigate({type:"AddScreen",payload:{screen:"Exploreguest"}}):null;
        }
        else if(!basicProfileCompleted.current && props.page>2)
        {
            navigate?navigate({type:"AddScreen",payload:{screen:"Basicinfo"}}):null;
            basicProfileCompleted.current=true
        }
        if(props.page<=2 || (props.page>2 && AT && basicProfileCompleted.current))
        {
            setIsLoading(true);
            let appliedFilters=bakeFilters(props.additionalFilters,props.quickFilters);
            let res=await ListInfo?.listFetcher({search:props.search,filters:appliedFilters,page:props.page})
            //console.log("Listing response",props.listid,props.page,JSON.stringify(res?.data.map((item)=>item.name),null,2));
            setTimeout(()=>{
                setIsLoading(false)
            },750)
            return res
        }
    }

    const applyQuickFilter=(data:QuickFilterInfo[])=>{
        let arr=data.map((item)=>({type:item.type,data:item.filters}));
        props.eventHandler({name:"applyQuickFilters",triggerBy:props.listid,data:arr});
    }

    const applyAdditionalFilters=(data:AppliedFilter[])=>{
        props.eventHandler({name:"applyAdditionalFilters",triggerBy:props.listid,data:data});
    }

    const openAllFilters=()=>{
        addToBasket(props.listid+"filter",{
            additionalFilters:props.additionalFilters,
            baseFilters:mergeQuickFilters(props.quickFilters),
            callback:applyAdditionalFilters
        })
        console.log("iddd",ListInfo?.formid);
        setComponentInfo("Form","title","Filters")
        navigate?navigate({type:"AddScreen",payload:{screen:"Form",params:{formid:ListInfo?.formid,forminitialdataid:props.listid+"filter",formbasket:props.listid+"filter"}}}):null
    }

    const onScroll=(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        if(props.page<maxPages.current)
        {
            console.log("scroll",e.nativeEvent.layoutMeasurement.height,e.nativeEvent.contentOffset.y,e.nativeEvent.contentSize.height);
            if(!dataRequested.current && (e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y>e.nativeEvent.contentSize.height-60))
            {
                // if(props.page+1>2)
                // {
                //     if(phonenumber==undefined || Object.keys(phonenumber).length==0 || !phonenumber.countryCode || !phonenumber.number){
                //         console.log("No phone number")
                //     }
                //     else if(!verificationStatus){
                //         addToBasket("phonenumber",phonenumber)
                //         navigate?navigate({type:"AddScreen",payload:{screen:"Phoneverification"}}):null
                //     }
                //     else
                //     {
                //         props.eventHandler({name:"setPage",triggerBy:props.listid,data:props.page+1});
                //     }
                //     dataRequested.current=true
                // }
                // else
                // {
                //     props.eventHandler({name:"setPage",triggerBy:props.listid,data:props.page+1});
                //     dataRequested.current=true
                // }
                props.eventHandler({name:"setPage",triggerBy:props.listid,data:props.page+1});
                dataRequested.current=true
            }
            else
            {
                if((e.nativeEvent.layoutMeasurement.height+e.nativeEvent.contentOffset.y<=e.nativeEvent.contentSize.height-20)){
                    dataRequested.current=false
                }
            }
        }
    }

    useEffect(()=>{
        return ()=>{
            removeFromBasket(props.listid+"filters")
        }
    },[])

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            <View style={[GeneralStyles.filter_wrapper]}>
                <View style={{flex:1,borderRadius:100}}>
                    <Listselection 
                        direction="horizontal"
                        blurUnSelected={true}
                        selectionStyle="border"
                        initialSelection={props.quickFilters.map((item)=>ListInfo?.filters.quick.find((item2)=>item.type==item2.type))}
                        styles={{contentcontainer:{gap:10,paddingTop:10,paddingBottom:10}}}
                        onselection={applyQuickFilter}
                        options={{
                            list:ListInfo?.filters?.quick,
                            card:Quickfiltercard,
                            idExtractor:(data:QuickFilterInfo)=>data.type,
                            labelExtractor:(data:QuickFilterInfo)=>data.title,
                            selectionMode:"multi"
                        }}
                    />
                </View>
                <Pressable hitSlop={{left:15,right:15,top:15,bottom:15}} style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:"center"}} onPress={openAllFilters}>
                    <Image style={[styles[Device].filter_icon]} source={filter_icon}/>
                    {/* <Text style={[styles[Device].allfilters]}>All Filters</Text> */}
                </Pressable>
            </View>
            {
                isLoading
                ?
                <View style={{width:"95%",height:2,alignSelf:'center'}}>
                    <Lineloader/>
                </View>
                :
                null
            }
        {
            Component
            ?
                list.length>0
                ?
                <ScrollView scrollEventThrottle={32} onScroll={(e)=>onScroll(e)} style={[GeneralStyles.sub_wrapper]} contentContainerStyle={{padding:10}}>
                {
                    list.map((item:any,i:number)=>
                        <View key={item._id}><Component {...item} index={i}/></View>
                    )
                }
                </ScrollView>
                :
                <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:5}}>
                    <Text style={[styles[Device].not_found,{color:Themes.Light.OnewindowPrimaryBlue(1),fontFamily:Fonts.NeutrifStudio.Bold}]}>{props.listid+" not found "+":("}</Text>
                    <Text style={[styles[Device].not_found_sub,{textAlign:"center",lineHeight:20,color:Themes.Light.OnewindowPrimaryBlue(0.5),fontFamily:Fonts.NeutrifStudio.Regular}]}>Waaait!, there are over 80,000+ Programs to choose from, start exploring now!</Text>
                </View>
            :
            null
        }
        </View>
    )

}

const Lineloader=()=>{

    const animstate=useRef(new Animated.Value(0)).current
    const [dimensions,setDimensions]=useState<LayoutRectangle|undefined>(undefined)

    useEffect(()=>{
        Animated.loop(
            Animated.sequence([
              Animated.timing(animstate, {
                toValue: 1,
                duration:400,
                useNativeDriver: false,
              }),
              Animated.timing(animstate, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
              }),
            ])
        ).start();
    },[])

    return(
        <View style={{flex:1}} onLayout={(e)=>setDimensions(e.nativeEvent.layout)}>
        {
            dimensions
            ?
            <Animated.View style={{borderRadius:100,backgroundColor:"rgba(0,0,0,0.75)",width:animstate.interpolate({inputRange:[0,1],outputRange:[0,dimensions.width]}),height:dimensions.height}}/>
            :
            null
        }
        </View>
    )
}

// const correctAdditionalFilters=(additionalFilters:AppliedFilter[],baseFilters:AppliedQuickFilter[])=>{
//     //console.log("filters",additionalFilters,baseFilters)
//     baseFilters.forEach((basefilter,i) => {
//         basefilter.data.forEach((basefilter_filter,i)=> {
//             let filterfoundIndex=additionalFilters.findIndex((additionalFilter)=>additionalFilter.type==basefilter_filter.type);
//              if(filterfoundIndex!=-1)
//              {
//                 additionalFilters[filterfoundIndex]=chopOff(additionalFilters[filterfoundIndex],basefilter_filter);
//              }
//         });
//     });

//     return additionalFilters
// }

// const Quickfilter=(props:{icon:string,text:string,focus:boolean})=>{

//     const Device=useRef(getDevice()).current
//     const scale=useRef(new Animated.Value(0)).current
//     const [dimensions,setDimensions]=useState<LayoutRectangle>()

//     useEffect(()=>{
       
//         Animated.spring(scale,{
//             toValue:props.focus?1:0,
//             useNativeDriver:true
//         }).start()

//     },[props.focus])

//     //console.log(dimensions)

//     return(
//         <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",paddingLeft:15,paddingRight:15,gap:5,position:'relative'}}>
//             {/* <Image source={props.icon} style={[styles[Device].quickfilter_icon]}/> */}
//             <Text style={[styles[Device].quickfilter,{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{props.text}</Text>
//             <Animated.View style={{position:"absolute",width:dimensions?dimensions.width:0,height:dimensions?dimensions.height:0,borderWidth:1,top:0,left:0,borderRadius:100,borderColor:Themes.Light.OnewindowPrimaryBlue(0.2),transform:[{scale:1}]}}/>
//         </View>
//     )
// }



export default Listing