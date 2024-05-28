import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";

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
const signOutBtn = document.getElementById("signOutBtn");

async function populateProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productItem = document.createElement("div");
        productItem.className = "productItem";

        productItem.innerHTML = `
            <img src="${productData.image}" alt="${productData.name}">
            <h3>${productData.name}</h3>
            <p>Price: $${productData.price}</p>
            <p>Description: ${productData.description}</p>
        `;

        productList.appendChild(productItem);
    });
}

async function userSignOut() {
    try {
        await signOut(auth);
        alert("User signed out successfully");
        window.location.href = 'sign-in.html';
    } catch (error) {
        console.error("Error signing out: ", error.message);
        alert("Error signing out: " + error.message);
    }
}

signOutBtn.addEventListener("click", userSignOut);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'sign-in.html';
    } else {
        populateProductList();
    }
});






