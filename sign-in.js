
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
  import {getAuth, signInWithEmailAndPassword,getData} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyDWCcw4BrptQNAWbDTV_8FHOO958xoHkWs",
    authDomain: "onoprojectsd4.firebaseapp.com",
    projectId: "onoprojectsd4",
    storageBucket: "onoprojectsd4.appspot.com",
    messagingSenderId: "975546850529",
    appId: "1:975546850529:web:8941bddd2442f0502baba0"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  const signInBtn = document.getElementById("signInBtn");


  const signin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
    signInWithEmailAndPassword(db, auth, email, password,)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("user signed in successfully");
      window.location.href = 'userPage.html';
      })

    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Error signing in: " + error.message);

  }
}
  
signInBtn.addEventListener("click", signin);



