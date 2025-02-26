import { initializeApp } from 'firebase/app';
import * as Securestore from 'expo-secure-store'
import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { ServerResponse } from 'http';
import { getServerRequestURL, serverRequest } from './utils';
import { secureStoreKeys } from './constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAiaM-gM_otRwKWiW4FbdxehsD6OaPqaL0',
  authDomain: 'onewindow-f9cc2.firebaseapp.com',
  projectId: 'onewindow-f9cc2',
  appId: '1:1009246040267:ios:d0f5fa174788be02f7ab4e',
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
console.log("firebase",app);

export const googleSignin = async (accessToken:string) => {
    if (accessToken) {
        return serverRequest({
          url: getServerRequestURL("google-login", "POST"),
          reqType: "POST",
          routeType: "public",
          body: JSON.stringify({ credential:accessToken }),
        }).then((serverRes) => {
          //console.log("Server Response: ", serverRes);
          if(serverRes.success)
          {
            Securestore.setItemAsync(secureStoreKeys.ACCESS_TOKEN,serverRes.data).then(()=>{
              return serverRes
            })
          }
          return serverRes
        });
      } else {
        return { success: false, message: "No token found", data: undefined };
    }
  };
  
  

