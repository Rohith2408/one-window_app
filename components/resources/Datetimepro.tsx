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
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    book:{
        fontSize:18
    },
    datetime:{
        fontSize:18
    },
    loading:{
        width:20,
        height:20,
        resizeMode:'contain'
    }
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
    datetime:{
        fontSize:14
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})
const MobileMStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    book:{
        fontSize:12
    },
    datetime:{
        fontSize:16
    },
    loading:{
        width:17,
        height:17,
        resizeMode:'contain'
    }
})
const MobileLStyles=StyleSheet.create({
    date:{
        fontSize:24
    },
    time:{
        fontSize:20
    },
    datetime:{
        fontSize:16
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
            <Pressable style={{alignSelf:"center",display:'flex',flexDirection:"row",alignItems:"center"}} onPress={!isLoading?openSelector:null}>
                <View style={[{flexDirection:'row',justifyContent:"center"}]}><Text style={[styles[Device].datetime,{padding:5,fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}]}>{Word2Sentence([formatDate(props.value),formatTime(props.value)],"","|")}</Text></View>
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