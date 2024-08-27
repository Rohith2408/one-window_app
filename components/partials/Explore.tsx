import { Dimensions, FlatList, ScrollView, StyleSheet, View } from "react-native"
import { AppliedFilter } from "../../types"
import Listing from "./Listing"


const ITEM_WIDTH = Dimensions.get("screen").width * 0.8;  
const ITEM_MARGIN = 10;   

const Explore=(props:{initialexploretab?:string,programsadditionalfilters?:AppliedFilter[],programsquickfilters?:AppliedFilter[],universitiesadditionalfilters?:AppliedFilter[],universitiesquickfilters?:AppliedFilter[],search?:string,universitiespage?:number,programspage?:number})=>{
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

    return(
        <View style={{backgroundColor:'white',flex:1,gap:10}}>
            <FlatList 
                data={lists}
                horizontal
                keyExtractor={item => item.listid}
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <View style={[styles.item]}><Listing basketid={item.basketid} listid={item.listid} search={item.search} page={item.page} additionalFilters={item.additionalFilters} quickFilters={item.quickFilters}></Listing></View>
                )}
            />
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