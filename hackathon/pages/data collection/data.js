// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Your web app's Firebase configuration
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
const db = getDatabase();

const studentTableBody = document.getElementById('studentTableBody');

// Function to fetch data and populate the table
function fetchData() {
  const dbRef = ref(db);
  get(child(dbRef, "The students/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const students = snapshot.val();
        studentTableBody.innerHTML = ""; // Clear existing table data
        Object.keys(students).forEach(id => {
          const student = students[id];
          const row = document.createElement("tr");
          row.innerHTML = `
              <td class="py-3 px-4">${student.Name}</td>
            <td class="py-3 px-4">${student.FatherName}</td>
            <td class="py-3 px-4">${student.email}</td>
            <td class="py-3 px-4">${student.Contact}</td>
            <td class="py-3 px-4">${student.Cnic}</td>
            <td class="py-3 px-4">
              <button class="text-blue-600 hover:text-blue-900" onclick="editStudent('${id}', '${student.Name}', '${student.FatherName}', '${student.email}', '${student.Cnic}', '${student.Contact}')">Edit</button>
              <button class="text-red-600 hover:text-red-900" onclick="removeStudent('${id}')">Remove</button>
            </td>
          `;
          studentTableBody.appendChild(row);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to remove a student
function removeStudent(id) {
  remove(ref(db, "The students/" + id))
    .then(() => {
      alert("Student removed successfully");
      fetchData(); // Refresh the data
    })
    .catch((error) => {
      console.error("Error removing student:", error);
    });
}

// Function to edit a student
function editStudent(id, name, email, fatherName, contact, cnic) {
  const newName = prompt("Enter new name:", name);
  const newFatherName = prompt("Enter new Father Name:", fatherName);
  const newEmail = prompt("Enter new email:", email);
  const newContact = prompt("Enter new contact no:", contact);
  const newCnic = prompt("Enter new cnic no:", cnic);

  if (newName !== null && newFatherName !== null && newEmail!== null && newContact !== null && newCnic !== null) {
    update(ref(db, "The students/" + id), {
      Name: newName,
      fatherName: newFatherName,
      email: newEmail,
      Contact: newContact,
      cnic: newCnic,
    })
    .then(() => {
      alert("Student updated successfully");
      fetchData(); // Refresh the data
    })
    .catch((error) => {
      console.error("Error updating student:", error);
    });
  }
}

// Call the fetchData function when the page loads
window.onload = fetchData;

// Expose functions to global scope
window.editStudent = editStudent;
window.removeStudent = removeStudent;
// window.onload =  removeStudent




