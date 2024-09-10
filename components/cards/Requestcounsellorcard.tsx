import { Pressable, Text, View } from "react-native"
import { getServerRequestURL, serverRequest, setWordCase } from "../../utils"
import { Fonts, Themes } from "../../constants"
import { ServerResponse } from "../../types"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setAdvisors } from "../../store/slices/advisorsSlice"
import { addChats } from "../../store/slices/chatsSlice"
import { useState } from "react"
import { Image } from "expo-image"
import loader from '../../assets/images/misc/loader.gif'

const Requestcounsellorcard=(props:{country:string})=>{

    const dispatch=useAppDispatch()
    const [isLoading,setIsloading]=useState(false);

    const requestForCounsellor=async ()=>{
        setIsloading(true);
        let serverRes:ServerResponse=await serverRequest({
            url:getServerRequestURL("request-counsellor","POST"),
            reqType:"POST",
            body:{
                country:props.country
            }
        })
        setIsloading(false);
        console.log("Request Response",serverRes);
        if(serverRes.success)
        {
            //dispatch(setAdvisors(serverRes.data.advisors))
            //dispatch(addChats(serverRes.data.chat));
        }
        // let accessTokenRes=await checkAccessToken();
        // setLayoutAnimation()
        // setLoading(true);
        // if(accessTokenRes.success)
        // {
        //     let serverRes=await fetch(getUrl(ENDPOINTS.REQUEST_COUNSELLOR),{
        //         method:"POST",
        //         headers:{
        //             "Authorization":"Bearer "+accessTokenRes.data,
        //         },
        //         body:JSON.stringify({
        //             country:country
        //         })
        //     })
        //     let res=await processServerResponse(serverRes,"json")
        //     console.log("res counsellor req",JSON.stringify(res,null,2))
        //     if(res.success)
        //     {   
                // dispatch(setAdvisors(res.data.advisors))
                // dispatch(addChats(res.data.chat));
        //         setLoading(false);
        //     }
        // }
    }

    return(
        <View style={{gap:10,padding:10}}>
            <Text style={{fontFamily:Fonts.NeutrifStudio.Regular,color:Themes.Light.OnewindowPrimaryBlue(1)}}>Seems like you are interested to go {setWordCase(props.country)}</Text>
            <Pressable onPress={!isLoading?requestForCounsellor:null} style={{alignSelf:"flex-end"}}>
                {
                    !isLoading
                    ?
                    <Text style={{fontFamily:Fonts.NeutrifStudio.Bold,color:Themes.Light.OnewindowPrimaryBlue(1)}}>Request for a Counsellor?</Text>
                    :
                    <Image style={{width:16,height:16,resizeMode:"contain"}} source={loader}/>
                }
            </Pressable>
        </View>
    )

}

export default Requestcounsellorcard