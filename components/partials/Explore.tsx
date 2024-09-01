import { Animated, Dimensions, FlatList, LayoutRectangle, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { AppliedFilter } from "../../types"
import Listing from "./Listing"
import { useEffect, useRef, useState } from "react";
import Tabbarlite from "../resources/Tabbarlite";
import { Fonts, Themes } from "../../constants";
import useNavigation from "../../hooks/useNavigation";
import { addToBasket } from "../../constants/basket";


const ITEM_WIDTH = Dimensions.get("screen").width * 0.9;  
const ITEM_MARGIN = 10;   

const Explore=(props:{initialexploretab?:string,programsadditionalfilters?:AppliedFilter[],programsquickfilters?:AppliedFilter[],universitiesadditionalfilters?:AppliedFilter[],universitiesquickfilters?:AppliedFilter[],search?:string,universitiespage?:number,programspage?:number})=>{
    
    const [contentWidth, setContentWidth] = useState(2);
    const offset=new Animated.Value(0)
    const [dimensions,setDimensions]=useState<LayoutRectangle>({width:1,height:0,x:0,y:0})
    const lists=[
        {
            listid:"Programs",
            basketid:"programs-filter",
            search:props.search?props.search:"",
            page:props.programspage?props.programspage:1,
            additionalFilters:props.programsadditionalfilters?props.programsadditionalfilters:[],
            quickFilters:props.programsquickfilters?props.programsquickfilters:[]
        },
        {
            listid:"Universities",
            basketid:"universities-filter",
            search:props.search?props.search:"",
            page:props.universitiespage?props.universitiespage:1,
            additionalFilters:props.universitiesadditionalfilters?props.universitiesadditionalfilters:[],
            quickFilters:props.universitiesquickfilters?props.universitiesquickfilters:[]
        }
    ]
    const ref=useRef<any>()
    const tabs=useRef(["Programs","Universities"]).current
    const normalizedOffset = Animated.divide(offset,new Animated.Value(dimensions.width))
    const [path,navigate]=useNavigation()

    const changeTab=(tab:string)=>{
        ref.current?ref.current.scrollTo(tabs.findIndex((item)=>item==tab)*dimensions.width):null
    }

    const openSearch=()=>{
        navigate?navigate({type:"RemoveSpecificScreen",payload:{id:"Search"}}):null
        setTimeout(()=>{
            navigate?navigate({type:"AddScreen",payload:{screen:"Search"}}):null
        },200)
    }

    useEffect(()=>{
        addToBasket("search",{searchString:props.search});
        addToBasket("programsadditionalfilters",props.programsadditionalfilters)
        addToBasket("programsquickfilters",props.programsquickfilters)
        addToBasket("programspage",props.programspage)
        addToBasket("universitiesadditionalfilters",props.universitiesadditionalfilters)
        addToBasket("universitiesquickfilters",props.universitiesquickfilters)
        addToBasket("universitiespage",props.universitiespage)
    },[props])

    //console.log("filters2",JSON.stringify(props.programspage,null,2))

    return(
        <View onLayout={(e)=>setDimensions(e.nativeEvent.layout)} style={{flex:1,gap:10}}>
            {/* <Tabbarlite tabPosition={offset} tabChangeHandler={changeTab} tabs={tabs}></Tabbarlite> */}
            <Pressable onPress={openSearch}><Text style={{padding:7,fontFamily:Fonts.NeutrifStudio.Bold,borderWidth:1,borderColor:Themes.Light.OnewindowPrimaryBlue(0.5),color:Themes.Light.OnewindowPrimaryBlue(0.25),borderRadius:10}}>{props.search?props.search:"Search..."}</Text></Pressable>
            <Animated.ScrollView 
            ref={ref}
            onContentSizeChange={(width) => setContentWidth(width)}
            pagingEnabled 
            horizontal 
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: {x:offset} } }],
                { useNativeDriver: true}
            )}
            scrollEventThrottle={16}
            >
            {
                lists.map((item)=>
                <View style={[{width:dimensions.width}]}><Listing basketid={item.basketid} listid={item.listid} search={item.search} page={item.page} additionalFilters={item.additionalFilters} quickFilters={item.quickFilters}></Listing></View>
                )
            }
            </Animated.ScrollView>
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