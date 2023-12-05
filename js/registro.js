import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyB1wCTZqLha6-ehWFGZvRSABYclJj71m7I",
  authDomain: "login-afd30.firebaseapp.com",
  projectId: "login-afd30",
  storageBucket: "login-afd30.appspot.com",
  messagingSenderId: "782469492256",
  appId: "1:782469492256:web:5bfd07640fe35d47035645",
  measurementId: "G-82PGPNCRE6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const registroButton = document.getElementById("registro");

registroButton.addEventListener('click', () => {
  var email = document.getElementById("emailreg").value;
  var password = document.getElementById("passwordreg").value;

 
  console.log("Email:", email);
  console.log("Password:", password);

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      alert("Usuario registrado exitosamente");
    
    })
    .catch(error => {
  
      console.error("Error al registrar usuario:", error);

      const errorCode = error.code;
      if (errorCode == "auth/invalid-email") {
        alert("El correo no es válido");
      } else if (errorCode == "auth/email-already-in-use") {
        alert("El correo electrónico ya está en uso");
      } else if (errorCode == "auth/weak-password") {
        alert("La contraseña es débil");
      } else {
        alert("Error al registrar usuario. Por favor, inténtalo de nuevo.");
      }
    });
});
