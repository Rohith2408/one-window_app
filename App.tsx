import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Stacknavigator from './navigation/stackNavigator';
import { useEffect, useReducer, useRef, useState } from 'react';
import { StackScreen } from './types';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Navigationcontext from './contexts/PathContext';
import { NavigationReducer } from './reducers/PathReducer';
import { pathToScreens } from './utils';
import Invalidpath from './components/partials/Invalidpath';

export default function App() {

  const [path,navigate]=useReducer(NavigationReducer,"/Home?name=Rohith")

  useEffect(()=>{

  },[])

  const screens:StackScreen[]=pathToScreens(path)
  console.log(screens)

  return (
    <Navigationcontext.Provider value={{path,navigate}}>
      <View style={styles.container}>
        <Stacknavigator screens={screens} invalidPathScreen={Invalidpath}/>
      </View>
    </Navigationcontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
