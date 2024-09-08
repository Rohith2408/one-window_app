import { Animated, Dimensions, FlatList, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { AppliedFilter, AppliedQuickFilter, Event, ListItem } from "../../types"
import Listing from "./Listing"
import { useEffect, useRef, useState } from "react";
import Tabbarlite from "../resources/Tabbarlite";
import { Fonts, Themes } from "../../constants";
import useNavigation from "../../hooks/useNavigation";
import { addToBasket } from "../../constants/basket";
import Listselection from "../resources/Listselection";
import { getAdditionalFilters, getDevice } from "../../utils";
import Courselisting from "./Courselisting";

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        paddingTop:20,
        backgroundColor:'white'
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({

})

const MobileMStyles=StyleSheet.create({

})

const MobileLStyles=StyleSheet.create({

})

const ITEM_WIDTH = Dimensions.get("screen").width * 0.9;  
const ITEM_MARGIN = 10;   

type query={
    search:string,
    page:number,
    additionalFilters:AppliedFilter[],
    quickFilters:AppliedQuickFilter[]
}

const Explore=(props:{initialexploretab:string,programslistquery:query,universitieslistquery:query})=>{//courseadditionalFilters:AppliedFilter[],coursequickFilters:AppliedQuickFilter[],coursesearch:string,coursepage:number

    console.log("props",props);
    const [contentWidth, setContentWidth] = useState(2);
    const offset=new Animated.Value(0)
    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:0,height:0,x:0,y:0})
    const lists=[
        {
            listid:"Programs",
            basketid:"programs-filter",
            search:props.programslistquery.search?props.programslistquery.search:"",
            page:props.programslistquery.page?props.programslistquery.page:1,
            additionalFilters:props.programslistquery.additionalFilters?props.programslistquery.additionalFilters:[],
            quickFilters:props.programslistquery.quickFilters?props.programslistquery.quickFilters:[]
        },
        // {
        //     listid:"Universities",
        //     basketid:"universities-filter",
        //     search:props.universitieslistquery.search?props.universitieslistquery.search:"",
        //     page:props.universitieslistquery.page?props.universitieslistquery.page:1,
        //     additionalFilters:props.universitieslistquery.additionalFilters?props.universitieslistquery.additionalFilters:[],
        //     quickFilters:props.universitieslistquery.quickFilters?props.universitieslistquery.quickFilters:[]
        // }
    ]
    const ref=useRef<any>()
    const tabs=useRef([{label:"Programs",value:"programs"},{label:"Universities",value:"universities"}]).current
    const [path,navigate]=useNavigation()
    const timer=useRef<any>()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    const tabSelected=(selected:ListItem[])=>{
        ref.current.scrollTo({x:dimensions.width*(tabs.findIndex((tab)=>tab.label==selected[0].label)),animated:true})
    }

    const openSearch=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Search"}}):null
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"Search",params:{initialSearch:props.programslistquery.search}}}):null
        },200)
    }

    const eventHandler=(event:Event)=>{
        console.log("Event",event);
        navigate({type:"RemoveSpecificScreen",payload:{id:"Explore"}})
        switch(event.name){
            case "applyAdditionalFilters":
                setTimeout(()=>{
                    let programslistquery=event.triggerBy=="Programs"?{...props.programslistquery,additionalFilters:event.data}:props.programslistquery
                    let universitieslistquery=event.triggerBy=="Universities"?{...props.universitieslistquery,additionalFilters:event.data}:props.universitieslistquery
                    navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:props.initialexploretab,programslistquery:programslistquery,universitieslistquery:universitieslistquery}}})
                },100)
                break;

            case "applyQuickFilters":
                setTimeout(()=>{
                    let programslistquery=event.triggerBy=="Programs"?{...props.programslistquery,quickFilters:event.data,additionalFilters:getAdditionalFilters(event.data,props.programslistquery.additionalFilters)}:props.programslistquery
                    let universitieslistquery=event.triggerBy=="Universities"?{...props.universitieslistquery,quickFilters:event.data,additionalFilters:getAdditionalFilters(event.data,props.universitieslistquery.additionalFilters)}:props.universitieslistquery
                    console.log("quick ",programslistquery,universitieslistquery)
                    navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:props.initialexploretab,programslistquery:programslistquery,universitieslistquery:universitieslistquery}}})
                },100)
                break;
            
            case "setPage":
                let programslistquery=event.triggerBy=="Programs"?{...props.programslistquery,page:event.data}:props.programslistquery
                let universitieslistquery=event.triggerBy=="Universities"?{...props.universitieslistquery,page:event.data}:props.universitieslistquery
                navigate({type:"AddScreen",payload:{screen:"Explore",params:{initialexploretab:props.initialexploretab,programslistquery:programslistquery,universitieslistquery:universitieslistquery}}})
            break;
        }
    }

    useEffect(()=>{
        // addToBasket("search",{searchString:props.search});
        // addToBasket("programsadditionalfilters",props.programsadditionalfilters)
        // addToBasket("programsquickfilters",props.programsquickfilters)
        // addToBasket("programspage",props.programspage)
        // addToBasket("universitiesadditionalfilters",props.universitiesadditionalfilters)
        // addToBasket("universitiesquickfilters",props.universitiesquickfilters)
        // addToBasket("universitiespage",props.universitiespage)
    },[props])

    useEffect(()=>{
        // const checkRefAndSync = () => {
        //     if (ref.current && dimensions.width!=0) {
        //       tabSelected([{ label: props.initialexploretab, value: props.initialexploretab }]);
        //     } else {
        //       timer.current=setTimeout(checkRefAndSync, 100);
        //     }
        //   };
      
        //   checkRefAndSync();

        //   return(()=>clearTimeout(timer.current));
    },[dimensions.width])
    //[{label:props.initialexploretab,value:props.initialexploretab}]

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,gap:15}}>
            <Pressable onPress={openSearch}><Text style={{padding:7,fontFamily:Fonts.NeutrifStudio.Bold,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.5),color:Themes.Light.OnewindowPrimaryBlue(0.25),borderRadius:10}}>{props.programslistquery.search?props.programslistquery.search:"Search..."}</Text></Pressable>
            {/* <Listselection
                direction="horizontal"
                selectionStyle="background"
                initialSelection={[{label:"Programs",value:"programs"}]}
                styles={{contentcontainer:{gap:10}}}
                onselection={tabSelected}
                options={{
                    list:tabs,
                    idExtractor:(data:ListItem)=>data.label,
                    labelExtractor:(data:any)=>data.label,
                    selectionMode:"single"
                }}
            /> */}
            {/* <View style={{flex:1}}>
            <Courselisting courselistid={props.courselistid} coursepage={props.coursepage} courseadditionalFilters={props.courseadditionalFilters} coursequickFilters={props.coursequickFilters} coursesearch={props.coursesearch}/>
            </View> */}
            <ScrollView 
            scrollEnabled={false}
            ref={ref}
            horizontal 
            >
            {
                lists.map((item)=>
                <View style={[{width:dimensions.width}]}>
                    <Listing eventHandler={eventHandler} listid={item.listid} search={item.search} page={item.page} additionalFilters={item.additionalFilters} quickFilters={item.quickFilters}></Listing>
                </View>
                )
            }
            </ScrollView>
            {/* <FlatList 
                data={lists}
                onScroll={(e)=>console.log(e.nativeEvent.contentOffset.x/(e.nativeEvent.contentSize.width-e.nativeEvent.layoutMeasurement.width))}
                horizontal
                keyExtractor={item => item.listid}
                showsHorizontalScrollIndicator={false}
                snapToInterval={dimensions?.width?dimensions.width:0}
                decelerationRate="fast"
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <View style={[{width:dimensions?.width?dimensions.width:0}]}><Listing basketid={item.basketid} listid={item.listid} search={item.search} page={item.page} additionalFilters={item.additionalFilters} quickFilters={item.quickFilters}></Listing></View>
                )}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap:20
      //paddingHorizontal: ITEM_MARGIN, 
    },
    item: {
      width: ITEM_WIDTH,
      //marginHorizontal: ITEM_MARGIN,
      borderRadius: 10,
      overflow: 'hidden',
    },
});

export default Explore