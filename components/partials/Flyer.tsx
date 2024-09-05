import { Dimensions, StyleSheet, View } from "react-native"
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
    let params=props.flyerdata
    if(typeof props.flyerdata=="string")
    {
        params={data:props.flyerdata}
    }

    return(
        <View style={[GeneralStyles.main_wrapper]}>
            {/* <View style={{position:"absolute",backgroundColor:'red',top:"-100%",left:0,width:Dimensions.get("screen").width,height:Dimensions.get("screen").height}}></View> */}
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