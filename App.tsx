import { StatusBar } from 'expo-status-bar';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Stacknavigator from './navigation/stackNavigator';
import { useEffect, useReducer, useRef, useState } from 'react';
import { ComponentInfo, StackScreen } from './types';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';

import { NavigationReducer } from './reducers/PathReducer';
import {  encodePath, registerForPushNotificationsAsync} from './utils';
import Invalidpath from './components/partials/Invalidpath';
import Layout from './components/layouts';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';
import Appcontext from './contexts/AppContext';

export default function App() {

  const [theme,setTheme]=useState<"light"|"dark">("light");
  const [path,navigate]=useReducer(NavigationReducer,"onewindow://Student/Base?tab=home")//"onewindow://Student/Base/Profile?tab=home"
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

  const encodedData:{screens:string[],props:any}=encodePath(path)
  console.log("screens data",path)

  return (
    <StoreProvider store={store}>
      <Appcontext.Provider value={{path,navigate,theme,setTheme}}>
        <SafeAreaView style={styles.container} >
          <Layout component={encodedData.screens[0]} screens={encodedData.screens.filter((screen,i)=>i!=0)} props={encodedData.props} invalidPathScreen={Invalidpath}></Layout>
          {/* <Stacknavigator screens={screens} invalidPathScreen={Invalidpath}/> */}
        </SafeAreaView>
      </Appcontext.Provider>
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
