import { Animated, Dimensions, FlatList, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { AppliedFilter, AppliedQuickFilter, ListItem } from "../../types"
import Listing from "./Listing"
import { useEffect, useRef, useState } from "react";
import Tabbarlite from "../resources/Tabbarlite";
import { Fonts, Themes } from "../../constants";
import useNavigation from "../../hooks/useNavigation";
import { addToBasket } from "../../constants/basket";
import Listselection from "../resources/Listselection";
import { getDevice } from "../../utils";
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

const Explore=(props:{courselistid:string,courseadditionalFilters:AppliedFilter[],coursequickFilters:AppliedQuickFilter[],coursesearch:string,coursepage:number})=>{

    const [contentWidth, setContentWidth] = useState(2);
    const offset=new Animated.Value(0)
    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:0,height:0,x:0,y:0})
    const lists=[
        // {
        //     listid:"Programs",
        //     basketid:"programs-filter",
        //     search:props.Programslistquery.search,
        //     page:props.Programslistquery.page?props.Programslistquery.page:1,
        //     additionalFilters:props.Programslistquery.additionalFilters?props.Programslistquery.additionalFilters:[],
        //     quickFilters:props.Programslistquery.quickFilters?props.Programslistquery.quickFilters:[]
        // },
        // {
        //     listid:"Universities",
        //     basketid:"universities-filter",
        //     search:props.Universitieslistquery.search?props.Universitieslistquery.search:"",
        //     page:props.Universitieslistquery.page?props.Universitieslistquery.page:1,
        //     additionalFilters:props.Universitieslistquery.additionalFilters?props.Universitieslistquery.additionalFilters:[],
        //     quickFilters:props.Universitieslistquery.quickFilters?props.Universitieslistquery.quickFilters:[]
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
            navigate?navigate({type:"AddScreen",payload:{screen:"Search"}}):null
        },200)
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
            <Pressable onPress={openSearch}><Text style={{padding:7,fontFamily:Fonts.NeutrifStudio.Bold,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.5),color:Themes.Light.OnewindowPrimaryBlue(0.25),borderRadius:10}}>{props.coursesearch?props.coursesearch:"Search..."}</Text></Pressable>
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
            <View style={{flex:1}}>
            <Courselisting courselistid={props.courselistid} coursepage={props.coursepage} courseadditionalFilters={props.courseadditionalFilters} coursequickFilters={props.coursequickFilters} coursesearch={props.coursesearch}/>
            </View>
            {/* <ScrollView 
            scrollEnabled={false}
            ref={ref}
            horizontal 
            >
                <Courselisting courselistid={props.courselistid} coursepage={props.coursepage} courseadditionalFilters={props.courseadditionalFilters} coursequickFilters={props.coursequickFilters} coursesearch={props.coursesearch}/>
            {
                lists.map((item)=>
                <View style={[{width:dimensions.width}]}>
                    <Listing basketid={item.basketid} listid={item.listid} search={item.search} page={item.page} additionalFilters={item.additionalFilters} quickFilters={item.quickFilters}></Listing>
                </View>
                )
            }
            </ScrollView> */}
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