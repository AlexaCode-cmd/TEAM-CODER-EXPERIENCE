// Burbuja flotante de contacto (WhatsApp + redes sociales): compartida por Bienvenida,
// Mis Niveles, Perfil, Configuración y Ayuda. No vive en reto.html — ahí ese lugar de
// la pantalla lo ocupa la mascota (ver mascota.js).
const contactoFlotante = document.getElementById("contactoFlotante");
const botonContacto = document.getElementById("botonContacto");

if (contactoFlotante && botonContacto) {
  botonContacto.addEventListener("click", () => {
    const abierto = contactoFlotante.classList.toggle("contacto-flotante--abierto");
    botonContacto.setAttribute("aria-expanded", abierto);
  });
}
