# TEAM CODER EXPERIENCE
Plataforma gamificada del Instituto Tecnológico Superior MOVILIS para aprender
HTML, CSS y JavaScript resolviendo retos prácticos, reto a reto, nivel a nivel.

## Cómo correrlo

No requiere build ni instalación: es HTML/CSS/JS estático.

1. Clona el repositorio (pesa varios cientos de MB por los videos — dale tiempo).
2. Abre `bienvenida.html` en el navegador, o sirve la carpeta con cualquier
   servidor estático (`npx serve`, la extensión Live Server de VS Code, etc.).

## Estructura

- `bienvenida.html` — pantalla de entrada (nombre del jugador).
- `index.html` — mapa de niveles.
- `reto.html` — pantalla de reto (video + editor + preview + validación).
- `perfil.html`, `configuracion.html`, `ayuda.html` — pantallas secundarias.
- `*-datos.js` — datos y reglas de negocio (niveles, retos, medallas, perfil).
- `videos/` — video explicativo de cada reto.

## Dependencias externas (CDN)

Google Fonts, Font Awesome 6.5.1, CodeMirror 5.65.16, jsPDF 2.5.1.
