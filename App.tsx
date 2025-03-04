import { StatusBar } from 'expo-status-bar';
import { Linking, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Stacknavigator from './navigation/stackNavigator';
import { useEffect, useReducer, useRef, useState } from 'react';
import { ComponentInfo, ServerResponse, StackScreen } from './types';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import { NavigationReducer } from './reducers/PathReducer';
import {  encodePath, getLocation, registerForPushNotificationsAsync} from './utils';
import Invalidpath from './components/partials/Invalidpath';
import Layout from './components/layouts';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';
import Appcontext from './contexts/AppContext';
import * as Font from 'expo-font';
import { secureStoreKeys } from './constants';
import NetInfo from '@react-native-community/netinfo';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const [theme,setTheme]=useState<"light"|"dark">("light");
  const [path,navigate]=useReducer(NavigationReducer,"onewindow://Student/Base?tab=home")//onewindow://Student/Base?tab=home //onewindow://Guest/Guestbase
  const [encodedData,setEncodedData]=useState<{screens:string[],props:any}>({screens:[],props:{}})
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => { 
    //alert("updated");
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    Linking.addEventListener('url', (event: { url: string })=>{
      if(event.url)
      {
        //alert(event.url);
        navigate?navigate({type:"SetPath",payload:{path:event.url}}):null
      }
    });
  
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected)
      {
        navigate({type:"RemoveSpecificScreen",payload:{id:"Nointernet"}})
        navigate({type:"AddScreen",payload:{screen:"Nointernet"}})
      }
      else
      {
        navigate({type:"RemoveSpecificScreen",payload:{id:"Nointernet"}})
      }
    });

    registerForPushNotificationsAsync().then(token =>{
      console.log("token",token)
      SecureStore.setItemAsync(secureStoreKeys.DEVICE_TOKEN,token?token:"");
    }).catch((error: any) => setExpoPushToken(`${error}`));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      alert(notification.request.content.body+" "+notification.request.content.data.someData)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //rconsole.log(response);
    });

    async function loadFonts() {
      await Font.loadAsync({
        "NeutrifStudio-ExtraBold": require('./assets/fonts/NeutrifStudio-ExtraBold.ttf'),
        'NeutrifStudio-Bold': require('./assets/fonts/NeutrifStudio-Bold.ttf'),
        'NeutrifStudio-SemiBold': require('./assets/fonts/NeutrifStudio-SemiBold.ttf'),
        'NeutrifStudio-Medium': require('./assets/fonts/NeutrifStudio-Medium.ttf'),
        'NeutrifStudio-Regular': require('./assets/fonts/NeutrifStudio-Regular.ttf')
      });
      setFontsLoaded(true);
    }
    loadFonts();

    return () => {
      unsubscribe();
      Linking.removeAllListeners("url")
      notificationListener.current &&
      Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  useEffect(()=>{
    //console.log("encoded",path,encodePath(path,encodedData));
    setEncodedData(encodePath(path,encodedData))
  },[JSON.stringify(path)])

  return (
    <StoreProvider store={store}>
      <Appcontext.Provider value={{path,navigate,theme,setTheme}}>
        <SafeAreaProvider style={[styles.container]}>
        {
          encodedData.screens.length>0
          ?
          <Layout component={encodedData.screens[0]} screens={encodedData.screens.filter((screen,i)=>i!=0)} props={encodedData.props} invalidPathScreen={Invalidpath}/>
          :
          null
        }
        </SafeAreaProvider>
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
    // paddingLeft:30,
    // paddingRight:30
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}
