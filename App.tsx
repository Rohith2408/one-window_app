import { StatusBar } from 'expo-status-bar';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Stacknavigator from './navigation/stackNavigator';
import { useEffect, useReducer, useRef, useState } from 'react';
import { ComponentInfo, StackScreen } from './types';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Navigationcontext from './contexts/PathContext';
import { NavigationReducer } from './reducers/PathReducer';
import { decodePath, registerForPushNotificationsAsync} from './utils';
import Invalidpath from './components/partials/Invalidpath';
import Layout from './components/layouts';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

export default function App() {

  const [path,navigate]=useReducer(NavigationReducer,"onewindow://Student/Base/Profile?tab=home")//"onewindow://Student/base"
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(()=>{
    Linking.addEventListener('url', (event: { url: string })=>{
  });

  // registerForPushNotificationsAsync()
  //   .then(token =>{
  //     SecureStore.setItemAsync("devicetoken",token);
  //   }).catch((error: any) => setExpoPushToken(`${error}`));

  // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //   alert(notification.request.content.body+" "+notification.request.content.data.someData)
  // })

  // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //   console.log(response);
  // });

  // setTimeout(()=>{
  //   navigate({type:"add",payload:{params:{popup:"sample",popupdata:"Rohith"},path:"Popup"}})
  // },2000)

  return () => {
    Linking.removeAllListeners("url")
    // notificationListener.current &&
    // Notifications.removeNotificationSubscription(notificationListener.current);
    // responseListener.current &&
    // Notifications.removeNotificationSubscription(responseListener.current);
  };
  },[])

  const decodedData:{screens:string[],props:any}=decodePath(path)
  console.log("screens data",path,decodedData)

  return (
    <StoreProvider store={store}>
      <Navigationcontext.Provider value={{path,navigate}}>
        <SafeAreaView style={styles.container} >
          <Layout component={decodedData.screens[0]} screens={decodedData.screens.filter((screen,i)=>i!=0)} props={decodedData.props} invalidPathScreen={Invalidpath}></Layout>
          {/* <Stacknavigator screens={screens} invalidPathScreen={Invalidpath}/> */}
        </SafeAreaView>
      </Navigationcontext.Provider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:30,
    paddingRight:30
  },
});
