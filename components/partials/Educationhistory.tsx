import { StyleSheet, View } from "react-native"
import { useAppSelector } from "../../hooks/useAppSelector"

const GeneralStyles=StyleSheet.create({
    wrapper:{
        flex:1,
        paddingTop:10
    }
})

const TabStyles=StyleSheet.create({
    
})

const MobileSStyles=StyleSheet.create({
    
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

const Educationhistory=()=>{

    const education=useAppSelector((state)=>state.educationhistory)

    return(
        <View style={{flex:1}}>
        {
            education.data
            ?
            <View style={{flex:1}}>
                
            </View>
            :
            null
        }
        </View>
    )

}



export default Educationhistory