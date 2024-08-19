import { View } from "react-native"
import { ComponentInfo } from "../../types"
import { getComponent, isStringified } from "../../utils"
import { useEffect, useRef, useState } from "react";

const Popup=(props:{popupid:string,popupdata:any})=>{

    const popupRef = useRef(null);
    const Container:React.FC<any>|undefined=getComponent(props.popupid)?.component
    let params=props.popupdata
    if(typeof props.popupdata=="string")
    {
        params={data:props.popupdata}
    }

    useEffect(()=>{
        if (popupRef.current) {
            popupRef.current.measure((x, y, width,height) => {
                console.log(width,height);
            });
        }
    },[popupRef.current])

    console.log("pop",params,Container)

    return(
        <View ref={popupRef} style={{flex:1,width:"100%",height:"100%",backgroundColor:"pink"}}>
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

export default Popup