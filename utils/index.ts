import { Dimensions, LayoutAnimation, Platform } from "react-native";
import { Api, GradingSystems, Tests, Themes, andReplacer, baseAppUrl,lists,secureStoreKeys } from "../constants";
import { Chat, Message, Participant, ServerRequest, StackScreen, ServerResponse, Sharedinfo, FormData, ListItem, Product, Package, Listquery, AppliedFilter, AppliedQuickFilter, Order, Listqueryadv } from "../types";
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
import {components} from "../constants/components";
import * as DocumentPicker from 'expo-document-picker';
import Textbox from "../components/resources/Textbox";
import Datetime from "../components/resources/Datetime";
import { getBasket } from "../constants/basket";


export const propsMapper=(screens:string[],params:any|undefined)=>{
  return screens.map((screen)=>{
      let requiredKeys=components.find((item)=>item.id==screen)?.props
      return {id:screen,props:requiredKeys?requiredKeys.reduce((acc,curr,i)=>{acc[curr]=(params?params[curr]:undefined);return acc},{}):undefined}
  })
}

export const formatQueryParamsToString=(params:any)=>{
  //console.log("params",params)
    let keys=Object.keys(params);
    let values=Object.values(params);
    console.log("paraqms",JSON.stringify(keys,null,2),JSON.stringify(values,null,2));
    return keys.reduce((acc, current, index) => 
      acc + 
      (current + "=" + 
          (typeof values[index] === "string" 
              ? values[index] 
              : JSON.stringify(values[index]).replace(/&/g,andReplacer)
          )
      ) + 
      (index === keys.length - 1 ? "" : "&"), 
    "")
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
      const decodedValue = decodeURIComponent(value)
      if(isStringified(decodedValue))
      {
        //console.log("decoded",decodedValue,decodedValue.replace(/__AND__/g, '&'))
        result[decodedKey] = JSON.parse(decodedValue.replace(/__AND__/g, '&'));
      }
      else
      {
        result[decodedKey] = isNaN(Number(decodedValue)) ? decodedValue : Number(decodedValue);
      }})
    return result;
}

export const isStringified=(str:string)=>{
    let parsedValue;
    try {
      parsedValue = JSON.parse(str);
      if (typeof parsedValue !== 'string') {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
}

export const encodePath=(path:string)=>{
    let truncatedPath="/"+path.replace(baseAppUrl,"");
    let slashIndexs=getAllCharOccurences(truncatedPath,"/");
    let paramIndex=truncatedPath.indexOf("?")
    let screens=new Array(slashIndexs.length).fill({});
    return {
      screens:screens.map((screen,i)=>truncatedPath.substring(slashIndexs[i]+1,(i==(screens.length-1))?(paramIndex==-1?truncatedPath.length:paramIndex):slashIndexs[i+1])),
      props:((paramIndex!=-1)?formatQueryParamsToObj(truncatedPath.substring(paramIndex+1,truncatedPath.length)):undefined)
    } 
}

export const decodePath=(data:{screens:string[],props:any})=>{
  return baseAppUrl+data.screens[0]+(data.screens.filter((screen,i)=>i!=0).reduce((acc,screen)=>acc+"/"+screen,""))+(data.props?("?"+formatQueryParamsToString(data.props)):"")
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
  //console.log("componbents",components);
  return components.find((component)=>component.id==id)
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
      //console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      //handleRegistrationError(`${e}`);
    }
  } else {
    //handleRegistrationError('Must use physical device for push notifications');
  }
}

export const serverRequest=async (requestData:ServerRequest)=>{
  let res:ServerResponse={
    success:true,
    message:"",
    data:undefined
  };
  let accessToken=await SecureStore.getItemAsync(secureStoreKeys.ACCESS_TOKEN)
  if(accessToken?.length==0 && (!requestData.routeType || requestData.routeType=="private"))
  {
    res.success=false
    res.message="Access Token Missing"
    //console.log("AT",accessToken,res);
  }
  else
  {
      //console.log("aaaallll",requestData)
      let fetchObj:RequestInit={
        headers:{"Authorization":"Bearer "+accessToken},
        method:requestData.reqType,
        body:!requestData.preventStringify?JSON.stringify({...requestData.body}):requestData.body
      }
      //console.log("fetch",fetchObj)
      requestData.routeType=="public"?delete fetchObj.headers:null
      !requestData.body?delete fetchObj.body:null
      //console.log("url",requestData)
      let serverRes=await fetch(requestData.url,fetchObj);
      let data:ServerResponse=requestData.responseType=="JSON"||requestData.responseType==undefined?await serverRes.json():{success:true,message:"",data:await serverRes.blob()}
      //console.log("server res",data);
      if(data.AccessToken)
      {
        await SecureStore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,data.AccessToken)
      }
      res={...data}
  }
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

