window.addEventListener("load", () => {
  if (localStorage.getItem("user")) {
    window.location.replace("../index.html");
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const SignupBTN = document.querySelector("#SignupBTN");
SignupBTN.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const username = document.querySelector("#name").value;

  try {
    console.log("Attempting to create user...");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential);

    const user = userCredential.user;

    console.log("Saving user data...");
    await set(ref(database, "user/" + user.uid), {
      username: username,
      email: email,
    });
    console.log("User data saved.");

    alert("Creating Account...");
    window.location.href = "../Pages/login.html";
  } catch (error) {
    console.error("Error occurred:", error);
    alert("Please input carrect information");
    // alert(error.message);
  }
});
