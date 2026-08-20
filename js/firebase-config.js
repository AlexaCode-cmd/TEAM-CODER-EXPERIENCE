// Configuración de Firebase, compartida por toda la plataforma. Se carga como
// módulo (type="module", ver la etiqueta <script> en cada HTML) porque así
// se distribuye el SDK de Firebase; expone auth/Firestore en window para que
// el resto de los scripts del proyecto (que no son módulos) los usen como
// cualquier otra función global — esperando el evento "firebaseListo" antes
// de tocarlos, ya que los módulos cargan después que los scripts normales.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3AxoSfJLL5svqnsg1CJoRe316ybGqMmA",
    authDomain: "team-coder-experience.firebaseapp.com",
    projectId: "team-coder-experience",
    storageBucket: "team-coder-experience.firebasestorage.app",
    messagingSenderId: "858813678031",
    appId: "1:858813678031:web:00767a71348341aa21d2ba",
};

const app = initializeApp(firebaseConfig);

window.firebaseAuth = getAuth(app);
window.firebaseDb = getFirestore(app);
window.firebaseFns = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    doc,
    getDoc,
    setDoc,
    updateDoc,
};

window.dispatchEvent(new Event("firebaseListo"));
