import { StatusBar } from 'expo-status-bar';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Stacknavigator from './navigation/stackNavigator';
import { useEffect, useReducer, useRef, useState } from 'react';
import { ComponentInfo, StackScreen } from './types';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Navigationcontext from './contexts/PathContext';
import { NavigationReducer } from './reducers/PathReducer';
import { pathToScreens } from './utils';
import Invalidpath from './components/partials/Invalidpath';
import Layout from './components/layouts';

export default function App() {

  const [path,navigate]=useReducer(NavigationReducer,"expo://Student/Home")

  useEffect(()=>{
  Linking.addEventListener('url', (event: { url: string })=>{
    console.log(event);
    // navigate({type:"add",payload:{
    //   path:""
    // }})
  });

  return () => {
    Linking.removeAllListeners("url")
  };
  },[])

  const screens:ComponentInfo[]=pathToScreens(path)
  console.log("screens",path)

  return (
    <Navigationcontext.Provider value={{path,navigate}}>
      <SafeAreaView style={styles.container} >
        <Layout component={{id:screens[0].id,props:screens.length==1?screens[0].props:screens.filter((item,i)=>i!=0)}} invalidPathScreen={Invalidpath}></Layout>
        {/* <Stacknavigator screens={screens} invalidPathScreen={Invalidpath}/> */}
      </SafeAreaView>
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
