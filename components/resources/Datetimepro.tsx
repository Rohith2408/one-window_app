import { Pressable, StyleSheet, Text, View } from "react-native"
import { AvailableSlot, ServerResponse } from "../../types"
import useNavigation from "../../hooks/useNavigation"
import { addToBasket } from "../../constants/basket"
import { Word2Sentence, formatDate, formatTime, getDevice } from "../../utils"
import { useRef, useState } from "react"
import { Fonts, Themes } from "../../constants"
import { Image } from "expo-image"
import loading_gif from '../../assets/images/misc/loader.gif'

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        display:'flex',
        flexDirection:"column",
    },
    date_wrapper:{

    },
    time_wrapper:{

    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    book:{
        fontSize:12
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})
const MobileMStyles=StyleSheet.create({
    
})
const MobileLStyles=StyleSheet.create({
    
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Datetimepro=(props:{datesFetcher:any,value:string,id:string})=>{

    const [path,navigate]=useNavigation()
    const Device=useRef(getDevice()).current
    const [isLoading,setIsloading]=useState(false);

    const openSelector=async ()=>{
        setIsloading(true)
        let res:ServerResponse=await props.datesFetcher();
        console.log("date fetcher response",res);
        setIsloading(false)
        if(res.success)
        {
            addToBasket(props.id+"selector",{availableSlots:res.data,currentSlot:props.value,fieldid:props.id});
            navigate?navigate({type:"AddScreen",payload:{params:{flyerid:"Datetimeproselector",flyerdata:{id:props.id+"selector"}},screen:"Flyer"}}):null
        }
    }

    return(
        <View style={{flex:1}}>
            <Pressable style={{display:'flex',flexDirection:"row"}} onPress={openSelector}>
                <View style={{flex:1,flexDirection:'row',justifyContent:"center"}}><Text style={[{padding:5,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([formatDate(props.value),formatTime(props.value)],"","|")}</Text></View>
                {
                    !isLoading
                    ?
                    null
                    :
                    <Image style={[styles[Device].loading]} source={loading_gif}/>
                }
            </Pressable>
        </View>
    )

}

export default Datetimepro