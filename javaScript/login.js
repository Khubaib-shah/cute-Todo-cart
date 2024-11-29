window.addEventListener("load", () => {
  if (localStorage.getItem("user")) {
    window.location.replace("../index.html");
  }
});

// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  set,
  ref,
  getDatabase,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCNaqEsns-F6hyNiJHdSx2w-hmil_uqJ8s",
  authDomain: "realtime-database-f0288.firebaseapp.com",
  databaseURL:
    "https://realtime-database-f0288-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "realtime-database-f0288",
  storageBucket: "realtime-database-f0288.appspot.com",
  messagingSenderId: "851282000884",
  appId: "1:851282000884:web:2301363a4344be66f097a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const loginBTN = document.querySelector("#loginBTN");
loginBTN.addEventListener("click", async (event) => {
  event.preventDefault(); 

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    // Attempt to sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user)

    const dt = new Date();

    await set(ref(database, "user/" + user.uid), {
      email: email,
      last_login: dt.toISOString(),
    });

    localStorage.setItem("user", user.uid);
    alert("Login successful!");
    window.location.href = "../index.html";
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert("Please enter your correct email and password.");
  }
});
