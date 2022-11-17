import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZDrNnStWL8q4zlJcZWB1J0vU45rCeEp8",
    authDomain: "krishi-mithra.firebaseapp.com",
    projectId: "krishi-mithra",
    storageBucket: "krishi-mithra.appspot.com",
    messagingSenderId: "373209545768",
    appId: "1:373209545768:web:323bd5c134947f545c491d",
    measurementId: "G-V8WJPWFFC7"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage