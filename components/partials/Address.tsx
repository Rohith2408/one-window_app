import { StyleSheet, View } from "react-native"
import Addresscard from "../cards/Addresscard"
import { useAppSelector } from "../../hooks/useAppSelector"
import Loadinglistscreen from "../resources/Loadinglistscreen";
import useNavigation from "../../hooks/useNavigation";
import { useRef } from "react";
import { getDevice } from "../../utils";

const GeneralStyles=StyleSheet.create({
    wrapper:{
        display:"flex",
        flex:1,
        paddingTop:10
    }
})

const TabStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:90
    }
})

const MobileSStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:55
    }
})

const MobileMStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:65
    }
})

const MobileLStyles=StyleSheet.create({
    card:{
        width:'100%',
        height:75
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Address=()=>{

    const personalData=useAppSelector((state)=>state.personalinfo);
    const [path,navigate]=useNavigation()
    const Device=useRef<keyof typeof styles>(getDevice()).current

    return(
        <View style={[GeneralStyles.wrapper]}>
        {
            personalData.responseStatus=="not_recieved"
            ?
            <Loadinglistscreen cardStyles={styles[Device].card} cardGap={30} count={2} direction="vertical"/>
            :
            <View style={{flex:1,gap:40}}>
                <Addresscard data={personalData.data?.temporaryAddress} type="temporary"/>
                <Addresscard data={personalData.data?.permanentAddress} type="permanent"/>
            </View>
        }
        </View>
    )
}

export default Address