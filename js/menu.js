// Lógica compartida del "shell" de la app (sidebar, guardián de sesión,
// insignia de nivel de usuario). La usan todas las pantallas con menú
// lateral: index.html, perfil.html, configuracion.html, ayuda.html.
//
// El guardián espera la confirmación de Firebase antes de decidir si hay
// sesión — Firebase es la única fuente de verdad, ya no se mira localStorage
// para eso (solo se usa como caché rápida del nombre, siempre sincronizada
// desde acá). Dispara "sesionLista" para que otros scripts que necesiten
// nombreJugador esperen ese momento en vez de asumir que ya existe.
window.nombreJugador = null;

function iniciarGuardianDeSesion() {
  window.firebaseFns.onAuthStateChanged(window.firebaseAuth, async (usuario) => {
    if (!usuario) {
      localStorage.clear();
      window.location.href = "bienvenida.html";
      return;
    }

    const snapshot = await window.firebaseFns.getDoc(
      window.firebaseFns.doc(window.firebaseDb, "usuarios", usuario.uid)
    );
    window.nombreJugador = snapshot.exists() ? snapshot.data().nombre : "Jugador";
    localStorage.setItem("dq_nombre_jugador", window.nombreJugador);

    // ===== INSIGNIA DE NIVEL DE USUARIO (RF-008) =====
    if (document.getElementById("textoNivelUsuario")) {
      const { nivel, xpEnNivel, xpParaSiguiente } = calcularNivelUsuario(obtenerXpTotal());
      const porcentaje = Math.round((xpEnNivel / xpParaSiguiente) * 100);
      document.getElementById("textoNivelUsuario").textContent = nivel;
      document.getElementById("barraXpUsuario").style.width = `${porcentaje}%`;
      document.getElementById("textoXpUsuario").textContent = `${xpEnNivel} / ${xpParaSiguiente} XP`;
    }

    window.dispatchEvent(new Event("sesionLista"));
  });
}

// ===== MENÚ LATERAL COLAPSABLE (<1200px) — no depende de la sesión =====
const menuLateral = document.getElementById("menuLateral");
const fondoMenu = document.getElementById("fondoMenu");
const botonHamburguesa = document.getElementById("botonHamburguesa");

function alternarMenuLateral() {
  menuLateral.classList.toggle("menu-lateral--abierto");
  fondoMenu.classList.toggle("fondo-menu--visible");
}

botonHamburguesa.addEventListener("click", alternarMenuLateral);
fondoMenu.addEventListener("click", alternarMenuLateral);

document.querySelectorAll(".enlace-menu").forEach((enlace) => {
  enlace.addEventListener("click", (evento) => {
    if (enlace.dataset.vista === "salir") {
      evento.preventDefault();
      window.firebaseFns.signOut(window.firebaseAuth).finally(() => {
        localStorage.clear();
        window.location.href = "bienvenida.html";
      });
      return;
    }

    if (enlace.getAttribute("href") === "#") {
      evento.preventDefault();
      document.querySelectorAll(".enlace-menu").forEach((e) => e.classList.remove("enlace-menu--activo"));
      enlace.classList.add("enlace-menu--activo");
    }

    if (window.innerWidth <= 1200) alternarMenuLateral();
  });
});

if (window.firebaseAuth) {
  iniciarGuardianDeSesion();
} else {
  window.addEventListener("firebaseListo", iniciarGuardianDeSesion);
}
