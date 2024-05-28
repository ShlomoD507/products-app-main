import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";


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

const addProductBtn = document.getElementById("addProductBtn");
addProductBtn.addEventListener("click", addProduct);

const backToProductPageBtn = document.getElementById("backToProductPageBtn");
backToProductPageBtn.addEventListener("click", () => {
    window.location.href = 'userPage.html'; 
});

async function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const image = document.getElementById("productImage").value;

    try {
        await addDoc(collection(db, "products"), {
            name,
            price,
            description,
            image
        });
        alert("Product added successfully!");
        populateProductTable();
    } catch (error) {
        console.error("Error adding product: ", error.message);
        alert("Error adding product: " + error.message);
    }
}

async function populateProductTable() {
    const productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${productData.name}</td>
            <td>${productData.price}</td>
            <td>${productData.description}</td>
            <td>${productData.image}</td>
            <td>
                <button onclick="editProduct('${doc.id}', '${productData.image}', '${productData.name}', ${productData.price}, '${productData.description}')">Edit</button>
                <td><button onclick="deleteProduct('${doc.id}', this)">Delete</button>
            </td>
        `;

        productTableBody.appendChild(row);
    });
}

window.editProduct = (id, image, name, price, description) => {
    document.getElementById("productImage").value = image;
    document.getElementById("productName").value = name;
    document.getElementById("productPrice").value = price;
    document.getElementById("productDescription").value = description;

    addProductBtn.removeEventListener("click", addProduct);
    addProductBtn.textContent = "Update Product";
    addProductBtn.onclick = () => updateProduct(id);
}

async function updateProduct(id) {
    const image = document.getElementById("productImage").value;
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;

    try {
        const productDoc = doc(db, "products", id);
        await updateDoc(productDoc, {
            image,
            name,
            price,
            description
        });
        alert("Product updated successfully!");
        populateProductTable();

        addProductBtn.textContent = "Add Product";
        addProductBtn.onclick = addProduct;
    } catch (error) {
        console.error("Error updating product: ", error.message);
        alert("Error updating product: " + error.message);
    }
}
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'sign-in.html';
    } else {
        populateProductTable();
    }
  });
  

async function deleteProduct(id, buttonElement) {
  try {
      await deleteDoc(doc(db, "products", id));
      console.log(`Document with ID ${id} deleted`);
      buttonElement.closest('tr').remove();
  } catch (error) {
      console.error("Error deleting document: ", error);
  }
}

window.deleteProduct = deleteProduct;






















