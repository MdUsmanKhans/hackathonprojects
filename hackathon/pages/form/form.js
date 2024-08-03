import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, set, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBUi03Vykj_xfAa0HxUktJDxYOAwUbPitk",
    authDomain: "classpractice-8bb17.firebaseapp.com",
    projectId: "classpractice-8bb17",
    storageBucket: "classpractice-8bb17.appspot.com",
    messagingSenderId: "310076548001",
    appId: "1:310076548001:web:3edbede6ef1017fc4ea1e0",
    measurementId: "G-T0BEXG5XMB"
  };



const app = initializeApp(firebaseConfig);

const db = getDatabase();

// const submit = document.querySelector('button')
// submit.onclick = () => sendData()


// Function for data sending
let nameBox = document.getElementById("nameBox");
let emailBox = document.getElementById("emailBox");
let fnameBox = document.getElementById("fnameBox");
let cnicBox = document.getElementById("cnicBox");
let contBox = document.getElementById("contBox");


// button
const submit = document.querySelector('button')
submit.onclick = () => sendData()

// Insert Data function

function sendData() {
    const uniqueId = Date.now().toString();
    console.log(uniqueId);
    set(ref(db, "The students/" + uniqueId),{
       Name:nameBox.value,
       email: emailBox.value,
       FatherName: fnameBox.value,
       Cnic: cnicBox.value,
       Contact: contBox.value,
    })
    .then(()=>{
        alert("Thank you! Your form has been submitted successfully")
    })
    .catch((error)=>{
        alert("Data stored unsuccessful"+error)
    });
};

