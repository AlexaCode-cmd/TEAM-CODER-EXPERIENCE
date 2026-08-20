// Pantalla de bienvenida: login/registro real con Firebase Authentication.
// El nombre del jugador se guarda en localStorage (lo sigue usando el resto
// de la plataforma) y también en Firestore, ligado a su cuenta — así viaja
// con el usuario si inicia sesión desde otro dispositivo.

function iniciarBienvenida() {
  const { firebaseAuth, firebaseDb, firebaseFns } = window;
  const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    doc,
    getDoc,
    setDoc,
  } = firebaseFns;

  // Si ya hay una sesión activa, entra directo al mapa.
  onAuthStateChanged(firebaseAuth, (usuario) => {
    if (usuario) window.location.href = "index.html";
  });

  const botonModoLogin = document.getElementById("botonModoLogin");
  const botonModoRegistro = document.getElementById("botonModoRegistro");
  const formularioLogin = document.getElementById("formularioLogin");
  const formularioRegistro = document.getElementById("formularioRegistro");

  botonModoLogin.addEventListener("click", () => {
    botonModoLogin.classList.add("selector-modo-acceso__opcion--activo");
    botonModoRegistro.classList.remove("selector-modo-acceso__opcion--activo");
    formularioLogin.classList.remove("oculto");
    formularioRegistro.classList.add("oculto");
  });

  botonModoRegistro.addEventListener("click", () => {
    botonModoRegistro.classList.add("selector-modo-acceso__opcion--activo");
    botonModoLogin.classList.remove("selector-modo-acceso__opcion--activo");
    formularioRegistro.classList.remove("oculto");
    formularioLogin.classList.add("oculto");
  });

  function mensajeDeError(codigo) {
    const mensajes = {
      "auth/invalid-email": "Ese correo no es válido.",
      "auth/user-not-found": "No existe una cuenta con ese correo.",
      "auth/wrong-password": "Contraseña incorrecta.",
      "auth/invalid-credential": "Correo o contraseña incorrectos.",
      "auth/email-already-in-use": "Ya existe una cuenta con ese correo. Iniciá sesión en vez de registrarte.",
      "auth/weak-password": "La contraseña necesita al menos 6 caracteres.",
    };
    return mensajes[codigo] || "Ocurrió un error. Intentá de nuevo.";
  }

  formularioLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const correo = document.getElementById("campoCorreoLogin").value.trim();
    const contrasena = document.getElementById("campoContrasenaLogin").value;
    const error = document.getElementById("errorLogin");
    error.classList.remove("visible");

    try {
      const credencial = await signInWithEmailAndPassword(firebaseAuth, correo, contrasena);
      const snapshot = await getDoc(doc(firebaseDb, "usuarios", credencial.user.uid));
      if (snapshot.exists()) {
        localStorage.setItem("dq_nombre_jugador", snapshot.data().nombre);
        localStorage.setItem("dq_fecha_inscripcion", snapshot.data().fechaInscripcion);
      }
      localStorage.setItem("dq_id_jugador", credencial.user.uid);
      window.location.href = "index.html";
    } catch (e) {
      error.textContent = mensajeDeError(e.code);
      error.classList.add("visible");
    }
  });

  formularioRegistro.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nombre = document.getElementById("campoNombreRegistro").value.trim();
    const correo = document.getElementById("campoCorreoRegistro").value.trim();
    const contrasena = document.getElementById("campoContrasenaRegistro").value;
    const error = document.getElementById("errorRegistro");
    error.classList.remove("visible");

    if (!nombre) {
      error.textContent = "Escribe tu nombre para continuar.";
      error.classList.add("visible");
      return;
    }

    try {
      const credencial = await createUserWithEmailAndPassword(firebaseAuth, correo, contrasena);
      const fechaInscripcion = new Date().toISOString();
      await setDoc(doc(firebaseDb, "usuarios", credencial.user.uid), { nombre, fechaInscripcion });
      localStorage.setItem("dq_nombre_jugador", nombre);
      localStorage.setItem("dq_fecha_inscripcion", fechaInscripcion);
      localStorage.setItem("dq_id_jugador", credencial.user.uid);
      window.location.href = "index.html";
    } catch (e) {
      error.textContent = mensajeDeError(e.code);
      error.classList.add("visible");
    }
  });
}

if (window.firebaseAuth) {
  iniciarBienvenida();
} else {
  window.addEventListener("firebaseListo", iniciarBienvenida);
}
