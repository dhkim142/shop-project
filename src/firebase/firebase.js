// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsxkEeg_OEgJogwUZPqWvCPdJpi3n9z8w",
  authDomain: "react-next-shop-app-92e10.firebaseapp.com",
  projectId: "react-next-shop-app-92e10",
  storageBucket: "react-next-shop-app-92e10.firebasestorage.app",
  messagingSenderId: "901985252652",
  appId: "1:901985252652:web:a6fe004ee937c42bec2889"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);           // 인증을 위한 객체 생성
export const db = getFirestore(app);               // 데이터베이스를 위한 객체 생성
export const storage = getStorage(app);           // 스토리지를 위한 객체 생성

export default app;                        // app 객체를 내보내기