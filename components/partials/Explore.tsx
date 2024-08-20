import { View } from "react-native"
import { AppliedFilter } from "../../types"
import Listing from "./Listing"

const Explore=(props:{initialexploretab:string,additionalfilters:AppliedFilter[],quickfilters:AppliedFilter[],search:string,page:number})=>{

    console.log("Explore",props)

    return(
        <View style={{backgroundColor:'white',flex:1}}>
            <Listing listid="Universities" search={props.search} page={props.page} additionalFilters={props.additionalfilters} quickFilters={props.quickfilters}></Listing>
        </View>
    )
}

export default Explore