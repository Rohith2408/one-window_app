import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import Gradienttext from "../resources/Gradienttext"
import useNavigation from "../../hooks/useNavigation";
import { useRef } from "react";
import { secureStoreKeys, setComponentInfo } from "../../constants";
import * as SecureStore from 'expo-secure-store'


const Profile=(props:any)=>{

    console.log("Profile",props);
    const [path,navigate]=useNavigation()
    const containerRef = useRef<any>(null);

    const press=()=>{
        if (containerRef.current) {
            containerRef.current.measureInWindow((x, y, width, height) => {
              setComponentInfo("Popup","customPlacement",{initial:{x:x/Dimensions.get("screen").width,y:y/Dimensions.get("screen").height,opacity:0,scale:0,width:width/Dimensions.get("screen").width,height:height/Dimensions.get("screen").height},final:{x:0.25,y:0.25,opacity:1,scale:0.5,width:0.5,height:0.5}})
              navigate({type:"AddScreen",payload:{screen:"Popup",params:{popupid:"Error",popupdata:{message:"Hie there"}}}})
            });
          }
    }

    const logout=async ()=>{
        await SecureStore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,"");
        navigate?navigate({type:"Logout"}):null
    }

    return(
        <View style={{width:"100%",height:"100%",backgroundColor:'yellow'}}>
            <Text style={{fontSize:20}}>Rohith Kumar</Text>
            <Pressable onPress={()=>navigate?navigate({type:"AddScreen",payload:{screen:"Workexperience",params:{name:"a"}}}):null}><Text>Work Experience</Text></Pressable>
            <Pressable onPress={press} ref={containerRef}  style={{backgroundColor:'red',width:100,height:100,position:"absolute",top:200,left:10}}></Pressable>
            <Pressable onPress={logout}><Text>Logout</Text></Pressable>
        </View>
    )
}

const Section1Styles=StyleSheet.create({
    wrapper:{
        width:"100%",
    },
    email:{
        fontSize:14,
        color:"#3C4077"
    }
})

export default Profile