export const getServerRequestURL=(endpointId:string,reqType:"GET"|"PUT"|"DELETE"|"POST",queryParams?:any)=>{
  // console.log("params",queryParams)
  let endObj=endPoints.find((item)=>item.id==endpointId)
  let endpoint=baseURL+"/"+endObj?.category+"/"+endObj?.tail
  return endpoint+(queryParams?("?"+formatQueryParamsToString(queryParams)):"")
}

export const editProfileServerRequest=async (data:any)=>{
  const res:ServerResponse=await serverRequest({
      url: getServerRequestURL("profile","PUT"),
      reqType: "GET",
      body:JSON.stringify(data)
    }
  )
  return res;
}

export const getDevice=()=>{
  let width=Dimensions.get("screen").width
  if(width>=320 && width<=375)
  {
    return "MobileS"
  }
  else if(width>375 && width<=420)
  {
    return "MobileM"
  }
  else if(width>420 && width<=480)
  {
    return "MobileL"
  }
  else
  {
    return "Tab"
  }
}

export const setLayoutAnimation=()=>{
  LayoutAnimation.configureNext(
      {
          duration: 300,
          create: {
              duration: 300,
              delay:50,
              springDamping:10,
              type:LayoutAnimation.Types.easeOut,
              property:LayoutAnimation.Properties.opacity,
          },
          update:{
              duration: 300,
              delay:200,
              springDamping:1,
              type:LayoutAnimation.Types.easeOut
          },
          delete:{
              duration: 300,
              delay:0,
              springDamping:1,
              type:LayoutAnimation.Types.easeOut,
              property:LayoutAnimation.Properties.opacity,
          },
      })
}

const stringEmptyChecker=(str:string)=>str.length==0?true:false

const arrayEmptyChecker=(arr:any[])=>arr.length==0?true:false

export const pickDocument=async (sizeLimit:number)=>{
  let res:DocumentPicker.DocumentPickerResult=await DocumentPicker.getDocumentAsync({type: 'application/pdf'})
  let response:ServerResponse={
      success:false,
      data:null,
      message:""
  };
  //console.log("Doc res",res)
  if(!res.canceled){
      if(res.assets[0].size && res.assets[0].mimeType && (res.assets[0].size/1000000)<=sizeLimit)
      {
          let uploadedFile={
              uri : res.assets[0].uri,
              type: res.assets[0].mimeType,
              name: res.assets[0].name
          };
          response.success=true;
          response.data=uploadedFile;
      }
      else
      {
          // store.dispatch(setPopup({
          //     show: true,
          //     data:{
          //         type:"error",
          //         container:{
          //             name:"error",
          //             data:"Document size should be less than "+sizeLimit+"mb"
          //         }
          //     }
          // }))
      }
  }
  else
  {
      response.message="Document picking cancelled"
  }
  return response
}

export const Word2Sentence=(words:string[],startStr?:string,seperator?:string)=>{
  //console.log("words",words.filter((word)=>word!=undefined || word!=null));
  return words.filter((word)=>word!=undefined || word!=null).reduce((sentence,word,i)=>(word.length>0)?(i==(words.length-1)?(sentence+setWordCase(word)):(sentence+setWordCase(word)+(seperator?(" "+seperator+" "):" , "))):(sentence+""),startStr!=undefined?startStr:"")
}

export const formatDate=(date:string,showWeek?:boolean)=>{
  let dateObj=new Date(date)
  let week=setWordCase(dateObj.toDateString().substring(0,3));
  let month=setWordCase(dateObj.toDateString().substring(4,7));
  let day=dateObj.getDate();
  let year=dateObj.getFullYear()
  return (month+" "+day+","+year+" "+(showWeek?week:""))
}

export const profileUpdator=async (data:any,callback?:(res:ServerResponse)=>void)=>{
  let res:ServerResponse=await serverRequest({
    url:getServerRequestURL("profile","PUT"),
    reqType:"PUT",
    body:data
  })
  if(callback)
  {
    callback(res) //store update
  }
  return res
}

export const fetchStates=async (countryData:string)=>{
  let res=await fetch(Api.states,{
      headers:{
          "Content-Type": "application/json"
      },
      method:"POST",
      body:JSON.stringify({country:countryData})
  })
  let data=await res.json()
  //console.log("states",JSON.stringify(data,null,2));
  return data.data.states;
}

export const fetchCities=async (countryData:string,stateData:string)=>{
  let res=await fetch(Api.cities,{
      headers:{
          "Content-Type": "application/json"
      },
      method:"POST",
      body:JSON.stringify({country:countryData,state:stateData})
  })
  let data=await res.json()
  return data.data;
}

export const fetchCountries=async ()=>{
  let res=await fetch(Api.countries,{
    headers:{
        "Content-Type": "application/json"
    },
    method:"GET",
  })
  let data=await res.json()
  return data.data;
}

