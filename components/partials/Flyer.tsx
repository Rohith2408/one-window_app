import { StyleSheet, View } from "react-native"
import { ComponentInfo } from "../../types"
import { getComponent } from "../../utils"

const GeneralStyles=StyleSheet.create({
    main_wrapper:{
        flex:1,
        padding:10
    }
})

const Flyer=(props:{flyerid:string,flyerdata:any})=>{

    const Container:React.FC<any>|undefined=getComponent(props.flyerid)?.component
    //let params=typeof props.flyerdata == "string"?{data:props.flyerdata}:JSON.parse(props.flyerdata)
    let params=props.flyerdata
    if(typeof props.flyerdata=="string")
    {
        params={data:props.flyerdata}
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
        {
            Container
            ?
            <Container {...params}/>
            :
            null
        }
        </View>
    )

}

export default Flyer