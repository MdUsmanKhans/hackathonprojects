// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBUi03Vykj_xfAa0HxUktJDxYOAwUbPitk",
   authDomain: "classpractice-8bb17.firebaseapp.com",
   projectId: "classpractice-8bb17",
   storageBucket: "classpractice-8bb17.appspot.com",
   messagingSenderId: "310076548001",
   appId: "1:310076548001:web:3edbede6ef1017fc4ea1e0",
   measurementId: "G-T0BEXG5XMB"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth = getAuth();
const db = getFirestore();


let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");

window.signupUser = () => {
    let obj = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    console.log(obj);
  
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then((res) => {
            obj.id = res.user.uid;
            obj.userType = "user";
            delete obj.password;

            const refernce = doc(db, "users", obj.id);
            setDoc(refernce, obj)
                .then(() => {
                    const userObj = JSON.stringify(obj);
                    localStorage.setItem("user", userObj);
                    showModal();
                    window.location.replace("/pages/login/login.html");
                })
                .catch((err) => {
                    alert(err.message);
                });
        })
        .catch((err) => {
            alert(err.message);
        });
};

  window.showModal = () => {
    successModal.classList.remove("hidden");
};

window.closeModal = () => {
    successModal.classList.add("hidden");
};

