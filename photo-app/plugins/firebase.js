import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/analytics';  // เพิ่มการใช้งาน analytics ถ้าต้องการใช้ Google Analytics

const firebaseConfig = {
  apiKey: "AIzaSyA8UYmH3HmdRO2HrOWp0JU5XFyQyZ_Rda0",
  authDomain: "orders-app-7e1fd.firebaseapp.com",
  projectId: "orders-app-7e1fd",
  storageBucket: "orders-app-7e1fd.appspot.com",
  messagingSenderId: "332659199001",
  appId: "1:332659199001:web:bcf09ddfbfb7320fea6e88",
  measurementId: "G-VG7N5SNJCG",
  databaseURL: "https://orders-app-7e1fd-default-rtdb.firebaseio.com/"
};

// ตรวจสอบว่ามีการ initialize Firebase แล้วหรือยัง
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    // Initialize Firebase Analytics ถ้าต้องการใช้งาน
    if (typeof window !== 'undefined' && 'measurementId' in firebaseConfig) {
        firebase.analytics();
    }
}

export default firebase;
