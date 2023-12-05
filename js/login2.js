import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Obtener referencia al botón de cerrar
const cerrar = document.getElementById("cerrar");

// Manejar clic en el botón de cerrar
cerrar.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      alert("Cerrado");
    })
    .catch(error => {
      alert("Error al cerrar sesión: " + error.message);
    });
});


const loginButton = document.getElementById("login");


loginButton.addEventListener('click', () => {
  var email = document.getElementById("emaillog").value;
  var password = document.getElementById("passwordlog").value;


  console.log("Email:", email);
  console.log("Password:", password);

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      alert("Bienvenido");
      window.location.href = "destinos.html";
    })
    .catch(error => {
  
      console.error("Error al iniciar sesión:", error);

      const errorCode = error.code;
      if (errorCode == "auth/invalid-email") {
        alert("El correo no es válido");
      } else if (errorCode == "auth/user-disabled") {
        alert("El usuario ha sido deshabilitado");
      } else if (errorCode == "auth/user-not-found") {
        alert("El correo no está registrado");
      } else if (errorCode == "auth/wrong-password") {
        alert("La contraseña es incorrecta");
      } else if (errorCode == "auth/invalid-login-credentials") {
        alert("Credenciales de inicio de sesión inválidas");
      }
    });
});
