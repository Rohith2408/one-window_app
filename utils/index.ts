import { Platform } from "react-native";
import ComponentsInfo from "../components/info";
import { baseAppUrl, secureStore } from "../constants";
import { Chat, Message, Participant, StackScreen, serverResponse } from "../types";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { store } from "../store";
import { resetUserAuthStatus, setUserAuthStatus } from "../store/slices/userAuthStatusSlice";
import { resetPopup, setPopup } from "../store/slices/popupSlice";
import { resetApplayout } from "../store/slices/appLayoutSlice";
import { resetApplications } from "../store/slices/applicationsSlice";
import { resetChats } from "../store/slices/chatsSlice";
import { resetDocuments } from "../store/slices/documentsSlice";
import { resetEducationHistory } from "../store/slices/educationHistorySlice";
import { resetFamilyInfo } from "../store/slices/familyInfoSlice";
import { resetMessages } from "../store/slices/messagesSlice";
import { resetNotifications } from "../store/slices/notificationsSlice";
import { resetPersonalInfo } from "../store/slices/personalinfoSlice";
import { resetPreferences } from "../store/slices/preferencesSlice";
import { resetShortlisted } from "../store/slices/shortlistedCoursesSlice";
import { resetSkills } from "../store/slices/skillsSlice";
import { resetTests } from "../store/slices/testScoresSlice";
import { resetVerification } from "../store/slices/verificationSlice";
import { resetWorkExperience } from "../store/slices/workexperienceSlice";
import { resetSharedinfo } from "../store/slices/sharedinfoSlice";
import { baseURL, endPoints } from "../constants/server";

export const formatQueryParamsToString=(params:any)=>{
    let keys=Object.keys(params);
    let values=Object.values(params);
    return keys.reduce((acc,current,index)=>acc+(current+"="+values[index])+(index==(keys.length-1)?"":"&"),"")
}

export const formatQueryParamsToObj=(queryString:string)=>{
    if (queryString.startsWith('?')) {
      queryString = queryString.substring(1);
    }
  
    const pairs = queryString.split('&');
    const result:{ [key: string]: string|number} = {};
  
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value); 
      result[decodedKey] = isNaN(Number(decodedValue)) ? decodedValue : Number(decodedValue);      });
    return result;
}

export const decodePath=(path:string)=>{
    let truncatedPath="/"+path.replace(baseAppUrl,"");
    let slashIndexs=getAllCharOccurences(truncatedPath,"/");
    let paramIndex=truncatedPath.indexOf("?")
    let screens=new Array(slashIndexs.length).fill({});
    return {
      screens:screens.map((screen,i)=>truncatedPath.substring(slashIndexs[i]+1,(i==(screens.length-1))?(paramIndex==-1?truncatedPath.length:paramIndex):slashIndexs[i+1])),
      props:((paramIndex!=-1)?formatQueryParamsToObj(truncatedPath.substring(paramIndex+1,truncatedPath.length)):undefined)
    } 
}


export const getAllCharOccurences=(str:string, char:string)=>{
    let regex = new RegExp(char, 'g');
    let indexes = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      indexes.push(match.index);
    }
    return indexes;
}

export const getComponent=(id:string)=>{
  return ComponentsInfo.find((component)=>component.id==id)
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      //handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ??Constants?.easConfig?.projectId;
    if (!projectId) {
      //handleRegistrationError('Project ID not found');
    }
    try {
    const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      //handleRegistrationError(`${e}`);
    }
  } else {
    //handleRegistrationError('Must use physical device for push notifications');
  }
}

export const checkAccessToken=async ()=>{
  let res:serverResponse={
    success:true,
    message:"",
    data:undefined
  };
  let accessToken;
  try{
      accessToken=await SecureStore.getItemAsync(secureStore.ACCESS_TOKEN)
  }
  catch(e){
      console.log(e);
  }
  if(!accessToken)
  {
      // res.success=false;
      // res.message="no access token found"
      // store.dispatch(setUserAuthStatus({
      //     isAuthorized: false,
      //     isRegistered: true,
      //     role: 'guest'
      // }))
      //reset the store
  }
  else
  {
      res.success=true;
      res.message="access token found"
      res.data=accessToken;
  }
  return res;
}

export const processServerResponse=async (serverRes:any,resType:"blob"|"json")=>{
  let res:serverResponse={
      success:true,
      message:"",
      data:undefined
  };
  switch(resType){
      case "blob":
          res={success:true,data:await serverRes.blob(),message:''}
          break;

      case "json":
          res=await serverRes.json()
          break;

  }
  if(!res.success)
  {
      // store.dispatch(setPopup({
      //     show:true,
      //     data:{
      //         container:{
      //             name:"errorpopup",
      //             data:res.message,
      //             dimensions:{
      //                 width:Dimensions.get("screen").width*0.6,
      //                 height:Dimensions.get("screen").width*0.6
      //             }
      //         },
      //         headerIcon:face_icon,
      //         type:"custom",
      //         showTitle:false
      //     }
      // }))
      if(res.message==server.LOGIN_AGAIN)
      {
          store.dispatch(setUserAuthStatus({
              isAuthorized: false,
              isRegistered: true,
              role: 'guest'
          }))
      }
  }
  (res.AccessToken!=undefined)?await SecureStore.setItemAsync(secureStore.ACCESS_TOKEN,res.AccessToken):null
  return res
}

