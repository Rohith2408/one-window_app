import React, { useEffect, useRef } from "react"
import { StyleSheet, View } from "react-native"
import { Layout as LayoutType, ServerResponse} from "../../types"
import {components} from "../../constants/components"
import { getDevice, getLocation } from "../../utils"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { initLocation } from "../../store/slices/locationSlice"
import { useAppSelector } from "../../hooks/useAppSelector"
import useNavigation from "../../hooks/useNavigation"
import { serverResponses } from "../../constants/server"

const GeneralStyles=StyleSheet.create({
    
})

const TabStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const MobileSStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const MobileMStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const MobileLStyles=StyleSheet.create({
    wrapper:{
        width:"100%"
    }
})

const styles={
    Tab:TabStyles,
    MobileS:MobileSStyles,
    MobileM:MobileMStyles,
    MobileL:MobileLStyles
}

const Layout=(props:LayoutType)=>{

    const Container=components.find((item)=>item.id==props.component)?.component
    const Invalidpathscreen=props.invalidPathScreen
    const Device=useRef<keyof typeof styles>(getDevice()).current
    const dispatch=useAppDispatch()
    const request=useAppSelector((state)=>state.request);
    const [path,navigate]=useNavigation()

    useEffect(()=>{
        getLocation().then((res:ServerResponse)=>{
            dispatch(initLocation({
              requestStatus: 'initiated',
              responseStatus: 'recieved',
              haveAnIssue: res.success,
              issue:"",
              data:res.data
            }))
          })
    },[])

    useEffect(()=>{
        if(!request.data?.success && (request.data?.message==serverResponses.VerificationFailed || request.data?.message==serverResponses.TokenMissing || request.data?.message==serverResponses.InvalidTokens))
        {
            navigate?navigate({type:"Logout"}):null
        }
    },[request])

    return(
        <View style={[styles[Device].wrapper]}>
            {
                Container
                ?
                <Container screens={props.screens} params={props.props}></Container>
                :
                <Invalidpathscreen></Invalidpathscreen>
            }
        </View>
    )
}

export default Layout