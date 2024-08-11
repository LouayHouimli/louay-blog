import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyANJEBaIj-E1YOjsaZKvpQLUOu6NNOGHKE",
    authDomain: "louay-blog.firebaseapp.com",
    projectId: "louay-blog",
    storageBucket: "louay-blog.appspot.com",
    messagingSenderId: "855943066442",
    appId: "1:855943066442:web:6ce68179fdac068a1d87b3"
  
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
  