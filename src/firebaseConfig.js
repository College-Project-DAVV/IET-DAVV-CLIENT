import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseConfig2 = {
  apiKey: process.env.REACT_APP_FIREBASE2_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE2_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE2_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE2_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE2_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE2_APP_ID,
};

const noticeSync = initializeApp(firebaseConfig,'noticeSync');
const studentPortal = initializeApp(firebaseConfig2,'studentPortal');

const db = getFirestore(noticeSync);
const db2= getFirestore(studentPortal) ;
export {db,db2}