export const removeAllSpaces=(str:string)=>{
  return str.replace(/\s+/g, '')
}

export const filterAndsearch=(mainList:ListItem[],itemsPerPage:number,searchStr:string,page:number)=>{
  return mainList.filter((item)=>item.label.includes(searchStr)).splice(itemsPerPage*(page-1),itemsPerPage);
}

export const formatTime=(date:string)=>{
  return new Date(date).toTimeString().substring(0,5)
}

export const getThemeColor=(index:number)=>{
  let colors=[Themes.Light.OnewindowRed(1),Themes.Light.OnewindowPurple(1),Themes.Light.OnewindowYellow(1),Themes.Light.OnewindowTeal(1)];
  return colors[index]
}

export const getLightThemeColor=(index:number)=>{
  let colors=[Themes.ExtraLight.OnewindowRed,Themes.ExtraLight.OnewindowPurple,Themes.ExtraLight.OnewindowYellow,Themes.ExtraLight.OnewindowTeal];
  return colors[index]
}

export const keyVerifier=(data:any,keys:string[])=>{
    let givenKeys=Object.keys(data)
    let nonExistingKeys=keys.filter((item)=>givenKeys.find((item2)=>item2==item)?false:true);
    return {
      success:nonExistingKeys.length==0,
      data:nonExistingKeys,
      message:Word2Sentence(nonExistingKeys,"Keys that don't exist- ")
    }
}

export const ISOtoIntakeformat=(iso:string)=>{
  const date = new Date(iso);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}

// export const PackageProductsValidator=(Package:Package|undefined,Products:Product[])=>{
//   let errors:{id:string,data:any}[]=[];
//   let ordersPlaced=store.getState().orders.data
//   let alreadyPurchasedProducts=Products.filter((Product)=>ordersPlaced.find((order)=>order.products.find((item)=>compareProducts({category:item.category,course:{id:item.course._id,name:item.course.name},intake:item.intake},Product)))?true:false)
//   if(alreadyPurchasedProducts.length!=0)
//   {
//     errors.push({id:"already_purchased",data:alreadyPurchasedProducts});
//   }
//   if(Package!=undefined)
//   {
//     let numberOfProductsAllowed=Package.products.reduce((acc,curr)=>acc+curr.quantity,0);
//     let unfitProducts=Products.filter((product)=>Package.products.find((item)=>item.category==product.category)?false:true)
//     let fitProducts=Products.filter((product)=>Package.products.find((item)=>item.category==product.category)?true:false)
//     if(unfitProducts.length!=0)
//     {
//       errors.push({id:"unfit",data:unfitProducts})
//     }
//     if(fitProducts.length>numberOfProductsAllowed)
//     {
//       errors.push({id:"overflow",data:numberOfProductsAllowed-fitProducts.length})
//     }
//   }
//   return errors;
// }

export const PackageProductsValidator=(Package:Package|undefined,Products:Product[])=>{
  let orders=store.getState().orders.data
  let categories=getCategoriesFromProducts(Products);
  let categoryErrors:{category:string,error:string}[]=[];
  let productsErrors:{product:Product,error:string}[]=[];
  let generalErrors:string[]=[];
  if(Products.length==0)
  {
    generalErrors.push("Products cannot be empty");
  }
  else{
    let purchasedProducts=Products.filter((product)=>orders.find((order:Order)=>order.products.find((item)=>compareProducts({category:item.category,
      intake:item.intake,
      course:{
          id:item.course._id,
          name:item.course.name,
          icon:item.course.university.logoSrc
      }},product))))
    productsErrors=purchasedProducts.map((item)=>({product:item,error:"Already purchased"}))
    if(purchasedProducts.length==0)
    {
      categories.forEach((category)=>{
        let categoryproducts=Products.filter((item)=>item.category==category)
        let categoryInPackage=Package?.products.find((item)=>item.category==category)
        console.log("products",Products)
          if(Package!=undefined)
          {
            if(categoryInPackage==undefined)
          {
            productsErrors=[...productsErrors,...categoryproducts.map((item)=>({product:item,error:"Not allowed in the current package"}))]
          }
          else
          {
            if(categoryproducts.length>categoryInPackage.quantity)
            {
              categoryErrors.push({category:category,error:"Only "+categoryInPackage.quantity+" "+category+" allowed "})
            }
            else
            {
              console.log(category+" is perfect")
            }
          }
          }
      });
    }
  }
  return {categoryErrors,productsErrors,generalErrors}
}

export const getAlreadyPurchasedProducts=()=>{

}

export const getCategoriesFromProducts=(products: Product[])=>{
    const categoriesSet = new Set<string>();
  
    products.forEach(product => {
      categoriesSet.add(product.category);
    });
  
    return Array.from(categoriesSet);
}

