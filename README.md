# TEAM CODER EXPERIENCE

Plataforma gamificada del Instituto Tecnológico Superior MOVILIS para aprender
HTML, CSS y JavaScript resolviendo retos prácticos, reto a reto, nivel a nivel.

## Cómo correrlo

No requiere build ni instalación: es HTML/CSS/JS estático, pero **necesita
correrse desde un servidor local** (no sirve abrir los archivos con doble
clic) — la autenticación con Firebase usa un script tipo módulo, que los
navegadores bloquean por seguridad si se carga desde `file://`.

1. Clona el repositorio (pesa varios cientos de MB por los videos — dale tiempo).
2. Servilo con cualquier servidor estático: la extensión **Live Server** de
   VS Code (clic derecho sobre `bienvenida.html` → "Open with Live Server")
   o `npx serve`.
3. Necesitás también tu propio proyecto de Firebase configurado (ver
   "Autenticación y datos" más abajo) — sin eso, el registro/login no va a
   funcionar.

## Estructura

- `bienvenida.html` — pantalla de entrada: registro / inicio de sesión.
- `index.html` — mapa de niveles.
- `reto.html` — pantalla de reto (video + editor + preview + validación).
- `perfil.html`, `configuracion.html`, `ayuda.html` — pantallas secundarias.
- `css/` — hojas de estilo (una global + una por pantalla).
- `js/` — lógica y datos (una por módulo/pantalla).
  - `firebase-config.js` — conexión con Firebase Authentication y Firestore.
- `assets/img/` — logos e imágenes de marca.
- `assets/videos/` — video explicativo de cada reto.

## Autenticación y datos (Firebase)

La plataforma usa **Firebase Authentication** (correo/contraseña) para las
cuentas de cada estudiante, y **Firestore** para guardar su nombre — ligado
a su cuenta, así que se ve igual desde cualquier dispositivo donde inicie
sesión. El resto del progreso (niveles, XP, medallas, preferencias) todavía
vive en `localStorage` del navegador — migrarlo a Firestore es trabajo
pendiente (ver "Contenido pendiente").

Para correr este proyecto necesitás tu propio proyecto de Firebase:

1. Creá un proyecto en [Firebase Console](https://console.firebase.google.com).
2. Habilitá **Authentication → Sign-in method → Email/Password**.
3. Creá una base de **Firestore Database** (modo producción).
4. Publicá estas reglas de seguridad (Firestore → Rules): rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /usuarios/{userId} {
allow read, write: if request.auth != null && request.auth.uid == userId;
}
}
}

5. Registrá una app Web (Project Settings → Your apps → `</>`) y reemplazá
el objeto `firebaseConfig` en `js/firebase-config.js` con el tuyo.
6. En Authentication → Settings → Authorized domains, agregá el dominio
donde vayas a alojar el sitio (por defecto solo confía en `localhost`).

## Funcionalidades destacadas

- **Registro/login real** con Firebase — cada estudiante tiene su propia
cuenta (correo + contraseña).
- **Código de acceso** (RF-017): a partir del Nivel 4 se pide un código que
entrega el Instituto en persona; al validarlo, se muestra una tarjeta de
descuento especial.
- **Regalo animado** al completar los Niveles 1, 2 y 3 (esfero, libreta y
taza) — una caja que se abre con animación y confeti, en vez de la tarjeta
de texto plano.
- **Certificados en PDF** al completar la Fase 1 (Nivel 5) y el programa
completo (Nivel 10).
- **Mascota flotante** en la pantalla de reto, que reacciona al progreso del
estudiante.
- **Botón de contacto** (WhatsApp + redes sociales) flotante en todas las
pantallas excepto durante un reto (ahí ese lugar lo ocupa la mascota).

## Dependencias externas (CDN)

Google Fonts, Font Awesome 6.5.1, CodeMirror 5.65.16, jsPDF 2.5.1,
Firebase SDK 12.18.0 (Authentication + Firestore).

## Contenido pendiente

- [ ] Grabar video del Reto 5 del Nivel 2 (`assets/videos/DQ-N2R5.mp4`).
- [ ] Grabar video del Reto 5 del Nivel 4 (`assets/videos/DQ-N4R5.mp4`).
- [ ] Grabar los 20 videos de los Niveles 7 a 10 (`assets/videos/DQ-N{7..10}R{1..5}.mp4`).
- [ ] Restringir la API key de Firebase por dominio (Google Cloud → Credentials)
   una vez que el sitio esté estable en su dominio final.
- [ ] Migrar el progreso de niveles, XP, medallas y preferencias de
   `localStorage` a Firestore, para que también viajen con la cuenta.
- [ ] Mover las soluciones y pistas de código de `retos-datos.js` a Firestore,
   entregadas solo cuando corresponda, para que no sean visibles
   inspeccionando el código del navegador.

