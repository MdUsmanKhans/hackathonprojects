// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLb9ZHEInAQ7KSvAJkpJVSj_mZm7Yex08",
    authDomain: "aoorlootlo.firebaseapp.com",
    databaseURL: "https://aoorlootlo-default-rtdb.firebaseio.com",
    projectId: "aoorlootlo",
    storageBucket: "aoorlootlo.appspot.com",
    messagingSenderId: "900797318666",
    appId: "1:900797318666:web:79cbbc17fa0c798c6f41f3",
    measurementId: "G-YJXBY2KGY9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let email = document.getElementById("email");
let password = document.getElementById("password");
let successModal = document.getElementById("successModal");

window.loginUser = () => {
    let obj = {
        email: email.value,
        password: password.value,
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async (res) => {
            const id = res.user.uid;
            const refernce = doc(db, "users", id);
            const snap = await getDoc(refernce);
            if (snap.exists()) {
                localStorage.setItem("user", JSON.stringify(snap.data()));
                showModal();
                window.location.replace("../../index.html");
            } else {
                alert("Data Not Found");
            }
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

