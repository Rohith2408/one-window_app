import { Text, View } from "react-native"
import useNavigation from "../../hooks/useNavigation"
import { AppliedFilter } from "../../types"

const Filters=(props:{additionalfilters:AppliedFilter[],quickfilters:AppliedFilter[]})=>{


    return(
        <View><Text>Filters</Text></View>
    )
}

export default Filters