export const compareProducts=(product1:Product,product2:Product)=>{
  return product1.category==product2.category && product1.course.id==product2.course.id && product1.intake==product2.intake
}

export const listHandler=(id:string,data:Listquery)=>{
  let listInfo=lists.find((list)=>list.id==id)
  if(listInfo && listInfo.itemsPerPage && listInfo.searchEvaluator && data.fullList && data.selectedList)
  {
    let searchFiltered=data.fullList.filter((item:any)=>listInfo?.searchEvaluator({item:item,query:data.search}));
    let pageFilteredList=searchFiltered.splice((listInfo?.itemsPerPage)*data.page,listInfo.itemsPerPage)
    return {success:true,data:pageFilteredList,message:""};
  }
  return {success:false,data:data.fullList?data.fullList:[],message:""}
}

export const truncateString=(str:string,requiredLength:number,addDots:boolean)=>{
  if(str.length>requiredLength)
  {
    str=str.substring(0,requiredLength)+(addDots?" ...":"")
  }
  return str;
}

const getRazorPayScreenData=(orderid:string,amount:number,callback:any)=>{
  var options = `{
    "key": "rzp_test_TldsbrWlP8NUF5",
    "amount": "${amount}", 
    "currency": "INR",
    "name":"One Window",
    "description": "Test Transaction",
    "order_id": "${orderid}", 
    "handler": responseHandler,
    "prefill": {
      "name": "Customer Name",
      "email": "customer@example.com",
      "contact": "9999999999"
    },
    "theme": {
      "color": "#3399cc"
    }
  }
  var rzp1 = new Razorpay(options);
  rzp1.open();
  `;
}

// function (response){
//   window.ReactNativeWebView.postMessage(JSON.stringify(response));
// }

export const bakeFilters=(additionalFilters:AppliedFilter[],baseFilters:AppliedQuickFilter[])=>{

  return [
      ...getMergedFilters(baseFilters).filter((item)=>additionalFilters.find((item2)=>item2.type==item.type)==undefined?true:false),
      ...additionalFilters
  ]
}

export const chopOff=(additionalFilter:AppliedFilter,baseFilter:AppliedFilter)=>{
  additionalFilter.data=additionalFilter.data.filter((item)=>baseFilter.data.find((item2)=>item.label==item2.label))
  return additionalFilter
}

export function getMergedFilters(quickfilters: AppliedQuickFilter[]): AppliedFilter[] {
  const mergedFilters: { [key: string]: ListItem[] } = {};

  quickfilters.forEach((quickFilter) => {
    quickFilter.data.forEach((filter) => {
      if (!mergedFilters[filter.type]) {
        mergedFilters[filter.type] = [...filter.data];
      } else {
        mergedFilters[filter.type] = mergedFilters[filter.type].filter(item =>
          filter.data.some(fItem => fItem.value === item.value)
        );
      }
    });
  });

  return Object.keys(mergedFilters).map(type => ({
    type,
    data: mergedFilters[type]
  }));
}

export const getAdditionalFilters=(quickFilters:AppliedQuickFilter[],additionalFilters:AppliedFilter[])=>{
    let mergedFilters=mergeQuickFilters(quickFilters);
    return additionalFilters.map((item)=>{
      let mergedItem=mergedFilters.find((item2)=>item2.type==item.type);
      return mergedItem?{...item,data:item.data.filter((opt:ListItem)=>mergedItem?.data.find((opt2)=>opt2.label==opt.label)?true:false)}:item
  }).filter((item)=>item.data.length!=0);
}

export const mergeQuickFilters=(quickFilters:AppliedQuickFilter[])=>{
    return quickFilters.reduce((acc:AppliedFilter[],curr)=>{
      return curr.data.reduce((acc2:AppliedFilter[],curr2)=>acc2.find((item)=>item.type==curr2.type)?acc2.map((item2)=>item2.type==curr2.type?{...item2,data:unionOfStringArrays(item2.data,curr2.data)}:item2):[...acc2,curr2],acc)
    },[])
}

export const unionOfStringArrays=(arr1:ListItem[],arr2:ListItem[])=>{
  return arr2.reduce((acc,curr)=>acc.find((item)=>item.label==curr.label)?acc:[...acc,curr],arr1)
}

export const getUpcomingIntakeData=()=>{
  const intakes=[
    {label: "January-March", value: "0" },
    {label: "April-June", value:  "1" },
    {label: "July-September", value: "2"},
    {label: "October-December", value:  '3'},
]
    return [intakes[Math.floor((new Date().getMonth())/3)]]
}

export const getListQuery=(currentData:Listqueryadv,newData:any)=>{
  
}


// export const bakeFilters=(additionalFilters:AppliedFilter[],quickFilters:AppliedQuickFilter[])=>{

// }

