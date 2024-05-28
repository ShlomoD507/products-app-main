
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore,collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
  import {getAuth,createUserWithEmailAndPassword} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";


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

  const signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", signUp);

async function signUp() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
       
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            uid: user.uid ,
            password:password,
        });
alert("User signed up successfully!");
document.querySelector('.header').textContent = "AUTHENTICATED"; 
window.location.href = 'sign-in.html'; 
} catch (error) {
console.error("Error signing up:", error.message);
alert("Error signing up: " + error.message);
}
}