export const getChatType=(chat:Chat)=>{
  return chat.participants.find((participant)=>participant.userType=="member")?"advisors":"community"
}

export const setWordCase=(word:string|undefined)=>{
  if(word && word.length!=0)
  {
      let lowercase=word.toLowerCase()
      return (lowercase[0].toUpperCase() + lowercase.substring(1))
  }
  else
  {
      return "";
  }
}

export const getMonth=(month:number,caseCorrected?:boolean)=>{
  let monthString="";
  switch(month){
      case 1:
          monthString="january"
          break;

      case 2:
          monthString="february"
          break;

      case 3:
          monthString="march"
          break;

      case 4:
          monthString="april"
          break;

      case 5:
          monthString="may"
          break;

      case 6:
          monthString="june"
          break;

      case 7:
          monthString="july"
          break;

      case 8:
          monthString="august"
          break;

      case 9:
          monthString="september"
          break;

      case 10:
          monthString="october"
          break;

      case 11:
          monthString="november"
          break;

      case 12:
          monthString="december"
          break;
  }
  caseCorrected?monthString=setWordCase(monthString):null
  return monthString
}

export const resetStore=()=>{
  store.dispatch(resetApplayout());
  store.dispatch(resetApplications());
  store.dispatch(resetChats());
  store.dispatch(resetDocuments());
  store.dispatch(resetEducationHistory());
  store.dispatch(resetFamilyInfo());
  store.dispatch(resetMessages());
  store.dispatch(resetNotifications());
  store.dispatch(resetPersonalInfo());
  store.dispatch(resetPopup());
  store.dispatch(resetPreferences());
  store.dispatch(resetShortlisted());
  store.dispatch(resetSkills());
  store.dispatch(resetTests());
  store.dispatch(resetUserAuthStatus());
  store.dispatch(resetVerification());
  store.dispatch(resetWorkExperience());
  store.dispatch(resetSharedinfo())
}

export const getFriends=(chats:Chat[],currentUserId:string)=>{
  let participants:Participant[]=[]
  let allusers:Participant[]=chats.reduce(
      (accumulator, currentValue) => [...accumulator,...currentValue.participants],
      participants,
  );
  return Array.from(new Set(allusers.map(a => a._id)))
  .map(_id => {
    return allusers.find(a => a._id === _id)
  }).filter((user)=>user?._id!=currentUserId)
}

export const getParticipantsLastSeenMessage=(chat:Chat,currentUser:Sharedinfo,messages:Message[])=>{
  let participants=chat.participants.filter((participant)=>participant._id!=currentUser._id);
  let unsetParticipants=participants;
  for(let i=chat.unSeenMessages.length-1;i>=0;i--){
      if(unsetParticipants.length!=0)
      {
          unsetParticipants.forEach((unsetparticipant)=>{
              if(chat.unSeenMessages[i].seen.findIndex((item)=>item==unsetparticipant._id)!=-1)
              {
                  let index=participants.findIndex((participant)=>participant._id==unsetparticipant._id)
                  participants[index]={...participants[index],lastSeenMessageId:chat.unSeenMessages[i].message._id}
                  unsetParticipants=unsetParticipants.filter((unsetparticipant2)=>unsetparticipant2._id!=unsetparticipant._id);
              }
              
          })
      }
      else
      {
          break
      }
  }
  if(unsetParticipants.length!=0)
  {
      unsetParticipants.forEach(unsetparticipant => {
          let index=participants.findIndex((participant)=>participant._id==unsetparticipant._id)
          participants[index]={...participants[index],lastSeenMessageId:messages[chat.unSeenMessages.length]?._id} 
      });
  }
  return participants;
}

export const bakeMessagesWithSeenInfo=(messages:Message[],participants:Participant[])=>{
  let list:Message[]=[];
  let seenBy="";
  let seen={
      status:false,
      by:""
  }
  //add seen 
  for(let i=messages.length-1;i>=0;i--)
  {
      if(participants.length>0)
      {
          seen.by="Seen by ";
          seen.status=false;
          participants.forEach((participant)=>
          {
              if(participant.lastSeenMessageId==messages[i]._id){
                  seen.status=true;
                  seen.by+=participant.firstName +" , "
                  participants=participants.filter((participant,j)=>j!=i);
              }
          })
          if(seen.status)
          {
              list.push({_id:"seen"+messages[i]._id,type:'seen',content:seen.by.substring(0,seen.by.length-2)});
          }
      }
      list.push(messages[i]);
  }
  //add activity
  participants.forEach((participant)=>{
      if(participant.activity=="typing")
      {
          list.push({_id:"typing"+participant._id,type:"typing",content:"typing",sender:participant})
      }
  })
  return list
}

const getRequestObj=(endpointId:string,queryParams?:any,body?:any)=>{
  let endObj=endPoints.find((item)=>item.id==endpointId)
  let endpoint=baseURL+"/"+endObj?.category+"/"+endObj?.tail
  let obj={
    url:endpoint+queryParams?("?"+formatQueryParamsToString(queryParams)):"",
    body:{...body}
  }
  !body?delete obj.body:null
  return obj
}

