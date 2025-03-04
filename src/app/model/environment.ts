// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDl1u_mExqC98ZanaCSza2JpVtX1kNaQ7A",
  authDomain: "lorinspan-38bb5.firebaseapp.com",
  databaseURL: "https://lorinspan-38bb5-default-rtdb.firebaseio.com",
  projectId: "lorinspan-38bb5",
  storageBucket: "lorinspan-38bb5.firebasestorage.app",
  messagingSenderId: "616456178270",
  appId: "1:616456178270:web:f819bb3b546a4ba58602cf",
  measurementId: "G-457Z9CSGZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
