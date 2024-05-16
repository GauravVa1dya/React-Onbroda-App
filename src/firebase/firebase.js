import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFsPjol8trnK8ZhxUzhWlY1XdCGgHiTWs",
  authDomain: "onbroda.firebaseapp.com",
  projectId: "onbroda",
  storageBucket: "onbroda.appspot.com",
  messagingSenderId: "67553906370",
  appId: "1:67553906370:web:513719984456a1d9f3b55b",
  measurementId: "G-1752QSG86E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;


