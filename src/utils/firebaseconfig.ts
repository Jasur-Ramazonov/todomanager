import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_KY2CA29XXMhW01ocOLQW-fhZXm-cFa4",
  authDomain: "imtihon-473dc.firebaseapp.com",
  projectId: "imtihon-473dc",
  storageBucket: "imtihon-473dc.firebasestorage.app",
  messagingSenderId: "266767735699",
  appId: "1:266767735699:web:bc65f36ba14e7d058ca666",
  databaseURL: "https://imtihon-473dc-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
