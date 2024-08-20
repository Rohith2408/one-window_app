import { useRef } from "react"
import { Product as ProductType} from "../../types"
import { StyleSheet, Text, View } from "react-native"
import { Themes } from "../../constants"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        width:"100%",
        height:"100%",
        borderRadius:20,
        padding:20
    }
})

const Product=(props:ProductType & {index:number})=>{

    const bgColors=useRef([
        Themes.Light.OnewindowRed(1),
        Themes.Light.OnewindowPurple(1),
        Themes.Light.OnewindowTeal(1),
        Themes.Light.OnewindowYellow(1)
    ]).current

    return(
        <View style={[GeneralStyles.main_wrapper,{backgroundColor:bgColors[props.index%4]}]}>
            <Text>{props.category}</Text>
            <Text>{props.course.name}</Text>
        </View>
    )   

}

export default Product

// export interface Product{
//     info: {
//         notes: string[],
//         questionnaire: string[]
//     },
//     _id: string,
//     course:CourseListObj,
//     intake: string, //ex. 2024-11-30T18:30:00.000Z
//     deadline: string, //ex. 2024-11-30T18:30:00.000Z
//     user: string,
//     category: string,
//     cancellationRequest: boolean,
//     advisors: string[],//ex. ids
//     docChecklist:  {
//         name: string,
//         isChecked: false,
//         doc: Document,
//         _id: string
//     }[],
//     log: {
//         status: string,
//         stages: {
//             name: string,
//             updatedAt: string,
//             _id: string
//         }[],
//         _id: string
//     }[],
//     __v: 10,
//     createdAt:string, //ex. "2024-08-03T08:05:42.665Z"
//     updatedAt: string, //ex. "2024-08-03T08:05:42.665Z"
//     order: string,
//     stage: string,
//     status:string
// }